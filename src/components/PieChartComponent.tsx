import {colors} from '../constants';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {ChartConfig} from 'react-native-chart-kit/dist/HelperTypes';
interface Prop {
  data: any;
}
const PieChartComponent = (props: Prop) => {
  const {data} = props;
  const screenWidth = Dimensions.get('window').width * 0.92;
  const chartConfig: ChartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.primary,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };
  return (
    <PieChart
      data={data}
      width={screenWidth}
      height={200}
      chartConfig={chartConfig}
      accessor={'population'}
      paddingLeft=""
      center={[8, 0]}
      style={styles.chart}
      backgroundColor={colors.white}
      absolute
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    borderRadius: 12,
    shadowColor: '#535353',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
});
export default PieChartComponent;
