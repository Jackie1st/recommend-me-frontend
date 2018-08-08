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
    .then((userRecData) => this.setState({data: userRecData, allUsers: userRecData.user_data_all}));

    this.getTokenState();
  }

  getTokenState = () => {
    AsyncStorage.getItem("auth-token").then(token => this.stateSetter(token))
  }

  stateSetter = (token) => {
    this.setState({token: token})
  }

  

  displayed = () => {
    
    if (this.state.data){
      const allData = this.state.data
      const recs = [];
      console.log(this.state.data.user_proposals.length);
      for (let i = 0; i < allData.user_proposals.length; i++){
        const elementPosition = this.state.allUsers.map(function(x) {return x.id;}).indexOf(allData.user_proposals[i][0].user_id);
        const objectFound = this.state.allUsers[elementPosition]
        recs.push(
          <Card title={`${allData.user_proposals[i][0].name}`} image={require("../images/4.jpg")} key={`${allData.user_proposals[i][0].id}`}>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.allUsers ? `Recommended by: ${objectFound.first_name} ${objectFound.last_name}` : ''}
                </Text>
                <Button
                  backgroundColor="#03A9F4"
                  title="VIEW NOW"
                  onPress={() => {this.props.navigation.navigate("RecShow", {comments: allData.user_proposals[i][1],recName: allData.user_proposals[i][0].name, recLocation: allData.user_proposals[i][0].location, recDescription: allData.user_proposals[i][0].description, recId: allData.user_proposals[i][0].id, sender: allData.user_proposals[i][0].user_id, allUsers: this.state.allUsers});}}
                />
              </Card>
        );
        console.log(allData.user_proposals[i][0]);
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

