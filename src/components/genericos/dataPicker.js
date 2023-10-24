import React, { useState } from 'react'
import { Text,StyleSheet,TouchableOpacity,View  } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const formattedDate = date
  ? format(date, 'dd/MM/yyyy', { locale: ptBR })
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

  
  return (
    <>
      <DatePicker
        modal
        open={open}
        date={date}
        mode = 'date'
        title='Selecione a data'
        confirmText="Confirmar" 
        cancelText="Fechar" 
        locale='pt-BR'
        onConfirm={(date) => {
            setOpen(false)
            setDate(date)
        }}
        onCancel={() => {
            setOpen(false)
        }}
      />
        <TouchableOpacity onPress={() => setOpen(true)} style={[styles.container, { borderColor: 'black' }]}>
        <View style={styles.container2}>
            <Text>{formattedDate}</Text>
            <Icon name="calendar" size={20} color={colors.cinza} />
        </View>
        </TouchableOpacity>
    </>
  )
}

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
