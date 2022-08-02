import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/Authentification/AuthScreen';
import Options from '../screens/Authentification/Options';
import AppDrawer from './AppDrawer';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="AuthScreen" component={AuthScreen}/>
        <Stack.Screen name="Options" component={Options}/>
        <Stack.Screen name="MainScreen" component={AppDrawer}/>
      </Stack.Navigator>
  );
}

export { AuthStack};
