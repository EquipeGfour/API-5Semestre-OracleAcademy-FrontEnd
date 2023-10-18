import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#9BA5B7",
    vermelho: "#FF0000",
    rosa: "#FFC0CB", // Cor rosa personalizada
};

const DataPicker = ({ selectedDate, onSelectDate }) => {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (event, date) => {
        if (date) {
            onSelectDate(date);
        }
        hideDatePicker();
    };

    return (
        <View>
            <TouchableOpacity onPress={showDatePicker} style={[styles.container, { borderColor: 'black' }]}>
                <View style={styles.container2}>
                    <Text>
                        {selectedDate ? selectedDate.toLocaleDateString() : "Selecione a data"}
                    </Text>
                    <Icon name="calendar" size={20} color={colors.cinza} />
                </View>
            </TouchableOpacity>

            {isDatePickerVisible && (
                <DateTimePicker
                    value={selectedDate}
                    format="DD-MM-YYYY"
                    mode="date"
                    display="default"
                    onChange={handleConfirm}
                    locale="pt-BR"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 325,
        padding: 13,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default DataPicker;
