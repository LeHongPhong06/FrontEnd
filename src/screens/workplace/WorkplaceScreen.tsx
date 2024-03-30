/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {categoryWorkpalce, colors, fontFamily} from '../../constants';
import TeacherList from './TeacherList';
import InfoWorkplace from './InfoWorkplace';

const WorkplaceScreen = () => {
  const [category, setCategory] = useState(1);
  const handleChangeCategory = (id: number) => {
    setCategory(id);
  };
  return (
    <ContainerComponent back title="Bộ môn">
      <SectionComponent>
        <RowComponent align="center" justify="center" gap={30}>
          {categoryWorkpalce.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleChangeCategory(item.id)}
              style={[
                styles.category,
                {
                  borderColor: category === item.id ? colors.primary : '',
                },
              ]}>
              <TextComponent
                text={item.title}
                color={category === item.id ? colors.primary : colors.text}
                size={15}
                font={fontFamily.semibold}
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
        {category === 1 && <TeacherList />}
        {category === 2 && <InfoWorkplace />}
      </SectionComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  category: {
    paddingBottom: 8,
  },
});
export default WorkplaceScreen;
