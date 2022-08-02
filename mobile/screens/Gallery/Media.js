import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { galleryStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import API from '../../api';
import { getUser } from '../../shared/Utils';

const Media = () => {

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => getData(), [])
    
  const getData = async() => {
    try {
         await API.get('/gallery').then((response) => {
             console.log(response.data);
             setData(response.data);
         }).then((responseJson) => {
          setRefreshing(false);
          var newdata = data.concat(responseJson.data);
          setData(newdata);
        });
    } catch (error) {
         throw error;
    }

  };

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
  

  return (
        <View style={galleryStyles.container}>
          {refreshing ? <ActivityIndicator /> : null}
          <FlatList
            ListHeaderComponent={
               
              <>
              { thisUser.role == 'Admin' &&
              <TouchableOpacity style={galleryStyles.addButton} onPress={() => navigation.navigate('AddMedia')}>
                <Text style={{color:'#b36cac'}}>DODAJ NOVO</Text>
              </TouchableOpacity>
            }
              </>
              
            }
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getData} />
            }
            renderItem={({item}) => (
              <View style={galleryStyles.imageContainerStyle}>
                <TouchableOpacity
                  key={item.idmulti}
                  style={{flex: 1}}
                  onPress={() => navigation.navigate('Show', { id: item.idmulti, uri: item.uri })}>
                  <Image
                    style={galleryStyles.imageStyle}
                    source={{
                      uri: item.uri,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}

export default Media;