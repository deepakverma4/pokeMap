import React, { Component } from 'react';
import {
	Text,
	View,
	ImageBackground,
	Dimensions,
	ToastAndroid
} from 'react-native';
import { Button, Label, Input, Form, Item } from 'native-base';

const imgSrc = require('../assets/icons/landing.jpg');
const { height, width } = Dimensions.get('window');

export default class SignIn extends Component {
	state = {
		email: '',
		password: ''
	};

	logIn = () => {
		console.log('in login button');
		var email = this.state.email;
		var password = this.state.password;

		this.props.signIn(email, password);
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground source={imgSrc} style={styles.backgroundImage}>
					<View style={styles.container}>
						<Form>
							<Item floatingLabel>
								<Label>Email</Label>
								<Input
									autoCorrect={false}
									onChangeText={email =>
										this.setState({ email })}
								/>
							</Item>
							<Item floatingLabel>
								<Label>Password </Label>
								<Input
									autoCorrect={false}
									onChangeText={pass =>
										this.setState({ pass })}
									secureTextEntry
								/>
							</Item>
						</Form>
						<View style={{ marginTop: 10 }}>
							<Button primary block onPress={this.logIn}>
								<Text style={{ color: 'white' }}>
									{'Login/SignUp '}
								</Text>
							</Button>
						</View>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const styles = {
	backgroundImage: {
		flex: 1,
		height: height,
		width: width
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		margin: 10
	}
};
