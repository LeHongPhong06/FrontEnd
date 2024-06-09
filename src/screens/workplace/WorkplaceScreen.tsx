import {Add} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {globalStyles} from '../../assets';
import {
  ButtonTextComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {categoryWorkpalce, colors, screens} from '../../constants';
import {useAppSelector} from '../../hooks';
import InfoWorkplace from './InfoWorkplace';
import TeacherList from './TeacherList';

const WorkplaceScreen = ({navigation}: any) => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const isLeader = dataAuth.roleId === 'Leader';
  const [category, setCategory] = useState(1);
  const handleAddTeacher = () => {
    navigation.navigate(screens.ADDTEACHER_SCREEN);
  };
  return (
    <>
      <ContainerComponent back title="Bộ môn">
        <SectionComponent>
          <RowComponent
            align="center"
            justify="space-between"
            gap={6}
            styles={[styles.wapperSelect, globalStyles.shadow]}>
            {categoryWorkpalce.map(item => {
              const selected = item.id === category;
              return (
                <TextComponent
                  flex={1}
                  key={item.title}
                  text={item.title}
                  textAlign="center"
                  onPress={() => setCategory(item.id)}
                  styles={[
                    styles.itemSelect,
                    {
                      color: selected ? colors.white : colors.text,
                      backgroundColor: selected ? colors.primary : colors.gray6,
                    },
                  ]}
                />
              );
            })}
          </RowComponent>
          <SpaceComponent height={12} />
          {category === 1 && <TeacherList />}
          {category === 2 && <InfoWorkplace />}
        </SectionComponent>
      </ContainerComponent>
      {isLeader && category === 1 && (
        <ButtonTextComponent
          onPress={handleAddTeacher}
          title="Mời giảng viên"
          styles={styles.btnAdd}
          textColor={colors.white}
          affix={<Add size={18} color={colors.white} />}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    paddingBottom: 8,
  },
  btnAdd: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
    right: 16,
    left: 16,
  },
  wapperSelect: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.gray6,
  },
  itemSelect: {
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
export default WorkplaceScreen;
