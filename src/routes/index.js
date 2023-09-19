import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BemVindo from '../pages/BemVindo';
import Login from '../pages/Login';
import BottomBar from '../pages/BottomBar'
import Home from '../pages/Home';
import TabMenu from '../pages/TabMenu';

export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "TabMenu" screenOptions={{headerShown:false}} >
                <Stack.Screen name = "Bem-vindo" component = {BemVindo} />
                <Stack.Screen name = "Login" component = {Login} />
                <Stack.Screen name = "Home" component = {Home} />
                <Stack.Screen name ='BottomBar' component={BottomBar}/>
                <Stack.Screen name ='TabMenu' component={TabMenu}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}