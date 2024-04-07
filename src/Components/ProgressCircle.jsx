import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'

class ProgressCircleExample extends React.PureComponent {
  render() {
    return (
      <ProgressCircle
        style={{ height: 200 }}
        strokeWidth={12}
        progress={0.8}
        progressColor={'rgba(150, 210, 173, 1)'}
      />
    )
  }
}

export default ProgressCircleExample
