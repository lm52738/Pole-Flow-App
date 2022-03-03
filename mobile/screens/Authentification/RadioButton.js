import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { formStyles, mainStyles } from '../../styles/global';
import { Ionicons } from '@expo/vector-icons';

export default function RadioButtons() {

    const [isError, setIsError] = useState(false);

  return (
      <View>
          <Text>Radio Buttons</Text>
        </View>
  );
}
