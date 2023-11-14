import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Checkbox } from "react-native-paper";
import UserAvatar from "./UserAvatar";

const CardTarefa = ({ 
    tarefa, 
    checkboxDisabled, 
    checkboxStatus,
    onCheckboxChange,
    subtitle, 
    onCardPress, 

}) => {
    return (
        <View style={styles.filtros}>
        <Card style={styles.Cardcontainer} onPress={onCardPress}>
          <Card.Content style={styles.contentContainer}>
            <Checkbox
              disabled={checkboxDisabled}
              style={styles.iconCheck}
              status={checkboxStatus}
              onPress={onCheckboxChange}
            />
            <Card.Title
              title={tarefa?.titulo}
              subtitle={subtitle}
              subtitleNumberOfLines={3}
              style={styles.title}
            />
           
          </Card.Content>
          <View style={{ ...styles.iconContainer, paddingTop: 10, flexWrap: 'wrap' }}>
            {tarefa.usuarios.map((n) => <UserAvatar name={n.usuario?.nome || ''} />)}
          </View>
        </Card>
      </View>
    )
}

export default CardTarefa

const styles = StyleSheet.create({
    Cardcontainer: {
        width: '90%',
        paddingHorizontal: 16,
        paddingVertical: 0,
        borderRadius: 15,
        marginHorizontal: '5%',
        marginBottom: '5%',
        backgroundColor: 'white',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8,
        
    },
    iconCheck: {
        marginLeft: 16,
        marginRight: 10,
    },
    title: {
        flexDirection: 'row',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})