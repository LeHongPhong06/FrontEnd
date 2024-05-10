/* eslint-disable react/no-unstable-nested-components */
import {
  AvatarComponent,
  ButtonTextComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {colors, fontFamily} from '../../constants';
import {useAppSelector} from '../../hooks';
import {CommentType} from '../../types';
import {ShowToast, socket} from '../../utils';
import {format} from 'date-fns';
import {vi} from 'date-fns/locale/vi';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, FlatList, StyleSheet, View} from 'react-native';

const DiscussScreen = ({route}: any) => {
  const {data} = route.params;
  const flatListRef = useRef<FlatList>(null);
  const {dataAuth} = useAppSelector(state => state.auth);
  const [conentComment, setContentComment] = useState('');
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  useEffect(() => {
    const dataCmt: CommentType[] = [...commentList];
    socket.on('newComment', (response: CommentType) => {
      dataCmt.unshift(response);
      setCommentList(dataCmt);
      flatListRef.current?.scrollToIndex({index: 0});
    });
    socket.on('getComment', (response: CommentType[]) => {
      setCommentList(response);
    });
    socket.on('commentDeleted', (response: CommentType) => {
      const index = dataCmt.findIndex(
        item => item.commentId === response.commentId,
      );
      if (index !== -1) {
        dataCmt.splice(index, 1);
        setCommentList(dataCmt);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentList, socket]);
  useEffect(() => {
    socket.emit('joinProject', data.projectId);
    socket.emit('getCommentByProjectId', data.projectId);
  }, [data]);
  if (!data) {
    return null;
  }
  const handleSendCmt = () => {
    setContentComment('');
    socket.emit('createComment', {
      content: conentComment,
      createById: dataAuth.userId,
      projectId: data.projectId,
    });
  };

  const handleDeleteComment = (commentId: string | undefined) => {
    if (commentId) {
      Alert.alert('Xác nhận', 'Bạn có muốn xóa lời thảo luận của mình ?', [
        {text: 'Đóng', style: 'cancel'},
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () =>
            socket.emit(
              'deleteComment',
              {
                commentId,
                projectId: data.projectId,
              },
              () => ShowToast('Xóa thành công'),
            ),
        },
      ]);
    }
  };
  return (
    <ContainerComponent back title="Thảo luận" styles={styles.container}>
      <SectionComponent>
        <FlatList
          inverted
          ref={flatListRef}
          data={commentList}
          showsVerticalScrollIndicator={false}
          keyExtractor={({commentId}) => String(commentId)}
          ItemSeparatorComponent={() => <SpaceComponent height={16} />}
          renderItem={({item}) => {
            const isMeCmt = dataAuth.userId === item.user.userId;
            const createAt = format(item.createAt, 'HH:mm:ss dd/MM/yyyy', {
              locale: vi,
            });
            return (
              <RowComponent
                key={item.commentId}
                justify={isMeCmt ? 'flex-end' : 'flex-start'}>
                <RowComponent
                  gap={8}
                  direction={isMeCmt ? 'row' : 'row-reverse'}>
                  <RowComponent
                    gap={6}
                    styles={[
                      styles.wapperContentComment,
                      {
                        backgroundColor: isMeCmt
                          ? colors.primary
                          : colors.white,
                      },
                    ]}
                    align={isMeCmt ? 'flex-end' : 'flex-start'}
                    direction="column">
                    <TextComponent
                      size={15}
                      font={fontFamily.semibold}
                      text={item.user.fullName}
                      color={isMeCmt ? colors.white : colors.text}
                    />
                    <TextComponent
                      text={item.content}
                      color={isMeCmt ? colors.white : colors.text}
                    />
                    <TextComponent
                      text={createAt}
                      italic
                      size={10}
                      color={isMeCmt ? colors.white : colors.gray}
                    />
                    {isMeCmt && (
                      <TextComponent
                        color={colors.white}
                        text={'Xóa'}
                        onPress={() => handleDeleteComment(item.commentId)}
                      />
                    )}
                  </RowComponent>
                  <AvatarComponent url={item.user.avatar} size={35} />
                </RowComponent>
              </RowComponent>
            );
          }}
        />
      </SectionComponent>
      <View style={styles.input}>
        <InputComponent
          allowClear
          placeholder="Suy nghĩ của bạn..."
          numberOfLines={1}
          affix={<AvatarComponent url={dataAuth.avatar} size={35} />}
          suffix={
            conentComment.length > 0 && (
              <ButtonTextComponent
                title={'Gửi'}
                onPress={handleSendCmt}
                styles={styles.btnSendCmt}
                textColor={colors.white}
              />
            )
          }
          value={conentComment}
          onChange={val => setContentComment(val)}
        />
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
  },
  wapperContentComment: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: colors.primary,
    maxWidth: Dimensions.get('window').width * 0.6,
  },
  input: {
    left: 8,
    right: 8,
    bottom: -10,
    position: 'absolute',
  },
  btnSendCmt: {
    borderRadius: 8,
    padding: 6,
    marginLeft: 6,
  },
});
export default DiscussScreen;
