import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function Botao({tittle, onPress}) {
    return (
        <Pressable style={({ pressed }) => [
                    style.button,
                    { backgroundColor: pressed ? '#E8E8E8' : 'white' }
                  ]} onPress={onPress}>
                  <Text style = {style.buttonText}>
                    {tittle}
                  </Text>
        
                </Pressable>
    );
}

const style = StyleSheet.create({
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

});