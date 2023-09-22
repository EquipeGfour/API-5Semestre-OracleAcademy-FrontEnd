import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BemVindo from './BemVindo';
import { StyleSheet, View } from 'react-native';
import { Text, Searchbar, IconButton, DataTable } from 'react-native-paper';
import Login from './Login';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TodasTarefas from './TodasTarefas';

const Tab = createMaterialTopTabNavigator();

const ListaTarefas = ({ }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    return (
        <>
            {/* <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                right={props => (
                    <IconButton {...props} icon="dots-vertical" onPress={() => { }} />
                )}
            /> */}
            <DataTable style={styles.dataTable}>
                <DataTable.Header>
                    <DataTable.Title>Relatórios</DataTable.Title>
                    <DataTable.Title numeric>29/09/2023</DataTable.Title>
                    <DataTable.Title numeric>Alta</DataTable.Title>
                </DataTable.Header>
            </DataTable>

            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'black',
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarStyle: { backgroundColor: 'white'},
                    tabBarIndicatorStyle: {
                        backgroundColor: '#346c68',
                    },
                }}>
                <Tab.Screen name="Todas" component={TodasTarefas}/>
                {/* <Tab.Screen name="Todas" component={Login} /> */}
                {/* <Tab.Screen name="Atrasadas" component={BemVindo} />
                <Tab.Screen name="Concluídas" component={BemVindo} /> */}
            </Tab.Navigator>
        </>
    );
};

const styles = StyleSheet.create({
    dataTable:{
        paddingTop:'10%',
        backgroundColor: 'white',
    }, 
    header: {
        paddingTop: '50%',
    },
    texto: {
        fontSize: 20,
        paddingLeft: '7%',
        color: '#346c68',
    },
});
export default ListaTarefas;