import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BemVindo from '../pages/BemVindo';
import Login from '../pages/Login';
import BottomBar from '../components/ModalBottomBarObjetivos'
import Recentes from '../components/AbaRecentes';
import Home from '../pages/Home';
import ListaTarefas from '../pages/ListaTarefas';
import BottomBarTarefas from '../components/ModalBottomBarTarefas';
import HomeWorkspaces from '../pages/HomeWorkspaces';

export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "HomeWorkspaces" screenOptions={{headerShown:true}} >
                <Stack.Screen name = "Bem-vindo" component = {BemVindo} />
                <Stack.Screen name ='Home' component={Home}/>
                <Stack.Screen name = "Login" component = {Login} />
                <Stack.Screen name ='Lista-tarefas' component={ListaTarefas}/>                
                {/* Componentes */}
                <Stack.Screen name = "Recentes" component = {Recentes} />
                <Stack.Screen name ='BottomBar' component={BottomBar}/>
                <Stack.Screen name ='BottomBarTarefas' component={BottomBarTarefas}/>
                <Stack.Screen name = 'HomeWorkspaces' component={HomeWorkspaces}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}