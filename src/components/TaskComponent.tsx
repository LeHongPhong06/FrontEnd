import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {Add, CloseSquare, Edit} from 'iconsax-react-native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ButtonTextComponent, RowComponent, TextComponent} from '.';
import {globalStyles} from '../assets/styles/globalStyle';
import {colors, screens} from '../constants';
import {useAppDispatch} from '../hooks/useRedux';
import {deteleTask} from '../redux/silces/taskSlice';
import {TaskType} from '../types';

interface Props {
  value: TaskType[];
  userIdList: string[];
  label?: string;
  required?: boolean;
}
const TaskComponent = (props: Props) => {
  const {label, required, userIdList, value} = props;
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const handleAddTask = () => {
    navigation.navigate(screens.ADDTASK_SCREEN, {
      userIdList,
    });
  };
  const handleEditTask = (dataTask: TaskType) => {
    navigation.navigate(screens.EDITTASK_SCREEN, {
      dataTask: {
        ...dataTask,
        startDate: dataTask.startDate.toString(),
        endDate: dataTask.endDate.toString(),
      },
      userIdList,
    });
  };
  const handleDeleteTask = (taskId: string) => {
    dispatch(deteleTask(taskId));
  };
  return (
    <View>
      <RowComponent align="center" justify="space-between">
        {label && (
          <RowComponent gap={8} align="center">
            {required && (
              <TextComponent text="*" size={18} color={colors.danger} />
            )}
            <TextComponent text={label} size={14} styles={styles.label} />
          </RowComponent>
        )}
        {value.length > 0 && (
          <TouchableOpacity style={styles.btnAddTask} onPress={handleAddTask}>
            <Add size={17} color={colors.white} />
          </TouchableOpacity>
        )}
      </RowComponent>
      {value.length > 0 ? (
        <RowComponent styles={styles.wapperItem} gap={8}>
          {value.map((item: TaskType) => (
            <RowComponent
              key={item.taskId}
              styles={styles.item}
              flex={1}
              direction="column">
              <RowComponent direction="column">
                <TextComponent text={item.title} numberOfLines={1} />
                <TextComponent text={item.description} numberOfLines={1} />
                <TextComponent
                  text={`${format(item.startDate, 'dd/MM/yyyy')} - ${format(
                    item.endDate,
                    'dd/MM/yyyy',
                  )}`}
                  numberOfLines={1}
                />
              </RowComponent>
              <RowComponent gap={4}>
                <ButtonTextComponent
                  affix={<Edit color={colors.primary} size={12} />}
                  onPress={() => handleEditTask(item)}
                  styles={styles.btnEdit}
                  textColor={colors.primary}
                  bgColor={colors.white}
                />
                <CloseSquare
                  size={24}
                  color={colors.danger}
                  onPress={() => handleDeleteTask(item.taskId)}
                />
              </RowComponent>
            </RowComponent>
          ))}
        </RowComponent>
      ) : (
        <RowComponent
          styles={[globalStyles.inputContainer]}
          onPress={() => {
            if (value.length === 0) {
              handleAddTask();
            }
          }}>
          <RowComponent align="center">
            <TextComponent text="Chọn để tạo" color={colors.gray5} flex={1} />
            <Add size={22} color={colors.gray5} />
          </RowComponent>
        </RowComponent>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  btnAddTask: {
    marginBottom: 8,
    padding: 6,
    marginRight: 3,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  label: {
    marginBottom: 10,
  },
  wapperItem: {
    flexWrap: 'wrap',
    marginBottom: 16,
    padding: 4,
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray5,
  },
  btnEdit: {
    borderRadius: 6,
    padding: 4,
  },
});
export default TaskComponent;
