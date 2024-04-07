import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Animated,
  StyleSheet,
  RefreshControl,
} from 'react-native'
import HomeSlider from '../Components/HomeSlider'
import Slider from '../Components/Slider'
import Constants from 'expo-constants'

import { FontAwesome6 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useNavigation } from '@react-navigation/native'

import Spinner from 'react-native-loading-spinner-overlay'

import ValeStatus from '../Components/ValeStatus'

import useFetch from '../hooks/useFetch'

const images = [
  {
    name: 'Tomato',
    date: 'Solanum lycopersicum',
    description:
      'Vegetable beneficial for health due to the presence of citric and malic acid that favors digestive processes.',
    irrigation:
      'Water 3 or 4 times a week in hot weather with a watering can or drip irrigation.',
    additional_care: {
      light: '6 hours of direct sunshine per day.',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune and leave 2-3 main branches',
    },
    image: 'https://i.postimg.cc/fT5xCDjb/jitomate.jpg',
  },
  {
    name: 'Corn',
    date: 'Zea mays',
    description: 'It is a cereal, an American gramineae plant, characterized by long and massive stems.',
    irrigation: 'Water at least once a week every time the substrate is dry.',
    additional_care: {
      light: '6 hours of direct sunshine per day.',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune and leave 2-3 main branches',
    },
    image:
      'https://i.postimg.cc/hG44rRsK/maiz.jpg',
  },
  {
    name: 'Onion',
    date: 'Allium cepa',
    description: 'It is a horticultural plant of the liliaceae family that is characterized by its low caloric value and high fiber content.',
    irrigation: 'Moderate watering 2 to 4 times a week.',
    additional_care: {
      light: '6 hours of direct sunshine per day.',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune and leave 2-3 main branches',
    },
    image:
      'https://i.postimg.cc/PrGt7wy3/cebolla.jpg',
  },
  {
    name: 'Radish',
    date: 'Raphanus sativus',
    description: 'It is a biennial herbaceous plant belonging to the amaryllidaceous family.',
    irrigation: 'It is only necessary to keep the soil moist for healthy growth.',
    additional_care: {
      light: '6 hours of direct sunshine per day.',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune and leave 2-3 main branches',
    },
    image:
      'https://i.postimg.cc/gJCP1CVX/rabano.jpg',
  },
  {
    name: 'Watermelon',
    date: 'Citrullus lanatus',
    description: 'Annual plant that belongs to the cucurbitaceae family.',
    irrigation: 'Water 3 times a week, for two or three hours.',
    additional_care: {
      light: '6 hours of direct sunshine per day.',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune and leave 2-3 main branches',
    },
    image:
      'https://i.postimg.cc/qBKr27r8/sandia.jpg',
  },
  {
    name: 'Chili puya',
    date: 'Puya chilensis',
    description: 'It is a Mexican bell pepper similar to the guajillo, but smaller and hotter.',
    irrigation: 'Drip irrigation every third day for 3 to 5 hours.',
    additional_care: {
      light: '6 hours of direct sunshine per day.',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune and leave 2-3 main branches',
    },
    image:
      'https://i.postimg.cc/XvhMyRDH/puya.jpg',
  },
  {
    name: 'Celery',
    date: 'Coriandrum sativum',
    description: 'It is an annual herbaceous plant, of the apiaceae family, used as an aromatic herb.',
    irrigation: 'Water 2-3 times per week.',
    additional_care: {
      light: '6 hours of direct sunshine per day.',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune and leave 2-3 main branches',
    },
    image:
      'https://i.postimg.cc/rp7bpSK7/cilantro.jpg',
  },
  {
    name: 'Strawberry',
    date: 'Fragaria',
    description: 'It is a perennial plant of the rosaceae family, whose fruit is edible.',
    irrigation: 'Drip irrigation once a week in the mornings.',
    additional_care: {
      light: '6 hours of direct sunshine per day.',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune and leave 2-3 main branches',
    },
    image:
      'https://i.postimg.cc/q7pq53JV/fresa.jpg',
  },
  {
    name: 'Habanero pepper',
    date: 'Capsicum chinense',
    description: 'It is a herbaceous plant or shrub, branched, reaching a size of up to 2.5m high.',
    irrigation: '2 to 3 times per week, keeping the soil moist.',
    additional_care: {
      light: '6 hours of direct sunshine per day.',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune and leave 2-3 main branches',
    },
    image:
      'https://i.postimg.cc/5jcNqH7r/habanero.jpg',
  },
]

