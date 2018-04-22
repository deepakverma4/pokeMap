import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import SignIn from './src/SignIn';
import PokeMap from './src/PokeMap';
import Meteor, { createContainer, Accounts } from 'react-native-meteor';

const SERVER_URL = 'ws://192.168.43.135:3000/websocket';

export default class App extends Component {
	state = {
		loggedIn: false
	};

	componentWillMount() {
		console.log('connecting...');
		Meteor.connect(SERVER_URL);
	}

	flipLogin = x => {
		this.setState({ loggedIn: x });
	};

	signIn = (email, password) => {
		if (Meteor.userId()) {
			this.flipLogin(true);
		}
		Meteor.loginWithPassword(email, password, (error, data) => {
			if (error) {
				if (error.reason === 'User not found') {
					console.log('there was no email');
					Accounts.createUser({ email, password }, error => {
						console.log(error);
					});
				}
			} else {
				console.log('User Found!');
				this.flipLogin(true);
			}
		});
		console.log(Meteor.userId());
	};

	renderView = () => {
		if (this.state.loggedIn) {
			return <PokeMap flipLogin={this.flipLogin} />;
		} else {
			return <SignIn signIn={this.signIn} />;
		}
	};
	render() {
		return <View style={{ flex: 1 }}>{this.renderView()}</View>;
	}
}
