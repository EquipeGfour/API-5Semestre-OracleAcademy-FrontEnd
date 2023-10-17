import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BemVindo from '../pages/BemVindo';
import Login from '../pages/Login';
import BottomBarObjetivos from '../components/objetivos/BottomBarObjetivos'
import Recentes from '../components/objetivos/AbaRecentes';
import Home from '../pages/Home';
import ListaTarefas from '../pages/ListaTarefas';
import BottomBarTarefas from '../components/objetivos/tarefas/BottomBarTarefas';
import HomeWorkspaces from '../pages/HomeWorkspaces';
import BottomBarWorkspaces from '../components/workspaces/BotomBarWorkspaces';
import ListaTarefaWorkspace from '../pages/ListaTarefaWorkspace';
import AbaTarefasWorkspace from '../components/workspaces/tarefas/AbaTarefasTodasWork';
import CadastroUsuario from '../pages/CadastroUsuario';

export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "Bem-vindo" screenOptions={{headerShown:false}} >
                <Stack.Screen name = "Bem-vindo" component = {BemVindo} />
                <Stack.Screen name ='Home' component={Home}/>
                <Stack.Screen name = "Login" component = {Login} />
                <Stack.Screen name ='Lista-tarefas' component={ListaTarefas}/>  
                <Stack.Screen name = 'ListaTarefaWorkspace' component={ListaTarefaWorkspace}/>              
                <Stack.Screen name = 'Cadastro-usuario' component={CadastroUsuario}/>
                {/* Componentes */}
                <Stack.Screen name = "Recentes" component = {Recentes} />
                <Stack.Screen name ='BottomBarObjetivos' component={BottomBarObjetivos}/>
                <Stack.Screen name ='BottomBarTarefas' component={BottomBarTarefas}/>
                <Stack.Screen name = 'HomeWorkspaces' component={HomeWorkspaces}/>
                <Stack.Screen name = 'BottomBarWorkspaces' component={BottomBarWorkspaces}/>
                <Stack.Screen name = 'AbaTodasWorkspace' component={AbaTarefasWorkspace}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}