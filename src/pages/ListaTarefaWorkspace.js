import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View } from 'react-native';
import { Text, IconButton, DataTable } from 'react-native-paper';
import AbaTodasWorkspace from '../components/AbaTodasWorkspace';

const Tab = createMaterialTopTabNavigator();

const ListaTarefaWorkspace = ({ route, navigation }) => {
  return (
    <View style={{flex:1, backgroundColor: 'white'}}>
    <DataTable style={styles.dataTable}>
        <DataTable.Header style={styles.header}>
            <View style={styles.titleContainer}>
                <Text style={styles.nomeWorkspace}>Lab</Text>
            </View>
                <IconButton style={styles.menuWorkspace} icon="dots-vertical" />
        </DataTable.Header>

    </DataTable>
    
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

    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    marginTop: 20,
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
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
});

export default ListaTarefaWorkspace;
