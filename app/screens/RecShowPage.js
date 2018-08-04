import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from "react-native-elements";

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
      recommender: 'Bob'
    }
  }

  render() {
    const recIdNumber = this.props.navigation.getParam('recId')
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{recIdNumber}</Text>
          <Text style={styles.title}>{this.state.title}</Text>
          <Text style={styles.text}>Description: {this.state.description}</Text>
          <Text style={styles.text}>Location: {this.state.location}</Text>

            <MapView style = {styles.map}
              region = {{
                latitude: 37.794565,
                longitude: -122.40783,
                latitudeDelta: 0.0020,
                longitudeDelta: 0.0020,
              }}>
                <MapView.Marker
                  coordinate = {{
                    latitude: 37.794565,
                    longitude: -122.40783 }}
                  title = {this.state.title} />
            </MapView>

          <Text style={styles.text}>Rating: {this.state.rating}</Text>
          <Text style={styles.text}>Recommender: {this.state.recommender}</Text>
          <Text style={styles.text}>Comments: {this.state.comment}</Text>
          <TouchableOpacity
            style = {styles.backButton}>
            <Text style = {styles.backButtonText}> COMMENT </Text>
          </TouchableOpacity>
          <Button
                  backgroundColor="#03A9F4"
                  title="BACK"
                  onPress={() => this.props.navigation.navigate("Home")}
                />
      </View>
    )
  }
}

export default ViewRecPage
