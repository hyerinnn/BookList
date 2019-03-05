import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import Icon from "./components/Icon";
import { connect } from "react-redux";

class BookList extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      key: "javascript", //초기값
      selected: new Map() //Map()을 selected로 생성
    };
  }

  //fetchBooks라는 함수는 네이버 책 API에서 데이터를 가져오는 역할(리액트네이티브 공홈에 있는 소스코드임)
  fetchBooks(page = 1) {
    const display = 30;
    const start = display * (page - 1) + 1;
    //const query = "javascript"; //아래꺼 말고 이거로 실행하면 입력값과 상관없이 그냥 데이터뿌려줌.
    var query = this.state.key; //'query'를 검색할때 입력값을 저장했던 아래 코드의 key라는 애로 state로 바꿈.
    //(아래보고 다시올라와서읽으면 이해됨)
    return fetch(
      `https://openapi.naver.com/v1/search/book.json?query=${query}&display=${display}&start=${start}`,
      {
        headers: {
          "X-Naver-Client-Id": "vTiJhVKTgkFtmAOe1aRw",
          "X-Naver-Client-Secret": "KNnOp1CgQd"
        }
      }
    ) //then과 catch로 예외처리하고있음. 여긴 설명 따로 안해주셨음.
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.items;
      })
      .catch(error => {
        console.error(error);
      });
  }
  //입력값없이 fetchBooks를 실행시킴. componetnDidMount는 콜백해주는 역할.
  //dom트리에 접근하자마자 실행함.그래서 render와 동시에 실행된다고 생각하면됨.
  componentDidMount() {
    this.fetchBooks().then(items => {
      console.log(items); //콘솔창에 데이터들 띄어줌!

      this.setState({
        book: items //현재 state값을 fetchBook에서 받아온 items로 Book에 저장함
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {/* */}
        <View>
          <TextInput
            placeholder="검색"
            style={{
              //marginLeft: 5,
              width: "85%",
              height: 50,
              backgroundColor: "#dcdcdc",
              borderRadius: 4
            }}
            //입력값인 text를 key라는 이름에 저장. 이 key가 위의 const query = this.state.key;의 key와 동일
            //
            onChangeText={text => {
              this.setState({
                //setState가 변경됐기때문에 렌더를 다시시킴.

                key: text ? text : "javascript"
              });
            }}
            //얘는 엔터치면 다음을 실행하라. 라는 역할을 함
            onSubmitEditing={() => {
              // 바로 위에서 입력값을 key에 저장했으니까 엔터치면 현재 state(즉, key의 상태)로 fetchBooks를 재실행하라.
              this.fetchBooks().then(x => {
                console.log(x);
                this.setState({
                  book: x
                }); //this.state.key의 데이터들을 x라는 변수로 받아서 setState의 book이라는 키에 저장함.
              });
            }}
          />
          {/*
            <TouchableOpacity style={{backgroundColor:'yellow'}}>

            </TouchableOpacity>*/}
        </View>
        <FlatList
          data={this.state.book} //data에 state에 저장된 book키를 저장.
          //img, title, price 등은 api에 지정되있는 값들.
          keyExtractor={item => item.isbn} //FlatList의 key지정
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.flat}
              onPress={() => {
                //웹뷰에 정보 보내면서 화면전환
                this.props.navigation.navigate("move1", {
                  itemId: item.link
                });
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 120,
                  height: "90%",
                  marginLeft: 10,
                  marginTop: 10,
                  borderColor: "black",
                  borderWidth: 2
                }}
                resizeMode="contain"
              />
              <View style={styles.txt}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {" "}
                  * {item.title}
                </Text>
                <Text>- 가격 : {item.price}</Text>
                <Text>- {item.publisher}</Text>
                <Text>- 카운트 : {this.props.myCount}</Text>
              </View>

              {/* 별아이콘 누르면 isbn 번호뜨게 하는부분
              <View style={styles.star}>
                <TouchableOpacity
                  //카운트 증가
                  onPress={() => {
                    this.props.dispatch({
                      //액션을 리듀서한테 전달해주는 dispatch
                      type: "AddItem",
                      book2: item
                    }); //어떤일이 일어났다고 스토어한테 알려주기만함.( 스토어가 이런일이 발생했으니 어디서 이걸 처리해라)

                    //별누르기
                    const newM = new Map(this.state.selected);
                    newM.set(item.isbn, !this.state.selected.get(item.isbn));
                    //this.state.selected.get(item.isbn) ? false: true);
                    this.setState({
                      selected: newM
                    });
                  }}
                >
                  <Icon
                    name={
                      this.state.selected.get(item.isbn)
                        ? "aliwangwang"
                        : "aliwangwang-o1"
                    }
                    color={"gray"}
                    size={40}
                  />
                </TouchableOpacity>
              </View> */}
            </TouchableOpacity>
          )} //renderItem끝
          //구분선
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                //marginLeft: 20,
                backgroundColor: "grey"
              }}
            />
          )}
          refreshing={this.state.isRefreshing}
          onRefresh={() => {
            this.setState({
              isRefreshing: false
            });
          }}
        />
        <TouchableOpacity
          style={styles.barcodebar}
          onPress={() => {
            this.props.navigation.navigate("MyModal");
          }}
        >
          <Icon name={"barcode"} size={40} />
          <Text style={styles.barcodetext}> 바코드를 인식해주세요</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
//export default BookList; //외부에서 App에 접근하니까 export default를 해줘야함.

export default connect(state => {
  return {
    myCount: state.selectedBooks.length
  };
})(BookList); //store에 있는 count라는 state를 myCount라는 이름으로 이 컴포넌트에 props으로 전달해주는 부분!!!!

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24
    //backgroundColor:'red'
  },
  //플랫리스트박스
  flat: {
    height: 180,
    // borderBottomColor: "gray",
    //borderBottomWidth: 2,
    flexDirection: "row"
    //backgroundColor:'red'
  },
  //이미지뷰
  img: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15
    //backgroundColor: "red",
  },
  //텍스트뷰
  txt: {
    flex: 2,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 18,
    padding: 5
  },
  //별표시 뷰
  star: {
    flex: 0.6,
    //backgroundColor: "yellow",
    //padding: 5,
    justifyContent: "center",
    alignItems: "center"
    //flexDirection:'column'
    //paddingLeft: 20
  },
  //바코드뷰
  barcodebar: {
    height: 60,
    width: "100%",
    backgroundColor: "#d79",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row"
  },
  barcodetext: {
    fontSize: 20
  }
});
