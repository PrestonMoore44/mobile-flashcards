import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class AddDeck extends Component {
    state = {
    	title:''
    }
    saveDeck = () => {
    	console.log(this.state, " To Be saved...");
    	this.props.dispatch(addDeck(this.state))
    	this.props.navigation.navigate('Home')
    }

    onAnswerChange = (t) => {
    	//console.log(t, "text...");
    	this.setState((state,props) => ({
    		title: t
    	}))
    }
	// static getDerivedStateFromProps (nextProps, prevState) {
	//     if(nextProps.route.params) {
	//        return { title: nextProps.route.params.title};
	//     }
	//     else return null;
	// }
    
	render() {
		let { deck } = this.state
		let { onAnswerChange, saveDeck} = this
		return (
			<View>
		    	<Text>What Is Your New Deck's Name</Text>
		        <TextInput
		        	placeholder="Deck Name..."
			      	style={{ height: 40, borderColor: 'gray', borderWidth: 1,fontSize:18  }}
			      	onChangeText={text => onAnswerChange(text)}
			      	value={this.state.title}
			    />
		    	<TouchableOpacity onPress={saveDeck}>
				     <Text>Save</Text>
				</TouchableOpacity>
		    </View>
		)
	}	
}

function mapStateToProps(state) {
    return {
        deckList : Object.values(state)
    }
}

export default connect(mapStateToProps)(AddDeck);