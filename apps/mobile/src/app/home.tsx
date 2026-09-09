import { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";

import { api } from "../services/api";
import { fontFamily, colors } from '@/src/styles/theme';

import { PlaceProps } from "../components/place";
import { Places } from "../components/places";
import { Categories, CategoriesProps } from "../components/categories";

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';

import { router } from 'expo-router';

type MarketsProps = PlaceProps & {
  latitude: number,
  longitude: number
};

const fallbackLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState('');
  const [markets, setMarkets] = useState<MarketsProps[]>([])
  const [currentLocation, setCurrentLocation] = useState(fallbackLocation);

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.error(error);
      Alert.alert('Categorias', 'Não foi possível carregar as categorias.');
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return;
      }

      const { data } = await api.get('/markets/category/' + category);
      setMarkets(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Locais', 'Não foi possível carregar os locais.');
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        const location = await Location.getCurrentPositionAsync();
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCurrentLocation();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: '#CECECE' }}>
      <Categories 
        data={categories} 
        onSelect={setCategory}
        selected={category}
      />

      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        loadingEnabled
        initialRegion={
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }
        }
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
          }}
          image={require('@/src/assets/location.png')}
        />

        {
          markets.map((item) => (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
              image={require('@/src/assets/pin.png')}
            >
              <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                <View>
                  <Text style={{ 
                    fontSize: 14, 
                    color: colors.gray[600], 
                    fontFamily: fontFamily.medium 
                  }}>
                    {item.name}
                  </Text>

                  <Text style={{ 
                    fontSize: 14, 
                    color: colors.gray[600], 
                    fontFamily: fontFamily.medium 
                  }}>
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))
        }
     </MapView>

      <Places data={markets} />
    </View>
  )
}