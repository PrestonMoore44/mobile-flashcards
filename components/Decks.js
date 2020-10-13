import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.bigBlue} >{item.title}</Text>
    <Text style={styles.bigBlueSub} >Questions: {item.questions.length} </Text>
  </TouchableOpacity>
);

class Decks extends Component {
  state = {
    deckList: [],
  }

  setSelected = (item) => {
    this.props.navigation.navigate('Single Deck', item)
  }

	renderItem = ({ item }) => {
	  const backgroundColor = "#f9c2ff";
	  return (
	    <Item
	      item={item}
	      onPress={() => this.setSelected(item)}
	    />
	  );
	};

	static getDerivedStateFromProps (nextProps, prevState) {
	  if(nextProps.deckList!==prevState.deckList){
	    return { deckList: nextProps.deckList};
	  }
	  else return null;
	}
    
	render() {
		return (
		  <SafeAreaView style={styles.container}>
		    <FlatList
		      data={this.state.deckList}
		      renderItem={this.renderItem}
		      keyExtractor={item => item.title}
		    />
		  </SafeAreaView>
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
    flex:1,
    height:"100%",
    width: "100%",
    backgroundColor:"white",
    paddingTop:10
  },
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    paddingTop:25,
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: "center",
    padding: 10,
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
    marginBottom:20
  },
});

export default connect(mapStateToProps)(Decks);