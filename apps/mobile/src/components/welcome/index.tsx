import { Image, Text, View } from 'react-native'

import { s } from './styles' 

export function Welcome() {
  return (
    <View>
      <Image source={require('@/src/assets/logo.png')} style={s.logo} />

      <Text style={s.title}>Welcome to Nearby</Text>
      <Text style={s.subtitle}>
        Get discount coupons to use at {'\n'} 
        your favorite places.
      </Text>
    </View>
  )
} 