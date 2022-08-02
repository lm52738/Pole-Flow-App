import React from 'react';
import { View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';

const Heading = () => {
    return (
        <View style={mainStyles.heading}> 
            <Text style={mainStyles.title}>POLE FLOW</Text>
        </View>
    );
};

export default Heading;