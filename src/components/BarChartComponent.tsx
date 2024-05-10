import {colors} from '../constants';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
interface Props {
  data: any;
}
const BarChartComponent = (props: Props) => {
  //   const {data} = props;
  const data = {
    labels: ['T1', 'T2', 'T3'],
    datasets: [
      {
        data: [2, 5, 6],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo: colors.white,
    backgroundGradientToOpacity: 0.1,
    barPercentage: 0.6,
    color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
  };
  const screenWidth = Dimensions.get('window').width * 0.92;
  return (
    <View>
      <BarChart
        data={data}
        style={styles.chart}
        width={screenWidth}
        height={250}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        verticalLabelRotation={0}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  chart: {
    borderRadius: 12,
  },
});
export default BarChartComponent;
