import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Picker, Form } from "native-base";
import {
    Card,
    Button,
    FormLabel,
    FormInput
} from "react-native-elements";

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
      recommender: '', 
      selected: undefined, 
    };
  }

  inputs = (title, description, comment, location, rating, recommender) => {
    alert(`title: ${title}, description: ${description}, comment: ${comment}, location: ${location}, rating: ${rating}, recommender: ${recommender}`)
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title="Send Reccomendation">
          <FormLabel >Title Of Rec</FormLabel>
          <FormInput value={this.state.title} onChangeText={(title) => this.setState({title})} placeholder="Title of Rec..." />
          <FormLabel>Description</FormLabel>
          <FormInput value={this.state.description} onChangeText={(description) => this.setState({description})}  placeholder="Description..." />
          <FormLabel>Location</FormLabel>
          <FormInput value={this.state.location} onChangeText={(location) => this.setState({location})}  placeholder="Location..." />
          <FormLabel>Send Rec To:</FormLabel>

          <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          placeholder="Select a Person"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          style={{ width: undefined }}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
          >
          <Picker.Item label="Wallet" value="key0" />
          <Picker.Item label="ATM Card" value="key1" />
          <Picker.Item label="Debit Card" value="key2" />
          <Picker.Item label="Credit Card" value="key3" />
          <Picker.Item label="Net Banking" value="key4" />
          </Picker>

          <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SEND REC"
          onPress={() => this.props.navigation.navigate("Home", alert('Reccomendation sent succesfully!'))}
          />
        </Card>
      </View> 
    );
  }
}

export default SendRecPage


