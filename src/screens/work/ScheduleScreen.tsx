import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  CalendarComponent,
  ContainerComponent,
  SectionComponent,
  SvgNotFoundComponent,
  TextComponent,
} from '../../components';

const ScheduleScreen = () => {
  const data: any = [];
  const [selected, setSelected] = useState('');
  return (
    <ContainerComponent title="Lịch làm việc" back styles={styles.container}>
      <SectionComponent>
        <CalendarComponent
          onSelect={date => setSelected(date)}
          selected={selected}
        />
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.wapperNotFound}>
              <SvgNotFoundComponent
                width={150}
                height={150}
                text={`Không có công việc nào trong ngày ${selected}`}
              />
            </View>
          }
          keyExtractor={({id}) => id}
          renderItem={({item}) => <TextComponent text={item?.title} />}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};
const styles = StyleSheet.create({
  container: {paddingTop: 0},
  wapperNotFound: {
    paddingTop: 42,
  },
});
export default ScheduleScreen;
