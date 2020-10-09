import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

class Score extends Component {
    state = {
        score:0
    }

	static getDerivedStateFromProps (nextProps, prevState) {
      console.log(nextProps.route.params)
	    if(nextProps){
	       return { score: nextProps.route.params};
	    }
	    else return null;
	}
    
	render() {
		return (
      <View style={styles.container}>
        <Text style={styles.bigBlue}>Congratulations!</Text>
        <Text style={styles.bigBlue}>{this.state.score}</Text>
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

export default connect(mapStateToProps)(Score);