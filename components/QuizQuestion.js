import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

class QuizQuestion extends Component {
    state = {
        deck : {}
    }

	static getDerivedStateFromProps (nextProps, prevState) {
	    if(nextProps) {
	       return { question: nextProps.question};
	    }
	    else return null;
	}
    
	render() {
		let { question} = this.state
		return (
			<View>
		    	<Text style={styles.bigBlue}>{question.question}</Text>
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
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  }
});

export default connect(mapStateToProps)(QuizQuestion);