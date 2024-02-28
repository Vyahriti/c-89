import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class LoginScreen extends Component {

signIn= async(email, password) =>{
    const auth= getAuth()
    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
        this.props.navigaton.replace('Dashboard')
    })
    .catch((error)=>{
        Alert.alert(error.message)
    })
}

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
