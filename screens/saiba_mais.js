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

export default function SaibaMais({ navigation }) {
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

      <View style = {Style.actions}>
        <Text style = {Style.textName}>QUEM SOMOS?</Text>
        <Text style = {Style.text}>O Serviço Nacional de Aprendizagem Industrial (SENAI) define-se como uma instituição privada de interesse público, vinculada à Confederação Nacional da Indústria (CNI), cujo propósito central é atuar como o principal motor de qualificação profissional e inovação tecnológica do setor produtivo brasileiro. Criado em 1942, em um momento de transição econômica do país, o SENAI consolidou-se como o maior complexo de educação profissional da América Latina. </Text>
        <Text style = {Style.text}>A instituição é uma educadora por excelência. Diferente de modelos de ensino puramente teóricos, sua identidade está fundamentada na metodologia do "aprender fazendo". Ao longo de décadas, o SENAI tornou-se o principal responsável por inserir trabalhadores qualificados no mercado, oferecendo desde a aprendizagem industrial básica até pós-graduações tecnológicas, sempre alinhadas às demandas reais das fábricas.</Text>

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
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    bottom: 40,
    textAlign: 'center',
  },

  actions: {
    paddingVertical: 50,
    paddingHorizontal: 24,
    paddingBottom: 10,
    top: 60,
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: 32,
    borderWidth: 1,
    borderColor:'#FFFFFF',
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
    top: 80,
  },

});