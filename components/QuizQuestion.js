import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

class QuizQuestion extends Component {
    state = {
        deck : {},
        answers:{}
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
        answers : Object.values(state).filter(it => !it.questions)[0]
    }
}

const styles = StyleSheet.create({
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  }
});

export default connect(mapStateToProps)(QuizQuestion);