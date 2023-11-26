import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Urgente', value: 1 },
    { label: 'Alta', value: 2 },
    { label: 'Média', value: 3 },
    { label: 'Baixo', value: 4 }
];

const DropDownPrioridadeTarefas = (props) => {
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

export default DropDownPrioridadeTarefas;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: -25,
        width: '100%',
    },
    dropdown: {
        height: 50,
        width: 325,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 3,
        paddingHorizontal: 8,
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