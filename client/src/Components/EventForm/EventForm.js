import React from 'react';

function EventForm(props) {
	return (
		<form onSubmit={props.submitHandler}>
			<label htmlFor="title">Title</label>
			<input name='title' type="text" />
			<label htmlFor="price">Price</label>
			<input name='price' type="number" />
			<label htmlFor="date">Date</label>
			<input name='date' type="datetime-local" />
			<label htmlFor="description">Description</label>
			<input name='description' type="text" />
			<button type='submit'>SUBMIT</button>
		</form>
	)
}

export default EventForm;