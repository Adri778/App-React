import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Topo from '../Components/topo';

export default function App() {
  return (
    <View style={Style.container}>
      <Text style = {Style.textpresent}>Bem Vindo ao</Text>
      <Image style = {Style.image} source={require('../assets/senailogo.png')}/>

        <Pressable>
          
        </Pressable>

      <View style = {Style.actions}>
        <Text style = {Style.textName}>SENAI CURSOS</Text>
        <Text style = {Style.text}>O Senai é uma instituição que oferece cursos profissionalizantes e técnicos. </Text>

        <View style = {Style.boxcenter}>
          <Text style = {Style.contName}>Desenvolvimento de Sistemas</Text>
          <Text style = {Style.contName}>Adriel Ferreira da Hora</Text>
          <Text style = {Style.contName}>75 907645723</Text>
        </View>

      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container :{
    flex: 1,
    backgroundColor: '#D7D7D7',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },

  textpresent:{
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#D7D7D7',
    width: '30%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c7c6c6',
    fontWeight: 'bold',
    bottom: 10,
    },
    
    image :{
    width: '40%',
    height: 50,
    marginBottom: 300,
  },

  textName : {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 40,
  },

  text :{
    color: '#000000',
    fontWeight: 'bold',
    bottom: 20,
  },

  actions: {
    paddingVertical: 50,
    paddingHorizontal: 24,
    paddingBottom: 20,
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
    fontWeight: 'bold',
  },

});