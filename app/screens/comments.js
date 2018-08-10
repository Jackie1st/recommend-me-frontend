import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import "react-navigation";
import { AsyncStorage } from "react-native";

export default class Comments extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      comments: this.props.comments,
      recId: this.props.recId 
    }
    this.getAllComments(); 
  }

  getAllComments = () => {
    const url = `https://reccme.herokuapp.com/api/reccs/${this.state.recId}/sync_comments`;
    AsyncStorage.getItem("auth-token").then(token => fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }))
      .then((res) => res.json()
      .then((allComments) => this.setState({comments: allComments.recc_comments})));
  }

  display = () => {
    if (this.state.comments){
      return(
        <View style={{ flex: 1 }}>
       
          {
            this.state.comments.map((comment) => (
              // <Card title={`${comment.user_id}`} key={comment.id}>
                <Text style={{ marginBottom: 10 }} key={comment.id} >
                  {comment.comment_text}
                </Text>
                
              // </Card>
            ))
          }
    
        </View> 
      )
    }
    else if(!Array.isArray(this.state.comments) || !this.state.comments.length){
      return(
        <View>
          <Text>
            "No comments"
          </Text>
        </View>
      )
    }
  }
  render(){
    return(
      <View>
        {this.display()}
      </View>
    )
  }
}