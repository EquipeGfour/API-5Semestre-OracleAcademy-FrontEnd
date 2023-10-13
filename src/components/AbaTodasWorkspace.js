import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, Checkbox, IconButton, Text, Menu, Divider, Provider, Chip } from 'react-native-paper';
import BottomBarTarefasWork from './BottomBarTarefasWork';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdwnGenerico from './DropdownGenerico';
import UserAvatar from './UserAvatar';
import { getStorageItem } from "../functions/encryptedStorageFunctions";
import { addUserToTarefa, getTarefaById, getTarefas } from '../service/tarefa';
import { TextInput } from 'react-native-paper';
import { getUserByNameOrEmail } from '../service/usuario';


const verdeEscuro = '#346c68';

const colors = {
  verde: "#346c68",
  azul: "#4974a5",
  roxo: "#51336b",
  branco: "#ffffff"
};

const AbaTodasWorkspace = ({ _id }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalUserVisible, setModalUserVisible] = useState(false);
  const name = "Rafael Waltrick";
  const [nomeUsuario, setNomeUsuario] = useState("");
  const nomes = ["Rafael Waltrick", "Felipe Gabriel", "Rafael Waltrick", "Felipe Gabriel", "Rafael Waltrick", "Felipe Gabriel", "Rafael Waltrick", "Felipe Gabriel"]
  const [visible, setVisible] = React.useState(false);
  const [tarefas, setTarefas] = useState([]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setModalUserVisible(true);
  };

  const closeModalHandler = () => {
    setModalUserVisible(false);
  };


  const getPrioridadeTitle = (prioridade) => {
    if (prioridade === 1) {
      return "Urgente";
    }
    else if (prioridade === 2) {
      return "Alta";
    }
    else if (prioridade === 3) {
      return "Média";
    }
    else if (prioridade === 4) {
      return "Baixo";
    }
  }

  const buscarTarefasWorkspace = () => {
    console.log(_id)
    getTarefas(_id).then((res) => {
      setTarefas(res.data);
      console.log(res.data[1].usuarios)
    }).catch(error => {
      console.error('Erro', error.response)
    })
  }

  useEffect(() => {
    buscarTarefasWorkspace();
  }, [])

  const data = [
    { label: 'Completo', value: 1 },
    { label: 'Em Andamento', value: 2 },
    { label: 'Não Iniciado', value: 3 },
    { label: 'Atrasado', value: 4 },
    { label: 'Aguardando Validação', value: 5 },
  ];

  const toggleModal = (_id) => {
    getTarefaById(_id).then((res)=>{
      setModalVisible(!isModalVisible);
      setTarefaSelecionado(res.data)
    })
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const removerUsuario = (user) => {
    const novaLista = usuariosSelecionado.filter(u => u._id != user._id)
    setUsuariosSelecionado(novaLista)
  }

  const adicionarUsuario = (usuario) => {
    if (!usuariosSelecionado.some((u) => u._id === usuario._id)) {
      setUsuariosSelecionado([...usuariosSelecionado, usuario]);
    }
  };

  const adicionarTodosUsuariosATarefa = async () => {
    const token = await getStorageItem('token');

    const usuariosIds = usuariosSelecionado.map((usuario) => usuario['_id']);
    console.log(_id, titulo)
    addUserToTarefa(workspaceId, usuariosSelecionado);
    setUsuariosSelecionado([]);
  };


  const [userQuery, setUserQuery] = useState('')
  const [usuariosBusca, setUsuariosBusca] = useState([])
  const [usuariosSelecionado, setUsuariosSelecionado] = useState([])

  const buscaUsuario = async () => {
    const token = await getStorageItem('token');
    getUserByNameOrEmail(userQuery, token).then((res) => { setUsuariosBusca(res.data); console.log(res.data) })
  }

  const [tarefaSelecionada, setTarefaSelecionado] = useState(null)

  useEffect(() => {
    buscaUsuario()
  }, [userQuery])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setUserQuery(nomeUsuario)
    }, 500)
  }, [nomeUsuario])


  return (
    <>
      <ScrollView>
        {tarefas.map((tarefa) => (
          <View style={styles.filtros}>
            <Card style={styles.Cardcontainer} onPress={()=>toggleModal(tarefa._id)}>
              <Card.Content style={styles.contentContainer}>
                <Checkbox
                  style={styles.iconCheck}
                  onPress={() => {
                    // Coloque sua lógica para lidar com a seleção aqui
                  }}
                />
                <Card.Title
                  title={tarefa?.titulo}
                  subtitle={`Data Conclusão: ${tarefa.data_estimada}\nPrioridade: ${getPrioridadeTitle(tarefa.prioridade)}`}
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
              <View style={{ ...styles.iconContainer, paddingTop: 10, flexWrap: 'wrap' }}>
                {tarefa.usuarios.map((n) => <UserAvatar name={n.usuario.nome} />)}
              </View>
            </Card>
          </View>
        ))}

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
                  <Text style={styles.textoCheck}>{tarefaSelecionada?.titulo}</Text>
                </View>
                <View style={styles.iconContainerTittle}>

                  <Icon name="user-plus" style={styles.icons} color={'#51336b'} size={20} onPress={openModalHandler} />

                  <Modal visible={isModalUserVisible} transparent animationType="slide">
                    <TouchableWithoutFeedback onPress={closeModalHandler}>
                      <View style={styles.modalUserContainer}>
                        <TextInput
                          style={styles.modalText}
                          multiline={true}
                          placeholder='Digite o nome do usuário'
                          value={nomeUsuario}
                          onChangeText={(e) => setNomeUsuario(e)}
                          onSubmitEditing={adicionarUsuario} // Chama a função quando pressionar "Enter"
                        />
                        <FlatList
                          data={usuariosBusca}
                          renderItem={({ item }) => (
                            <TouchableOpacity style={styles.usuarioItem} onPress={() => adicionarUsuario(item)}>
                              <Text>{item.nome}</Text>
                            </TouchableOpacity>
                          )}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                          <Button title="Adicionar" onPress={adicionarTodosUsuariosATarefa} color={colors.roxo} />
                          <Button title="Fechar" onPress={closeModalHandler} color={colors.roxo} />
                        </View>
                        {usuariosSelecionado.map((user) => (
                          <Chip closeIcon={'window-close'} onClose={() => removerUsuario(user)}>
                            {user.nome}
                          </Chip>
                        ))}
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>

                  <Icon name="trash" style={styles.icons} size={20} marginLeft={10} color={'red'} onPress={() => deletarTarefa(tarefa.id)} />


                </View>
              </View>
              <View style={styles.espacamento}>
                <View style={styles.iconContainer}>
                  <Icon name="bars" size={20} style={styles.icon} />
                  <Text>{tarefaSelecionada?.descricao}</Text>
                </View>
              </View>
              <View style={styles.espacamento}>
                <View style={styles.iconContainer}>
                  <Icon name="clock" size={20} style={styles.icon} />
                  <Text>{tarefaSelecionada?.data_estimada}</Text>
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
                  <DropdwnGenerico data={data} label="Status" />
                </View>
              </View>
              <View style={styles.espacamento}>
                <View style={styles.iconContainer}>
                  <Text>Membros</Text>
                </View>
              </View>
              <View style={{ ...styles.iconContainer, paddingTop: 10, flexWrap: 'wrap' }}>
                {nomes.map((n) => <UserAvatar name={n} />)}
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
  modalUserContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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
  modalText: {
    mode: "flat",
    backgroundColor: "white",
    width: 200,
    marginBottom: 30
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
