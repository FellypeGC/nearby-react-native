import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";

// TEMPORARY diagnostic screen (TODO: remove before demo).
// Plain MapView: no custom provider, no custom marker images, fixed region.
// If this renders tiles, the bug is in our home.tsx props; if blank too,
// the cause is environmental (device / Expo Go / key).
export default function MapTest() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -23.561187293883442,
          longitude: -46.656451388116494,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: -23.561187293883442,
            longitude: -46.656451388116494,
          }}
          title="Test pin"
        />
      </MapView>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          bottom: 40,
          left: 32,
          right: 32,
          backgroundColor: "#257F49",
          padding: 16,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Back (map-test OK if tiles show)
        </Text>
      </TouchableOpacity>
    </View>
  );
}
