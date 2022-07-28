import NewsScreen from './screens/NewsScreens';
import RequestScreen from './screens/RequestScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="News" component={NewsScreen} />
        <Tab.Screen name="Request" component={RequestScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

