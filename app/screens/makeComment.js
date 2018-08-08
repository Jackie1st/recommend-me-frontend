import React, { Component } from 'react';
import { Linking, ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Picker, Form } from "native-base";
import {Card,Button,FormLabel,FormInput} from "react-native-elements";
import { AsyncStorage } from "react-native";

export default class MakeComment extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      comment: "",
      userId: this.props.navigation.getParam('userId'),
      recId: this.props.navigation.getParam('recId'), 
    }
  }

  postComment = () => {
    const url = 'https://reccme.herokuapp.com/api/comments';
    const data = {"comment": {"comment_text": this.state.comment,
      "user_id": this.state.userId,
      "recc_id": this.state.recId
    }}
    AsyncStorage.getItem("auth-token").then(token => fetch(url, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }))
    .then((res) => res.json())
    .then((res_json) => {res_json ? this.props.navigation.goBack(alert('Comment submitted')) : alert('Something went wrong. Try again.')});
  }

  display = () => {
    if (this.state.recId){
      return(
        <View style={{ flex: 1 }}>
          <Card title="Make a Comment">
            <FormLabel >Enter Comment:</FormLabel>
            <FormInput width= "100%" multiline={true} value={this.state.comment} onChangeText={(comment) => this.setState({comment})} placeholder="Comment goes here..." />
            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="SUBMIT"
              onPress={() => {
                this.postComment();
              }}
            />
          </Card>
        </View>
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

  render(){
    console.log(this.state)
    return(
      <View style={{ flex: 1 }}>
        {this.display()}
      </View>
    )
  }
}