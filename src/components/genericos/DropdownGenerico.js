import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdwnGenerico = (props) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const renderLabel = () => {
        return (
            <Text style={styles.label}>
                {props.label}
            </Text>
        );
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
                data={props.data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Selecione' : '...'}                
                value={props.status}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setIsFocus(false);
                    props.setStatus(item.value)
                }}
            />
        </View>
    );
}

export default DropdwnGenerico;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    dropdown: {
        height: 50,
        width: 325,
        borderColor: 'black',
        borderWidth: 0.7,
        borderRadius: 5,
        paddingHorizontal: 8, //texto dentro
    },
    icon: {
        marginRight: 5,
    },
    label: {
        backgroundColor: 'white',
        fontSize: 14,
        fontWeight: 'bold'
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
