import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

class SingleDeck extends Component {
    state = {
        deck : {}
    }

    addQuestion = () => {
    	console.log("Adding Questions");
    	this.props.navigation.navigate("Add Question", this.state.deck)
    }


    startQuiz = () => {
    	console.log("Starting Quiz");
    }



	static getDerivedStateFromProps (nextProps, prevState) {
		console.log("Begin...", nextProps, " <---- Next Props...")
	    if(nextProps.route.params) {
	    	console.log(nextProps.params, " Next Props...")
	       return { deck: nextProps.route.params};
	    }
	    else return null;
	}
    
	render() {
		let { deck } = this.state
		return (
			<View>
		    	<Text>{deck.title}</Text>
		    	<Text>{deck.questions.length} Questions</Text>
		    	<TouchableOpacity onPress={this.addQuestion}>
				     <Text >Add Question</Text>
				</TouchableOpacity>
		    	<TouchableOpacity onPress={this.startQuiz}>
				     <Text >Start Quiz</Text>
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

export default connect(mapStateToProps)(SingleDeck);