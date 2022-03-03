import AuthScreen from './screens/Authentification/AuthScreen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function App() {

  let [fontsLoaded] = useFonts({
    'bauhaus': require('./assets/fonts/Bauhaus-93-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <AuthScreen />
  );
}
