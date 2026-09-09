import { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";

import { api } from "../services/api";
import { fontFamily, colors } from '@/src/styles/theme';

import { PlaceProps } from "../components/place";
import { Places } from "../components/places";
import { Categories, CategoriesProps } from "../components/categories";
import { SimulatedMap } from "../components/simulated-map";

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

  function moveCamera(latitude: number, longitude: number) {
    setCurrentLocation({ latitude, longitude });
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

      <View style={{ flex: 1 }}>
        <SimulatedMap
          user={currentLocation}
          points={markets}
          selectedId={category}
          onSelectPoint={(id) => router.navigate(`/market/${id}`)}
        />
      </View>

      {/* Tapping a pin opens the detail; tapping a list row does the same. */}
      <Text
        onPress={() =>
          Alert.alert(
            'About this map',
            'Original: native Google Maps via react-native-maps.\n\n' +
              'Why preview: the Google Maps key bundled in Expo Go (SDK 55-57) is expired, so native tiles cannot authenticate, and there is no budget for a private key.\n\n' +
              'Current: stylized preview plotting real GPS + API coordinates with tappable pins into the same flow.\n\n' +
              'Production path: MapLibre + dev-client build with our own key.'
          )
        }
        style={{
          fontSize: 10,
          color: colors.gray[500],
          fontFamily: fontFamily.regular,
          textAlign: 'right',
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}
      >
        Stylized preview map • Real coordinates • Why?
      </Text>

      <Places data={markets} />
    </View>
  )
}