import React, { Component } from "react";
import { WebView } from "react-native";

export default class BookInfo extends Component {
  render() {
    const itemId = this.props.navigation.getParam('itemId');
    
    return (
        <WebView 
            source={{ uri: itemId }} 
        />);

  }
}
