import React from "react";
import { View, Text, FlatList } from "react-native";

import { connect } from "react-redux";

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.props.btnCount}</Text>
        <FlatList>
          data={this.props.listData}
          renderItem={(({item})=>{
            <Text>{item.title}</Text>
          })

          }
        </FlatList>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    //btnCount: state.count
    btnCount: state.selectedBooks.length,
    listData: state.selectedBooks
  };
}; //store에 있는 count라는 state를 btnCount라는 이름으로 이 컴포넌트에 props으로 전달해주는 부분!!!!

export default connect(mapStateToProps)(SettingsScreen);
