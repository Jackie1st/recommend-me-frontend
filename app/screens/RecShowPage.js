import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { Button, Card } from "react-native-elements";
import { AsyncStorage } from "react-native";
import Comments from './comments.js'; 

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20
  },
  text: {
    marginTop: 15,
    textAlign: 'left',
    fontSize: 16
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  map: {
    width: '100%',
    height: '30%'
  },
  backButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    width: '25%'
  },
  backButtonText:{
    color: 'white',
    textAlign: 'center'
  }
})

class ViewRecPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      googleApiResponse: null,
      allUsers: this.props.navigation.getParam('allUsers'),
      comments: this.props.navigation.getParam('comments')
    }
    this.getLatLng();
    // this.getAllUser();
    // this.getAllComments(); 
  }

  // getAllComments = async () => {
  //   const url = `https://reccme.herokuapp.com/api/reccs/${this.state.recId}/sync_comments`;
  //   await AsyncStorage.getItem("auth-token").then(token => fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Cache-Control': 'no-cache',
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     }
  //   }))
  //     .then((res) => res.json()
  //     .then((allComments) => this.setState({comments: allComments.recc_comments})));
  // }

  getLatLng = () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.navigation.getParam('recLocation')}&key=AIzaSyCDCTxn5r6lLxw9UsV-4ikuXxhP_q1fVys`

    fetch(url, {
      method: 'GET',
      headers: {
        "Cache-Control": "no-cache",
      }
    })
    .then(res => res.json())
    .then(response_json => {this.setState({googleApiResponse: response_json})})
  }

  // getAllUser = () => {
  //   const url = `https://reccme.herokuapp.com/api/users/sync_all`;
  //   AsyncStorage.getItem("auth-token").then(token => fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Cache-Control': 'no-cache',
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     }
  //   }))
  //     .then((res) => res.json())
  //     .then((users) => this.setState({allUsers: users}));
  // }


  display = () => {
    const recName = this.props.navigation.getParam('recName');
    const recLocation = this.props.navigation.getParam('recLocation');
    const recDescription = this.props.navigation.getParam('recDescription');
    const recId = this.props.navigation.getParam('recId');
    const sender = this.props.navigation.getParam('sender');
    const userId = this.props.navigation.getParam('userId');
    const usersList = this.props.navigation.getParam('allUsers');
      const elementPosition = usersList.map(function(x) {return x.id;}).indexOf(sender);
      const objectFound = usersList[elementPosition]
      

      const getName = (user_id) => {
        const position = usersList.map(function(x) {return x.id;}).indexOf(user_id);
        const found = usersList[position]
        return `${found.first_name} ${found.last_name}`
      }

    if (this.state.googleApiResponse){
      const apiResponse = this.state.googleApiResponse
      return(
        <View style={{ flex: 1 }}>
            <MapView style = {styles.map}
              region = {{
                latitude: apiResponse.results[0].geometry.location.lat,
                longitude: apiResponse.results[0].geometry.location.lng,
                latitudeDelta: 0.0020,
                longitudeDelta: 0.0020,
              }}>
                <MapView.Marker
                  coordinate = {{
                    latitude: apiResponse.results[0].geometry.location.lat,
                    longitude: apiResponse.results[0].geometry.location.lng }}
                  title = {`${apiResponse.results[0].geometry.location.lat}, ${apiResponse.results[0].geometry.location.lng}`} />
            </MapView>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <Card>
          <Text style={styles.text}>Address: {apiResponse.results[0].formatted_address}</Text>
          <Text style={styles.text}>Description: {recDescription}</Text>
          <Text style={styles.text}>Location: {recLocation}</Text>

          <Text style={styles.text}>Recommender: {this.state.allUsers ? `${objectFound.first_name} ${objectFound.last_name}` : ""}</Text>
        </Card>
        <Card>
          <Text style={styles.commentTitle}>Comments: </Text>
        </Card>
          {
            
            this.props.navigation.getParam('comments').map((comment) => (
              <Card title={getName(comment.user_id)} key={comment.id}>
                <Text style={{ marginBottom: 10 }}>
                  {comment.comment_text}
                </Text>
                
              </Card>
            ))
          }
          
          <Button
                  backgroundColor="#03A9F4"
                  title="COMMENT"
                  style={{paddingTop: 10, paddingBottom: 10}}
                  onPress={() => this.props.navigation.navigate("makeCommentPage", {recId: recId, userId: this.props.navigation.getParam('userId')})}
                />
          <Button
                  backgroundColor="#03A9F4"
                  title="BACK"
                  style={{paddingTop: 10, paddingBottom: 10}}
                  onPress={() => this.props.navigation.navigate("Home")}
                />
            </ScrollView>
      </View>
      )
    }else{
      return(
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
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.display()}
      </View>
    )
  }
}

export default ViewRecPage
