import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BemVindo from "./BemVindo";
import Login from "./Login";
import { StyleSheet, View } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "./BottomBar";
import Recentes from "./Recentes";


const Tab = createMaterialTopTabNavigator();

const Home = ({ }) => {
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.texto}>Meus Objetivos</Text>
            </View>
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarLabelStyle: { fontSize: 15 },
                tabBarStyle: { backgroundColor: 'transparent', elevation: 0 },
                tabBarIndicatorStyle: {
                    backgroundColor: "#346c68"
                },
            }}>
                <Tab.Screen name="Recentes" component={Recentes} />
                <Tab.Screen name="Concluidas" component={Login} />
                <Tab.Screen name="Atrasadas" component={BemVindo} />
            </Tab.Navigator>
            <BottomBar style={styles.container} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tab: {
        color: 'pink',
        backgroundColor: 'pink'
    },
    header: {
        paddingTop: '50%',
    },
    texto: {
        fontSize: 20,
        paddingLeft: '7%',
        color: "#346c68"
    },

})
export default Home

