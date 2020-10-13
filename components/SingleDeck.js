import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

class SingleDeck extends Component {
  state = {
    deck : {}
  }

  addQuestion = () => {
    this.props.navigation.navigate("Add Question", this.state.deck)
  }

  startQuiz = () => {
    this.props.navigation.navigate("Quiz", this.state.deck)
  }

	static getDerivedStateFromProps (nextProps, prevState) {
	  if(nextProps.route.params) {
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
					     <Text style={{color:"white"}}>Start Quiz</Text>
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
    borderColor:"black",
    padding: 10,
    fontSize:18,
    marginBottom:25
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