import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, RefreshControl, Modal } from 'react-native'
import Constants from 'expo-constants'
import useFetch from '../hooks/useFetch'
import ValeStatus from '../Components/ValeStatus'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MonitoringRegister from '../Components/MonirotingRegister'
import ApertureTimeModal from '../Components/ApertureTimeModal'
import CloseTimeModal from '../Components/CloseTimeModal'
import { SliderContext } from '../Context/SiderContext'

const Details = () => {
  const [valeStatus, setValeStatus] = useState(null)
  const [apertureModal, setApertureModal] = useState(false)
  const [closeModal, setCloseModal] = useState(false)

  const { apertureDate, setApertureDate } = useContext(SliderContext)
  const { closeDate, setCloseDate } = useContext(SliderContext)

  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  const [monitoringData, setMonitoringData] = useState([])

  const {
    data: status,
    loading: statusLoading,
    error: statusError,
  } = useFetch('https://vertical-garden-api.onrender.com/api/vale')

  const {
    data: fetchedMonitoring,
    loading: monitoringLoading,
    error: monitoringError,
  } = useFetch('https://vertical-garden-api.onrender.com/api/last-monitoring')

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

  const handleRefresh = () => {
    setRefreshing(true) // Indica que se está realizando una actualización
    fetchData() // Vuelve a cargar los datos
  }

  return (
    <ScrollView
      style={{
        marginTop: Constants.statusBarHeight + 52,
        paddingLeft: 18,
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
      <View>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '700',
            color: 'rgba(105, 105, 105, 1)',
            marginTop: 12,
            marginBottom: 22,
          }}
        >
          ⌛ Schedules
        </Text>
      </View>

      {/* Aperture time */}
      <View style={{ marginRight: 16 }}>
        <TouchableOpacity
          onPress={() => setApertureModal(true)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffff',
            borderRadius: 22,
            width: '100%',
            marginBottom: 20,
            paddingVertical: 18,
            paddingHorizontal: 22,
            shadowColor: 'gray',
            shadowOpacity: 0.2,
            shadowRadius: 12,
            shadowOffset: {
              width: 0,
              height: 22,
            },
          }}
        >
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                marginVertical: 1,
                fontWeight: '700',
              }}
            >
              🕐 Aperture time
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 19,
                fontWeight: '700',
                marginTop: 8,
                paddingLeft: 12,
              }}
            >
              {apertureDate.toLocaleTimeString()}
            </Text>
          </View>
          <AntDesign name='right' size={24} color='black' />
        </TouchableOpacity>
      </View>

      {/* Close time */}
      <View style={{ marginRight: 16 }}>
        <TouchableOpacity
          onPress={() => setCloseModal(true)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffff',
            borderRadius: 19,
            width: '100%',
            paddingVertical: 18,
            paddingHorizontal: 22,
            shadowColor: 'gray',
            shadowOpacity: 0.1,
            shadowRadius: 12,
            shadowOffset: {
              width: 0,
              height: 22,
            },
          }}
        >
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '700',
              }}
            >
              🕧 Close time
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 19,
                fontWeight: '700',
                marginTop: 8,
                paddingLeft: 12,
              }}
            >
              {closeDate.toLocaleTimeString()}
            </Text>
          </View>
          <AntDesign name='right' size={24} color='black' />
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={{
            fontSize: 19,
            fontWeight: '700',
            color: 'rgba(105, 105, 105, 1)',
            marginTop: 32,
            marginBottom: 12,
          }}
        >
          📅 Actual data from garden
        </Text>
      </View>

      {/* Show vale status component */}
      <ValeStatus valeStatus={valeStatus} loading={loading} />

      <View style={{ paddingBottom: 52 }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: '700',
            color: 'rgba(105, 105, 105, 1)',
            marginVertical: 12,
          }}
        >
          🏡 Last monitoring register
        </Text>
        <MonitoringRegister
          valor={`${monitoringData.temperature}°`}
          dato='Temperature'
          texto='Temperature of the air in the zone.'
        />
        <MonitoringRegister
          valor={`${monitoringData.humidity}%`}
          dato='Humitity'
          texto='Temperature of the air in the zone.'
        />
        <MonitoringRegister
          valor={`${monitoringData.floorHumidity}%`}
          dato='Floor Humitity'
          texto='Temperature of the air in the zone.'
        />
        <MonitoringRegister
          valor={`${monitoringData.coTwo}%`}
          dato='Co2'
          texto='Temperature of the air in the zone.'
        />
      </View>

      <ApertureTimeModal
        openModal={apertureModal}
        setOpenModal={setApertureModal}
      />
      <CloseTimeModal openModal={closeModal} setOpenModal={setCloseModal} />
    </ScrollView>
  )
}

export default Details
