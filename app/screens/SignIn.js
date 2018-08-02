import React from "react";
import {
    View
} from "react-native";
import {
    Card,
    Button,
    FormLabel,
    FormInput
} from "react-native-elements";
import {
    onSignIn
} from "../auth";
// import { SignInFetch } from '../testFetch.js';
import { AsyncStorage } from "react-native";
import { signIn } from '..'

export default class SignIn extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                email: "",
                pass: "",
                token: ""
            };
            
            // this.handleEmail = this.handleEmail.bind(this);
            // this.handlePassword = this.handlePassword.bind(this);
            // this.SignInFetch = this.SignInFetch.bind(this);
            // this.updateToken = this.updateToken.bind(this); 

        }
        componentDidMount() {
            // console.log(this.state);
        }

        handleEmail = (event) => {
            this.setState({
                email: event
            });
        }

        handlePassword = (event) => {
            this.setState({
                pass: event
            });
        }

        updateToken = (token) => {
            this.setState({
                token: token
            })
        }

        SignInFetch = async() => {
            // const fetch = require('node-fetch');
            const url = 'https://reccme.herokuapp.com/oauth/token';
            const data = {
                "email": this.state.email,
                "password": this.state.pass,
                "grant_type": "password"
            };


            await fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(response_json => {
                    this.updateToken(response_json.access_token)
                })
                if (this.state.token === undefined){
                  return alert("Please make sure username and password are correct");
                }
            // console.log(this.state);
            onSignIn(this.state.token);
            this.props.navigation.navigate("SignedIn");
        }

          render(){
            return(
                <View style={{ paddingVertical: 20 }}>
            <Card>
              <FormLabel >Email</FormLabel>
              <FormInput value={this.state.email} onChangeText={this.handleEmail} placeholder="Email address..." />
              <FormLabel>Password</FormLabel>
              <FormInput value={this.state.pass} onChangeText={this.handlePassword} secureTextEntry placeholder="Password..." />

              <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03A9F4"
                title="SIGN IN"
                onPress={ this.SignInFetch }
              />

              <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03A9F4"
                title="REGISTER"
                onPress={() => this.props.navigation.navigate("SignUp")}
              />
            </Card>
          </View> 
              )
          }
        }