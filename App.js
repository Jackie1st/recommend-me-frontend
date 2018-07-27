import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';

class HomeScreen extends React.Component {
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
              <Input placeholder="Password" />
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

        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
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
              <Input placeholder="Password" />
            </Item>
            <Item last>
              <Input placeholder="Confirm password" />
            </Item>
          </Form>
        <Button primary title="Go to Details" onPress={() => this.props.navigation.navigate('Details')}><Text> Submit </Text></Button>
        

        </Content>
      </Container>
      );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },

    Register: {
      screen: RegisterScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}