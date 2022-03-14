import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { galleryStyles, formStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import AddMedia from './AddMedia';

const Media = () => {

  const navigation = useNavigation();

  const [imageuri, setImageuri] = useState('');
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let items = Array.apply(null, Array(120)).map((v, i) => {
      return {
        id: i,
        src: 'https://unsplash.it/400/400?image=' + (i + 1)
      };
    });
    setDataSource(items);
  }, []);

  const showModalFunction = (visible, imageURL) => {
    //handler to handle the click on image of Grid
    //and close button on modal
    setImageuri(imageURL);
    setModalVisibleStatus(visible);
  };

  return (
    <View style={galleryStyles.container}>
      {modalVisibleStatus ? (
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={modalVisibleStatus}
          onRequestClose={() => {
            showModalFunction(!modalVisibleStatus, '');
          }}>
          <View style={galleryStyles.modelStyle}>
            <Image
              style={galleryStyles.fullImageStyle}
              source={{uri: imageuri}}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={galleryStyles.closeButtonStyle}
              onPress={() => {
                showModalFunction(!modalVisibleStatus, '');
              }}>
              <FontAwesome5 name="times" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
      ) : (
        <View style={galleryStyles.container}>
          <FlatList
            ListHeaderComponent={
              <>
              <TouchableOpacity style={galleryStyles.addButton} onPress={() => navigation.navigate('AddMedia')}>
                <Text style={{color:'black'}}>Dodaj novo!</Text>
              </TouchableOpacity>
              </>
            }
            data={dataSource}
            renderItem={({item}) => (
              <View style={galleryStyles.imageContainerStyle}>
                <TouchableOpacity
                  key={item.id}
                  style={{flex: 1}}
                  onPress={() => {
                    showModalFunction(true, item.src);
                  }}>
                  <Image
                    style={galleryStyles.imageStyle}
                    source={{
                      uri: item.src,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}


      {/* <Modal
      transparent={true}
      animationType={'fade'}
      visible={modal2}
      onRequestClose={() => {
        showModalFunction(!modal2, '');
      }}>
      <View style={galleryStyles.card}>
            <TextInput 
                mode='flat'  
                style={galleryStyles.title} 
                label="Naziv multimedije" 
                activeUnderlineColor='#b36cac'
                
            >
            </TextInput>
            <View style={galleryStyles.form}>
                    <View style={galleryStyles.inputs}>
                        <TextInput 
                            mode='outlined'  
                            style={galleryStyles.input} 
                            label="Učitaj sa uređaja" 
                            activeOutlineColor='#b36cac' 
                            right={<TextInput.Icon name="upload"/>}
                        >
                        </TextInput>
                    </View>
            </View>
            <Divider />
            <TouchableOpacity style={galleryStyles.publish}>
                <Text style={{color: '#b36cac'}}>OBJAVI</Text>
            </TouchableOpacity>
        </View>
      </Modal> */}
    </View>
  );
};

export default Media;