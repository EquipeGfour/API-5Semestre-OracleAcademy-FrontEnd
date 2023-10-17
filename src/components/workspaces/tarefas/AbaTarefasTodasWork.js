import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, Checkbox, IconButton, Text, Menu, Divider, Provider, Chip } from 'react-native-paper';
import BottomBarTarefasWork from './BottomBarTarefasWork';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdwnGenerico from '../../genericos/DropdownGenerico';
import UserAvatar from '../../genericos/UserAvatar';
import { getStorageItem } from "../../../functions/encryptedStorageFunctions";
import { addUserToTarefa, deleteTarefa, getTarefaById, getTarefas } from '../../../service/tarefa';
import { TextInput } from 'react-native-paper';
import { getUserByNameOrEmail } from '../../../service/usuario';
import Toast from 'react-native-toast-message';


const verdeEscuro = '#346c68';

const colors = {
  verde: "#346c68",
  azul: "#4974a5",
  roxo: "#51336b",
  branco: "#ffffff"
};

const AbaTarefasTodasWorkspace = ({ _id, workspaceUsuarios }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalUserVisible, setModalUserVisible] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState("");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setModalUserVisible(true);
  };

  const closeModalHandler = () => {
    setModalUserVisible(false);
    setUsuariosSelecionado([])
    setUsuariosBusca([])
    
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
    getTarefas(_id).then((res) => {
      setTarefas(res.data);
    }).catch(error => {
      console.error('Erro', error)
    })
  }

  const deletarTarefaWorkspace = (id) =>{
    deleteTarefa(id).then(res => {
        Toast.show({
            type: 'success',
            text1: 'Tarefa excluida com sucesso!',
        });
        buscarTarefasWorkspace()
        setModalVisible(false);
    }).catch(error => {
        Toast.show({
            type: 'error',
            text1: 'Ocorreu algum problema...',
        });
        console.error('Erro', error.response);
        console.log(id);
    })
}

  useEffect(() => {
    buscarTarefasWorkspace();
  }, [tarefas])

  const data = [
    { label: 'Completo', value: 1 },
    { label: 'Em Andamento', value: 2 },
    { label: 'Não Iniciado', value: 3 },
    { label: 'Atrasado', value: 4 },
    { label: 'Aguardando Validação', value: 5 },
  ];

  const toggleModal = (_id) => {
    getTarefaById(_id).then((res) => {
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

  const adicionarTodosUsuariosATarefa = async (id) => {
    const token = await getStorageItem('token');

    const usuariosIds = usuariosSelecionado.map((usuario) => usuario['_id']);
    addUserToTarefa(id, usuariosSelecionado).then((res) => {
      setModalUserVisible(false)
      setUsuariosSelecionado([])
      setUsuariosBusca([])
      buscarTarefasWorkspace()
    }).catch((error) => {
      console.error(error.response)
    });
    setUsuariosSelecionado([]);
  };


  const [userQuery, setUserQuery] = useState('')
  const [usuariosBusca, setUsuariosBusca] = useState([])
  const [usuariosSelecionado, setUsuariosSelecionado] = useState([])

  const buscaUsuario = async () => {
    const busca = workspaceUsuarios.filter(u => {
      return u.usuario.nome.toLowerCase().includes(userQuery.toLowerCase()) 
    })
    setUsuariosBusca(busca)
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
            <Card style={styles.Cardcontainer} onPress={() => {toggleModal(tarefa._id)}}>
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
                {tarefa.usuarios.map((n) => <UserAvatar name={n.usuario?.nome || ''} />)}
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
                <View style={{ ...styles.iconContainer, width: '75%' }} >
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
                      <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <View style={styles.modalAddUserContainer}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Adicionar membros à tarefa</Text>
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
                              <TouchableOpacity style={{ marginTop: 10 }} onPress={() => adicionarUsuario(item.usuario)}>
                                <Text style={{ fontSize: 18 }}>{item.usuario.nome}</Text>
                              </TouchableOpacity>
                            )}
                          />
                          {usuariosSelecionado.map((user) => (
                            <Chip closeIcon={'window-close'} onClose={() => removerUsuario(user)} style={{ marginTop: 5 }}>
                              {user.nome}
                            </Chip>
                          ))}
                          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <Button title="Adicionar" onPress={() => adicionarTodosUsuariosATarefa(tarefaSelecionada?._id)} color={colors.roxo} style={styles.btn} />
                            <Button title="Fechar" onPress={closeModalHandler} color={colors.roxo} style={styles.btn} />
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>

                  <Icon name="trash" style={styles.icons} size={20} marginLeft={10} color={'red'} onPress={() => deletarTarefaWorkspace(tarefaSelecionada._id)} />


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
                  <Text>{getPrioridadeTitle(tarefaSelecionada?.prioridade)}</Text>
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
                {tarefaSelecionada?.usuarios.map((n) => <UserAvatar name={n.usuario?.nome || ''} />)}
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
    backgroundColor: "white",
    marginVertical: 20,
    height: 50,
    fontSize: 18
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
  btn: {
    borderRadius: 50,
    padding: 5,
    fontSize: 15
  },
  modalAddUserContainer: {
    width: '96%',
    height: 470,
    borderStyle: 'solid',
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 25,
    padding: 20,
    backgroundColor: '#FFF'
  }
});

export default AbaTarefasTodasWorkspace;
