import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/Main/MainScreen';
import AuthScreen from '../screens/Authentification/AuthScreen';
import Options from '../screens/Authentification/Options';
import GalleryScreen from '../screens/Gallery/GalleryScreen';
import AddMedia from '../screens/Gallery/AddMedia';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfile from '../screens/Profile/EditProfile';
import UsersScreen from '../screens/Users/UsersScreen';
import AdminScreen from '../screens/Admin/AdminScreen';
import AdminProfiles from '../screens/AdminProfiles/AdminProfiles';
import AddNews from '../screens/Admin/AddNews';
import GroupsScreen from '../screens/Groups/GroupsScreen';
import AddGroup from '../screens/Groups/AddGroup';
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

const GalleryStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="GalleryScreen" component={GalleryScreen}/>
      <Stack.Screen name="AddMedia" component={AddMedia}/>
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      <Stack.Screen name="EditProfile" component={EditProfile}/>
    </Stack.Navigator>
  )
}

const UsersStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="UsersScreen" component={UsersScreen}/>
      <Stack.Screen name="AdminProfiles" component={AdminProfiles}/>
    </Stack.Navigator>
  )
}

const AdminStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="AdminScreen" component={AdminScreen}/>
      <Stack.Screen name="AddNews" component={AddNews}/>
    </Stack.Navigator>
  )
}

const GroupsStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="GroupsScreen" component={GroupsScreen} />
      <Stack.Screen name="AddGroup" component={AddGroup} />
    </Stack.Navigator>
  );
}

export { AuthStack, AdminStack, GroupsStack, UsersStack, ProfileStack, GalleryStack};
