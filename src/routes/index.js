import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BemVindo from '../pages/BemVindo';
import Login from '../pages/Login';
import BottomBar from '../pages/BottomBar'

export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "BottomBar" screenOptions={{headerShown:false}} >
                <Stack.Screen name = "Bem-vindo" component = {BemVindo} />
                <Stack.Screen name = "Login" component = {Login} />
                <Stack.Screen name = "Home" component = {''} />
                <Stack.Screen name ='BottomBar' component={BottomBar}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}