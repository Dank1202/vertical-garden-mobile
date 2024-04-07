import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { PieChart } from 'react-native-svg-charts'

class PieChartExample extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedSlice: {
        label: 'Onion',
        value: 15,
      },
      labelWidth: 0,
    }
  }
  render() {
    const { labelWidth, selectedSlice } = this.state
    const { label, value } = selectedSlice
    const keys = ['Onion', 'Tomato', 'Strawberry', 'Celery']
    const values = [15, 25, 35, 45, 55]
    const colors = [
      'rgba(77, 180, 116, 1)',
      'rgba(68, 160, 103, 1)',
      'rgba(97, 188, 132, 1)',
      'rgba(123, 199, 152, 1)',
    ]
    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: { fill: colors[index] },
        // arc: {
        //   outerRadius: 180 + values[index] + '%',
        //   padAngle: label === key ? 0.05 : 0,
        // },
        onPress: () =>
          this.setState({
            selectedSlice: { label: key, value: values[index] },
          }),
      }
    })
    const deviceWidth = Dimensions.get('window').width

    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'left',
          backgroundColor: '#ffff',
          borderRadius: 32,
          marginVertical: 18,
          paddingVertical: 18,
          shadowColor: 'gray',
          shadowOpacity: 0.2,
          shadowRadius: 12,
          shadowOffset: 22,
        }}
      >
        <View>
          <Text
            style={{
              marginLeft: 32,
              marginBottom: 12,
              fontSize: 22,
              fontWeight: '700',
              color: 'rgba(69, 69, 69, 1)',
            }}
          >
            Plants in the garden
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <PieChart
              style={{ height: 132 }}
              outerRadius={'100%'}
              innerRadius={'78%'}
              data={data}
            />
            <Text
              onLayout={({
                nativeEvent: {
                  layout: { width },
                },
              }) => {
                this.setState({ labelWidth: width })
              }}
              style={{
                position: 'absolute',
                top: 48,
                left: deviceWidth / 2 - labelWidth / 2 - 96,
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 14,
                color: 'rgba(105, 105, 105, 0.6)',
              }}
            >
              {`${label} \n ${value}%`}
            </Text>
          </View>
          <View style={{ width: 152 }}>
            {keys.map((item, index) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    height: 16,
                    width: 16,
                    borderRadius: 50,
                    backgroundColor: `${colors[index]}`,
                  }}
                ></View>
                <Text
                  style={{
                    marginLeft: 6,
                    fontWeight: '600',
                    color: 'rgba(105, 105, 105, 1)',
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    )
  }
}

export default PieChartExample
