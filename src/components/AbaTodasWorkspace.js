import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Checkbox, IconButton, Text } from 'react-native-paper';

const verdeEscuro = '#346c68';

const UserAvatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .substr(0, 2);

  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
};

const AbaTodasWorkspace = () => {
  const name = "Rafael Waltrick"; // Substitua pelo nome do inscrito

  return (
    <View style={styles.filtros}>
      <Card style={styles.Cardcontainer}>  
        
        <Card.Content style={styles.contentContainer}>
          <Checkbox
            style={styles.iconCheck}
            onPress={() => {
              // Coloque sua lógica para lidar com a seleção aqui
            }}
          />
        <Card.Title
          title="Tarefa"
          subtitle={`Data Conclusão: 22/11/2023\nMembros: ${name}\nPrioridade:Alta`}
          subtitleNumberOfLines={3}
          style={styles.title}
        />
        <Card.Actions style={styles.actionsContainer}>
          <IconButton
            icon="fire"
            onPress={() => {
              // Coloque sua lógica para lidar com o ícone de fogo aqui
            }}
          />
        </Card.Actions>
        </Card.Content>
        
        <UserAvatar name={name} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  filtros: {
    
  },
  Cardcontainer: {
    width: 370,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  // CardView:{
    // flexDirection: 'row'
  // },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 0,
  },
  title: {
    flexDirection: 'row',
    marginTop: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#51336b',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconCheck: {
    marginLeft: 16,
    marginRight: 10,
  },
});

export default AbaTodasWorkspace;
