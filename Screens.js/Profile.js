import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {getAuth} from 'firebase/auth'
import {ref, update, onValue} from 'firebase/database'
import db from '../config'

SplashScreen.preventAutoHideAsync();

let customFonts = {
	'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			isEnabled: false,
			light_theme: true,
			name: ''
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	}

async fetchUser(){
	let theme,name,image 
	const auth = getAuth()
	const userId = auth.currentUser.uid
	onValue(ref(db,'/users/'+userId), (snapshot)=>{
		theme= snapshot.val().current_theme
		name= `${snapshot.val().first_name} ${snapshot.val().last_name}`
		this.setState({
			light_theme: theme=='light' ? true : false,
			isEnabled: theme=='light' ? false : true,
			name: name
		})
	})
}

toggleSwitch() { 
    const previous_state = this.state.isEnabled; 
    const theme = !this.state.isEnabled ? 'dark' : 'light'; 
    const auth = getAuth(); const user = auth.currentUser; 
    if (user) { var updates = {}; updates['users/' + user.uid + '/current_theme'] = theme; const dbRef = ref(db, '/'); update(dbRef, updates); this.setState({ isEnabled: !previous_state, light_theme: previous_state }); } }



	render() {
		if (this.state.fontsLoaded) {
			SplashScreen.hideAsync();
			return (
				<View style={styles.container}>
                    <Text style={this.state.light_theme ? styles.titleTextLight : styles.titleText}> Your Profile </Text>
                    <Image source={require('../assets/profile_img.png')} style={styles.iconImage}></Image>
					<Text style={this.state.light_theme ? styles.themeTextLight : styles.themeText}> Dark Theme </Text>
                    <Switch
                        trackColor={{false: '#767577', true: 'white'}}
                        thumbColor={this.state.isEnabled ? '#ee8249' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={()=>{
                        this.toggleSwitch()
                     }}
        value={this.state.isEnabled}
      />
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
    droidSafeArea: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
	},
    themeTextLight: {
		color: 'black',
		fontSize: RFValue(30),
		fontFamily: 'Bubblegum-Sans',
		marginRight: RFValue(15),
	},
    themeText: {
		color: 'white',
		fontSize: RFValue(30),
		fontFamily: 'Bubblegum-Sans',
		marginRight: RFValue(15),
	},
    iconImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
    titleText: {
		color: 'white',
		fontSize: RFValue(35),
		fontFamily: 'Bubblegum-Sans',
	},
    titleTextLight: {
		color: 'black',
		fontSize: RFValue(35),
		fontFamily: 'Bubblegum-Sans',
	},
});
