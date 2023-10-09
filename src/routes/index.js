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
import BottomBarTarefasWork from '../components/BottomBarTarefasWork';


export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "Bem-vindo" screenOptions={{headerShown:false}}>
                <Stack.Screen name = "Bem-vindo" component = {BemVindo} />
                <Stack.Screen name ='Home' component={Home}/>
                <Stack.Screen name = "Login" component = {Login}/>
                <Stack.Screen name = "Cadastro-usuario" component = {CadastroUsuário}/>
                <Stack.Screen name ='Lista-tarefas' component={ListaTarefas}/>               
                {/* Componentes */}
                <Stack.Screen name = "Recentes" component = {Recentes} />
                <Stack.Screen name ='BottomBarObjetivos' component={BottomBarObjetivos}/>
                <Stack.Screen name ='BottomBarTarefas' component={BottomBarTarefas}/>
                <Stack.Screen name = 'HomeWorkspaces' component={HomeWorkspaces}/>
                <Stack.Screen name = 'BottomBarWorkspaces' component={BottomBarWorkspaces}/>
                <Stack.Screen name = 'BottomBarTarefasWork' component={BottomBarTarefasWork}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}