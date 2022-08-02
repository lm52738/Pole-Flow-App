import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { AuthStack } from './navigation/AuthStack';


export default function App() {

  let [fontsLoaded] = useFonts({
    'bauhaus': require('./assets/fonts/Bauhaus-93-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  

  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
    </SafeAreaProvider>
    
  );
}

AppRegistry.registerComponent(appName, () => App);