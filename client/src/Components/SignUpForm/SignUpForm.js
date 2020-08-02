import React from 'react';
import './SignUpForm.scss';

function SignUpForm(props) {
	return (
		<form onSubmit={props.submitHandler} className='signup'>
			<h2 className='signup__title'>{props.status}</h2>
			<label htmlFor="email" className='signup__label'>E-Mail</label>
			<input type="text" name='email' className='signup__input' />
			<label htmlFor="password" className='signup__label'>Password</label>
			<input type="password" name='password' className='signup__input' />
			<button type='submit'>Submit</button>
		</form>
	);
}

export default SignUpForm;