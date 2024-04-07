import React from 'react'
import { View, Text } from 'react-native'
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const StackedAreaExample = ({ data, keys, chartName }) => {
  const colors = [
    'rgba(97, 188, 132, 1)',
    'rgba(123, 199, 152, 1)',
    'rgba(150, 210, 173, 1)',
    'rgba(176, 222, 194, 1)',
  ]
  const svgs = [
    { onPress: () => console.log('apples') },
    { onPress: () => console.log('bananas') },
    { onPress: () => console.log('cherries') },
    { onPress: () => console.log('dates') },
  ]

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'left',
        backgroundColor: '#ffff',
        marginTop: 22,
        borderRadius: 32,
        paddingTop: 22,
        paddingBottom: 8,
        paddingHorizontal: 18,
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: 22,
      }}
    >
      <Text
        style={{
          marginLeft: 0,
          marginBottom: 12,
          fontSize: 22,
          fontWeight: '700',
          color: 'rgba(69, 69, 69, 1)',
        }}
      >
        {chartName} Chart
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '60%',
          justifyContent: 'space-between',
          paddingVertical: 2,
        }}
      >
        <Text style={{ color: 'rgba(77, 180, 116, 1)', fontWeight: '600' }}>
          7 days
        </Text>
        <Text style={{ fontWeight: '600', color: 'rgba(160, 160, 160, 1)' }}>
          30 days
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        {console.log(data)}
        <StackedAreaChart
          style={{
            height: 98,
            width: '68%',
            paddingVertical: 16,
          }}
          showGrid={true}
          data={data}
          keys={keys}
          colors={colors}
          curve={shape.curveNatural}
          svgs={svgs}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'rgba(69, 69, 69, 1)',
            }}
          >
            Medium
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: 'rgba(69, 69, 69, 1)',
            }}
          >
            18°
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: 'rgba(106, 106, 106, 1)',
            }}
          >
            {chartName}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default StackedAreaExample
