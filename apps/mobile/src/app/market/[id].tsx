import { useEffect, useState, useRef } from 'react';
import { View, Alert, Modal, StatusBar, ScrollView } from 'react-native';
import { router, useLocalSearchParams, Redirect } from 'expo-router';
import { useCameraPermissions, CameraView } from 'expo-camera';

import { Button } from '@/src/components/button';
import { Loading } from '@/src/components/loading';
import { Cover } from '@/src/components/market/cover';
import { Coupon } from '@/src/components/market/coupon';
import { PropsDetails, Details } from '@/src/components/market/details';

import { api } from '@/src/services/api'

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {
  const [data, setData] = useState<DataProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string}>();

  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/market/${params.id}`);
      setData(data)
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os dados', [
        { 
          text: 'Ok', 
          onPress: () => router.back(),
        },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert('Câmera', 'Você precisa habilitar o uso da câmera');
      }
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Câmera', 'Não foi possível utilizar a câmera')
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);

      const { data } = await api.patch(`/coupons/${id}`);

      Alert.alert('Cupom', data.coupon);
      setCoupon(data.coupon)
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível utilizar o cupom')
    } finally { 
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);

    Alert.alert(
      'Cupom', 'Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?', 
      [
        { style: 'cancel', text: 'Não' },
        { text: 'Sim', onPress: () => getCoupon(id) },
      ]
    )
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href='/home' />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data?.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>QR Code</Button.Title>
        </Button>
      </View>

      <Modal visible={isVisibleCameraModal} animationType="slide" onRequestClose={() => setIsVisibleCameraModal(false)}>
        <CameraView 
          style={{ flex: 1}}
          facing='back'
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={({ data}) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}  
        />

        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button onPress={() => setIsVisibleCameraModal(false)} isLoading={couponIsFetching}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}