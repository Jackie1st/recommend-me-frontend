import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import "react-navigation";
import { AsyncStorage } from "react-native";

export default class SentRecs extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      token: "", 
      recs: null,
      userId: null, 
      data: null,
      allUsers: null, 
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
    .then((userRecData) => this.setState({data: userRecData, allUsers: userRecData.user_data_all, userId: userRecData.user_data.id}));

    this.getTokenState();
  }

  getTokenState = () => {
    AsyncStorage.getItem("auth-token").then(token => this.stateSetter(token))
  }

  stateSetter = (token) => {
    this.setState({token: token})
  }

  

  displayed = () => {
    console.log(this.state.token);
    if (this.state.data){
      const allData = this.state.data
      const recs = [];
      console.log(this.state.data.user_reccs.length);
      for (let i = 0; i < allData.user_reccs.length; i++){
        const elementPosition = this.state.allUsers.map(function(x) {return x.id;}).indexOf(allData.user_reccs[i][0].user_id);
        const objectFound = this.state.allUsers[elementPosition]
        recs.push(
          <Card title={`${allData.user_reccs[i][0].name}`} image={require("../images/2.jpg")} key={`${allData.user_reccs[i][0].id}`}>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.allUsers ? `Recommended by: ${objectFound.first_name} ${objectFound.last_name}` : ''}
                </Text>
                <Button
                  backgroundColor="#03A9F4"
                  title="VIEW NOW"
                  onPress={() => {this.props.navigation.navigate("RecShow", {comments: allData.user_reccs[i][1],recName: allData.user_reccs[i][0].name, recLocation: allData.user_reccs[i][0].location, recDescription: allData.user_reccs[i][0].description, recId: allData.user_reccs[i][0].id, sender: allData.user_reccs[i][0].user_id, allUsers: this.state.allUsers, userId: this.state.userId});}}
                />
              </Card>
        );
        
      }
    
    return recs
    }else{
      <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <Card >
              <Text style={{ marginBottom: 10 }}>
                Loading...
              </Text>
            </Card>
          </ScrollView>
        </View>
    }
  }

  render(){
    return(
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.displayed()}
        </ScrollView>
      </View>
    )
  }
}

