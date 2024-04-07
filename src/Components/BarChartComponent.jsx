import React from 'react'
import { View, Text } from 'react-native'
import { BarChart, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'

const BarChartComponent = () => {
  const data = [80, 30, 54, 86]
  const dates = ['11/22', '12/22', '13/22', '14/22']
  return (
    <View
      style={{
        backgroundColor: '#ffff',
        marginTop: 22,
        borderRadius: 32,
        paddingTop: 22,
        paddingBottom: 18,
        paddingHorizontal: 18,
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: 22,
      }}
    >
      <Text
        style={{
          color: 'rgba(69, 69, 69, 1)',
          fontSize: 20,
          fontWeight: '700',
          marginBottom: 10,
        }}
      >
        Average per day
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 18,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'rgba(69, 69, 69, 1)',
              fontSize: 28,
              fontWeight: '600',
            }}
          >
            10Lts
          </Text>
          <Text
            style={{
              color: 'rgba(69, 69, 69, 1)',
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            Spend Water
          </Text>
        </View>
        <View style={{ width: '60%' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 2,
            }}
          >
            <Text style={{ color: 'rgba(77, 180, 116, 1)', fontWeight: '600' }}>
              7 days
            </Text>
            <Text
              style={{ fontWeight: '600', color: 'rgba(160, 160, 160, 1)' }}
            >
              30 days
            </Text>
          </View>
          <BarChart
            style={{ height: 82 }}
            data={data}
            gridMin={0}
            svg={{ fill: 'rgba(123, 199, 152, 1)' }}
            contentInset={{ top: 10, bottom: 8 }}
          />
          {/* <XAxis
            style={{ marginTop: 4 }}
            data={dates}
            formatLabel={(value, index) => dates[index]}
            svg={{
              fontSize: 12,
              fill: 'rgba(160, 160, 160, 1)',
              fontWeight: '700',
            }}
            contentInset={{ left: 28, right: 28 }}
          /> */}
        </View>
      </View>
    </View>
  )
}

export default BarChartComponent
