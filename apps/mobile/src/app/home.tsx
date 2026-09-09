import { useEffect, useRef, useState } from "react";
import { View, Alert, Text, Platform } from "react-native";

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
  const [locationStatus, setLocationStatus] = useState<'loading' | 'ok' | 'denied' | 'error'>('loading');
  const mapRef = useRef<MapView>(null);

  // Google provider on Android; Apple Maps on iOS (no key needed in Expo Go).
  const mapProvider = Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined;

  function moveCamera(latitude: number, longitude: number) {
    setCurrentLocation({ latitude, longitude });
    mapRef.current?.animateCamera({ center: { latitude, longitude }, zoom: 15 }, { duration: 800 });
  }

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.error(error);
      Alert.alert('Categories', 'Could not load the categories.');
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
      Alert.alert('Places', 'Could not load the places.');
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        setLocationStatus('denied');
        Alert.alert(
          'Location',
          'Allow precise location access to see coupons near you. Showing São Paulo as fallback.'
        );
        return;
      }

      // Fast path: last known fix renders instantly, GPS refines right after.
      const lastKnown = await Location.getLastKnownPositionAsync();
      if (lastKnown) {
        moveCamera(lastKnown.coords.latitude, lastKnown.coords.longitude);
        setLocationStatus('ok');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      moveCamera(location.coords.latitude, location.coords.longitude);
      setLocationStatus('ok');
    } catch (error) {
      console.error(error);
      setLocationStatus('error');
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

      {locationStatus !== 'ok' && (
        <Text style={{
          fontSize: 12,
          color: colors.gray[600],
          fontFamily: fontFamily.regular,
          textAlign: 'center',
          paddingVertical: 4,
        }}>
          {locationStatus === 'loading'
            ? 'Locating you…'
            : 'Location unavailable — showing São Paulo as fallback.'}
        </Text>
      )}

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={mapProvider}
        showsUserLocation
        showsMyLocationButton
        loadingEnabled
        onMapReady={() => {
          // Re-center in case the GPS fix arrived before the map was ready.
          mapRef.current?.animateCamera(
            {
              center: {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              },
              zoom: 15,
            },
            { duration: 500 }
          );
        }}
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