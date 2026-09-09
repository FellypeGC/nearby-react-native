import { useEffect } from 'react'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { colors } from '@/src/styles/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { 
  useFonts,
  Rubik_600SemiBold,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold
} from '@expo-google-fonts/rubik'

import { Loading } from '@/src/components/loading'

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
  })

  useEffect(() => {
    if (fontError) {
      console.warn('Font load error (continuing with system font):', fontError);
    }
  }, [fontError])

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return <Loading />
  }

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{ 
          headerShown: false, 
          contentStyle: { 
            backgroundColor: colors.gray[100],
          } 
        }}
        >
      </Stack>
    </GestureHandlerRootView>
  )
}