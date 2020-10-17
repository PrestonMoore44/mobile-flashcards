import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient'
import AwesomeAlert from 'react-native-awesome-alerts'


const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.bigBlue} >{item.title}</Text>
    <Text style={styles.bigBlueSub}>
      <View style={{paddingRight:6,height:25, marginBottom:-12}}></View>
      <Text>Questions: {item.questions.length}</Text>
    </Text>
  </TouchableOpacity>
);

class Decks extends Component {
  state = {
    deckList: [],
    answers:{}
  }

  setSelected = (item) => {
    this.props.navigation.navigate('Single Deck', item)
  }

  addDeckNow = () => {
    this.props.navigation.navigate('Add Deck') 
  }

	renderItem = ({ item }) => {
	  const backgroundColor = "#f9c2ff";
	  return (
      <View style={styles.fullStrength} >
	    <Item
	      item={item}
	      onPress={() => this.setSelected(item)}
	    />
      </View>
	  );
	};

	static getDerivedStateFromProps (nextProps, prevState) {
	  if(nextProps.deckList!==prevState.deckList){
	    return { 
        deckList: nextProps.deckList,
        answers: nextProps.answers,
      };
	  }
	  else return null;
	}
    
	render() {
    let { addDeckNow } = this
    if ( this.state.deckList.length === 0 ) 
      return (
            <View style={styles.containerTwo}>
              <Text style={styles.bigBlueTwo}>
                Click Below to Create Your First Deck
              </Text>
                <TouchableOpacity style={styles.buttonTwo} onPress={addDeckNow}>
                  <Text style={{fontSize:18, color:"#0C9BD2"}}>Add Deck</Text>
                </TouchableOpacity>
            </View>
      )
          
		return (
  		  <SafeAreaView style={styles.container}>
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
    deckList : Object.values(state).filter(it => !!it.questions),
    answers: Object.values(state).filter(it => !it.questions)[0],
  }
}

const styles = StyleSheet.create({
  fullStrength: {
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
    backgroundColor: '#2ea4d2'
  },
  container: {
    fontSize: 18,
    flex:1,
    height:"100%",
    width: "100%",
    backgroundColor:"#5eb7d8",
    paddingTop:10
  },
  containerTwo: {
    fontSize: 18,
    flex:1,
    alignItems: 'center',
    height:"100%",
    width: "100%",
    backgroundColor:"#5eb7d8",
    paddingTop:10
  },
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'white',
    paddingTop:25,
    paddingLeft:9,
    paddingRight:9,
    fontWeight: 'bold',
    fontSize: 30,
  },
  bigBlueTwo: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'white',
    paddingTop:175,
    paddingLeft:40,
    paddingRight:40,
    fontWeight: 'bold',
    fontSize: 22,
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  buttonTwo: {
    marginTop:55,
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
    marginBottom:20
  },
});

export default connect(mapStateToProps)(Decks);