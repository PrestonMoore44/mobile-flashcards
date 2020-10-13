import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class AddDeck extends Component {
    state = {
    	title:''
    }
    saveDeck = () => {
    	this.props.dispatch(addDeck(this.state))
    	this.props.navigation.navigate('Home')
     	this.setState((state,props) => ({
    		title: ''
    	}))
    }

    onAnswerChange = (t) => {
    	this.setState((state,props) => ({
    		title: t
    	}))
    }
    
	render() {
		let { deck } = this.state
		let { onAnswerChange, saveDeck} = this
		return (
			<View style={styles.container}>
		    	<Text style={styles.bigBlue}>What Is Your New Deck's Name</Text>
		    	<View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
			        <TextInput
			        	placeholder="Deck Name..."
				      	style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:300,padding:5,fontSize:18  }}
				      	onChangeText={text => onAnswerChange(text)}
				      	value={this.state.title}
				    />
			    </View>
			    <View style={{ flex: 1, alignItems: 'center', marginTop:50}}>
		    	<TouchableOpacity style={styles.buttonTwo} onPress={saveDeck}>
				     <Text style={{color:"white"}}>Save</Text>
				</TouchableOpacity>
				</View>
		    </View>
		)
	}	
}

function mapStateToProps(state) {
    return {
        deckList : Object.values(state)
    }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 18,
    height:"100%",
    width: "100%",
    backgroundColor:"white",
    paddingTop:10
  },
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    paddingTop:100,
    fontWeight: 'bold',
    fontSize: 30,
  },
  buttonTwo: {
    alignItems: "center",
    borderRadius: 10,
    width:200,
    fontSize:18,
    borderWidth:2,
    borderColor:"black",
    backgroundColor: "black",
    padding: 10
  }
});

export default connect(mapStateToProps)(AddDeck);