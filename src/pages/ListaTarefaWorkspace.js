import { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Button, FlatList } from 'react-native';
import { Text, IconButton, DataTable, Menu, Divider, Provider, Chip } from 'react-native-paper';
import AbaTodasWorkspace from '../components/workspaces/tarefas/AbaTarefasTodasWork';
import BottomBarTarefasWork from '../components/workspaces/tarefas/BottomBarTarefasWork';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import { getUserByNameOrEmail } from '../service/usuario';
import { getStorageItem } from '../functions/encryptedStorageFunctions';
import { addUserToWorkspace, deleteWork, editarWork } from '../service/workspace';
import { getTarefas } from '../service/tarefa';
import Toast from 'react-native-toast-message';


// --- Cores do Sistema ---
const colors = {
  verde: "#346c68",
  azul: "#4974a5",
  roxo: "#51336b",
  branco: "#ffffff",
  cinza: "#BAC0CA"
};

const ListaTarefaWorkspace = ({ route, navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const [visible, setVisible] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const { _id, titulo, usuarios: workspaceUsuarios } = route.params;

  // --- Menu Workspace ---
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // ----- Modal Editar Workspace -----
  const [openModalEditarWorkspace,setOpenModalEditarWorkspace] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);

  const openModalEditarWorkspaceHandler = () =>{
    setOpenModalEditarWorkspace(true);
  }

  const closeModalEditarWorkspaceHandler = () =>{
    setOpenModalEditarWorkspace(false);
  }

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

    // -----Editar Workspace-----
    const [nomeEditado, setNomeEditado] = useState("");
    const editarWorkspace = () => {
      const obj = {
        titulo: nomeEditado,
        workspace: true
      }
      editarWork(_id,obj).then(res => {
        setNomeEditado('')
        closeModalEditarWorkspaceHandler()
        Toast.show({
          type: 'success',
          text1: 'Workspace Editado com sucesso!'
        });
        navigation.navigate('HomeWorkspaces')
      }).catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Ocorreu algum problema',
        });
        console.log('Erro', error.response);
      })
    }

  // ----- Deletar Workspace -----
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

  // ----- Modal Adicionar Usuário -----
  const [openModal, setOpenModal] = useState(false);

  // ----- Adicionar Usuário -----
  const adicionarUsuario = (usuario) => {
    if (!usuariosSelecionado.some((u) => u._id === usuario._id)) {
      setUsuariosSelecionado([...usuariosSelecionado, usuario])}
    };
  
  // ----- Remover Usuário -----
  const removerUsuario = (user) => {
    const novaLista = usuariosSelecionado.filter(u => u._id != user._id)
    setUsuariosSelecionado(novaLista)
  }
  // ----- Adicionar todos Usuários ao Workspace -----
  const adicionarTodosUsuariosAoWorkspace = async () => {
    const token = await getStorageItem('token');
    const usuariosIds = usuariosSelecionado.map((usuario) => usuario['_id']);
    const workspaceId = _id;
    addUserToWorkspace(workspaceId, usuariosSelecionado, token);
    setUsuariosSelecionado([]);
    setOpenModal(false);
  };

  // ----- Buscar Usuários -----
  const [userQuery, setUserQuery] = useState('')
  const [usuariosBusca, setUsuariosBusca] = useState([])
  const [usuariosSelecionado, setUsuariosSelecionado] = useState([])

  const buscaUsuario = async () => {
    const token = await getStorageItem('token');
    getUserByNameOrEmail(userQuery, token).then((res) => { setUsuariosBusca(res.data) })
  }  

// ----- Use Effects -----
  useEffect(() => {
    buscaUsuario()
  }, [userQuery])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setUserQuery(nomeUsuario)
    }, 500)
  }, [nomeUsuario])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* --- Menu Editar Workspaces --- */}
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
              <Menu.Item style={styles.opcoesMenu} onPress={openModalEditarWorkspaceHandler} title="Editar Workspace" />
              <Menu.Item style={styles.opcoesMenu3} onPress={openModalHandler} title="Adicionar Membros" />
              <Menu.Item style={styles.opcoesMenu2} titleStyle={{ color: 'red' }} onPress={() => { deletarWork(_id) }} title="Excluir Workspace" />
            </Menu>
          </DataTable.Header>
        </DataTable>
      </Provider>

      {/* --- Modal Editar Workspaces --- */}
      <Modal isVisible={openModalEditarWorkspace} onBackdropPress={closeModalEditarWorkspaceHandler}>
          <View style={[styles.modalEditarWorkContainer,]}>
            <Text style={styles.textoEditarWorkspace}>Editar Workspace</Text>
              <TextInput
                  style={styles.usuario}
                  mode='outlined'
                  // textColor="#545F71"
                  placeholder="Insira o novo nome"
                  label={isInputFocused ? "Workspaces" : ""}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChangeText={(text) => setNomeEditado(text)}
                  value={nomeEditado}
              />
              <View style={{ marginTop: 40 }}>
                  <TouchableOpacity onPress={editarWorkspace} style={styles.botaoCriar}>
                      <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>

      {/* --- Modal Adicionar Membros ---  */}
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

      {/* --- Tabs (Filtros) --- */}
      <Tab.Navigator
        style={styles.tab}
        screenOptions={{
          tabBarActiveTintColor: '#51336b',
          tabBarLabelStyle: { fontSize: 8.35 },
          tabBarStyle: { backgroundColor: 'white' },
          tabBarIndicatorStyle: {
            backgroundColor: '#51336b',
          },
        }}>
        <Tab.Screen name="Todas" style={styles.filtros}>
          {() => <AbaTodasWorkspace _id={_id} workspaceUsuarios={workspaceUsuarios} />}
        </Tab.Screen>
        <Tab.Screen name="Iniciadas" style={styles.filtros}>
          {() => <AbaTodasWorkspace _id={_id} workspaceUsuarios={workspaceUsuarios} statusFiltro={2} />}
        </Tab.Screen>
        <Tab.Screen name="Validação" style={styles.filtros}>
          {() => <AbaTodasWorkspace _id={_id} workspaceUsuarios={workspaceUsuarios} statusFiltro={5} />}
        </Tab.Screen>
        <Tab.Screen name="Atrasadas" style={styles.filtros}>
          {() => <AbaTodasWorkspace _id={_id} workspaceUsuarios={workspaceUsuarios} statusFiltro={4} />}
        </Tab.Screen>
        <Tab.Screen name="Concluidas" style={styles.filtros}>
          {() => <AbaTodasWorkspace _id={_id} workspaceUsuarios={workspaceUsuarios} statusFiltro={1} />}
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
  usuario: {
    marginTop: 40,
    alignSelf: 'center',
    width: 325,
    backgroundColor: 'transparent'
  },
  modalEditarWorkContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    borderColor: colors.cinza, // Cor da borda modal
    borderWidth: 2, // Largura da borda modal
},
  botaoCriar: {
    width: 150,
    borderRadius: 20,
    backgroundColor: colors.roxo,
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
  textoEditarWorkspace:{
    textAlign:'center',
    color:colors.roxo,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default ListaTarefaWorkspace;
