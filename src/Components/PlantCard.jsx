import React from 'react'
import { View, Text, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'

function PlantCard({ name, scienceName, planted, imageUrl }) {
  return (
    <View
      style={{
        marginVertical: 18,
        overflow: 'hidden',
        borderRadius: 22,
        backgroundColor: '#ffff',
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 12,
        shadowOffset: 22,
      }}
    >
      <View style={{ width: '100%', height: 202 }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(133, 215, 169, 0.65)',
          padding: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>{name}</Text>
          <Text
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              padding: 8,
              marginVertical: 8,
              overflow: 'hidden',
              fontWeight: '600',
              color: 'white',
              backgroundColor: planted ? 'rgba(92, 201, 140, 1)' : 'red',
              borderRadius: 12,
            }}
          >
            {planted ? 'Planted' : 'Not Planted'}
          </Text>
        </View>
        <View style={{ marginTop: 16, marginRight: 12 }}>
          <Feather name='heart' size={42} color='black' />
        </View>
      </View>
    </View>
  )
}

export default PlantCard
