import {Input} from '@rneui/themed';
import React, {useRef, useState} from 'react';
import {useController} from 'react-hook-form';
import RNDatePicker from 'react-native-date-picker';

const DatePicker = props => {
  const {field} = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
    shouldUnregister: props.shouldUnregister,
  });
  const [open, setOpen] = useState(false);
  const input = useRef();

  return (
    <React.Fragment>
      <RNDatePicker
        modal
        open={open}
        date={field.value || new Date()}
        onConfirm={date => {
          setOpen(false);
          field.onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <Input
        {...props}
        onFocus={() => {
          setOpen(true);
          input.current.blur();
        }}
        ref={input}
        value={field.value && new Date(field.value).toLocaleDateString()}
        errorMessage={props.error}
        errorStyle={{...props.errorStyle, alignSelf: 'center'}}
      />
    </React.Fragment>
  );
};

export {DatePicker};
