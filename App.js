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
import AddDeck from './components/AddDeck'
import { NavigationContainer } from '@react-navigation/native'
import { initialize } from './actions'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
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

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Wonderful"
            component={MyTabs}
            options={{ title: 'DeckEm' }}
          />
          <Stack.Screen name="Single Deck" component={SingleDeck} />
          <Stack.Screen name="Add Question" component={AddQuestion} />
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
