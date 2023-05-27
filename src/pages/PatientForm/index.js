import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, withTheme, Header} from '@rneui/themed';
import {useForm} from 'react-hook-form';
import {TextInput, FileUpload, CheckBoxes, DatePicker} from '../../components';
import {localNotification, sendEmail} from '../../utils';

const PatientForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    sendEmail(data).then(() => {
      localNotification({
        title: 'Confirmation',
        message: 'Your appointment with the doctor has been confirmed',
      });
    });
  };

  return (
    <View style={styles.contentView}>
      <Header
        containerStyle={{marginBottom: 10}}
        centerComponent={{
          text: 'Registration Form',
          style: {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        }}
      />

      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}}>
        <TextInput
          control={control}
          name="name"
          label="Patient Name"
          placeholder="Name"
          rules={{required: 'Name is required'}}
          error={errors.name && errors.name.message}
        />

        <TextInput
          control={control}
          name="age"
          label="Patient Age"
          placeholder="Age"
          rules={{required: 'Age is required'}}
          error={errors.age && errors.age.message}
        />

        <Text style={styles.label}>Patient Gender</Text>

        <CheckBoxes
          style={{flexDirection: 'row'}}
          control={control}
          name="gender"
          rules={{required: 'Gender is required'}}
          error={errors.gender && errors.gender.message}
          items={[
            {
              title: 'Male',
              value: 'male',
              checkedIcon: 'dot-circle-o',
              uncheckedIcon: 'circle-o',
            },
            {
              title: 'Female',
              value: 'female',
              checkedIcon: 'dot-circle-o',
              uncheckedIcon: 'circle-o',
            },
          ]}
        />

        <TextInput
          control={control}
          name="description"
          label="Please describe the problem"
          placeholder="Patient problem"
          multiline
          inputStyle={styles.textArea}
          inputContainerStyle={{borderBottomWidth: 0, marginTop: 6}}
          rules={{required: 'Problem description is required'}}
          error={errors.description && errors.description.message}
        />

        <DatePicker
          control={control}
          name="appointment_date"
          label="Appointment Date"
          placeholder="Date"
          rules={{required: 'Date is required'}}
          error={errors.appointment_date && errors.appointment_date.message}
        />

        <Text style={styles.label}>Upload past prescription/reports</Text>
        <FileUpload
          allowMultiSelection
          control={control}
          name="patientFiles"
          text="Upload Support Documents (.pdf, jpg, png)"
          style={styles.fileUpload}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Reset"
            type="outline"
            containerStyle={{flex: 1}}
            onPress={() => reset()}
          />

          <Button
            color="success"
            title="Submit"
            containerStyle={{flex: 1}}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(134, 147, 158)',
  },
  textArea: {
    minHeight: 100,
    maxHeight: 200,
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 5,
    borderColor: 'rgb(134, 147, 158)',
  },
  fileUpload: {
    minHeight: 100,
    marginTop: 6,
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 5,
    borderColor: 'rgb(134, 147, 158)',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    gap: 30,
  },
});

const PatientFormScreen = withTheme(PatientForm, '');

export {PatientFormScreen};
