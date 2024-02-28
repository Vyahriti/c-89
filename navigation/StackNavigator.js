import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from './TabNavigator'
import PostScreen from '../Screens/PostScreen'

const Stack = createStackNavigator();
const StackNavigator =()=>{
    return (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Tab" component={TabNavigator} />
          <Stack.Screen name="PostScreen" component={PostScreen} />
        </Stack.Navigator>
      );
}