import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Retorno from '../Components/seta_retorno';
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

export default function Cursos({ navigation }) {
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
      <Text style = {Style.name}>Nossos Cursos</Text>
      

      <View style = {Style.actions}>
        <Text style = {Style.textName}>DESENVOLVIMENTO DE SISTEMAS</Text>
        <View style = {Style.circulo}>
            <Text style = {Style.textCirculo}>D</Text>
        </View>
        <Text style = {Style.text}>capacita profissionais para atuar na criação, testes e manutenção de softwares, sistemas web e aplicativos mobile</Text>

      </View>

      <View style = {Style.actions}>
        <Text style = {Style.textName}>AUTOMAÇÃO INDUSTRIAL</Text>
        <View style = {Style.circulo}>
            <Text style = {Style.textCirculo}>A</Text>
        </View>
        <Text style = {Style.text}>prepara profissionais para projetar, instalar e manter sistemas automatizados, com foco em tecnologias da Indústria 4.0 </Text>
        
      </View>

      <View style = {Style.actions}>
        <Text style = {Style.textName}>ELETROTÉCNICO</Text>
        <View style = {Style.circulo}>
            <Text style = {Style.textCirculo}>E</Text>
        </View>
        <Text style = {Style.text}>é focado na prática industrial, capacitando alunos para atuar em instalações elétricas, manutenção, projetos e automação </Text>
    
      </View>

      <View style={Style.footer}>
        <Footer />
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
    top: 130,
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
    fontSize: 13,
    fontFamily: 'Roboto_700Bold',
    bottom: 40,
    alignSelf: 'center',
    left: 20,
  },

  actions: {
    paddingVertical: 70,
    paddingHorizontal: 24,
    paddingBottom: 10,
    top: 60,
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 32,
    borderWidth: 1,
    borderColor:'#FFFFFF',
    marginBottom: 20,
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

  circulo: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 10,
    left: 20,
    backgroundColor: '#f9effb',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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

  footer:{
    top: 90,
  },

});