import { createDrawerNavigator } from '@react-navigation/drawer';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import Header from './Header';
import { Entypo, AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/Main/MainScreen';
import GalleryScreen from '../screens/Gallery/GalleryScreen';
import AddMedia from '../screens/Gallery/AddMedia';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfile from '../screens/Profile/EditProfile';
import UsersScreen from '../screens/Users/UsersScreen';
import AdminScreen from '../screens/Admin/AdminScreen';
import AddNews from '../screens/Admin/AddNews';
import GroupsScreen from '../screens/Groups/GroupsScreen';
import AddGroup from '../screens/Groups/AddGroup';
import Edit from '../screens/Admin/Edit';
import { useEffect, useState } from 'react';
import { getUser } from '../shared/Utils';
import Group from '../screens/Groups/Group';
import EditGroup from '../screens/Groups/EditGroup';
import AdminProfile from '../screens/Admin/AdminProfile';
import Show from '../screens/Gallery/Show';
import CheckArrivals from '../screens/Calendar/CheckArrivals';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const GalleryStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="GalleryScreen" component={GalleryScreen}/>
      <Stack.Screen name="AddMedia" component={AddMedia}/>
      <Stack.Screen name="Show" component={Show}/>
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
      <Stack.Screen name="AdminProfile" component={AdminProfile}/>
    </Stack.Navigator>
  )
}

const AdminStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="AdminScreen" component={AdminScreen}/>
      <Stack.Screen name="AddNews" component={AddNews}/>
      <Stack.Screen name="Edit" component={Edit}/>
      <Stack.Screen name="AdminProfile" component={AdminProfile}/>
    </Stack.Navigator>
  )
}

const GroupsStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="GroupsScreen" component={GroupsScreen} />
      <Stack.Screen name="AddGroup" component={AddGroup} />
      <Stack.Screen name="EditGroup" component={EditGroup} />
      <Stack.Screen name="Group" component={Group} />
    </Stack.Navigator>
  );
}

const CalendarStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="CheckArrivals" component={CheckArrivals} />
    </Stack.Navigator>
  );
}


function AppDrawer() {

  const [thisUser,setThisUser] = useState({});

    const fetchAsyncUser = async() => {
        try {
            const user = await getUser();
            console.log("fetch");
            setThisUser(user.user);
            
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => fetchAsyncUser(), [])


  if (thisUser.role == 'Admin') {

    return (
      <Drawer.Navigator
      screenOptions={{
        header: ({ route, options }) => {
          return <Header title={route.name} />;
        },
        drawerActiveBackgroundColor:'#f7edf8',
        drawerActiveTintColor:'#af49b6', 
        drawerLabelStyle:{
          marginRight:'auto',
        }
      }}>
          <Drawer.Screen name="ADMIN POČETNA" component={AdminStack}
               options={{
                title: 'Admin Početna',
                drawerIcon: () => (
                  <Entypo name="home" size={25} color="black" />
                ),
            }}
          />
          <Drawer.Screen name="RASPORED" component={CalendarStack}
               options={{
                title: 'Raspored',
                drawerIcon: () => (
                  <AntDesign name="calendar" size={24} color="black" />
                ),
            }}
          />
          <Drawer.Screen name="GALERIJA" component={GalleryStack}
               options={{
                title: 'Galerija',
                drawerIcon: () => (
                  <FontAwesome5 name="photo-video" size={19} color="black" />
                ),
            }}
          />
          <Drawer.Screen name="PROFIL" component={ProfileStack}
               options={{
                title: 'Profil',
                drawerIcon: () => (
                  <FontAwesome5 name="user-alt" size={25} color="black" />
                ),
            }}
          />
          <Drawer.Screen name="GRUPE" component={GroupsStack}
               options={{
                title: 'Grupe',
                drawerIcon: () => (
                  <FontAwesome name="users" size={22} color="black" />
                ),
            }}
          />
          <Drawer.Screen name="KORISNICI" component={UsersStack}
               options={{
                title: 'Korisnici',
                drawerIcon: () => (
                  <FontAwesome5 name="user-friends" size={20} color="black" />
                ),
            }}
          />
      </Drawer.Navigator>
    );

  } else {

    return (
      <Drawer.Navigator
      screenOptions={{
        header: ({ route, options }) => {
          return <Header title={route.name} />;
        },
        drawerActiveBackgroundColor:'#f7edf8',
        drawerActiveTintColor:'#af49b6', 
        drawerLabelStyle:{
          marginRight:'auto',
        }
      }}>
          <Drawer.Screen name="POČETNA" component={MainScreen}
              options={{
                title: 'Početna',
                drawerIcon: () => (
                  <Entypo name="home" size={25} color="black" />
                ),
            }}
          />
          <Drawer.Screen name="RASPORED" component={CalendarScreen}
               options={{
                title: 'Raspored',
                drawerIcon: () => (
                  <AntDesign name="calendar" size={24} color="black" />
                ),
            }}
          />
          <Drawer.Screen name="GALERIJA" component={GalleryStack}
               options={{
                title: 'Galerija',
                drawerIcon: () => (
                  <FontAwesome5 name="photo-video" size={19} color="black" />
                ),
            }}
          />
          <Drawer.Screen name="PROFIL" component={ProfileStack}
               options={{
                title: thisUser.lastName + ", " + thisUser.firstName,
                drawerIcon: () => (
                  <FontAwesome5 name="user-alt" size={25} color="black" />
                ),
            }}
          />
      </Drawer.Navigator>
    );

  }
  
}

export default AppDrawer;