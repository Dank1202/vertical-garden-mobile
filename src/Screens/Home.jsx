import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Animated,
  StyleSheet,
  RefreshControl,
  Platform,
  Vibration,
} from 'react-native'
import HomeSlider from '../Components/HomeSlider'
import Slider from '../Components/Slider'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
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
    first_crop: '60 to 80 days.',
    additional_care: {
      light: 'At least 6 hours of direct sunshine per day,',
      temperature: 'Soil temperature between 20-25°C.',
      other: 'Prune lateral branches and leave 2-3 main branches.',
    },
    image: 'https://i.postimg.cc/fT5xCDjb/jitomate.jpg',
  },
  {
    name: 'Corn',
    date: 'Zea mays',
    description:
      'It is a cereal, an American gramineae plant, characterized by long and massive stems.',
    irrigation: 'Water at least once a week every time the substrate is dry.',
    first_crop: '100 to 150 days',
    additional_care:
      'The main care that has to be carried out is the correct choice of the site, planning of planting and preparation of the soil.',
    image: 'https://i.postimg.cc/hG44rRsK/maiz.jpg',
  },
  {
    name: 'Onion',
    date: 'Allium cepa',
    description:
      'It is a horticultural plant of the liliaceae family that is characterized by its low caloric value and high fiber content.',
    irrigation: 'Moderate watering 2 to 4 times a week.',
    first_crop:
      'When they have a yellowish color and approximately 50-75% of the foliage has dried the crops are ready for harvest.',
    additional_care:
      'Weed control, fertilization every 3-4 weeks and protection against pests and diseases.',
    image: 'https://i.postimg.cc/PrGt7wy3/cebolla.jpg',
  },
  {
    name: 'Radish',
    date: 'Raphanus sativus',
    description:
      'It is a biennial herbaceous plant belonging to the amaryllidaceous family.',
    irrigation:
      'It is only necessary to keep the soil moist for healthy growth.',
    first_crop: '4 weeks after planting.',
    additional_care:
      '6 hours of direct sunlight per day, temperature 18-22°C (64-86°F)',
    image: 'https://i.postimg.cc/gJCP1CVX/rabano.jpg',
  },
  {
    name: 'Watermelon',
    date: 'Citrullus lanatus',
    description: 'Annual plant that belongs to the cucurbitaceae family.',
    irrigation: 'Water 3 times a week, for two or three hours.',
    first_crop: 'An average of 120 days',
    additional_care:
      'Mainly the choice of a good soil, in addition to a good pruning and cleaning afterwards.',
    image: 'https://i.postimg.cc/qBKr27r8/sandia.jpg',
  },
  {
    name: 'Chili puya',
    date: 'Puya chilensis',
    description:
      'It is a Mexican bell pepper similar to the guajillo, but smaller and hotter.',
    irrigation: 'Drip irrigation every third day for 3 to 5 hours.',
    first_crop: 'Approximately eight weeks after planting.',
    additional_care:
      'This plant is easier to care for as it does not need pruning or fertilizers.',
    image: 'https://i.postimg.cc/XvhMyRDH/puya.jpg',
  },
  {
    name: 'Celery',
    date: 'Coriandrum sativum',
    description:
      'It is an annual herbaceous plant, of the apiaceae family, used as an aromatic herb.',
    irrigation: 'Water 2-3 times per week.',
    first_crop: 'Between week 16 and 18.',
    additional_care: '4 hours of direct light minimum and a warm temperature',
    image: 'https://i.postimg.cc/rp7bpSK7/cilantro.jpg',
  },
  {
    name: 'Strawberry',
    date: 'Fragaria',
    description:
      'It is a perennial plant of the rosaceae family, whose fruit is edible.',
    irrigation: 'Drip irrigation once a week in the mornings.',
    first_crop: '3 to 6 months after planting.',
    additional_care:
      'Water with warm water and prune after harvest to stimulate the growth of new stems.',
    image: 'https://i.postimg.cc/q7pq53JV/fresa.jpg',
  },
  {
    name: 'Habanero pepper',
    date: 'Capsicum chinense',
    description:
      'It is a herbaceous plant or shrub, branched, reaching a size of up to 2.5m high.',
    irrigation: '2 to 3 times per week, keeping the soil moist.',
    first_crop: 'At 90 days after planting.',
    additional_care: 'Keep in a warm climate as it is very sensitive to frost.',
    image: 'https://i.postimg.cc/5jcNqH7r/habanero.jpg',
  },
]

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

const Home = () => {
  const navigation = useNavigation()
  const [expoPushToken, setExpoPushToken] = useState('')

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

  async function registerForPushNotificationsAsync() {
    let token

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: 'your-project-id',
        })
      ).data
      console.log(token)
    } else {
      alert('Must use physical device for Push Notifications')
    }

    return token
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))
  }, [])

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
