import {CloseCircle, Eye, EyeSlash} from 'iconsax-react-native';
import React, {ReactNode, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {RowComponent, TextComponent} from '.';
import {globalStyles} from '../assets/styles/globalStyle';
import {colors} from '../constants';
interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  suffix?: ReactNode;
  placeholder?: string;
  isPassword?: boolean;
  allowClear?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  lable?: string;
  required?: boolean;
  onEnd?: () => void;
  style?: StyleProp<ViewStyle>;
}
const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    lable,
    affix,
    suffix,
    placeholder,
    isPassword,
    allowClear,
    onEnd,
    multiline,
    numberOfLines,
    style,
    required,
  } = props;
  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);
  const handlePressAllowClear = () => {
    onChange('');
  };
  const handlePressShowPass = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <View>
      {lable && (
        <RowComponent gap={8} align="center">
          {required && (
            <TextComponent text="*" size={18} color={colors.danger} />
          )}
          <TextComponent text={lable} size={14} styles={styles.lableInput} />
        </RowComponent>
      )}
      <View style={[globalStyles.inputContainer, style]}>
        {affix && affix}
        <TextInput
          style={[globalStyles.input]}
          placeholder={placeholder}
          placeholderTextColor={colors.gray5}
          multiline={multiline}
          value={value}
          onChangeText={val => onChange(val)}
          secureTextEntry={isShowPassword}
          autoCapitalize="none"
          numberOfLines={numberOfLines}
          onEndEditing={onEnd}
        />
        <RowComponent align="center" gap={6}>
          {isPassword && (
            <TouchableOpacity onPress={handlePressShowPass}>
              {!isShowPassword ? (
                <EyeSlash size={22} color={colors.gray5} />
              ) : (
                <Eye size={22} color={colors.gray5} />
              )}
            </TouchableOpacity>
          )}
          {allowClear && value.length > 0 && (
            <TouchableOpacity onPress={handlePressAllowClear}>
              <CloseCircle size={22} color={colors.gray5} />
            </TouchableOpacity>
          )}
        </RowComponent>
        {suffix && suffix}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  lableInput: {
    marginBottom: 10,
  },
});
export default InputComponent;
