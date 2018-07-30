import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";

export default class SignIn extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      text: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({text: event});
    console.log(this.state); 
  }

  componentDidMount() {
    
  }

  render(){
    return(
        <View style={{ paddingVertical: 20 }}>
    <Card>
      <FormLabel >Email</FormLabel>
      <FormInput value={this.state.text} onChangeText={this.handleChange} placeholder="Email address..." />
      <FormLabel>Password</FormLabel>
      <FormInput secureTextEntry placeholder="Password..." />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={() => {
          onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
        }}
      />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="REGISTER"
        onPress={() => {
          onSignIn().then(() => this.props.navigation.navigate("SignUp"));
        }}
      />
    </Card>
  </View> 
      )
  }
}


// export default ({ navigation }) => (
  
//   <View style={{ paddingVertical: 20 }}>
//     <Card>
//       <FormLabel >Email</FormLabel>
//       <FormInput onChangeText={(event) => handleChange(event)} placeholder="Email address..." />
//       <FormLabel>Password</FormLabel>
//       <FormInput secureTextEntry placeholder="Password..." />

//       <Button
//         buttonStyle={{ marginTop: 20 }}
//         backgroundColor="#03A9F4"
//         title="SIGN IN"
//         onPress={() => {
//           onSignIn().then(() => navigation.navigate("SignedIn"));
//         }}
//       />

//       <Button
//         buttonStyle={{ marginTop: 20 }}
//         backgroundColor="#03A9F4"
//         title="REGISTER"
//         onPress={() => {
//           onSignIn().then(() => navigation.navigate("SignUp"));
//         }}
//       />
//     </Card>
//   </View> 
// );

  
