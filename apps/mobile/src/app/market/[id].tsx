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
import { AnalyticsEvents, track } from '@/src/lib/analytics'

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
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data)
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not load the data', [
        { 
          text: 'OK', 
          onPress: () => router.back(),
        },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert('Camera', 'You need to enable camera access');
      }
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Camera', 'Could not use the camera')
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);

      const { data } = await api.patch(`/coupons/${id}`);

      Alert.alert('Coupon', data.coupon);
      setCoupon(data.coupon)
      track(AnalyticsEvents.couponRedeemed, { marketId: id });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not redeem the coupon')
    } finally { 
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);

    Alert.alert(
      'Coupon', 'A redeemed coupon cannot be reused. Do you really want to redeem it?', 
      [
        { style: 'cancel', text: 'No' },
        { text: 'Yes', onPress: () => getCoupon(id) },
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
            <Button.Title>Back</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}