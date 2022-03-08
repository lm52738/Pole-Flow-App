import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/Authentification/AuthScreen';
import Options from '../screens/Authentification/Options';
import MainScreen from '../screens/Main/MainScreen';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import GalleryScreen from '../screens/Gallery/GalleryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="AuthScreen" component={AuthScreen}/>
        <Stack.Screen name="Options" component={Options}/>
        <Stack.Screen name="MainScreen" component={MainScreen}/>
      </Stack.Navigator>
  );
}
