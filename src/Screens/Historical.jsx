import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Constants from 'expo-constants'

// Chart components
import StackedAreaExample from '../Components/StackedAreaChart'
import ProgressCircleExample from '../Components/ProgressCircle'
import PieChartExample from '../Components/PieChart'
import BarChartComponent from '../Components/BarChartComponent'

class Historical extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          month: new Date(2015, 0, 1),
          apples: 1840,
        },
        {
          month: new Date(2015, 1, 1),
          apples: 1600,
        },
        {
          month: new Date(2015, 2, 1),
          apples: 640,
        },
        {
          month: new Date(2015, 3, 1),
          apples: 1620,
        },
      ],
      keys: ['apples'],
      chartNames: ['Temperature', 'Floor Humidity', 'Humidity Chart', 'Co2'],
    }
  }

  render() {
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
            data={this.state.data}
            keys={this.state.keys}
            chartName={this.state.chartNames[0]}
          />
          <BarChartComponent />
          <StackedAreaExample
            data={this.state.data}
            keys={this.state.keys}
            chartName={this.state.chartNames[1]}
          />
          <StackedAreaExample
            data={this.state.data}
            keys={this.state.keys}
            chartName={this.state.chartNames[2]}
          />
          <StackedAreaExample
            data={this.state.data}
            keys={this.state.keys}
            chartName={this.state.chartNames[3]}
          />
        </View>
        <View style={{ marginTop: 22, paddingRight: 18, marginBottom: 132 }}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            Progress Circle
          </Text>
          <ProgressCircleExample />
        </View>
      </ScrollView>
    )
  }
}

export default Historical
