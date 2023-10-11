import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  DataPikerIOS,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {TextInput, PaperProvider,DefaultTheme } from 'react-native-paper';
import DropdownComponent from './DropDownPrioridadeTarefas';
import BemVindo from '../pages/BemVindo';
import {postTarefa} from '../service/tarefa';
import Toast from 'react-native-toast-message';

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

const BottomBarTarefas = ({onIconPress, objetivo, criouTarefa}) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [text, setText] = React.useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [prioridade, setPrioridade] = useState('');

  const criarTarefa = () => {
    const data = {
      titulo: nome,
      descricao: descricao,
      data_estimada: dataFinal,
      prioridade: prioridade,
    };
    postTarefa(objetivo._id, data)
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
      <PaperProvider theme={theme}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalText}
            mode='outlined'
            label= 'Nome Tarefa'
            multiline={true}
            placeholder="Nome Tarefa"
            value={nome}
            onChangeText={e => setNome(e)}
          />
          <TextInput
            style={styles.modalText}
            mode='outlined'
            label='Descrição'
            multiline={true}
            placeholder="Descrição"
            value={descricao}
            onChangeText={e => setDescricao(e)}
          />
          <TextInput
            style={styles.modalText}
            mode='outlined'
            label='DD/MM/AAAA'
            multiline={true}
            placeholder="DD/MM/AAAA"
            value={dataFinal}
            onChangeText={e => setDataFinal(e)}
          />
          <DropdownComponent
            style={styles.modalText}
            prioridade={prioridade}
            setPrioridade={setPrioridade}
          />

        <View style={{marginTop: 20}}>         
            <TouchableOpacity onPress={criarTarefa} style={styles.botaoCriar}>
                <Text style={styles.buttonText}>Criar Objetivos</Text>
            </TouchableOpacity>
            {/* <Button title="Adicionar Objetivo" onPress={criarObjetivo} color = {colors.verde}/> */}
        </View>


          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              title="Adicionar"
              onPress={criarTarefa}
              color={verdeEscuro}
            />
          </View> */}
        </View>
        </PaperProvider>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex:1,
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
    fontWeight: 'bold'
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
    marginBottom: 30,
  },
});

export default BottomBarTarefas;
