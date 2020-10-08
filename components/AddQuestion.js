import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'

class AddQuestion extends Component {
    state = {
    	question: {
	        question:'',
	        answer:''
    	},
    	title:''
    }

    onChangeText = (t) => {
    	//console.log(t, "text...");
    	this.setState((state, props) => ({
    		question : {
    			question: t,
    			answer: state.question.answer
    		}
    	}))
    }

    onAnswerChange = (t) => {
    	//console.log(t, "text...");
    	this.setState((state,props) => ({
    		question : {
    			answer: t,
    			question: state.question.question
    		}
    	}))
    }
    saveQuestionAnswer = () => {
    	//console.log(this.state, "state...");
    	this.props.dispatch(addQuestion(this.state.question,this.state.title))
    	this.props.navigation.navigate('Home')
    }
	static getDerivedStateFromProps (nextProps, prevState) {
	    if(nextProps.route.params) {
	       return { title: nextProps.route.params.title};
	    }
	    else return null;
	}
    
	render() {
		let { deck } = this.state
		let { onChangeText, onAnswerChange, saveQuestionAnswer } = this
		return (
			<View>
		    	<TextInput
			      	style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
			      	placeholder="Question..."
			      	onChangeText={text => onChangeText(text)}
			      	value={this.state.question.question}
			    />
		        <TextInput
		        	placeholder="Answer..."
			      	style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
			      	onChangeText={text => onAnswerChange(text)}
			      	value={this.state.question.answer}
			    />
		    	<TouchableOpacity onPress={saveQuestionAnswer}>
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

export default connect(mapStateToProps)(AddQuestion);