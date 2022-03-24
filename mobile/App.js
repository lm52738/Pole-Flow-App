import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './navigation/AppStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { mainStyles } from './styles/global';

const Stack = createNativeStackNavigator();

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
