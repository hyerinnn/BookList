import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import { StyleSheet, Text, View } from "react-native";
import BookList from "./BookList";
import BookInfo from "./BookInfo";
import BarcodeScanner from "./BarcodeScanner";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import Settings from "./Settings";
import { connect } from "react-redux";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";




let store = createStore(reducer);

const AppNavigator = createStackNavigator({
  home: {
    screen: BookList
    //navigationOptions =  { header: null }
  },
  move1: {
    screen: BookInfo
  }
});
const TabNavigator = createBottomTabNavigator(
  {
    Home: AppNavigator,
    Settings: Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-document`;
        } else if (routeName === "Settings") {
          iconName = `ios-options`;
        }

        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: TabNavigator
    },
    MyModal: {
      screen: BarcodeScanner
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

//export default createAppContainer(RootStack); //외부에서 App에 접근하니까 export default를 해줘야함.
const AppContainer = createAppContainer(RootStack);

export default function() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
