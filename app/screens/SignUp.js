import { onSignIn } from "../auth";
import React, { Component } from 'react';
import { Container, Header, Content, DatePicker, Text } from 'native-base';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date(),
      firstName: "",
      lastName: "", 
      email: "",
      password: "",
      confirmPass: "", 
      token: ""
    };
  }

  setDate = (newDate) => {
    this.setState({ chosenDate: newDate });
  }

  handleFirstname = (event) => {
    this.setState({firstName: event});
  }

  handleLastName = (event) => {
    this.setState({lastName: event});
  }

  handleEmail = (event) => {
    this.setState({email: event});
  }

  handlePassword = (event) => {
    this.setState({password: event});
  }

  handleConfirmPassword = (event) => {
    this.setState({confirmPass: event});
  }

  updateToken = (token) =>{
    this.setState({token: token})
  }

  async createUserFetch(){
    const url2 = 'https://reccme.herokuapp.com/users';
    const userData = {"user": {"first_name": this.state.firstName,
      "last_name": this.state.lastName,
      "birthdate": this.state.chosenDate,
      "email": this.state.email,
      "password": this.state.password
    }}
    
    await fetch(url2, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers:{
        'Content-Type': 'application/json'
      }
    }).catch(reason => {alert('Something went wrong. Please make sure all fields are populated. ')})
  }


  render() {
    return (
      <Container>
        <Header />
        <Content>
          <FormLabel>First Name</FormLabel>
          <FormInput value={this.state.firstName} onChangeText={this.handleFirstname} placeholder="First Name..." />
          <FormLabel>Last Name</FormLabel>
          <FormInput value={this.state.lastName} onChangeText={this.handleLastName} placeholder="Last Name..." />
          <FormLabel>Email</FormLabel>
          <FormInput value={this.state.email} onChangeText={this.handleEmail} placeholder="Email address..." />
          <FormLabel>Date of Birth</FormLabel>
          <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(1966, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date of birth"
            textStyle={{ color: "green", paddingLeft: 20 }}
            placeHolderTextStyle={{ color: "#d3d3d3", paddingLeft: 20 }}
            onDateChange={this.setDate}
          />
          <FormLabel>Password</FormLabel>
          <FormInput value={this.state.password} onChangeText={this.handlePassword} secureTextEntry placeholder="Password..." />
          <FormLabel>Confirm Password</FormLabel>
          <FormInput value={this.state.confirmPassword} onChangeText={this.handleConfirmPassword} secureTextEntry placeholder="Confirm Password..." />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={async () => {
            await this.createUserFetch();
            this.props.navigation.navigate("SignIn", alert('User created. Please sign in.'))}}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={() => this.props.navigation.navigate("SignIn")}
          />
        </Content>
      </Container>
    );
  }
}