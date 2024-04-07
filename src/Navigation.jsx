import React, { useState, useRef, createContext, useContext } from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import Plants from './Screens/Plants'
import Historical from './Screens/Historical'
import Home from './Screens/Home'
import Risks from './Screens/Risks'
import Details from './Screens/Details'
import Configuration from './Screens/Configuration'

// icons
import { FontAwesome6 } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'

import { createStackNavigator } from '@react-navigation/stack'
import SliderStackScreen from './Components/SliderStackScreen'

// Stack navigation
const HomeSliderStack = createStackNavigator()

function SliderStack() {
  return (
    <HomeSliderStack.Navigator
      initialRouteName='HomeStack'
      screenOptions={{ headerShown: false }}
    >
      <HomeSliderStack.Screen name='HomeStack' component={Home} />
      <HomeSliderStack.Screen name='Slider' component={SliderStackScreen} />
      <HomeSliderStack.Screen name='Risks' component={Risks} />
      <HomeSliderStack.Screen name='About' component={Risks} />
    </HomeSliderStack.Navigator>
  )
}

// Crear el contenido personalizado para el drawer
function DrawerContent(props) {
  const navigation = useNavigation()
  const [activeScreen, setActiveScreen] = useState('Home')

  const CurtomDrawerItem = ({ name, component, icon }) => {
    const handlePress = () => {
      setActiveScreen(name) // Actualizar el estado con el nombre de la pantalla activa
      navigation.navigate(name)
    }

    return (
      <DrawerItem
        label={name}
        labelStyle={{
          fontSize: 16,
          fontWeight: '600',
          color: activeScreen === name ? 'white' : 'gray',
        }}
        onPress={() => {
          props.navigation.navigate(name)
          handlePress()
        }}
        icon={({ color, size }) => (
          <FontAwesome6
            name={icon}
            size={size}
            color={activeScreen === name ? 'white' : color}
            style={{ marginRight: -22 }}
          />
        )}
        style={{
          borderRadius: 18,
          paddingVertical: 6,
          paddingHorizontal: 8,
          backgroundColor:
            activeScreen === name ? 'rgba(92, 201, 140, 0.8)' : 'transparent',
        }}
      />
    )
  }

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(92, 201, 140, 1)',
            alignItems: 'center',
            marginBottom: 12,
            marginTop: -202,
            paddingTop: 202,
            paddingBottom: 52,
          }}
        >
          <View
            style={{
              width: 172,
              height: 172,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(193, 193, 193, 1)',
              borderRadius: 102,
            }}
          >
            <FontAwesome6
              name='user-large'
              size={102}
              color='white'
              backgroundColor='transparent'
              style={{}}
            />
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: '600', color: 'white' }}>
              Jonh Done
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: 'white',
                marginTop: 6,
              }}
            >
              Administrator
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: -32,
            paddingBottom: 22,
            paddingTop: 22,
            borderRadius: 22,
            shadowColor: 'gray',
            shadowOpacity: 1,
            shadowRadius: 12,
            shadowOffset: -22,
            height: '100%',
          }}
        >
          <CurtomDrawerItem name={'Home'} component={Home} icon={'house'} />
          <CurtomDrawerItem
            name={'Details'}
            component={Details}
            icon={'tree'}
          />
          <CurtomDrawerItem
            name={'Plants'}
            component={Plants}
            icon={'rectangle-list'}
          />
          <CurtomDrawerItem
            name={'Historical'}
            component={Historical}
            icon={'book-bookmark'}
          />
          <CurtomDrawerItem
            name={'Configuration'}
            component={Configuration}
            icon={'gear'}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

function CustomDrawerIcon() {
  const navigation = useNavigation()

  return (
    <Pressable
      style={{
        backgroundColor: 'rgba(224, 224, 224, 1)',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 50,
      }}
      onPress={() => navigation.toggleDrawer()}
    >
      <FontAwesome6 name='bars' size={24} color='rgba(45, 45, 45, 1)' />
    </Pressable>
  )
}

const CustomHeaderComponent = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
        paddingVertical: 0,
      }}
    >
      <CustomDrawerIcon />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Pressable
          style={{
            backgroundColor: 'rgba(224, 224, 224, 1)',
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}
        >
          <FontAwesome6 name='plus' size={24} color='rgba(45, 45, 45, 1)' />
        </Pressable>
        <Pressable
          style={{
            backgroundColor: 'rgba(224, 224, 224, 1)',
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 50,
            marginLeft: 8,
          }}
        >
          <FontAwesome6 name='user' size={24} color='rgba(45, 45, 45, 1)' />
        </Pressable>
      </View>
    </View>
  )
}

const Drawer = createDrawerNavigator()

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTintColor: 'black',
        headerTitleStyle: {
          // fontSize: 20,
        },
        headerTransparent: true,
        header: () => <CustomHeaderComponent />,
        headerShown: true,
        // headerLeft: () => <CustomDrawerIcon />,
      }}
    >
      <Drawer.Screen name='Home' component={SliderStack}></Drawer.Screen>
      <Drawer.Screen name='Details' component={Details}></Drawer.Screen>
      <Drawer.Screen name='Historical' component={Historical}></Drawer.Screen>
      <Drawer.Screen name='Plants' component={Plants}></Drawer.Screen>
      <Drawer.Screen
        name='Configuration'
        component={Configuration}
      ></Drawer.Screen>
    </Drawer.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <MyDrawer />
    </NavigationContainer>
  )
}
