import React from "react";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";
import { AsyncStorage } from "react-native";

export default class Profile extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      token: "", 
      userData: null,
      firstName: '',
      lastName: '',
      userId: ''
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
    .then((recs) => this.setState({userData: recs.user_data, firstName: recs.user_data.first_name, lastName: recs.user_data.last_name}));

    this.getTokenState();
  }

  getTokenState = () => {
    AsyncStorage.getItem("auth-token").then(token => this.stateSetter(token))
  }

  stateSetter = (token) => {
    this.setState({token: token})
  }

  display = () => {
    if (this.state.userData){
      return (
        <View style={{ paddingVertical: 20 }}>
          <Card title={`${this.state.firstName} ${this.state.lastName}`}>
            <View
              style={{
                backgroundColor: "#bcbec1",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: 40,
                alignSelf: "center",
                marginBottom: 20
              }}
            >
              <Text style={{ color: "white", fontSize: 28 }}>{`${this.state.firstName[0]} ${this.state.lastName[0]}`}</Text>
            </View>
            <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}
            />
          </Card>
        </View>
      )
    }else{
      return (
        <View style={{ flex: 1 }}>
          <Card >
            <Text style={{ marginBottom: 10 }}>
              Loading...
            </Text>
          </Card>
        </View>
      )
    }
  }
  
  render(){
    return(
      <View style={{ paddingVertical: 20 }}>
        {this.display()}
      </View>
    )
  }
}

