import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyles } from '../../styles/global';
import Add from './Add';

export default function AddGroup() {
    return (
            <ScrollView nestedScrollEnabled={true} style={mainStyles.safeArea}>
                <View style={mainStyles.container}>
                    <Add />
                </View>
            </ScrollView>
    );
}