import {requestToJoinApi} from '../../apis';
import {
  ButtonTextComponent,
  ContainerComponent,
  InputComponent,
  ModalLoading,
  RowComponent,
  SectionComponent,
  TextComponent,
  WorkplacePickerComponent,
} from '../../components';
import {colors} from '../../constants';
import {useAppSelector} from '../../hooks';
import {AlertError, ShowToast} from '../../utils';
import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

const JoinWorkplaceSreeen = () => {
  const {dataAuth} = useAppSelector(state => state.auth);
  const {userId} = dataAuth;
  const [workplaceId, setWorkplaceId] = useState('');
  const handleSubmit = useMutation({
    mutationKey: ['createRequestToJoin'],
    mutationFn: () =>
      requestToJoinApi.createRequest({petitioner: userId, workplaceId}),
    onSuccess: res => {
      if (res.success === true) {
        ShowToast('Gửi yêu cầu tham gia thành công');
      } else {
        AlertError(res.message);
      }
    },
  });
  return (
    <>
      <ContainerComponent back title="Tham gia bộ môn">
        <SectionComponent>
          <RowComponent direction="column" gap={12}>
            <TextComponent
              text={
                'Bạn chưa tham gia bộ môn. Hãy nhập mã bộ môn để yêu cầu tham gia'
              }
            />
            <WorkplacePickerComponent
              value={workplaceId}
              onSelect={val => setWorkplaceId(val)}
            />
          </RowComponent>
          <ButtonTextComponent
            textColor={colors.white}
            disable={!workplaceId}
            title={'Gửi yêu cầu'}
            styles={styles.btn}
            onPress={() => handleSubmit.mutate()}
          />
        </SectionComponent>
      </ContainerComponent>
      <ModalLoading isVisable={handleSubmit.isPending} />
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
  },
});
export default JoinWorkplaceSreeen;
