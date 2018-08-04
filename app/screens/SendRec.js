import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from '../../node_modules/react-native-elements';

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})

class SendRecPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      comment: '',
      location: '',
      rating: '',
      recommender: ''
    };
  }

  inputs = (title, description, comment, location, rating, recommender) => {
    alert(`title: ${title}, description: ${description}, comment: ${comment}, location: ${location}, rating: ${rating}, recommender: ${recommender}`)
  }

  render() {
    return (
      <View style={styles.container}>
      <Header
      placement = "left"
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'Recommend-Me', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff'}}
      />
    
        <TextInput
          style={styles.input}
          placeholder="Input Recommendation Title"
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}/>
        <TextInput
          style={styles.input}
          placeholder="Input Recommendation Description"
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}/>
        <TextInput
          style={styles.input}
          placeholder="Input Recommendation Comment"
          onChangeText={(comment) => this.setState({comment})}
          value={this.state.comment}/>
        <TextInput
          style={styles.input}
          placeholder="Input recommendation Location"
          onChangeText={(location) => this.setState({location})}
          value={this.state.location}/>
        <TextInput
          style={styles.input}
          placeholder="Input recommendation Rating"
          onChangeText={(rating) => this.setState({rating})}
          value={this.state.rating}/>
        <TextInput
          style={styles.input}
          placeholder="Input Recommendation recommender"
          onChangeText={(recommender) => this.setState({recommender})}
          value={this.state.recommender}/>
          <TouchableOpacity
            style = {styles.submitButton}
            onPress = {() => this.inputs(this.state.title, this.state.description, this.state.comment, this.state.location, this.state.rating, this.state.recommender)}>
            <Text style = {styles.submitButtonText}> SUBMIT </Text>
          </TouchableOpacity>
      </View>
        
    );
  }
}

export default SendRecPage


