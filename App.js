import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './screens/home';
import SaibaMais from './screens/saiba_mais';
import Instituicao from './screens/instituicoes';
import Cursos from './screens/cursos';
import Seja_docente from './screens/seja_docente';
import Calendario from './screens/calendario';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component = {Home} />
        <Stack.Screen name='saiba_mais' component = {SaibaMais} />
        <Stack.Screen name='instituto' component = {Instituicao} />
        <Stack.Screen name='cursos' component = {Cursos} />
        <Stack.Screen name='seja_docente' component = {Seja_docente} />
        <Stack.Screen name='calendario' component = {Calendario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}