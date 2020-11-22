import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from 'react-redux'

class SplashPage extends Component {
  state = {
    answers:{}
  }

  saveDeck = () => {
    this.props.navigation.navigate('Home')
  }

  componentDidMount(prevProps){
    setTimeout(() => {
      this.saveDeck()
    },3000)
  }
    
	render() {
		return (
      <LinearGradient
          style={styles.splashBackground}
          colors={['#0CA5D2','#0C9BD2','#0c7dd2' ]}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} >
            <Text style={styles.bigBlue}>QUIZ 360</Text>
          </View>
        </View>
      </LinearGradient>
		)
	}	
}

function mapStateToProps(state) {
  return {
    answers: Object.values(state).filter(it => !it.questions)[0],
  }
}

const styles = StyleSheet.create({
  splashBackground: {
    fontSize: 18,
    height:"100%",
    width: "100%",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: '#0C9BD2',
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 49,
  },
  outerCircle: {
    borderRadius: 100,
    width: 200,
    height: 200,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 95,
    width: 190,
    height: 190,
    margin: 5,
    backgroundColor: 'white'
  },
});

export default connect(mapStateToProps)(SplashPage);