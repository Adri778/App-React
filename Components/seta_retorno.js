import { TouchableOpacity } from "react-native";
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Retorno() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style = {seta.container} onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={30} color={'black'}/>
        </TouchableOpacity>
    );
}

const seta = StyleSheet.create({
    container :{
        position: 'absolute',
        top: 70,
        left: 30,
    }
});