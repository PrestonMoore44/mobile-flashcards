import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar  } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import Decks from './components/Decks'
import SingleDeck from './components/SingleDeck'
import AddQuestion from './components/AddQuestion'
import SplashPage from './components/SplashPage'
import Score from './components/Score'
import Quiz from './components/Quiz'
import AddDeck from './components/AddDeck'
import { NavigationContainer } from '@react-navigation/native'
import { initialize, alertUs } from './actions'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AwesomeAlert from 'react-native-awesome-alerts'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Add Deck') {
              iconName = focused ? 'ios-add' : 'ios-add';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0C9BD2',
          inactiveTintColor: 'gray',
        }}
      >
      <Tab.Screen name="Home" component={Decks} />
      <Tab.Screen name="Add Deck" component={AddDeck} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
const store = createStore(reducer);
store.dispatch(initialize())
const Stack = createStackNavigator();
let showAlert = false;
setTimeout(() => {
  store.dispatch(alertUs())
},45000)

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Splash Page"
        headerMode="screen"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#0C9BD2' },
        }}>
          <Stack.Screen name="Splash Page" options={{ title: 'Splash Page',headerShown: false}} component={SplashPage}/>
          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{ title: 'Home', headerLeft: null }}
          />
          <Stack.Screen name="Single Deck" component={SingleDeck} />
          <Stack.Screen name="Add Question" component={AddQuestion} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="Score" component={Score} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
