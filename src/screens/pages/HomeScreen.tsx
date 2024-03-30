import React from 'react';
import {
  ButtonTextComponent,
  ContainerComponent,
  PieChartComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants';
import {Filter} from 'iconsax-react-native';

const HomeScreen = () => {
  const data = [
    {
      name: 'Chưa hoàn thành',
      population: 12,
      color: colors.blue,
      legendFontColor: colors.text,
    },
    {
      name: 'Đã hoàn thành',
      population: 5,
      color: colors.green,
      legendFontColor: colors.text,
    },
    {
      name: 'Trễ hạn',
      population: 3,
      color: colors.danger,
      legendFontColor: colors.text,
    },
  ];
  return (
    <ContainerComponent>
      <SectionComponent>
        <RowComponent align="center">
          <TextComponent
            text={'Thống kê công việc'}
            color={colors.gray}
            size={13}
            flex={1}
          />
          <ButtonTextComponent
            title="Lọc"
            textColor={colors.white}
            styles={{padding: 6, borderRadius: 8}}
            onPress={() => {}}
            affix={<Filter size={16} color={colors.white} />}
          />
        </RowComponent>
        <SpaceComponent height={8} />
        <RowComponent justify="center">
          <PieChartComponent data={data} />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default HomeScreen;
