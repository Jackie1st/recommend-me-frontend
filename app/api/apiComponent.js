import React, { Component } from 'react';

export default class ApiCalls extends React.Component{
  constructor(props){
    super(props); 

    this.state = {
      userToken: "",
    }
  }

  signIn = () => {
    return "hi"
  }
}