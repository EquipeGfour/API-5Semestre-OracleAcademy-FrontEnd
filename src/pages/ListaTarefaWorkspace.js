import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native';
import { Text, IconButton, DataTable, Menu, Divider, Provider } from 'react-native-paper';
import AbaTodasWorkspace from '../components/AbaTodasWorkspace';
import BottomBarTarefasWork from '../components/BottomBarTarefasWork';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import { getUserByNameOrEmail } from '../service/usuario';
import { getStorageItem } from '../functions/encryptedStorageFunctions';
import { addUserToWorkspace } from '../service/workspace';



const Tab = createMaterialTopTabNavigator();

const ListaTarefaWorkspace = ({ route, navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [usuarios, setUsuarios] = useState([]);

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

  const adicionarUsuario = async (i) => {
    const token = await getStorageItem('token');
    setUsuariosSelecionado([...usuariosSelecionado,i])
    /* addUserToWorkspace('65252b92f3d414bc07d9e01e',i['_id'], token) */
  };

  const [userQuery, setUserQuery] = useState('')
  const [usuariosBusca, setUsuariosBusca] = useState([])
  const [usuariosSelecionado, setUsuariosSelecionado] = useState([])

  const buscaUsuario = async () => {
    const token = await getStorageItem('token');  
    getUserByNameOrEmail(userQuery, token).then((res)=>{setUsuariosBusca(res.data)})
  }

  React.useEffect(() => {
    buscaUsuario()
  }, [userQuery])

  React.useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setUserQuery(nomeUsuario)
    }, 500)
  }, [nomeUsuario])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Provider>
        <DataTable style={styles.dataTable}>
          <DataTable.Header style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.nomeWorkspace}>Palestin</Text>
            </View>
            <Menu style={styles.menu}
              visible={visible}
              onDismiss={closeMenu}
              anchor={<IconButton style={styles.menuWorkspace} icon="dots-vertical" iconColor={'#51336b'} onPress={openMenu} />}>
              <Menu.Item style={styles.opcoesMenu} onPress={() => { }} title="Editar Workspace" />
              <Menu.Item style={styles.opcoesMenu2} titleStyle={{ color: 'red' }} onPress={() => { }} title="Excluir Workspace" />
              <Menu.Item onPress={openModalHandler} title="Adicionar Usuário" />
            </Menu>
          </DataTable.Header>
        </DataTable>
      </Provider>


      <Modal isVisible={openModal}>
        <View style={styles.modalContainer}>
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
            <Button title="Adicionar" onPress={adicionarUsuario} color={colors.roxo} />
            <Button title="Fechar" onPress={closeModalHandler} color={colors.roxo} />
          </View>
          <FlatList
            data={usuariosSelecionado}
            renderItem={({ item }) => (
              <View style={styles.usuarioItem}>
                {item.adicionado ? (
                  <Icon name="check-circle" size={16} color={colors.verde} />
                ) : null}
                <Text>{item.nome}</Text>
              </View>
            )}
          />
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

        <Tab.Screen style={styles.filtros} name="Todas" component={AbaTodasWorkspace} />


      </Tab.Navigator>
      <BottomBarTarefasWork style={{ flex: 1 }} />
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
  },
  opcoesMenu3: {
    marginBottom: -8,
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    mode: "flat",
    backgroundColor: "white",
    width: 200,
    marginBottom: 30
  },
  usuarioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ListaTarefaWorkspace;
