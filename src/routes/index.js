import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BemVindo from '../pages/BemVindo';
import Login from '../pages/Login';
import BottomBarObjetivos from '../components/ModalBottomBarObjetivos'
import Recentes from '../components/AbaRecentes';
import Home from '../pages/Home';
import ListaTarefas from '../pages/ListaTarefas';
import BottomBarTarefas from '../components/ModalBottomBarTarefas';
import HomeWorkspaces from '../pages/HomeWorkspaces';
import BottomBarWorkspaces from '../components/ModalBotomBarWorkspaces';
import ListaTarefaWorkspace from '../pages/ListaTarefaWorkspace';
import AbaTarefasWorkspace from '../components/AbaTodasWorkspace';

export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "Bem-vindo" screenOptions={{headerShown:false}} >
                <Stack.Screen name = "Bem-vindo" component = {BemVindo} />
                <Stack.Screen name ='Home' component={Home}/>
                <Stack.Screen name = "Login" component = {Login} />
                <Stack.Screen name ='Lista-tarefas' component={ListaTarefas}/>  
                <Stack.Screen name = 'ListaTarefaWorkspace' component={ListaTarefaWorkspace} options={{ headerTitle: null }}/>              
                {/* Componentes */}
                <Stack.Screen name = "Recentes" component = {Recentes} />
                <Stack.Screen name ='BottomBarObjetivos' component={BottomBarObjetivos}/>
                <Stack.Screen name ='BottomBarTarefas' component={BottomBarTarefas}/>
                <Stack.Screen name = 'HomeWorkspaces' component={HomeWorkspaces}/>
                <Stack.Screen name = 'BottomBarWorkspaces' component={BottomBarWorkspaces}/>
                <Stack.Screen name = 'AbaTodasWorkspace' component={AbaTarefasWorkspace} options={{ headerTitle: null }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}