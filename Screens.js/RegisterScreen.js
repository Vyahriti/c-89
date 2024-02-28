import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class RegisterScreen extends Component {

registerUser=(email, password, confirmPassword, first_name, last_name) =>{
    if(password==confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then(()=>{
            Alert.alert('User Regsitered!')
        })
        .catch((error)=>{
            Alert.alert(error.message)
        })
    } else {
        Alert.alert("Passwords don't match")
    }
}

  render() {
    return (
      <View style={styles.container}>
        <Text>Register</Text>
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
