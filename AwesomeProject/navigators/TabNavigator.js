import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddPost");
              }}
              style={{ marginRight: 15 }}
            >
              <Icon name="add" size={30} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
