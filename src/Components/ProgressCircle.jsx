import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts';

const ProgressCircleExample = () => {
  return (
    <ProgressCircle
      style={{ height: 200 }}
      strokeWidth={12}
      progress={0.8}
      progressColor={'rgba(150, 210, 173, 1)'}
    />
  );
};

export default ProgressCircleExample;
