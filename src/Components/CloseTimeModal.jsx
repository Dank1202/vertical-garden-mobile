import React, { useState, useRef, useContext } from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Button,
  ScrollView,
  Switch,
  Animated,
  PanResponder,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { FontAwesome6 } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import { SliderContext } from '../Context/SiderContext'

function CloseTimeModal({ openModal, setOpenModal }) {
  // const { closeDate, setCloseDate } = useContext(SliderContext)
  const [closeDate, setCloseDate] = useState(new Date())
  const { apertureDate, setApertureDate } = useContext(SliderContext)

  const [show, setShow] = useState(false)
  const [withAlert, setWithAlert] = useState(false)

  // local state for time to send to the api
  const [timeToSend, setTimeToSend] = useState({})

  const pan = useRef(new Animated.ValueXY()).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Si el desplazamiento hacia abajo es mayor a 50 unidades, cierra el modal
        if (gestureState.dy > 50) {
          setOpenModal(false)
        }
      },
      onPanResponderRelease: () => {
        // Vuelve el modal a su posición original
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start()
      },
    })
  ).current

  const toggleSwitch = () => {
    setWithAlert((previousState) => !previousState)
  }

  const onChange = (e, selectedDate) => {
    setCloseDate(selectedDate)
    setTimeToSend({
      hour: selectedDate.getHours(),
      minute: selectedDate.getMinutes(),
    })
    setShow(false)
  }

  // async funciton to do the request
  const updateHour = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error('Error al realizar la solicitud.')
    }
    const responseData = await response.json()
    console.log('Update response: ', responseData)
  }

  const updateCloseTime = () => {
    console.log(closeDate.getHours())
    console.log(closeDate.getMinutes())
    // try to make the request
    try {
      console.log(timeToSend)
      // make the request
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeToSend),
      }
      // url from the API
      const url = 'https://vertical-garden-api.onrender.com/api/close-time/6616ab2fb02730a362d05325'

      updateHour(url, requestOptions)
      // console.log()
    } catch (e) {
      console.error(e)
      console.log('Error al actualizar la hora')
    }
    if (withAlert) {
      scheduleRiskNotification(closeDate)
    }
  }

  const scheduleRiskNotification = async (closeTime) => {
    const trigger = new Date(closeTime)
    if (apertureDate < closeTime) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'The valve is closed!',
            body: 'The risk is over!',
            sound: 'default',
          },
          trigger,
        })
        console.log('Notification was schedule')
      } catch (e) {
        console.error(e)
        alert('The notification failed, because the hour is not valid.')
      }
    } else {
      alert('Close time can´t be mayor than aperture time')
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Modal
        style={styles.modal}
        animationType='slide'
        transparent={true}
        visible={openModal}
      >
        <Animated.View
          style={[
            styles.modalContent,
            { transform: pan.getTranslateTransform() },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.title}>⏰ Update close time!</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 28,
              }}
            >
              <View style={{ width: '70%' }}>
                <Text style={{ fontSize: 19, fontWeight: '600' }}>
                  Select an aperture time:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: 'gray',
                    paddingLeft: 6,
                    marginTop: 4,
                  }}
                >
                  Make click in the square to open the Hour Picker. 👆
                </Text>
              </View>
              <DateTimePicker
                value={closeDate}
                mode={'time'}
                is24Hour={true}
                onChange={onChange}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 28,
                width: '100%',
              }}
            >
              <Text style={{ width: '82%', color: 'rgba(69, 69, 69, 1)' }}>
                Do you want to get a notification when the valve is closed?
              </Text>
              <Switch
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitch}
                value={withAlert}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 32,
              }}
            >
              <Text style={styles.selectedTime}>The close time will be: </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'rgba(97, 188, 132, 1)',
                }}
              >
                {closeDate.toLocaleTimeString()}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                updateCloseTime()
                setOpenModal(false)
              }}
              style={styles.update}
            >
              <Text style={styles.updateText}>Set Hour</Text>
            </Pressable>
            <Pressable
              style={styles.closeButton}
              onPress={() => setOpenModal(false)}
            >
              <FontAwesome6 name='xmark-circle' size={32} />
            </Pressable>
          </View>
        </Animated.View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(135, 135, 135, 1)',
  },
  modal: {
    backgroundColor: 'rgba(135, 135, 135, 1)',
    position: 'absolute',
  },
  modalContainer: {
    marginTop: 218,
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: 82,
    height: '100%',
    width: '100%',
    backgroundColor: '#ffff',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowRadius: 22,
    shadowOffset: 52,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 38,
    marginBottom: 10,
    fontWeight: '600',
  },
  datePicker: {
    width: '100%',
  },
  selectedTime: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(69, 69, 69, 1)',
  },
  update: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(92, 201, 140, 1)',
    marginTop: 52,
    borderRadius: 32,
  },
  updateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffff',
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 22,
    right: 22,
  },
})

export default CloseTimeModal
