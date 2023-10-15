import { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Button, FlatList } from 'react-native';
import { Text, IconButton, DataTable, Menu, Divider, Provider, Chip } from 'react-native-paper';
import AbaTodasWorkspace from '../components/AbaTodasWorkspace';
import BottomBarTarefasWork from '../components/BottomBarTarefasWork';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import { getUserByNameOrEmail } from '../service/usuario';
import { getStorageItem } from '../functions/encryptedStorageFunctions';
import { addUserToWorkspace, deleteWork } from '../service/workspace';
import { getTarefas } from '../service/tarefa';
import Toast from 'react-native-toast-message';



const Tab = createMaterialTopTabNavigator();

const ListaTarefaWorkspace = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [usuarios, setUsuarios] = useState([]);


  const { _id, titulo, usuarios: workspaceUsuarios } = route.params;
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [openModal, setOpenModal] = useState(false);


  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff"
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

  const adicionarTodosUsuariosAoWorkspace = async () => {
    const token = await getStorageItem('token');

    const usuariosIds = usuariosSelecionado.map((usuario) => usuario['_id']);
    const workspaceId = _id;
    addUserToWorkspace(workspaceId, usuariosSelecionado, token);

    setUsuariosSelecionado([]);
    setOpenModal(false);
  };


  const [userQuery, setUserQuery] = useState('')
  const [usuariosBusca, setUsuariosBusca] = useState([])
  const [usuariosSelecionado, setUsuariosSelecionado] = useState([])

  const buscaUsuario = async () => {
    const token = await getStorageItem('token');
    getUserByNameOrEmail(userQuery, token).then((res) => { setUsuariosBusca(res.data) })
  }

  useEffect(() => {
    buscaUsuario()
  }, [userQuery])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setUserQuery(nomeUsuario)
    }, 500)
  }, [nomeUsuario])

  const deletarWork = (_id) => {
    deleteWork(_id).then(res => {
      Toast.show({
        type: 'success',
        text1: 'Workspaces deletado com sucesso!'
      });
      navigation.navigate('HomeWorkspaces')
    }).catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu algum problema'
      });
      console.log('Erro', error);
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Provider>
        <DataTable style={styles.dataTable}>
          <DataTable.Header style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.nomeWorkspace}>{titulo}</Text>
            </View>
            <Menu style={styles.menu}
              visible={visible}
              onDismiss={closeMenu}
              anchor={<IconButton style={styles.menuWorkspace} icon="dots-vertical" iconColor={'#51336b'} onPress={openMenu} />}>
              <Menu.Item style={styles.opcoesMenu} onPress={() => { }} title="Editar Workspace" />
              <Menu.Item style={styles.opcoesMenu3} onPress={openModalHandler} title="Adicionar Membros" />
              <Menu.Item style={styles.opcoesMenu2} titleStyle={{ color: 'red' }} onPress={() => { deletarWork(_id) }} title="Excluir Workspace" />
            </Menu>
          </DataTable.Header>
        </DataTable>
      </Provider>


      <Modal isVisible={openModal}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 3 }}>Adicionar membros ao Workspace</Text>
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
                  <Text style={{ fontSize: 18 }}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
            {usuariosSelecionado.map((user) => (
              <Chip closeIcon={'window-close'} onClose={() => removerUsuario(user)} style={{ marginTop: 5 }}>
                {user.nome}
              </Chip>
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
              <Button title="Adicionar" onPress={adicionarTodosUsuariosAoWorkspace} color={colors.roxo} />
              <Button title="Fechar" onPress={closeModalHandler} color={colors.roxo} />
            </View>
            
          </View>
        </View>
      </Modal>


      <Tab.Navigator
        style={styles.tab}
        screenOptions={{
          tabBarActiveTintColor: '#51336b',
          tabBarLabelStyle: { fontSize: 11 },
          tabBarStyle: { backgroundColor: 'white' },
          tabBarIndicatorStyle: {
            backgroundColor: '#51336b',
          },
        }}>

        <Tab.Screen name="Todas" style={styles.filtros}>
          {() => <AbaTodasWorkspace _id={_id} workspaceUsuarios={workspaceUsuarios} />}
        </Tab.Screen>

      </Tab.Navigator>
      <BottomBarTarefasWork id={_id} style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    zIndex: 2,
  },
  tab: {
    zIndex: -1,
    marginTop: -600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  nomeWorkspace: {
    fontSize: 20,
    color: '#51336b',
    fontWeight: 'bold'
  },
  
  menuWorkspace: {
    paddingLeft: 20,
    zIndex: 3
  },
  opcoesMenu: {
    marginTop: -8,
    backgroundColor: 'white',
  },
  opcoesMenu2: {
    backgroundColor: 'white',
    marginBottom: -8,
  },
  opcoesMenu3: {
    backgroundColor: 'white',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
    width: '100%',
    height: 470,
    borderStyle: 'solid',
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    backgroundColor: '#FFF'
  },
  modalText: {
    backgroundColor: "white",
    marginVertical: 20,
    height: 50,
    fontSize: 18
  },
  usuarioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ListaTarefaWorkspace;
