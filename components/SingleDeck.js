import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts'

class SingleDeck extends Component {
  state = {
    deck : {}
  }

  addQuestion = () => {
    this.props.navigation.navigate("Add Question", this.state.deck)
  }

  startQuiz = () => {
    if(this.state.deck.questions.length === 0) {
      alert("Add a Question Before Starting a Quiz");
    } else {
      this.props.navigation.navigate("Quiz", this.state.deck) 
    }
  }

	static getDerivedStateFromProps (nextProps, prevState) {
	  if(nextProps.route.params) {
	    return { 
        deck: nextProps.route.params,
        answers: nextProps.answers,
      };
	  }
	  else return null;
	}
    
	render() {
		let { deck } = this.state
		return (
			<View style={styles.container}>
        <AwesomeAlert
                    show={!!this.state.answers.showAlert}
                    showProgress={false}
                    title="AwesomeAlert"
                    message="I have a message for you!"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Got it"
                    onConfirmPressed={() => {
                      this.setState({
                        answers : Object.assign(this.state.answers, { showAlert: false})
                      });
                    }}
          />
		    	<Text style={styles.bigBlue}>{deck.title}</Text>
		    	<Text style={styles.bigBlueSub}>{deck.questions.length} Questions</Text>
		    	<View style={{ flex: 1, alignItems: 'center' }}>
			    	<TouchableOpacity style={styles.button} onPress={this.addQuestion}>
					     <Text style={{fontSize:18, color:"white"}}>Add Question</Text>
					</TouchableOpacity>
			    	<TouchableOpacity style={styles.buttonTwo} onPress={this.startQuiz}>
					     <Text style={{color:"#5eb7d8", fontSize:18}}>Start Quiz</Text>
					</TouchableOpacity>
				</View>
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
  container: {
    fontSize: 18,
    height:"100%",
    width: "100%",
    backgroundColor:"#5eb7d8"
  },
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'white',
    paddingTop:100,
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0C9BD2",
    color: "white",
    borderRadius: 10,
    width:200,
    borderWidth:2,
    borderColor:"#0C9BD2",
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
    borderColor:"white",
    backgroundColor: "white",
    padding: 10
  },
  bigBlueSub: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: '#f4f4f4',
    paddingTop:5,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom:150
  },
});

export default connect(mapStateToProps)(SingleDeck);