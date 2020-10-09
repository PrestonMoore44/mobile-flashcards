import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

class SingleDeck extends Component {
    state = {
        deck : {}
    }

    addQuestion = () => {
    	//console.log("Adding Questions");
    	this.props.navigation.navigate("Add Question", this.state.deck)
    }


    startQuiz = () => {
    	//console.log("Starting Quiz");
    	this.props.navigation.navigate("Quiz", this.state.deck)
    }



	static getDerivedStateFromProps (nextProps, prevState) {
		//console.log("Begin...", nextProps, " <---- Next Props...")
	    if(nextProps.route.params) {
	    	//console.log(nextProps.params, " Next Props...")
	       return { deck: nextProps.route.params};
	    }
	    else return null;
	}
    
	render() {
		let { deck } = this.state
		return (
			<View style={styles.container}>
		    	<Text style={styles.bigBlue}>{deck.title}</Text>
		    	<Text style={styles.bigBlueSub}>{deck.questions.length} Questions</Text>
		    	<View style={{ flex: 1, alignItems: 'center' }}>
			    	<TouchableOpacity style={styles.button} onPress={this.addQuestion}>
					     <Text >Add Question</Text>
					</TouchableOpacity>
			    	<TouchableOpacity style={styles.buttonTwo} onPress={this.startQuiz}>
					     <Text >Start Quiz</Text>
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
    marginBottom:25
  },
  buttonTwo: {
    alignItems: "center",
    borderRadius: 10,
    width:200,
    backgroundColor: "orange",
    padding: 10
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

export default connect(mapStateToProps)(SingleDeck);