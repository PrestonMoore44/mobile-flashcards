import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} >
        <Text >{item.title}</Text>
    </TouchableOpacity>
);

class Decks extends Component {
    state = {
        deckList: [],
    }

    setSelected = (item) => {
    	//console.log(item, " Passed in...");
    	this.props.navigation.navigate('Single Deck', item)
    }

	renderItem = ({ item }) => {
	    const backgroundColor = "#f9c2ff";
	    return (
	      <Item
	        item={item}
	        onPress={() => this.setSelected(item)}
	        style={{ backgroundColor }}
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
		//console.log(" Hello World...", this.state.deckLists)
		return (
		    <SafeAreaView >
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
	//console.log(Object.values(state), "State... Passed in")
    return {
        deckList : Object.values(state)
    }
}

export default connect(mapStateToProps)(Decks);