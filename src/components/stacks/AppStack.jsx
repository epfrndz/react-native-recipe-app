import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import IndexScreen from "../screens/IndexScreen";
import { Text } from "native-base";
import ShowScreen from "../screens/ShowScreen";
import WebScreen from "../screens/WebScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Index"
          component={IndexScreen}
          options={{
            title: "Recipe App",
            headerStyle: {
              backgroundColor: "#2c3e50",
            },
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
        <Stack.Screen 
          name='Show'
          component={ShowScreen}
          options={({route}) => ({title: route.params.label})}
        />
        <Stack.Screen 
          name='Web'
          component={WebScreen}
          options={{
            title: `Web View`
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default AppStack;
