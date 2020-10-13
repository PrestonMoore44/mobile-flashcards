import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Score extends Component {
  state = {
    data:{}
  }

  retake = () => {
    this.props.navigation.navigate("Quiz", this.state.data.deck )
  }

  goHome = () => {
    this.props.navigation.navigate("Home")
  }

	static getDerivedStateFromProps (nextProps, prevState) {
      console.log(nextProps.route.params," <---- Params in score.....")
	    if(nextProps){
	       return { data: nextProps.route.params};
	    }
	    else return null;
	}
    
	render() {
    let { retake, goHome } = this;
		return (
      <View style={styles.container}>
        <Text style={styles.bigBlueF}>Congratulations!</Text>
        <Text style={styles.bigBlue}>Your Score: {(this.state.data.correctCount / this.state.data.deck.length) * 100}%</Text>
        <View style={{ flex: 1, alignItems: 'center', marginTop:50}}>
            <TouchableOpacity style={styles.button} onPress={retake}>
               <Text >Retake Quiz</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTwo} onPress={goHome}>
               <Text style={{color:"white"}}>Go Home</Text>
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
    fontSize: 27,
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
  bigBlueF: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    paddingTop:100,
    fontWeight: 'bold',
    fontSize: 34,
  },
});

export default connect(mapStateToProps)(Score);