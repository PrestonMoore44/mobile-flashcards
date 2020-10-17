import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Score extends Component {
  state = {
    data:{},
    answers: {},
    correctCount:0
  }

  retake = () => {
    this.props.navigation.navigate("Quiz", this.state.data.deck )
  }

  goHome = () => {
    this.props.navigation.navigate("Home")
  }

	static getDerivedStateFromProps (nextProps, prevState) {
	    if(!!nextProps){
	       return { 
          data: nextProps.route.params.deck,
          correctCount: nextProps.route.params.correctCount,
          answers: nextProps.route.params.answers,
         };
	    }
	    else return null;
	}
    
	render() {
    let { retake, goHome } = this;
		return (
      <View style={styles.container}>
        <Text style={styles.bigBlueF}>Congratulations!</Text>
        <Text style={styles.bigBlue}>Your Score: {(this.state.correctCount / this.state.data.length) * 100}%</Text>
        <View style={{ flex: 1, alignItems: 'center', marginTop:50}}>
            <TouchableOpacity style={styles.button} onPress={retake}>
               <Text style={{fontSize:18, color:"#5eb7d8"}} >Retake Quiz</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTwo} onPress={goHome}>
               <Text style={{color:"white", fontSize:18}}>Go Home</Text>
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
    backgroundColor:"#5eb7d8",
    paddingTop:10
  },
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'white',
    paddingTop:100,
    fontWeight: 'bold',
    fontSize: 27,
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width:200,
    borderWidth:2,
    borderColor:"white",
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
    borderColor:"#0C9BD2",
    backgroundColor: "#0C9BD2",
    padding: 10
  },
  bigBlueF: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'white',
    paddingTop:100,
    fontWeight: 'bold',
    fontSize: 34,
  },
});

export default connect(mapStateToProps)(Score);