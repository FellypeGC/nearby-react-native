import { View, Text } from 'react-native'
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'

import { s } from './styles'
import { Step } from '../step'

export function Steps() {
  return (
    <View style={s.container}>
      <Text style={s.title}>See how it works:</Text>

      <Step 
        icon={IconMapPin}
        title='Find places'
        description='See nearby places that partner with Nearby'
      />
      <Step 
        icon={IconQrcode}
        title='Activate coupons with QR Code'
        description='Scan the code at the place to redeem the benefit'
      />
      <Step 
        icon={IconTicket}
        title='Get perks near you'
        description='Activate coupons wherever you are, across different kinds of places'
      />
    </View>
  )
}