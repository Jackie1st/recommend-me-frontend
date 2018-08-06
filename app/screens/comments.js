import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import "react-navigation";
import { AsyncStorage } from "react-native";

export default class Comments extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      comment: "",
    }
  }

  render(){
    return(
      <View>
        <Text>
          Testing the comments!!!!!
        </Text>
      </View>
    )
  }
}