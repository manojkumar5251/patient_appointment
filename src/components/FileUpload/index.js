import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {useController} from 'react-hook-form';
import RNFS from 'react-native-fs';

const FileUpload = props => {
  const {field} = useController({
    control: props.control,
    defaultValue: props.defaultValue || [],
    name: props.name,
    rules: props.rules,
  });

  const readFile = filePath => {
    try {
      return RNFS.readFile(filePath, 'base64');
    } catch (e) {
      // eslint-disable-line no-console
      console.log(e);
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: props.allowMultiSelection,
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      field.onChange(res.map(onDocSelection));
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const onDocSelection = async res => {
    const data = {fileContent: '', fileName: ''};

    // RNFB.fs.stat(res.uri).then(r => console.log('manoj', r));
    try {
      if (Platform.OS === 'ios') {
        const split = res.uri.split('/');
        const name = split.pop();
        const inbox = split.pop();
        const realPath = `file://${
          RNFS.TemporaryDirectoryPath
        }/${inbox}/${decodeURI(name)}`;
        await readFile(realPath)
          .then(string => {
            data.fileContent = string;
            data.fileName = res.name;
          })
          .catch(err => {
            alert(err.message);
          });
      } else {
        await readFile(res.uri)
          .then(string => {
            data.fileContent = string;
            data.fileName = res.name;
          })
          .catch(err => {
            alert(err.message);
          });
      }

      return data;
    } catch (e) {
      console.log(e);
      alert('An unexpected error has occured.'); // eslint-disable-line no-console
      return data;
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.container, props.style]}
        onPress={selectFile}>
        <Text style={[styles.textStyle, props.textStyle]}>
          {field.value.length} file(s) selected{'\n'} {props.text}
        </Text>
      </TouchableOpacity>

      {props.error && (
        <React.Fragment>
          <View style={{height: 20}} />
          <Text style={styles.errorText}>
            {props.error || 'This field required'}
          </Text>
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
  },
  errorText: {
    position: 'absolute',
    bottom: 0,
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
  },
});

export {FileUpload};
