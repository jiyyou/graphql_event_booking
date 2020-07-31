import React from 'react';
import axios from 'axios';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import './Auth.scss';

class Auth extends React.Component {
	state = {
		email: '',
		password: '',
		status: 'Login'
	}

	//Submit handler for login/signup
	submitHandler = (e) => {
		e.preventDefault();
		if (e.target.email === '' || e.target.password === '') {
			return;
		}
		this.setState({
			email: e.target.email.value,
			password: e.target.password.value
		}, () => {

			if (this.state.status === 'Signup') {
				axios
					.post('http://localhost:8080/api/', {
						query: `
							mutation {
								createUser(userInput: {email: "${this.state.email}", password:"${this.state.password}"}) {
									_id
									email
								}
							}
						`
					})
					.then(res => {
						console.log(res.data.data.createUser);
					})
					.catch(err => {
						window.alert(err);
					})
			}
			else if (this.state.status === 'Login') {
				axios
					.post('http://localhost:8080/api', {
						query: `
							query {
								login(email: "${this.state.email}", password: "${this.state.password}") {
									userId
									token
									tokenExpiration
								}
							}
						`
					})
					.then(res => {
						console.log(res);
					})
			}
			
		})
	}

	//Click handler for changing between signup and login
	statusHandler = () => {
		if (this.state.status === 'Login') {
			this.setState({
				status: 'Signup'
			})
		}
		else {
			this.setState({
				status: 'Login'
			})
		}
	}

	render() {
		return (
			<section>
				<SignUpForm status={this.state.status} submitHandler={this.submitHandler} />
				<button onClick={this.statusHandler}>{this.state.status === 'Login' ? 'Switch to Signup' : 'Switch to Login'}</button>
			</section>
		);
	}
}

export default Auth;