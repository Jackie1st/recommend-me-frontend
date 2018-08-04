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
      recs: null
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
      .then((recs) => this.setState({recs: recs.user_proposals}));
    

    this.getTokenState();
  }

  componentDidUpdate() {
    console.log(this.state);
  }


  getTokenState = () => {
    AsyncStorage.getItem("auth-token").then(token => this.stateSetter(token))
  }

  stateSetter = (token) => {
    this.setState({token: token})
    
  }

    display = () => {

  if (this.state.recs){
      return (
          <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            {
             this.state.recs.map((rec) => (
              <Card title={`CARD ${rec.id}`} image={require("../images/4.jpg")} key={rec.id}>
                <Text style={{ marginBottom: 10 }}>
                  Photo by {rec.name}.
                </Text>
                <Button
                  backgroundColor="#03A9F4"
                  title="VIEW NOW"
                  onPress={() => {this.props.navigation.navigate("RecShow", {recId: rec.id});}}
                />
              </Card>
            ))}
          </ScrollView>
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
    const recs = this.state.recs;
    console.log(this.state);
    // const trying = recs; 
    // const output = trying.user_data; 
    // console.log(`Just the User data: ${output}`)
    // console.log(`Rendering out recs here: ${this.state.recs}`);
    console.log(`seeing the recs here: ${recs}`);

    return(
      <View style={{ flex: 1 }}>
        {this.display()}
      </View>
    )

}
  

  
  
}

