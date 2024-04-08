import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import Constants from 'expo-constants'
import PlantCard from '../Components/PlantCard'

const plants = [
  {
    name: 'Tomato',
    scienceName: 'Solanum lycopersicum',
    planted: true,
    image: 'https://i.postimg.cc/44DkZbc2/jitomate1.png',
  },
  {
    name: 'Corn',
    scienceName: 'Zea mays',
    planted: false,
    image: 'https://i.postimg.cc/3wBfDmps/maiz-removebg-preview.png',
  },
  {
    name: 'Radish',
    scienceName: 'Raphanus sativus',
    planted: true,
    image: 'https://i.postimg.cc/Pq4Fw1PH/rabano1.png',
  },
  {
    name: 'Watermelon',
    scienceName: 'Citrullus lanatus',
    planted: true,
    image: 'https://i.postimg.cc/zvLxMQMN/sandia-removebg-preview.png',
  },
  {
    name: 'Chili puya',
    scienceName: 'Puya chilensis',
    planted: false,
    image: 'https://i.postimg.cc/CKGp6Z5r/puya1.png',
  },
  {
    name: 'Celery',
    scienceName: 'Coriandrum sativum',
    planted: true,
    image: 'https://i.postimg.cc/SRg5GctQ/cilantro1.png',
  },
  {
    name: 'Strawberry',
    scienceName: 'Fragaria',
    planted: false,
    image: 'https://i.postimg.cc/hjQy362D/fresa1.png',
  },
  {
    name: 'Habanero pepper',
    scienceName: 'Capsicum chinense',
    planted: true,
    image: 'https://i.postimg.cc/ZqMsH4Fs/habanero1.png',
  },
]

const Plants = () => {
  return (
    <ScrollView
      style={{
        paddingTop: Constants.statusBarHeight + 52,
        paddingHorizontal: 18,
      }}
    >
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
        <View style={{ paddingBottom: 102}}>
          {plants.map((item, index) => (
            <PlantCard
              key={index}
              name={item.name}
              scienceName={item.scienceName}
              imageUrl={item.image}
              planted={item.planted}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Plants
