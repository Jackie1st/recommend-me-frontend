import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import "react-navigation";
import { AsyncStorage } from "react-native";

export default class Home extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      token: "", 
      recs: null,
      userId: null, 
    }
    const url = `https://reccme.herokuapp.com/api/users/sync`;
    AsyncStorage.getItem("auth-token").then(token => fetch(url, {
      method: 'GET',
      headers: {
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' }
    }))
    .then((res) => res.json())
    .then((recs) => this.setState({recs: recs.user_proposals, userId: recs.user_data.id}));

    this.getTokenState();
  }

  getTokenState = () => {
    AsyncStorage.getItem("auth-token").then(token => this.stateSetter(token))
  }

  stateSetter = (token) => {
    this.setState({token: token})
  }




  display = () => {

    if (!Array.isArray(this.state.recs) || !this.state.recs.length){
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          <Card title="YOU NEED SOME RECCS!">
            <Text style={{ marginBottom: 10 }}>
              Unfortunately you dont have any reccommedations to show yet. But when you do they will be right Here Waiting on you.
            </Text>
          </Card>
        </ScrollView>
      </View>    
    )
    } 
    else if (this.state.recs){
      console.log(this.state)
      return (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {
            this.state.recs.map((rec) => (
              <Card title={`${rec.location}`} image={require("../images/4.jpg")} key={rec.id}>
                <Text style={{ marginBottom: 10 }}>
                  Photo by {rec.name}.
                </Text>
                <Button
                  backgroundColor="#03A9F4"
                  title="VIEW NOW"
                  onPress={() => {this.props.navigation.navigate("RecShow", {recId: rec.id, recName: rec.name, recLocation: rec.location, recDescription: rec.description, sender: rec.user_id, userId: this.state.userId});}}
                />
              </Card>
            ))
          }
          </ScrollView>
        </View>    
      )
    }
    else{
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
    return(
      <View style={{ flex: 1 }}>
        {this.display()}
      </View>
    )
  }
}

