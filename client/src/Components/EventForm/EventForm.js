import React from 'react';
import './EventForm.scss';

function EventForm(props) {
	return (
		<form onSubmit={props.submitHandler} className='eventForm'>
			<label htmlFor="title" className='eventForm__label'>Title</label>
			<input name='title' type="text" className='eventForm__input' />
			<label htmlFor="price" className='eventForm__label'>Price</label>
			<input name='price' type="number" className='eventForm__input' />
			<label htmlFor="date" className='eventForm__label'>Date</label>
			<input name='date' type="datetime-local" className='eventForm__input' />
			<label htmlFor="description" className='eventForm__label'>Description</label>
			<input name='description' type="text" className='eventForm__input' />
			<button type='submit'>SUBMIT</button>
		</form>
	)
}

export default EventForm;