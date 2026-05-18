import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Botao from '../Components/botao';
import Footer from '../Components/footer';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

// import Topo from '../Components/topo';



// Função que faz retornar uma infotmação

function linkExterno() {
  alert('Ainda em desenvolvimento, aguarde por mais novidades!');
}

export default function Home({ navigation }) {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={Style.container}>
      <Text style = {Style.textpresent}>Bem Vindo ao</Text>
      <Image style = {Style.image} source={require('../assets/senailogo.png')}/>

        <View style = {Style.boxContainer1}>
          

        <Botao 
          tittle = 'Nossos Cursos'
          onPress = {() => navigation.navigate('cursos')}
        />

        <Botao 
          tittle = 'Instituição'
          onPress = {() => navigation.navigate('instituto')}
        />
        </View>

        <View style = {Style.boxContainer1}>
          
        <Botao 
          tittle = 'Seja Docente'
          onPress = {() => navigation.navigate('seja_docente')}
        />

        <Botao 
          tittle = 'Saiba Mais'
          onPress = {() => navigation.navigate('saiba_mais')}
        />

        </View>
        
        <View style = {Style.boxContainer1}>

          <Botao 
          tittle = 'Calendário'
          onPress = {() => navigation.navigate('calendario')}
        />
        </View>

      <View style = {Style.actions}>
        <Text style = {Style.textName}>SENAI CURSOS</Text>
        <Text style = {Style.text}>O Senai é uma instituição que oferece cursos profissionalizantes e técnicos. </Text>

        <View style = {Style.boxcenter}>
          <Text style = {Style.contName}>Desenvolvimento de Sistemas</Text>
          <Text style = {Style.contName}>Adriel Ferreira da Hora</Text>
          <Text style = {Style.contName}>75 907645723</Text>
        </View>

      </View>
      <Footer />
    </View>
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
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#D7D7D7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c7c6c6',
    marginBottom: 10,
    top: 8,
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
    },
    
    image :{
    width: '40%',
    height: 50,
    marginBottom: 130,
    top: 5,
    resizeMode: 'contain',
  },

  boxContainer1: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 35,
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textName : {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    bottom: 40,
  },

  text :{
    color: '#000000',
    fontFamily: 'Roboto_400Regular',
    bottom: 20,
  },

  actions: {
    paddingVertical: 50,
    paddingHorizontal: 24,
    paddingBottom: 10,
    bottom: 30,
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: 32,
    borderWidth: 1,
    borderColor:'#FFFFFF',
  },

  boxcenter: {
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    gap: 10,
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