import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import "react-navigation";
import { AsyncStorage } from "react-native";
import Converter from './converter.js'
import {gotRecs} from '../auth.js'

export default class Home extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      token: "", 
      recs: null
    }
    const url = `https://reccme.herokuapp.com/api/users/sync`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer 4e072c3e31021a0b11c29b1075794596eb9898534fb042be1349d271734f6317`,
        'Content-Type': 'application/json' }
    })
      .then((res) => res.json()
      .then((recs) => this.setState({recs: recs.user_reccs})));

    this.getTokenState();
    // this.userRecs();
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

      const images = [
  {
    key: 1,
    name: "Jone",
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
                  onPress={this.getTokenState}
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

