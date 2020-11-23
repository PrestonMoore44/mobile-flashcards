import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'
import AwesomeAlert from 'react-native-awesome-alerts'
import AsyncStorage from '@react-native-async-storage/async-storage'

class AddQuestion extends Component {
    state = {
    	question: {
	        question:'',
	        answer:''
    	},
    	title:'',
        answers:{},
    }

    onChangeText = (t) => {
    	this.setState((state, props) => ({
    		question : {
    			question: t,
    			answer: state.question.answer
    		}
    	}))
    }

    onAnswerChange = (t) => {
    	this.setState((state,props) => ({
    		question : {
    			answer: t,
    			question: state.question.question
    		}
    	}))
    }
    AddCardToDeck = () => {
        //console.log("This",this.state.question, " <inside saveQuestionAnswer it is " ,this.state.title);
        const getDataThenSaveQuestion = async (data,title) => {
            var aDecks = await AsyncStorage.getItem('@Decks');
            aDecks = JSON.parse(aDecks);
            const jsonValue = JSON.stringify(
                Object.assign({
                    [title] : {
                        title: title,
                        questions: !!aDecks[title] && !!aDecks[title].questions && aDecks[title].questions.length > 0 ?
                        [...aDecks[title].questions, data] : [data] 
                    }
                })
            )
            var val = await AsyncStorage.setItem('@Decks', jsonValue);
            const jsonValues = await AsyncStorage.getItem('@Decks')
           // console.log(jsonValues, " After save...")
            // 
        }
        //console.log("This",this.state.question, " Hello it is " ,this.state.title);
        getDataThenSaveQuestion(this.state.question, this.state.title);
        this.props.dispatch(addQuestion(this.state.question,this.state.title))
        this.props.navigation.navigate('Home')
    }

	static getDerivedStateFromProps (nextProps, prevState) {
	    if(nextProps.route.params) {
	        return { 
                title: nextProps.route.params.title,
                answers:nextProps.answers
            };
	    }
	    else return null;
	}
    
	render() {
		let { deck } = this.state
		let { onChangeText, onAnswerChange, AddCardToDeck } = this
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
				<View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
			    	<TextInput
				      	style={{ height: 40,  backgroundColor:'white',width:300,marginBottom:50, padding:5,fontSize:18  }}
				      	placeholder="Question..."
				      	onChangeText={text => onChangeText(text)}
				      	value={this.state.question.question}
				    />
			        <TextInput
			        	placeholder="Answer..."
				      	style={{ height: 40, backgroundColor:'white',width:300,padding:5,fontSize:18  }}
				      	onChangeText={text => onAnswerChange(text)}
				      	value={this.state.question.answer}
				    />
			    </View>
			    <View style={{ flex: 1, alignItems: 'center' }}>
			    	<TouchableOpacity style={styles.buttonTwo} onPress={AddCardToDeck}>
					     <Text style={{color:"#0C9BD2", fontSize:18}}>Save</Text>
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
  buttonTwo: {
    alignItems: "center",
    borderRadius: 10,
    width:200,
    fontSize:18,
    borderWidth:2,
    borderColor:"white",
    backgroundColor: "white",
    padding: 10
  }
});

export default connect(mapStateToProps)(AddQuestion);