import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {colors, fontFamily} from '../constants';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import {
  CircleComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '.';
LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th 1',
    'Th 2',
    'Th 3',
    'Th 4',
    'Th 5',
    'Th 6',
    'Th 7',
    'Th 8',
    'Th 9',
    'Th 10',
    'Th 11',
    'Th 12',
  ],
  dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';
interface Props {
  selected: string;
  onSelect: (date: string) => void;
}
const CalendarComponent = (props: Props) => {
  const {onSelect, selected} = props;
  return (
    <>
      <Calendar
        showClosingKnob={false}
        theme={{
          todayBackgroundColor: colors.danger,
          todayTextColor: colors.white,
          textDayFontFamily: fontFamily.medium,
          textMonthFontFamily: fontFamily.medium,
          textDayFontSize: 14,
          textDayHeaderFontFamily: fontFamily.medium,
          'stylesheet.calendar.header': {
            dayTextAtIndex6: {
              color: 'red',
            },
          },
          ['stylesheet.day.basic']: {
            base: {
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
        }}
        renderArrow={direction =>
          direction === 'left' ? (
            <ArrowLeft2 color={colors.primary} size={22} variant="Bold" />
          ) : (
            <ArrowRight2 color={colors.primary} size={22} variant="Bold" />
          )
        }
        firstDay={1}
        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: colors.primary,
            selectedTextColor: colors.white,
          },
        }}
        onDayPress={date => onSelect(date.dateString)}
      />
      <SpaceComponent height={6} />
      <SectionComponent>
        <RowComponent align="center" gap={30}>
          <RowComponent align="center" gap={8}>
            <CircleComponent height={6} width={6} bgColor={colors.danger} />
            <TextComponent text={'Hôm nay'} size={13} />
          </RowComponent>
          <RowComponent align="center" gap={8}>
            <CircleComponent height={6} width={6} bgColor={colors.primary} />
            <TextComponent text={'Ngày chọn'} size={13} />
          </RowComponent>
        </RowComponent> 
      </SectionComponent>
    </>
  );
};

export default CalendarComponent;
