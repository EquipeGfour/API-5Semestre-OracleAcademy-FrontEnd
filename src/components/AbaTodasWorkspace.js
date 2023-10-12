import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { Card, Checkbox, IconButton, Text, Button } from 'react-native-paper';
import BottomBarTarefasWork from './BottomBarTarefasWork';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdwnGenerico from './DropdownGenerico';
import UserAvatar from './UserAvatar';

const verdeEscuro = '#346c68';

const AbaTodasWorkspace = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const name = "Rafael Waltrick"; // Substitua pelo nome do inscrito
  const nomes = ["Rafael Waltrick", "Felipe Gabriel","Rafael Waltrick", "Felipe Gabriel", "Rafael Waltrick", "Felipe Gabriel", "Rafael Waltrick", "Felipe Gabriel"]
  const [visible, setVisible] = React.useState(false);
  const openModal = () => setVisible(true);

  const data = [
    { label: 'Completo', value: 1 },
    { label: 'Em Andamento', value: 2 },
    { label: 'Não Iniciado', value: 3 },
    { label: 'Atrasado', value: 4 },
    { label: 'Aguardando Validação', value: 5 },
];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.filtros}>
          <Card style={styles.Cardcontainer} onPress={toggleModal}>
            <Card.Content style={styles.contentContainer}>
              <Checkbox
                style={styles.iconCheck}
                onPress={() => {
                  // Coloque sua lógica para lidar com a seleção aqui
                }}
              />
              <Card.Title
                title="Palestin"
                subtitle={`Data Conclusão: 22/11/2023\nMembros: ${name}\nPrioridade: Alta`}
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
            <View style={{...styles.iconContainer, paddingTop: 10, flexWrap: 'wrap'}}>
            {nomes.map((n)=> <UserAvatar name={n} />)}
            </View>
          </Card>
        </View>
      </ScrollView>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.iconContainer} >
                  <Checkbox
                    onPress={() => {
                      // Lógica para a seleção
                    }}
                  />
                  <Text style={styles.textoCheck}>titulo</Text>
                </View>
                <View style={styles.iconContainerTittle}>

                  <Icon name="user-plus" style={styles.icons} color={'#51336b'} size={20} onPress={openModal} />
                  <Icon name="trash" style={styles.icons} size={20} marginLeft={10} color={'red'} onPress={() => deletarTarefa(tarefa.id)} />

                </View>
              </View>
              <View style={styles.espacamento}>
                <View style={styles.iconContainer}>
                  <Icon name="bars" size={20} style={styles.icon} />
                  <Text>descrição</Text>
                </View>
              </View>
              <View style={styles.espacamento}>
                <View style={styles.iconContainer}>
                  <Icon name="clock" size={20} style={styles.icon} />
                  <Text>11/07/1992</Text>
                </View>
              </View>
              <View style={styles.espacamento}>
                <View style={styles.iconContainer}>
                  <Icon name="flag" size={20} style={styles.icon} />
                  <Text>alta</Text>
                </View>
              </View>
              <View style={styles.espacamento}>
                <View style={styles.iconContainer}>
                  <DropdwnGenerico data= {data} label= "Status"/>
                </View>
              </View>
              <View style={styles.espacamento}>
                <View style={styles.iconContainer}>
                    <Text>Membros</Text>
                </View> 
              </View>
                <View style={{...styles.iconContainer, paddingTop: 10, flexWrap: 'wrap'}}>
                  {nomes.map((n)=> <UserAvatar name={n} />)}                  
                </View>   
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 20,
    elevation: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  espacamento: {
    marginTop: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  textoCheck: {
    marginRight: '50%',
  },
  iconContainerTittle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    padding: 5,
    textAlign: 'right',
    /* borderColor: 'red',
    borderWidth: 1,
    borderStyle: "solid", */
  },
  filtros: {
    // Estilização para seus filtros, se necessário
  },
  Cardcontainer: {
    width: 370,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
    marginHorizontal: '5%',
    marginTop: '5%',
    backgroundColor: 'white',
  },
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
  iconCheck: {
    marginLeft: 16,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AbaTodasWorkspace;
