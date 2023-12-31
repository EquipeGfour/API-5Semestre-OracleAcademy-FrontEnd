import React, { useState } from 'react'
import { Text,StyleSheet,TouchableOpacity,View  } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/FontAwesome5';


const DataPickerDashboard = (props) =>{
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const formattedDate = date
    ? format(date, 'MM/yyyy', { locale: ptBR })
    : 'Selecione a data';

    const colors = {
        verde: "#51A8A2",
        azul: "#4974a5",
        roxo: "#51336b",
        branco: "#ffffff",
        cinza: "#9BA5B7",
        vermelho: "#FF0000",
        rosa: "#FFC0CB", // Cor rosa personalizada
    };

    return(
        <>
            <DatePicker
                modal
                open={open}
                date={props.selectedDate?new Date(props.selectedDate):new Date()}
                mode="date"
                title="Selecione a data"
                confirmText="Confirmar"
                cancelText="Fechar"
                locale="pt-BR"
                onConfirm={(dataFinal) => {
                    setOpen(false);
                    props.onSelectDate(dataFinal)
                    setDate(dataFinal); // Atualize a variável date com a data selecionada
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />      
            <TouchableOpacity onPress={() => setOpen(true)} style={[styles.container, { borderColor: 'grey' }]}>
            <View style={styles.container2}>
                <Text> Selecione o Período                      {formattedDate}</Text>
                <Icon name="calendar" size={20} color={colors.cinza} />
            </View>
            </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        marginLeft: "10%",
        marginTop: 17.5,
        width: "87%",
        padding: 13,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0.7,
        },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
});

export default DataPickerDashboard;