import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

function CareManagement({ name, description, icon }) {
  return (
    <View style={styles.fastView}>
      <View>
        <Text style={styles.fastViewTitle}>{name}</Text>
        <Text style={styles.fastViewText}>{description}</Text>
      </View>

      <View style={styles.numberContainer}>
        <Feather name={`${icon}`} size={24} color='black' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fastView: {
    backgroundColor: '#C0E7D0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 6,
    shadowColor: 'gray',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 22,
    },
  },
  fastViewTitle: {
    color: 'grey',
    fontSize: 22,
    marginVertical: 1,
    fontWeight: '700',
    marginBottom: 4,
  },
  fastViewText: {
    color: 'rgba(0, 0, 0, 0.32)',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '700',
    paddingLeft: 0,
  },
  numberContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 68,
    height: 68,
    borderRadius: 50,
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

export default CareManagement
