import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BemVindo from '../pages/BemVindo';
import Login from '../pages/Login';
import BottomBar from '../pages/BottomBar'
import Recentes from '../pages/Recentes';
import Home from '../pages/Home';

export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "Bem-vindo" screenOptions={{headerShown:false}} >
                <Stack.Screen name = "Bem-vindo" component = {BemVindo} />
                <Stack.Screen name = "Login" component = {Login} />
                <Stack.Screen name = "Recentes" component = {Recentes} />
                <Stack.Screen name ='BottomBar' component={BottomBar}/>
                <Stack.Screen name ='Home' component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}