import React from "react";
import { MaterialIcons, Ionicons,  AntDesign } from "@expo/vector-icons";

export default class Icon extends React.Component {
  render() {
    return (

      <AntDesign name={this.props.name} size={this.props.size} color={this.props.color} />
      // this.props.icon ? 
      //   this.props.icon
      //   :  <AntDesign name={this.props.name} size={this.props.size} color={this.props.color}/>

    );
  }
}


//<Icon icon={<다마잏ㄴ name="" size="" />}