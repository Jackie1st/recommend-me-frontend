import React from 'react';
import { View, Text, TextInput, Linking, ScrollView} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Container, Header, Content, Form, Item, Input, Button, Card, CardItem, Body } from 'native-base';
// import FontAwesome, { Icons } from 'react-native-fontawesome';
import FontAwesome from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
import MaterialIcons from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';


export class SignIn extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     signedIn: false,
  //     checkedSignIn: false
  //   };
  // }

// _onButtonPress = () => {
    
//     this.setState({
//       text: this.state.mimin
//     });
//   }
  
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
        <Button primary  onPress={() => this.setState({signedIn: true})}><Text> Sign in </Text></Button>
        <Button primary  onPress={() => this.props.navigation.navigate('SignUp')}><Text> Register </Text></Button>

        </Content>
      </Container>
      
    );
  }
}
class HomeScreen extends React.Component {
  render() {
    return (

     <Button primary title="Go to Details" onPress={() => this.props.navigation.navigate('Details')}><Text> Sign in </Text></Button>
     <Button primary title="Go to Details" onPress={() => this.props.navigation.navigate('Register')}><Text> Register </Text></Button>

     </Content>
     </Container>

     );
  }
}
export class DetailsScreen extends React.Component {
  

  render() {
    const images = [
  {
    key: 1,
    name: "Nathan Anderson",
    image: require("./images/1.jpg"),
    url: "https://unsplash.com/photos/C9t94JC4_L8"
  },
  {
    key: 2,
    name: "Jamison McAndie",
    image: require("./images/2.jpg"),
    url: "https://unsplash.com/photos/waZEHLRP98s"
  },
  {
    key: 3,
    name: "Alberto Restifo",
    image: require("./images/3.jpg"),
    url: "https://unsplash.com/photos/cFplR9ZGnAk"
  },
  {
    key: 4,
    name: "John Towner",
    image: require("./images/4.jpg"),
    url: "https://unsplash.com/photos/89PFnHKg8HE"
  }
]
}
//images are broken and dont know why. 
    return (
      <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      {images.map(({ name, image, url, key }) => (
        <Card title={`CARD ${key}`} image={image} key={key}> 
          <Text style={{ marginBottom: 10 }}>
            Photo by {name}.
          </Text>
        <Button onPress={() => this.props.navigation.push('Details')}><Text> Go to Details again </Text></Button>
        <Button onPress={() => this.props.navigation.push('Home')}><Text> Home </Text></Button>
        <Button onPress={() => this.props.navigation.goBack()}><Text> Go Back </Text></Button>
        </Card>
      ))}
    </ScrollView>
  </View>
    );
  }
}

export class RegisterScreen extends React.Component {

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

export class ProfileScreen extends React.Component {
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
      <Button backgroundColor="#03A9F4" onPress={() => () => navigation.navigate("SignedOut")}><Text>SIGN OUT</Text></Button>
      
    </Card>
  </View>
      )
  }
}

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  },
    SignUp: {
    screen: RegisterScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  },
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
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    this.state.signedIn
  }
  
  render() {


    


    if (this.state.signedIn) {
      return <SignedIn loggedIn={this.state.signedIn}/>;
    } else {
      return <SignedOut loggedIn={this.state.signedIn}/>;
    }
  }
}