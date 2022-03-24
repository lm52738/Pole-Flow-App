import React,{useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider, RadioButton, TextInput } from 'react-native-paper';
import { galleryStyles } from '../../styles/global';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';

export default function Add() {

    const [value, setValue] = React.useState('first');

    const [selectedDay, setSelectedDay] = useState();

    const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };

    const items = [
        // name key is must. It is to show the text in front
        {id: 1, name: 'angellist'},
        {id: 2, name: 'codepen'},
        {id: 3, name: 'envelope'},
        {id: 4, name: 'etsy'},
        {id: 5, name: 'facebook'},
        {id: 6, name: 'foursquare'},
        {id: 7, name: 'github-alt'},
        {id: 8, name: 'github'},
        {id: 9, name: 'gitlab'},
        {id: 10, name: 'instagram'},
      ];

    return (
        <View style={galleryStyles.card}>
            <TextInput 
                mode='flat'  
                style={galleryStyles.title} 
                label="Naziv grupe" 
                activeUnderlineColor='#b36cac'cd d
            >
            </TextInput>
            <View style={galleryStyles.form}>
                <View style={galleryStyles.inputs}>
                    <TextInput 
                        mode='outlined'  
                        style={galleryStyles.input} 
                        label="Razina" 
                        activeOutlineColor='#b36cac' 
                    >
                    </TextInput>
                    <TextInput 
                        mode='outlined'  
                        style={galleryStyles.input} 
                        label="Razina" 
                        activeOutlineColor='#b36cac' 
                    >
                    </TextInput>
                    <View style={galleryStyles.picker}>
                    <Picker
                        mode='dropdown'
                        selectedValue={selectedDay}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedDay(itemValue)
                        }>
                        
                        <Picker.Item label="Ponedjeljak" value="ponedjeljak" />
                        <Picker.Item label="Utorak" value="utorak" />
                        <Picker.Item label="Srijeda" value="srijeda" />
                        <Picker.Item label="Četvrtak" value="četvrtak" />
                        <Picker.Item label="Petak" value="petak" />
                        <Picker.Item label="Subota" value="subota" />
                        <Picker.Item label="Nedjelja" value="nedjelja" />
                    </Picker>
                    </View>
                    <TextInput 
                        mode='outlined'  
                        style={galleryStyles.input} 
                        label="Vrijeme početka" 
                        placeholder='00:00'
                        activeOutlineColor='#b36cac'
                        right={<TextInput.Icon name="timer-outline"  />}
                    >
                    </TextInput>
                    <TextInput 
                        mode='outlined'  
                        style={galleryStyles.input} 
                        label="Vrijeme završetka" 
                        placeholder='00:00'
                        activeOutlineColor='#b36cac'
                        right={<TextInput.Icon name="timer-outline"  />}
                    >
                    </TextInput>

                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <RadioButton.Item 
                            value="first"
                            label='Pole Flow'
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                        />
                        <RadioButton.Item 
                            value="second"
                            label='Pole Flow Dupli'
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                        />
                        <RadioButton.Item 
                            value="third"
                            label='Exotic Flow'
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                        />
                        <RadioButton.Item 
                            value="fourth"
                            label='Fleksibilnost'
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                        />
                    </RadioButton.Group>

                    <MultiSelect
                        itemFontSize={16}
                        items={items}
                        fontSize={16}
                        uniqueKey="id"
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Izaberi članove"
                        styleMainWrapper={{paddingVertical:10}} 
                        searchInputPlaceholderText="Pretraži..."
                        onChangeInput={(text) => console.log(text)}
                        tagRemoveIconColor="#b36cac"
                        tagBorderColor="#b36cac"
                        tagTextColor="#b36cac"
                        selectedItemTextColor="#b36cac"
                        selectedItemIconColor="#b36cac"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{color: '#b36cac',fontSize:16, paddingVertical:10,paddingHorizontal:5}}
                        submitButtonColor="#b36cac"
                        submitButtonText="Odaberi"
                        />
                </View>

            </View>
            <Divider />
            <TouchableOpacity style={galleryStyles.publish}>
                <Text style={{color: '#b36cac'}}>OBJAVI</Text>
            </TouchableOpacity>
        </View>
    );
}