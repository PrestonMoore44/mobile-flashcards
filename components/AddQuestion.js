import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'

class AddQuestion extends Component {
    state = {
        question:'',
        answer:''
    }

    onChangeText = (t) => {
    	console.log(t, "text...");
    	this.setState({
    		question: t,
    	})
    }
	// static getDerivedStateFromProps (nextProps, prevState) {
	// 	console.log("Begin...", nextProps, " <---- Next Props...")
	//     if(nextProps.route.params) {
	//     	console.log(nextProps.params, " Next Props...")
	//        return { deck: nextProps.route.params};
	//     }
	//     else return null;
	// }
    
	render() {
		let { deck } = this.state
		let { onChangeText } = this
		return (
			<View>
		    	<TextInput
			      	style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
			      	placeholder="Question..."
			      	onChangeText={text => onChangeText(text)}
			      	value={this.state.question}
			    />
		        <TextInput
		        	placeholder="Answer..."
			      	style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
			      	onChangeText={text => onChangeText(text)}
			      	value={this.state.answer}
			    />
		    </View>
		)
	}	
}

function mapStateToProps(state) {
    return {
        deckList : Object.values(state)
    }
}

export default connect(mapStateToProps)(AddQuestion);