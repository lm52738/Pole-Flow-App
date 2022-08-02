import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { galleryStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import API from '../../api';
import { getUser } from '../../shared/Utils';

const Show = ({ route }) => {
    const { uri } = route.params;
    const { id } = route.params;

  const navigation = useNavigation();

  const [thisUser,setThisUser] = useState({});

    useEffect(() => fetchAsyncUser(), [])

    const fetchAsyncUser = async() => {
        try {
            const user = await getUser();
            console.log(user.user);
            setThisUser(user.user);
            
        } catch (error) {
            console.log(error);
        }
    };

    const deleteImage = async() => {
        try {
            await API.delete('/gallery/' + id);
            navigation.navigate("GalleryScreen");
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <View style={galleryStyles.container}>
        <View style={galleryStyles.imageButtons}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={galleryStyles.buttonStyle}
                onPress={ () => {navigation.navigate('GalleryScreen')}}>
                <AntDesign name="leftcircleo" size={30} color="#b36cac" />
            </TouchableOpacity>

            { thisUser.role == 'Admin' &&
              <TouchableOpacity
                style={galleryStyles.buttonStyle}
                onPress={deleteImage}>
                <Feather name="trash-2" size={30} color="#b36cac" />
            </TouchableOpacity>
            }

            
        </View>
        <View style={galleryStyles.imageContainer}>
            <Image
              style={galleryStyles.fullImageStyle}
              source={{uri: uri}}
            />
        </View>            
              
    </View>
  );
};

export default Show;