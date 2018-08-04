import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { Button, Card } from "react-native-elements";

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
      fontSize: 12
   },
   map: {
      width: '100%',
      height: '40%'
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
      title: 'Testing123',
      description: 'this is a rough draft',
      comment: 'blah blah blah',
      location: 'China Town',
      rating: 'idk',
      recommender: 'Bob',
      googleApiResponse: null,
    }
    this.getLatLng();
  }

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


  display = () => {
    const recName = this.props.navigation.getParam('recName');
    const recLocation = this.props.navigation.getParam('recLocation');
    const recDescription = this.props.navigation.getParam('recDescription');
    const sender = this.props.navigation.getParam('sender');

    if (this.state.googleApiResponse){
    const apiResponse = this.state.googleApiResponse
    // const latitude = apiResponse.results[0].geometry.location.lat
    console.log(`Heres it rendering: ${apiResponse.results[0].geometry.location.lat}`)
      return(
        <View style={{ flex: 1 }}>
      <Card title={recName}>
      
          <Text style={styles.text}>Description: {recDescription}</Text>
          <Text style={styles.text}>Location: {recLocation}</Text>
          <Text style={styles.text}>Address: {apiResponse.results[0].formatted_address}</Text>

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
                  title = {this.state.title} />
            </MapView>

          <Text style={styles.text}>Rating: {this.state.rating}</Text>
          <Text style={styles.text}>Recommender: {`User #${sender}`}</Text>
          <Text style={styles.text}>Comments: {this.state.comment}</Text>
          
          <Button
                  backgroundColor="#03A9F4"
                  title="COMMENT"
                  style={{paddingTop: 20, paddingBottom: 20}}
                  // onPress={}
                />
          <Button
                  backgroundColor="#03A9F4"
                  title="BACK"
                  style={{paddingTop: 20, paddingBottom: 20}}
                  onPress={() => this.props.navigation.navigate("Home")}
                />
            </Card>
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
console.log(this.state)
    // const recIdNumber = this.props.navigation.getParam('recId');
     
    
    return (
      <View style={{ flex: 1 }}>
        {this.display()}
      </View>
    )
  }
}

export default ViewRecPage
