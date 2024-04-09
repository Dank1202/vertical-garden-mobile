import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import Constants from 'expo-constants'
import StackedAreaExample from '../Components/StackedAreaChart'
import ProgressCircleExample from '../Components/ProgressCircle'
import PieChartExample from '../Components/PieChart'
import BarChartComponent from '../Components/BarChartComponent'
import Spinner from 'react-native-loading-spinner-overlay'

const Historical = () => {
  const [data] = useState([
    { month: new Date(2015, 0, 1), apples: 1840 },
    { month: new Date(2015, 1, 1), apples: 1600 },
    { month: new Date(2015, 2, 1), apples: 640 },
    { month: new Date(2015, 3, 1), apples: 1620 },
  ])
  const keys = ['apples']
  const chartNames = ['Temperature', 'Humidity', 'Floor Humidity', 'Co2']

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // States for dara from API
  const [temperatureData, setTemperatureData] = useState(null)
  const [humidityData, setHumidityData] = useState(null)
  const [flootHumidityData, setFloorHumidityData] = useState(null)
  const [coTwoData, setCoTwoData] = useState(null)

  // states for refreshing
  const [refreshing, setRefreshing] = useState(false)
  const [refreshinLoading, setRefreshinLoading] = useState(true)

  const urls = [
    'https://vertical-garden-api.onrender.com/api/monitoring/chart/temperature',
    'https://vertical-garden-api.onrender.com/api/monitoring/chart/humidity',
    'https://vertical-garden-api.onrender.com/api/monitoring/chart/floor-humidity',
    'https://vertical-garden-api.onrender.com/api/monitoring/chart/coTwo',
  ]

  useEffect(() => {
    const fetchData = async (url, setState) => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        setState(jsonData)
      } catch (error) {
        setError(error)
      }
    }

    let completedRequests = 0

    const handleFetchData = () => {
      urls.forEach(async (url, index) => {
        try {
          await fetchData(url, (data) => {
            switch (index) {
              case 0:
                setTemperatureData(data)
                break
              case 1:
                setHumidityData(data)
                break
              case 2:
                setFloorHumidityData(data)
                break
              case 3:
                setCoTwoData(data)
                break
              default:
                break
            }
          })
        } catch (error) {
          setError(error)
        } finally {
          completedRequests++
          if (completedRequests === urls.length) {
            setLoading(false)
          }
        }
      })
    }

    handleFetchData()

    // Clean up function
    return () => {
      // You can perform cleanup here if necessary
    }
  }, [])

  const refreshData = () => {
    setTimeout(() => {
      setRefreshinLoading(false)
      setRefreshing(false)
    }, 2000)
    setRefreshinLoading(true)
  }

  const handleRefresh = () => {
    setRefreshing(true) // Indica que se está realizando una actualización
    refreshData() // Vuelve a cargar los datos
  }

  if (loading) {
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

  if (error) {
    return <Text>Error: {error.message}</Text> // Muestra un mensaje de error si ocurre un error durante la recuperación de datos
  }

  return (
    <ScrollView
      style={{
        paddingTop: Constants.statusBarHeight + 62,
        marginLeft: 18,
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
      <Text
        style={{
          fontSize: 28,
          fontWeight: '700',
          color: 'rgba(69, 69, 69, 1)',
        }}
      >
        📈 Historical
      </Text>
      <View style={{ marginTop: 8, paddingRight: 18 }}>
        <PieChartExample />
      </View>
      <View style={{ paddingRight: 18 }}>
        <StackedAreaExample
          data={temperatureData}
          keys={['temperature']}
          chartName={chartNames[0]}
        />
        <BarChartComponent />
        <StackedAreaExample
          data={humidityData}
          keys={['humidity']}
          chartName={chartNames[1]}
        />
        <StackedAreaExample
          data={flootHumidityData}
          keys={['floorHumidity']}
          chartName={chartNames[2]}
        />
        <StackedAreaExample
          data={coTwoData}
          keys={['coTwo']}
          chartName={chartNames[3]}
        />
      </View>
      <View style={{ marginTop: 22, paddingRight: 18, marginBottom: 132 }}>
        {/* <Text style={{ fontSize: 20, fontWeight: '500' }}>Progress Circle</Text> */}
        {/* <ProgressCircleExample /> */}
      </View>
    </ScrollView>
  )
}

export default Historical
