import React from 'react';

function SignUpForm(props) {
	return (
		<form onSubmit={props.submitHandler}>
			<h2>{props.status}</h2>
			<label htmlFor="email">E-Mail</label>
			<input type="text" name='email' />
			<label htmlFor="password">Password</label>
			<input type="password" name='password' />
			<button type='submit'>Submit</button>
		</form>
	);
}

export default SignUpForm;