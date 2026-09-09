import { ActivityIndicator } from "react-native";

import{ s } from './styles'
import { colors } from '@/src/styles/theme'

export function Loading() {
  return (
    <ActivityIndicator color={colors.green.base} style={s.container} />
  )
}