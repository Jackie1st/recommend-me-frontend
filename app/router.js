import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import RecShowPage from "./screens/RecShowPage";
import SendRec from "./screens/SendRec";
import MakeComment from './screens/makeComment';
import SentRecs from './screens/SentRecs';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  },
});

export const IndividualRec = createStackNavigator({
  RecShow: {
    screen: RecShowPage,
    navigationOptions: {
      title: "My Rec",
      headerStyle
    }
  },
  makeCommentPage: {
    screen: MakeComment,
    navigationOptions: {
      title: "Comment",
      headerStyle
    }
  },
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    SendRec: {
      screen: SendRec,
      navigationOptions: {
        tabBarLabel: "Send Rec",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="paper-plane" size={30} color={tintColor} />
        )
      }
    },
    SentRecs: {
      screen: SentRecs,
      navigationOptions: {
        tabBarLabel: "Sent Recs",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="folder" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      },
      IndividualRec: {
        screen: IndividualRec
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
