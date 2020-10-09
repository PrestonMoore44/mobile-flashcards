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
			<View style={styles.container}>
				<View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
			    	<TextInput
				      	style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:300,marginBottom:50, padding:5,fontSize:18  }}
				      	placeholder="Question..."
				      	onChangeText={text => onChangeText(text)}
				      	value={this.state.question.question}
				    />
			        <TextInput
			        	placeholder="Answer..."
				      	style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:300,padding:5,fontSize:18  }}
				      	onChangeText={text => onAnswerChange(text)}
				      	value={this.state.question.answer}
				    />
			    </View>
			    <View style={{ flex: 1, alignItems: 'center' }}>
			    	<TouchableOpacity style={styles.buttonTwo} onPress={saveQuestionAnswer}>
					     <Text>Save</Text>
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
    backgroundColor:"white"
  },
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    paddingTop:100,
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width:200,
    borderWidth:2,
    borderColor:"orange",
    padding: 10,
    fontSize:18,
    marginBottom:25
  },
  buttonTwo: {
    alignItems: "center",
    borderRadius: 10,
    width:200,
    backgroundColor: "orange",
    padding: 10,
    fontSize:18,
  },
  bigBlueSub: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'grey',
    paddingTop:5,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom:150
  },
});

export default connect(mapStateToProps)(AddQuestion);