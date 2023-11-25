import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Urgente', value: 1 },
    { label: 'Alta', value: 2 },
    { label: 'Média', value: 3 },
    { label: 'Baixo', value: 4 }
];
const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#9BA5B7",
    vermelho: "#FF0000",
    rosa: "#FFC0CB", // Cor rosa personalizada
};

const PrioridadeTarefaWork = (props) => {
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
            // activeColor='pink' // (se quiser colocar cor quando seleciona o item)
            iconStyle={styles.iconStyle}
            data={data}
            
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Prioridade' : '...'}
            placeholderStyle={{color:'black'}}
            
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

export default PrioridadeTarefaWork;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
    },
    dropdown: {
        height: 50,
        width: '100%',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 3,
        paddingHorizontal: 8, //texto dentro
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: -20,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: colors.roxo
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black',
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