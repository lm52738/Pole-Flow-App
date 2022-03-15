import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/Main/MainScreen';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import GalleryScreen from '../screens/Gallery/GalleryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import AuthScreen from '../screens/Authentification/AuthScreen';
import Options from '../screens/Authentification/Options';
import GroupsScreen from '../screens/Groups/GroupsScreen';
import UsersScreen from '../screens/Users/UsersScreen';
import AddMedia from '../screens/Gallery/AddMedia';
import AdminScreen from '../screens/Admin/AdminScreen';
import AddNews from '../screens/Admin/AddNews';
import AdminProfiles from '../screens/AdminProfiles/AdminProfiles';
import EditProfile from '../screens/Profile/EditProfile';
import AddGroup from '../screens/Groups/AddGroup';

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
        <Stack.Screen name="AddMedia" component={AddMedia}/>
        <Stack.Screen name="AdminScreen" component={AdminScreen}/>
        <Stack.Screen name="AddNews" component={AddNews}/>
        <Stack.Screen name="AdminProfiles" component={AdminProfiles}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="AddGroup" component={AddGroup} />
      </Stack.Navigator>
  );
}

export default AppStack;