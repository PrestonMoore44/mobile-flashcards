import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { EmojiRain } from 'react-native-emoji-rain'
import QuizQuestion from './QuizQuestion'

class Quiz extends Component {
    state = {
        deck : {},
        index:0,
        deckQuestion:{},
        answer:'',
        checkMe:false,
        showMe:false,
        correctCount:0,
    }

    onAnswerChange = (t) => {
    	//console.log(this.state, "State...");
    	this.setState((state, props) => ({
    		answer: t,
    	}))
    }

    resetCheckMe = () => {
    	console.log(this.state, " State before tansfer....")
    	if (this.state.index !== (this.state.deck.length -1)) { //Go to next question, if not on last question...
	    	this.setState((state, props) => ({
		    	checkMe: false,
		    	showMe:false,
		    	index: state.index + 1,
		    	deckQuestion: state.deck[state.index+1]
		    }))
    	} else {
	    	this.props.navigation.navigate('Score', this.state.correctCount)
    	}
	}

    showAnswer = () => {
    	this.setState((state, props) => ({ showMe: true }))
    	setTimeout(() => {
	    	this.resetCheckMe();		
    	},6000)
    }

    checkAnswer = () => {
    	this.setState((state, props) => (
    		state.answer == state.deckQuestion.answer ?
    		{
    			checkMe: true,
    			correctCount: state.correctCount+1
    		} :
    		{
    			checkMe: true,
    		}
    	))
    	setTimeout(() => {
	    	this.resetCheckMe();		
    	},6000)
    }

	static getDerivedStateFromProps (nextProps, prevState) {
	    if(nextProps.route.params) {
	    	//console.log(nextProps.route.params, " Next Props...")
	       return { 
	       	deck: nextProps.route.params.questions,
	       	deckQuestion: nextProps.route.params.questions[prevState.index]
	       };
	    }
	    else return null;
	}
    
	render() {
		let { deck, deckQuestion,index,checkMe, answer, showMe } = this.state
		let { onAnswerChange, checkAnswer, showAnswer } = this
		return (
			<View style={styles.container}>
			    {  showMe  &&
				        <EmojiRain emoji="🤜🤛" count={25}/>
			    }
			    {  checkMe && deckQuestion.answer === answer &&
				        <EmojiRain emoji="👍☺️👍" count={25}/>
			    }
			    {  checkMe && deckQuestion.answer !== answer &&
				        <EmojiRain emoji="👎😕👎" count={25}/>
			    }
				<Text style={{marginBottom:40, fontSize:20, fontWeight:'bold', paddingLeft:10}}>{index + 1} / {deck.length}</Text>
		    	<QuizQuestion question={deckQuestion}></QuizQuestion>
		    	<View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
				    <TextInput
				        	placeholder="Answer..."
					      	style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:300,padding:5,fontSize:18}}
					      	onChangeText={text => onAnswerChange(text)}
					      	value={answer}
					    />
				</View>
			    <View style={{ flex: 1, alignItems: 'center' }}>
	 		    	<TouchableOpacity style={styles.button} onPress={showAnswer}>
					     <Text >Show Answer</Text>
					</TouchableOpacity>
	 		    	<TouchableOpacity style={styles.buttonTwo} onPress={checkAnswer}>
					     <Text >Check Answer</Text>
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
    backgroundColor:"white",
    paddingTop:10
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
    fontSize:18,
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

export default connect(mapStateToProps)(Quiz);