const Home = () => {
  const navigation = useNavigation()

  const [monitoringData, setMonitoringData] = useState([])
  const [valeStatus, setValeStatus] = useState([])

  const [loading, setLoading] = useState(true)

  const [refreshing, setRefreshing] = useState(false)

  const {
    data: fetchedMonitoring,
    loading: monitoringLoading,
    error: monitoringError,
  } = useFetch('https://vertical-garden-api.onrender.com/api/last-monitoring')

  const {
    data: status,
    loading: statusLoading,
    error: statusError,
  } = useFetch('https://vertical-garden-api.onrender.com/api/vale')

  const fetchData = () => {
    setTimeout(() => {
      setLoading(true)
      fetch('https://vertical-garden-api.onrender.com/api/last-monitoring')
        .then((response) => response.json())
        .then((newMonitoringData) => {
          setMonitoringData(newMonitoringData)
        })
        .catch((error) => {
          console.error('Error al recargar los datos de monitoreo:', error)
        })

      fetch('https://vertical-garden-api.onrender.com/api/vale')
        .then((response) => response.json())
        .then((newStatus) => {
          setValeStatus(newStatus)
          setRefreshing(false) // Indica que la recarga ha terminado
        })
        .catch((error) => {
          console.error('Error al recargar los datos de status:', error)
          setRefreshing(false) // Asegúrate de que refreshing se establezca en false incluso si hay un error
        })
      setRefreshing(false)
    }, 2000)
    setLoading(false)
  }

  useEffect(() => {
    if (
      !monitoringLoading &&
      !monitoringError &&
      !statusLoading &&
      !statusError
    ) {
      setMonitoringData(fetchedMonitoring)
      setValeStatus(status)
      setRefreshing(false)
      console.log('Status loading', statusLoading)
    }
  }, [
    monitoringLoading,
    monitoringError,
    statusLoading,
    statusError,
    fetchedMonitoring,
    status,
  ])

  if (monitoringLoading || statusLoading || monitoringError || statusError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Spinner
          visible={loading}
          textContent={'Cargando...'}
          textStyle={{ color: 'gray' }}
          overlayColor='white'
          color='#689F38'
        />
      </View>
    )
  }

  const handleRefresh = () => {
    setRefreshing(true) // Indica que se está realizando una actualización
    fetchData() // Vuelve a cargar los datos
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight + 52,
        marginLeft: 16,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#9Bd35A', '#689F38']}
          tintColor={'#689F38'}
          style={{ marginTop: 8 }}
        />
      }
    >
      {/* <HomeSlider data={images} /> */}
      <View>
        <Text
          style={{
            flex: 1,
            fontSize: 44,
            fontWeight: 500,
            marginBottom: 12,
          }}
        >
          Make a better world. Vertical garden 🪴
        </Text>
      </View>

      <View>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '700',
            color: 'rgba(105, 105, 105, 1)',
            marginVertical: 12,
          }}
        >
          🏡 Important!
        </Text>
      </View>

      {/* Show vale status component */}
      <ValeStatus valeStatus={valeStatus} loading={loading} />

      <View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: 'rgba(105, 105, 105, 1)',
            marginVertical: 12,
          }}
        >
          🌵 Last monitoring register
        </Text>
      </View>

      {/* FastView component */}
      {/* REFACTOR IS NECESSARY FOR THIS COMPONENT!!!! */}
      <View style={styles.fastView}>
        <View style={styles.fastViewSubcontainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.fastViewNumber}>
              {monitoringData.temperature}°
            </Text>
          </View>
          <Text style={styles.fastViewTitle}>Temperature</Text>
        </View>
        <View style={styles.fastViewSubcontainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.fastViewNumber}>
              {monitoringData.floorHumidity}%
            </Text>
          </View>
          <Text style={styles.fastViewTitle}>Humidity</Text>
        </View>
        <View style={styles.fastViewSubcontainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.fastViewNumber}>{monitoringData.coTwo}%</Text>
          </View>
          <Text style={styles.fastViewTitle}>Co2</Text>
        </View>
      </View>

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
        <Slider data={images} />
      </View>
      <View style={{ marginRight: 16 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Info')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(77, 180, 116, 1)',
            borderRadius: 32,
            width: '100%',
            marginTop: 16,
            marginBottom: 124,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 18,
              marginVertical: 22,
            }}
          >
            Learn more
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  // Monitoring data
  fastView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '96%',
    paddingHorizontal: 0,
    marginTop: 8,
    // backgroundColor: 'rgba(224, 224, 224, 1)',
    borderRadius: 22,
    marginBottom: 16,
  },
  fastViewSubcontainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 104,
    height: 104,
    backgroundColor: 'rgba(237, 237, 237, 1)',
    borderRadius: 18,
    shadowColor: 'gray',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  fastViewTitle: {
    fontSize: 12,
    color: 'rgba(135, 135, 135, 1)',
    fontWeight: '600',
  },
  numberContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 68,
    height: 68,
    borderRadius: 32,
    backgroundColor: 'rgba(92, 201, 140, 0.2)',
    padding: 12,
    marginBottom: 4,
  },
  fastViewNumber: {
    fontSize: 20,
    color: 'rgba(105, 105, 105, 1)',
    fontWeight: '700',
  },
})

export default Home
