import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
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
              <Icon name="add" size={30} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
