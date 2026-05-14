import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Linking } from 'react-native';
import Retorno from '../Components/seta_retorno';
import * as WebBrowser from 'expo-web-browser';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

// import Topo from '../Components/topo';

// Função web browser

async function login() {
  await WebBrowser.openBrowserAsync('https://sejadocente.senaibahia.com.br/login');
}

async function video() {
  await WebBrowser.openBrowserAsync('https://www.senaibahia.com.br/wp-content/uploads/2026/03/1.-Realizar-cadastro-e-login-2.mp4');
}

// Função que faz retornar uma infotmação

function linkExterno() {
  Linking.openURL('https://www.senaibahia.com.br/wp-content/uploads/2026/03/1.-Realizar-cadastro-e-login-2.mp4')
}

function linkInscrever() {
    Linking.openURL('https://sejadocente.senaibahia.com.br/login')
}

export default function Seja_docente({ navigation }) {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <View style={Style.container}>

      <Text style = {Style.textpresent}>Bem Vindo ao</Text>
      <Retorno />
      <Image style = {Style.image} source={require('../assets/senailogo.png')}/>
      <Text style = {Style.name}>Seja Docente</Text>
      

      <View style = {Style.actions}>
        <Text style = {Style.textName}>DOCENTE SENAI</Text>
        <Text style = {Style.text}>O Seja Docente SENAI é a plataforma oficial de cadastro de profissionais interessados em atuar como docentes no SENAI Bahia. Criada para tornar o processo mais ágil, seguro e transparente, ela conecta talentos qualificados às oportunidades de ensino alinhadas às demandas da indústria.</Text>

      </View>

      <View style = {Style.actions}>
        <Text style = {Style.textName}>Não sabe como funciona?</Text>
        <Text style = {Style.text}>Assista a esse breve vídeo para compreender todas as etapas! </Text>
        <Pressable style={({ pressed }) => [
            Style.button,
            { backgroundColor: pressed ? '#E8E8E8' : 'white' }
          ]} onPress={video}>
            <Text style = {Style.buttonText}>
                Clique aqui!
            </Text>
        </Pressable>

      </View>

      <View style = {Style.actions}>
        <Text style = {Style.textName}>Conecte-se com a educação profissional.</Text>
        <Pressable style={({ pressed }) => [
            Style.button,
            { backgroundColor: pressed ? '#E8E8E8' : 'white' }
          ]} onPress={login}>
            <Text style = {Style.buttonText}>
                Inscreva-se
            </Text>
        </Pressable>
        

      </View>

      
    </View>
    </>
  );
}

const Style = StyleSheet.create({
  container :{
    flex: 1,
    backgroundColor: '#D7D7D7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textpresent:{
    position: 'absolute',
    top: 70,
    left: 105,
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#D7D7D7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c7c6c6',
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
    },
    
    image :{
    position: 'absolute',
    top: 60,
    width: '25%',
    height: 50,
    right: 20,
    resizeMode: 'contain',  
  },

  name:{
    position: 'absolute',
    top: 120,
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#D7D7D7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c7c6c6',
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
    },

  boxContainer1: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 35,
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    fontWeight: '500',
  },

  buttonText2: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    fontWeight: '500',
  },

  textName : {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    bottom: 40,
    alignSelf: 'center',
  },

  actions: {
    paddingVertical: 50,
    paddingHorizontal: 24,
    paddingBottom: 10,
    top: 60,
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 32,
    borderWidth: 1,
    borderColor:'#FFFFFF',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text :{
    color: '#000000',
    fontFamily: 'Roboto_400Regular',
    bottom: 20,
    textAlign: 'justify',
  },

  boxcenter: {
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    gap: 10,
  },

  textCirculo: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
  },

  contName: {
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c7c6c6',
    fontFamily: 'Roboto_700Bold',
  },

});