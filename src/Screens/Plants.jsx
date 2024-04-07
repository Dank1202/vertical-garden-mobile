import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import Constants from 'expo-constants'
import Slider from '../Components/Slider'

const plants = [
  {
    name: 'Tomato',
    date: 'Solanum lycopersicum',
    image: 'https://i.postimg.cc/44DkZbc2/jitomate1.png',
  },
  {
    name: 'Corn',
    date: 'Zea mays',
    image: 'https://i.postimg.cc/3wBfDmps/maiz-removebg-preview.png',
  },
]

const plant = [
  {
    name: 'Radish',
    date: 'Raphanus sativus',
    image: 'https://i.postimg.cc/Pq4Fw1PH/rabano1.png',
  },
  {
    name: 'Watermelon',
    date: 'Citrullus lanatus',
    image: 'https://i.postimg.cc/zvLxMQMN/sandia-removebg-preview.png',
  },
]

const plantss = [
  {
    name: 'Chili puya',
    date: 'Puya chilensis',
    image: 'https://i.postimg.cc/CKGp6Z5r/puya1.png',
  },
  {
    name: 'Celery',
    date: 'Coriandrum sativum',
    image: 'https://i.postimg.cc/SRg5GctQ/cilantro1.png',
  },
]

const plantt = [
  {
    name: 'Strawberry',
    date: 'Fragaria',
    image: 'https://i.postimg.cc/hjQy362D/fresa1.png',
  },
  {
    name: 'Habanero pepper',
    date: 'Capsicum chinense',
    image: 'https://i.postimg.cc/ZqMsH4Fs/habanero1.png',
  },
]

const Plants = () => {
  return (
    <ScrollView style={{ paddingTop: Constants.statusBarHeight + 52 }}>
      <View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            marginTop: 12,
            marginBottom: 6,
            color: 'rgba(105, 105, 105, 1)',
          }}
        >
          🌱 Plants
        </Text>
        <Slider data={plants} />
        <Slider data={plant} />
        <Slider data={plantss} />
        <Slider data={plantt} />
      </View>
    </ScrollView>
  )
}

export default Plants
