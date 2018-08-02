import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import "react-navigation";
import { AsyncStorage } from "react-native";
import Converter from './converter.js'

export default class Home extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      token: "", 
      recs: {}
    }

    this.getTokenState();
  }

  componentDidUpdate() {
    console.log(this.state.recs)
  }

  getTokenState = () => {
    AsyncStorage.getItem("auth-token").then(token => this.stateSetter(token))
  }

  stateSetter = (token) => {
    this.setState({token: token})
    this.userRecs();
  }

  setRecs = (recs) => {
    this.setState({recs: recs})
  }

  userRecs = async ()  => {
    const url = `https://reccme.herokuapp.com/api/users/sync`;
    await fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${this.state.token}`,
        'Content-Type': 'application/json' }
    })
      .then((res) => res.json()
      .then(recs => this.setRecs(recs.user_reccs)))
      // .then(res_json =>  res_json)
      // .then(text => JSON.parse(text))
      // .then(jsObj => console.log(jsObj))
  }

  render(){
    // console.log(`Here : ${rec}`);
    const recs = this.state.recs; 
    const images = [
  {
    key: 1,
    name: "",
    image: require("../images/1.jpg"),
    url: "https://unsplash.com/photos/C9t94JC4_L8"
  },
  {
    key: 2,
    name: "Jamison McAndie",
    image: require("../images/2.jpg"),
    url: "https://unsplash.com/photos/waZEHLRP98s"
  },
  {
    key: 3,
    name: "Alberto Restifo",
    image: require("../images/3.jpg"),
    url: "https://unsplash.com/photos/cFplR9ZGnAk"
  },
  {
    key: 4,
    name: "John Towner",
    image: require("../images/4.jpg"),
    url: "https://unsplash.com/photos/89PFnHKg8HE"
  }
];
    return(
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            {
             recs.map(({ name, id}) => (
              <Card title={`CARD ${id}`} image={require("../images/4.jpg")} key={id}>
                <Text style={{ marginBottom: 10 }}>
                  Photo by {name}.
                </Text>
                <Button
                  backgroundColor="#03A9F4"
                  title="VIEW NOW"
                  onPress={this.getTokenState}
                />
              </Card>
            ))}
          </ScrollView>
        </View>
      )
  }
}

