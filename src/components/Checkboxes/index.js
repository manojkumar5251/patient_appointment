import React from 'react';
import {CheckBox, Text} from '@rneui/themed';
import {useController} from 'react-hook-form';
import {View} from 'react-native';

const CheckBoxes = ({items = [], ...props}) => {
  const {field} = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
    shouldUnregister: props.shouldUnregister,
  });

  return (
    <View>
      <View style={{...props.style}}>
        {items.map(el => (
          <CheckBox
            {...el}
            key={el.value}
            checked={field.value === el.value}
            onPress={() => {
              field.onChange(el.value);
            }}
          />
        ))}
      </View>

      {props.error && (
        <React.Fragment>
          <View style={{height: 5}} />
          <Text
            style={{
              position: 'absolute',
              bottom: 5,
              right: 0,
              left: 0,
              color: 'red',
              fontSize: 12,
              textAlign: 'center',
            }}>
            {props.error || 'This field required'}
          </Text>
        </React.Fragment>
      )}
    </View>
  );
};

export {CheckBoxes};
