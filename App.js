import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Container, Header, Content, Form, Item, Input, Button, Card, CardItem, Body } from 'native-base';
// import FontAwesome, { Icons } from 'react-native-fontawesome';
import FontAwesome from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';

class SignIn extends React.Component {
  render() {
    return (

      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Email" />
            </Item>
            <Item last>
              <Input secureTextEntry = {true} placeholder="Password" />
            </Item>
          </Form>
        <Button primary title="Go to Details" onPress={() => this.props.navigation.navigate('Details')}><Text> Sign in </Text></Button>
        <Button primary title="Go to Details" onPress={() => this.props.navigation.navigate('Register')}><Text> Register </Text></Button>

        </Content>
      </Container>
      
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button onPress={() => this.props.navigation.push('Details')}><Text> Go to Details again </Text></Button>
        <Button onPress={() => this.props.navigation.push('Home')}><Text> Home </Text></Button>
        <Button onPress={() => this.props.navigation.goBack()}><Text> Go Back </Text></Button>

        
      </View>
    );
  }
}

class RegisterScreen extends React.Component {

  render() {
    return(

      <Container>
        <Header />
        <Content>
          <Card>
          
         
          <Form>
            <Item>
              <Input placeholder="First Name" />
            </Item>
            <Item >
              <Input placeholder="Last Name" />
            </Item>
            <Item >
              <Input placeholder="Email" />
            </Item>
            <Item >
              <Input placeholder="Birthdate" />
            </Item>
            <Item >
              <Input secureTextEntry = {true} placeholder="Password" />
            </Item>
            <Item last>
              <Input secureTextEntry = {true} placeholder="Confirm password" />
            </Item>
          </Form>
        <Button primary  onPress={() => this.props.navigation.navigate('SignIn')}><Text> Sign In </Text></Button>
        <Button primary  onPress={() => this.props.navigation.navigate('Home')}><Text> Submit </Text></Button>

        
        
        </Card>

        </Content>
      </Container>
      );
  }
}

class ProfileScreen extends React.Component {
  render(){
    return(
        <View style={{ paddingVertical: 20 }}>
    <Card title="John Doe">
      <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
      </View>
      <Button backgroundColor="#03A9F4" onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}><Text>SIGN OUT</Text></Button>
      
    </Card>
  </View>
      )
  }
}

const RootStack = createStackNavigator({
    SignUp: {
    screen: RegisterScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  },

  Home: {
    screen: DetailsScreen,
    navigationOptions: {
      title: "Details Page"
    }
  }
});

export const SignedIn = createBottomTabNavigator({
  Home: {
    screen: DetailsScreen,
    navigationOptions: {
      tabBarLabel: "Home",
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: "Profile",
    }
  }
});


export default class App extends React.Component {
  
  render() {
    return <SignedIn/>;
  }
}