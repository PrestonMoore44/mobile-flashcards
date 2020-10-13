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
        showAnswer:false,
        correctCount:0,
    }

    onAnswerChange = (t) => {
    	this.setState((state, props) => ({
    		answer: t,
    	}))
    }

    resetCheckMe = () => {
    	if (this.state.index !== (this.state.deck.length -1)) { //Go to next question, if not on last question...
	    	this.setState((state, props) => ({
		    	checkMe: false,
		    	showMe:false,
		    	index: state.index + 1,
                answer:'',
                showQuestionAnswer: false,
		    	deckQuestion: state.deck[state.index+1]
		    }))
    	} else {
            this.setState((state, props) => ({
                checkMe: false,
                showMe:false,
                index: 0,
                answer:'',
                showQuestionAnswer: false,
                deckQuestion: state.deck[0]
            }))
	    	this.props.navigation.navigate('Score', this.state)
    	}
	}

    showAnswer = () => {
    	this.setState((state, props) => ({ showQuestionAnswer: true }))
    	setTimeout(() => {
	    	this.resetCheckMe();		
    	},4500)
    }

    checkAnswer = () => {
    	this.setState((state, props) => (
    		state.answer == state.deckQuestion.answer ?
    		{
    			checkMe: true,
    			correctCount: state.correctCount+1,
    		} :
    		{
    			checkMe: true,
    		}
    	))
    	setTimeout(() => {
	    	this.resetCheckMe();		
    	},4500)
    }

	static getDerivedStateFromProps (nextProps, prevState) {
	    if (nextProps.route.params) {
	       return { 
	       	deck: nextProps.route.params.questions,
	       	deckQuestion: nextProps.route.params.questions[prevState.index]
	       };
	    } else return null;
	}
    
	render() {
		let { deck, deckQuestion,index,checkMe, answer, showMe, showQuestionAnswer } = this.state
		let { onAnswerChange, checkAnswer, showAnswer } = this
		return (
			<View style={[styles.container, (checkMe && deckQuestion.answer == answer) ? 
                    styles.greenBack : checkMe && (deckQuestion.answer !== answer) ? styles.redBack : 
                    showQuestionAnswer ? styles.yellowBack : styles.container
                    ]}>
			    {  showQuestionAnswer &&
				        <EmojiRain emoji="🤜🤛" count={5}/>
			    }
			    {  checkMe && (deckQuestion.answer == answer) &&
				        <EmojiRain emoji="👍☺️" count={5}/>
			    }
			    {  checkMe && (deckQuestion.answer !== answer) &&
				        <EmojiRain emoji="👎😕" count={5}/>
			    }
				<Text style={{marginBottom:40, fontSize:20, fontWeight:'bold', paddingLeft:10}}>{index + 1} / {deck.length}</Text>
		    	<QuizQuestion question={deckQuestion}></QuizQuestion>
		    	<View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
				    <TextInput
				        	placeholder="Answer..."
					      	style={{ height: 40, backgroundColor:'white', borderColor: 'gray', borderWidth: 1,width:300,padding:5,fontSize:18}}
					      	onChangeText={text => onAnswerChange(text)}
					      	value={answer}
					    />
                    <View style={{ alignItems: 'center', height:40, fontSize: 27, marginTop:60}}>
                    {  showQuestionAnswer &&
                        <Text style={{ fontSize: 22}}>{deckQuestion.answer}</Text>
                    }
                    </View>
				</View>
			    <View style={{ flex: 1, alignItems: 'center' }}>
	 		    	<TouchableOpacity style={styles.button} onPress={showAnswer}>
					     <Text >Show Answer</Text>
					</TouchableOpacity>
	 		    	<TouchableOpacity style={styles.buttonTwo} onPress={checkAnswer}>
					     <Text style={{color: "white"}}>Check Answer</Text>
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
  greenBack: {
    backgroundColor: "#6aff65"
  },
  yellowBack : {
    backgroundColor: '#feff8f'
  },
  redBack: {
    backgroundColor: '#ff6565'
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

export default connect(mapStateToProps)(Quiz);