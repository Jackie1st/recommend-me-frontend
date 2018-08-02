import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import "react-navigation";
import { AsyncStorage } from "react-native";


export default class Home extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      token: ""
    }
  }

  componentDidMount(){
    console.log(this.state.token); 
  }

  getTokenState =  () => {
    AsyncStorage.getItem("auth-token").then(token => this.stateSetter(token))
  }

  stateSetter = (token) => {
    this.setState({token: token})
  }

  userRecs =  ()  => {
    const url = `https://reccme.herokuapp.com/api/users/sync`;
              fetch(url, {
                    method: 'GET', // or 'PUT'
                    headers: {
                     'Cache-Control': 'no-cache',
                     Authorization: 'Bearer c50246fe10ac8c5d7a7f2388a2602803ad8ff842f5638453c2d14d2c6697a2fe',
                     'Content-Type': 'application/json' }
                }).then(res => console.log(res))
  }

  render(){
    const rec = this.userRecs();
    console.log(rec);
    console.log(this.state);
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
            {images.map(({ name, image, url, key }) => (
              <Card title={`CARD ${key}`} image={image} key={key}>
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




// const images = [
//   {
//     key: 1,
//     name: "Nathan Anderson",
//     image: require("../images/1.jpg"),
//     url: "https://unsplash.com/photos/C9t94JC4_L8"
//   },
//   {
//     key: 2,
//     name: "Jamison McAndie",
//     image: require("../images/2.jpg"),
//     url: "https://unsplash.com/photos/waZEHLRP98s"
//   },
//   {
//     key: 3,
//     name: "Alberto Restifo",
//     image: require("../images/3.jpg"),
//     url: "https://unsplash.com/photos/cFplR9ZGnAk"
//   },
//   {
//     key: 4,
//     name: "John Towner",
//     image: require("../images/4.jpg"),
//     url: "https://unsplash.com/photos/89PFnHKg8HE"
//   }
// ];

// export default () => (
//   <View style={{ flex: 1 }}>
//     <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
//       {images.map(({ name, image, url, key }) => (
//         <Card title={`CARD ${key}`} image={image} key={key}>
//           <Text style={{ marginBottom: 10 }}>
//             Photo by {name}.
//           </Text>
//           <Button
//             backgroundColor="#03A9F4"
//             title="VIEW NOW"
//             onPress={() => Linking.openURL(url)}
//           />
//         </Card>
//       ))}
//     </ScrollView>
//   </View>
// );


