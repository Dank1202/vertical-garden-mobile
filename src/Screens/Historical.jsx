import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import StackedAreaExample from '../Components/StackedAreaChart'
import ProgressCircleExample from '../Components/ProgressCircle'
import PieChartExample from '../Components/PieChart'
import BarChartComponent from '../Components/BarChartComponent'

const Historical = () => {
  const [data] = useState([
    { month: new Date(2015, 0, 1), apples: 1840 },
    { month: new Date(2015, 1, 1), apples: 1600 },
    { month: new Date(2015, 2, 1), apples: 640 },
    { month: new Date(2015, 3, 1), apples: 1620 },
  ])
  const keys = ['apples']
  const chartNames = ['Temperature', 'Floor Humidity', 'Humidity Chart', 'Co2']

  const [fetchedData, setFetchedData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://192.168.0.109:3000/api/monitoring/chart/temperature'
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        setFetchedData(jsonData)
        setLoading(false)
        console.log('fetched: ', jsonData) // Acceder a jsonData en lugar de fetchedData
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData()

    // Clean up function
    return () => {
      // You can perform cleanup here if necessary
    }
  }, [])

  if (loading) {
    return <Text>Loading...</Text> // Muestra un mensaje de carga mientras se está recuperando los datos
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
          data={fetchedData}
          keys={['temperature']}
          chartName={chartNames[0]}
        />
        <BarChartComponent />
        <StackedAreaExample data={data} keys={keys} chartName={chartNames[1]} />
        <StackedAreaExample data={data} keys={keys} chartName={chartNames[2]} />
        <StackedAreaExample data={data} keys={keys} chartName={chartNames[3]} />
      </View>
      <View style={{ marginTop: 22, paddingRight: 18, marginBottom: 132 }}>
        <Text style={{ fontSize: 20, fontWeight: '500' }}>Progress Circle</Text>
        <ProgressCircleExample />
      </View>
    </ScrollView>
  )
}

export default Historical
