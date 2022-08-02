import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { mainStyles } from '../styles/global';
import { FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({title}) => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
        <View style={mainStyles.header}> 
            <TouchableOpacity  style={{marginRight:'auto'}} onPress={() => navigation.openDrawer()}>
                <Feather name="menu" size={30} color="black" />
            </TouchableOpacity>
            <Image
                    style={{height:40,width:40, borderRadius:40, marginLeft:'auto'}}
                    source={require('../assets/logo.jpeg')}
                />
        </View>
        </SafeAreaView>
    );
};

export default Header;