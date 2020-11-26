import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar  } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Decks from './components/Decks'
import SingleDeck from './components/SingleDeck'
import AddQuestion from './components/AddQuestion'
import SplashPage from './components/SplashPage'
import Score from './components/Score'
import Quiz from './components/Quiz'
import AddDeck from './components/AddDeck'
import { NavigationContainer } from '@react-navigation/native'
import { initialize, alertUs, addDeck, addQuestion } from './actions'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AwesomeAlert from 'react-native-awesome-alerts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const formatDate = () => {
  var dateNow = new Date();
  var dd = dateNow.getDate();
  var mm = dateNow.getMonth() + 1; //January is 0
  var yyyy = dateNow.getFullYear();
  if (dd < 10) { dd = '0' + dd }
  if (mm < 10) { mm = '0' + mm }
  return mm + '/' + dd + '/' + yyyy;  
};

const Tab = createBottomTabNavigator();
const store = createStore(reducer);
store.dispatch(initialize())
const Stack = createStackNavigator();
let showAlert = false;
setTimeout(() => {
  store.dispatch(alertUs())
},45000)

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Second, call the method
const schedulePushNotification = async() => {
  let notify = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'REMINDER',
      body: "Don't forget to take a quiz!",
    },
      trigger: {
        seconds: 1,
      },
  });
}
let myInterval = setInterval(() => {
  const getCertainDecks = async () => {
    const jsonValuee = await AsyncStorage.getItem('@AnswerCount');
    if (jsonValuee != null) {
      if (!!Object.entries(JSON.parse(jsonValuee)).find(it => formatDate() === it[0] && !!it[1].count)) {
        console.log("Answer has been answered today!")
      } else {
        schedulePushNotification();
      }
    } else {
      schedulePushNotification();
    }
  }
  getCertainDecks();
}, 86400)

// clearInterval(myInterval);

async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  console.log(settings, "Settings")
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

const registerForPushNotificationsAsync = async() => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  //console.log(token ,  " Token...")
  return token;
}

registerForPushNotificationsAsync()

const getAllDecks = async () => {
  try {
    // await AsyncStorage.clear();
    const jsonValue = await AsyncStorage.getItem('@Decks');
    if (jsonValue != null) {
      Object.values(JSON.parse(jsonValue)).forEach((it) => {
        store.dispatch(
          addDeck(Object.assign({
            "title": it.title,
            "answers": {
              "answercount": !!it.questions ? it.questions.length : 0,
              "showAlert": false
            }
          }))
        )

        if (it.questions.length > 0) {
          it.questions.forEach((item) => {
            store.dispatch(addQuestion(item,it.title))
          })
        }
      })
    }
  } catch(e) {
    // error reading value
  }
}
getAllDecks();

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

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
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
