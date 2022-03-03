import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { formStyles, mainStyles } from '../../styles/global';
import { Ionicons } from '@expo/vector-icons';

export default function RadioButtons() {
    
    const [trener, setTrener] = useState(true);
    const [članKluba, setČlanKluba] = useState(false);

    const pressHandler = () => {
        setTrener(!trener);
        setČlanKluba(!članKluba);
    };

    return (
        <View style={formStyles.radios}>
            <CheckBox
                title={'Trener'}
                checkedIcon={
                <Icon
                    name="radio-button-checked"
                    type="material"
                    color="#E698CE"
                    size={25}
                    iconStyle={{ marginRight: 10 }}
                    checked
                />
                }
                uncheckedIcon={
                <Icon
                    name="radio-button-unchecked"
                    type="material"
                    color="#E698CE"
                    size={25}
                    iconStyle={{ marginRight: 10 }}
                />
                }
                checked={trener}
                onPress={() => pressHandler()}
                
            />
            <CheckBox
                title={'Član kluba'}
                checkedIcon={
                <Icon
                    name="radio-button-checked"
                    type="material"
                    color="#E698CE"
                    size={25}
                />
                }
                uncheckedIcon={
                <Icon
                    name="radio-button-unchecked"
                    type="material"
                    color="#E698CE"
                    size={25}
                />
                }
                checked={članKluba}
                onPress={() => pressHandler()}
            />
        </View>
  );
}
