import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';


const FileUpload = ({ onFileSelected }) => {
  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (onFileSelected) {
        onFileSelected(result);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Usuário cancelou a seleção de arquivo
      } else {
        throw err;
      }
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleFileSelect}>
      <Icon name="file" style={styles.icons} size={20} />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    backgroundColor: '#51A8A2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FileUpload;
