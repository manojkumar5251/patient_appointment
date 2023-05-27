import React from 'react';
import {useController} from 'react-hook-form';
import {Input} from '@rneui/themed';

const TextInput = props => {
  const {field} = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
    shouldUnregister: props.shouldUnregister,
  });

  return (
    <Input
      {...props}
      value={field.value}
      onChangeText={field.onChange}
      errorMessage={props.error}
      errorStyle={{...props.errorStyle, alignSelf: 'center'}}
      onBlur={() => {
        field.onBlur();
        props.onBlur?.();
      }}
    />
  );
};

export {TextInput};
