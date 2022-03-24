import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from '../screens/Main/MainScreen';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import { GalleryStack, ProfileStack, GroupsStack, UsersStack, AdminStack } from './AppStack';
import { getHeaderTitle } from '@react-navigation/elements';
import Header from './Header';
import { Entypo, AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();


function AppDrawer() {
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
        <Drawer.Screen name="ADMIN POČETNA" component={AdminStack}
             options={{
              title: 'Admin Početna',
              drawerIcon: () => (
                <Entypo name="home" size={25} color="black" />
              ),
          }}
        />
    </Drawer.Navigator>
  );
}

export default AppDrawer;