import React from 'react'
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class StackedAreaExample extends React.PureComponent {
  render() {
    const { data, keys } = this.props

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
      <StackedAreaChart
        style={{ height: 162, width: 300, paddingVertical: 16 }}
        yAccessor={(item) => item}
        showGrid={true}
        data={data}
        keys={keys}
        colors={colors}
        curve={shape.curveNatural}
        svgs={svgs}
      />
    )
  }
}

export default StackedAreaExample
