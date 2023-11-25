import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { TextInput, PaperProvider, DefaultTheme } from 'react-native-paper';
import DropdownComponent from './DropDownPrioridadeTarefas';
import BemVindo from '../../../pages/BemVindo';
import { postTarefa } from '../../../service/tarefa';
import Toast from 'react-native-toast-message';
import DatePicker from '../../genericos/dataPicker';
import { getStorageItem } from '../../../functions/encryptedStorageFunctions';



const colors = {
  verde: "#51A8A2",
  azul: "#4974a5",
  roxo: "#51336b",
  branco: "#ffffff",
  cinza: "#9BA5B7"
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.verde, // Cor de foco
  },
};

const BottomBarTarefas = ({ onIconPress, objetivo, criouTarefa }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [text, setText] = React.useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataFinal, setDataFinal] = useState(new Date());
  const [prioridade, setPrioridade] = useState('');

  const criarTarefa = async () => {
    const data = {
      titulo: nome,
      descricao: descricao,
      data_estimada: dataFinal,
      prioridade: prioridade,
    };
    const token = await getStorageItem('token');
    postTarefa(objetivo._id, data, token)
      .then(res => {
        setNome('')
        setDescricao('')
        setDataFinal('')
        setPrioridade('')
        closeModal(false);
        if (criouTarefa) criouTarefa()
        navigation.navigate('Lista-tarefas', objetivo);
        Toast.show({
          type: 'success',
          text1: 'Tarefa Criada com sucesso!',
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Ocorreu algum problema...',
        });
        console.error('Erro', error.response);
      });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [choseDate, setChosenDate] = useState(new Date());

  const confirmButtonColor = 'pink'; // Change to the color you want
  const cancelButtonColor = 'red'; // Change to the color you want


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.icon}>
        <Icon name="home" size={30} color={colors.verde} />
      </TouchableOpacity>
      <TouchableOpacity onPress={openModal} style={styles.icon}>
        <Icon name="plus-circle" size={30} color={colors.verde} />
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => onIconPress('Login')}
        style={styles.icon}>
        <Icon name="chart-bar" size={30} color={colors.verde} />
      </TouchableOpacity> */}

      <Modal isVisible={isModalVisible} onBackdropPress={closeModal} style={styles.modal}>
        
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modalText}
              mode='outlined'
              label='Nome Tarefa'
              multiline={true}
              placeholder="Nome Tarefa"
              theme={theme}
              value={nome}
              onChangeText={e => setNome(e)}
            />
            <TextInput
              style={styles.modalText}
              mode='outlined'
              label='Descrição'
              multiline={true}
              placeholder="Descrição"
              theme={theme}
              value={descricao}
              onChangeText={e => setDescricao(e)}
            />
            <DatePicker
              theme={theme}
              selectedDate={dataFinal}
              onSelectDate={(date) => setDataFinal(date)}
              confirmButtonColor={confirmButtonColor}
              cancelButtonColor={cancelButtonColor}
              
            />
            <TouchableOpacity style = {styles.drop}>
            <DropdownComponent 
              theme={theme}
              style={styles.drop}
              prioridade={prioridade}
              setPrioridade={setPrioridade}
            />
            </TouchableOpacity>

            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={criarTarefa} style={styles.botaoCriar}>
                <Text style={styles.buttonText}>Criar Tarefa</Text>
              </TouchableOpacity>
            </View>
          </View>
        
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  drop:{
    paddingTop:20
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCriar: {
    width: 150,
    borderRadius: 20,
    backgroundColor: colors.verde,
    alignSelf: 'center', // Centraliza o botão horizontalmente
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  data: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  icon: {
    padding: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    mode: 'flat',
    backgroundColor: 'white',
    width: 325,
    marginBottom: 20,
  },
});

export default BottomBarTarefas;
