import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner, Permissions } from "expo";

export default class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  fetchBookByISBN(isbn) {
    return fetch(
      `https://openapi.naver.com/v1/search/book_adv.json?d_isbn=${isbn}`,
      {
        headers: {
          "X-Naver-Client-Id": "vTiJhVKTgkFtmAOe1aRw",
          "X-Naver-Client-Secret": "KNnOp1CgQd"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.items[0];
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
               
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ data }) => {
    //alert(`구매 고고씽`);
    this.fetchBookByISBN(data)
    .then(alert("구매 고고씽"))
    .then((item) => {
      this.fetchBookByISBN(data).then((item) => {
          this.props.navigation.navigate("move1", {
            itemId: item.link
          })
        });


      // setTimeout(() => {
      //   this.fetchBookByISBN(data).then((item) => {
      //     this.props.navigation.navigate("move1", {
      //       itemId: item.link
      //     })
      //   });
      // }, 3000);
      // this.props.navigation.navigate("move1", {
      //   itemId: item.link
      // })
    });
  }  
} 