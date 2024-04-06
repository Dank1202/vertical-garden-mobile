import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView } from 'react-native'
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

  const {
    data: status,
    loading,
    error,
  } = useFetch('http://192.168.0.109:3000/api/vale')

  useEffect(() => {
    if (!loading && !error) {
      setValeStatus(status)
      console.log(valeStatus)
    }
  }, [status, loading, error])

  return (
    <ScrollView
      style={{
        marginTop: Constants.statusBarHeight + 52,
        paddingLeft: 18,
      }}
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

      <View>
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
          valor='4°'
          dato='Temperatura'
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
