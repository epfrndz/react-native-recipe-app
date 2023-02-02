import { HStack, View } from 'native-base'
import { Text, StatusBar, Box } from 'native-base'
import React from 'react'

const Header = () => {
  return (
    <View>
      <StatusBar backgroundColor='#2c3e50' barStyle='light-content' />
      <Box safeAreaTop backgroundColor='#2c3e50'>
        <HStack bg='#2c3e50' px={1} py={3} alignItems='center' justifyContent={'center'}>
          <Text color='#fff' fontSize={20} fontWeight='bold'>Recipe App</Text>
        </HStack>
      </Box>
    </View>
  )
}

export default Header