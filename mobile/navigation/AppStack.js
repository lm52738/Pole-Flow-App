import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/Main/MainScreen';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import GalleryScreen from '../screens/Gallery/GalleryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import AuthScreen from '../screens/Authentification/AuthScreen';
import Options from '../screens/Authentification/Options';
import GroupsScreen from '../screens/Groups/GroupsScreen';
import UsersScreen from '../screens/Users/UsersScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="AuthScreen" component={AuthScreen}/>
        <Stack.Screen name="Options" component={Options}/>
        <Stack.Screen name="MainScreen" component={MainScreen}/>
        <Stack.Screen name="CalendarScreen" component={CalendarScreen}/>
        <Stack.Screen name="GalleryScreen" component={GalleryScreen}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
        <Stack.Screen name="GroupsScreen" component={GroupsScreen}/>
        <Stack.Screen name="UsersScreen" component={UsersScreen}/>
      </Stack.Navigator>
  );
}

export default AppStack;