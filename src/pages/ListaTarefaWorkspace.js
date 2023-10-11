import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View } from 'react-native';
import { Text, IconButton, DataTable, Menu, Button, Divider, Provider } from 'react-native-paper';
import AbaTodasWorkspace from '../components/AbaTodasWorkspace';
import BottomBarTarefasWork from '../components/BottomBarTarefasWork';

const Tab = createMaterialTopTabNavigator();

const ListaTarefaWorkspace = ({ route, navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={{flex:1, backgroundColor: 'white'}}>
    <Provider>
    <DataTable style={styles.dataTable}>
        <DataTable.Header style={styles.header}>
            <View style={styles.titleContainer}>
                <Text style={styles.nomeWorkspace}>Lab</Text>
            </View>
                <Menu style={styles.menu}
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={<IconButton style={styles.menuWorkspace} icon="dots-vertical" iconColor={'#51336b'} onPress={openMenu}/>}>
                  <Menu.Item style={styles.opcoesMenu} onPress={() => {}} title="Editar Workspace" />
                  <Menu.Item style={styles.opcoesMenu2} titleStyle={{color:'red'}} onPress={() => {}} title="Excluir Workspace" />
                  <Menu.Item style={styles.opcoesMenu3} onPress={() => {}} title="Membros" />
              </Menu>
        </DataTable.Header>
    </DataTable>
    </Provider>
    
    <Tab.Navigator
                style={styles.tab}
                screenOptions={{
                    tabBarActiveTintColor: '#51336b',
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarStyle: { backgroundColor: 'white'},
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
  menu:{
    zIndex:2,
  },
  tab: {
    zIndex:-1,
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
  menuWorkspace:{
    paddingLeft: 20,
    zIndex:3
  },
  opcoesMenu:{
    marginTop:-8,
    backgroundColor:'white',  
  },
  opcoesMenu2:{
    backgroundColor:'white',  
  },
  opcoesMenu3:{
    marginBottom:-8,
    backgroundColor:'white',  
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
});

export default ListaTarefaWorkspace;
