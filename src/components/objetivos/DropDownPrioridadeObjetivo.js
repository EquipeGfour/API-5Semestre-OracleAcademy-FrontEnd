import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

  const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#9BA5B7"
  };

  const data = [
    { label: 'Alta', value: 2 },
    { label: 'Média', value: 3 },
    { label: 'Baixa', value: 4 }
  ];

  const DropDownPrioridadeObjetivo = (props) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={styles.label}>
            Prioridade
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={styles.dropdown }
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          // activeColor='pink' (se quiser colocar cor quando seleciona o item)
          iconStyle={styles.iconStyle}
          data={data}
          
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Prioridade' : '...'}
          
          value={props.prioridade}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            props.setPrioridade(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  export default DropDownPrioridadeObjetivo;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      width: 325,
      marginTop: 10
    },
    dropdown: {
      height: 50,
      width: 325,
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 3,
      paddingHorizontal: 10,
      marginStart: -15.5
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
      
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });