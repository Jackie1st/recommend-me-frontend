import React, { Component } from 'react';
import { Linking, ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Icon, Picker, Form } from "native-base";
import {Card,Button,FormLabel,FormInput} from "react-native-elements";
import { AsyncStorage } from "react-native";

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
      userData: null,
      sendingTo: null, 
      allUsers: null,
      recId: null
    };
    this.getTokenState();
    this.getUserData();
    this.getAllUser();
  }

  getTokenState = () => {
    AsyncStorage.getItem("auth-token").then(token => this.stateSetter(token))
  }

  stateSetter = (token) => {
    this.setState({token: token});
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  getUserData = () => {
    const url = `https://reccme.herokuapp.com/api/users/sync`;
    AsyncStorage.getItem("auth-token").then(token => fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    }))
    .then((res) => res.json())
    .then((recs) => this.setState({userData: recs.user_data}));
  }

  makeRec = () => {
    const url2 = 'https://reccme.herokuapp.com/api/reccs';
    const recData = {"recc": {"name": this.state.title,
      "description": this.state.description,
      "location": this.state.location,
      "user_id": this.state.userData.id
    }};
    
    fetch(url2, {
      method: 'POST',
      body: JSON.stringify(recData),
      headers:{
        "Authorization": `Bearer ${this.state.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json()
    .then(res_json => {
      this.getPhotoReference(res_json.id);
      this.sendRec(res_json.id);
    }));
  }

  sendRec = (createdRecId) => {
    const url = "https://reccme.herokuapp.com/api/suggestions"
    const data = {"suggestion": {"suggestion_comment": "Hey I thought you would like this",
      "recipient_id": this.state.selected,
      "proposal_id": createdRecId
    }};

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        "Authorization": `Bearer ${this.state.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then(res_json => {
      if (res_json.id){
        
        this.props.navigation.navigate("Home", alert('Reccomendation sent succesfully!'));
      }else{
        alert('Oh no! something went wrong');
      }
    });
  }

  getPhotoReference = (recId) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.location}&key=AIzaSyCDCTxn5r6lLxw9UsV-4ikuXxhP_q1fVys`;
    const url2 = `https://reccme.herokuapp.com/api/reccs/${recId}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json' 
      }
    })
    .then((res) => res.json()
    .then((results) => fetch(url2, {
      method: 'PUT',
      body: JSON.stringify({"recc": {"picture_key": `${results.results[0].photos[0].photo_reference}`}}),
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${this.state.token}`,
        'Content-Type': 'application/json' 
      }
    })))
    .then((res) => res.json())
    .then((response_json) => console.log(response_json))
  }

  getAllUser = () => {
    const url = `https://reccme.herokuapp.com/api/users/sync_all`;
    AsyncStorage.getItem("auth-token").then(token => fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' }
    }))
    .then((res) => res.json())
    .then((users) => this.setState({allUsers: users.complete_users_array}));
  }

  display = () => {
    if (this.state.userData){
      const senderId = this.state.userData.id; 

      return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            {
              this.state.allUsers ? 
               this.state.allUsers.map((user) => (<Picker.Item key={user.id} label={`${user.first_name} ${user.last_name}`} value={user.id}/>))
              : <Picker.Item label="something" value="key0" />
            }
            </Picker>
            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="SEND REC"
              onPress={() => {
                this.makeRec();
              }}
            />
          </Card>
        </View>
        </TouchableWithoutFeedback>
      )
    }else{
      return (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <Card >
              <Text style={{ marginBottom: 10 }}>
                Loading...
              </Text>
            </Card>
          </ScrollView>
        </View>
      )
    }
  }
  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        {this.display()}
      </View> 
    );
  }
}

export default SendRecPage


