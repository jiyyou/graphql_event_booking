import React from 'react';
import axios from 'axios';
import AuthContext from '../../context/authContext';
import './EventCard.scss';

function EventCard(props) {
	
	//Booking Handler
	const bookingHandler = e => {
		e.preventDefault();
		axios
			.post('http://localhost:8080/api/', {
				query: `
					mutation {
						bookEvent(eventId: "${props.id}") {
							_id
						}
					}
				`
			}, {
				headers: {
					'Authorization': 'Bearer ' + props.token
				}
			})
			.then(res => {
				window.alert('Booking Successful!');
			})
			.catch(err => {
				window.alert(err);
			})
	}

	const bookingCancel = e => {
		e.preventDefault();
		axios
			.post('http://localhost:8080/api/', {
				query: `
					mutation {
						cancelBooking(bookingId: "${props.bookingId}") {
							_id
						}
					}
				`
			}, {
				headers: {
					'Authorization': 'Bearer ' + props.token
				}
			})
			.then(res => {
				window.alert('Booking Canceled!')
			})
	}

	return (
		<li className='eventCard'>
			<h3 className='eventCard__title'>{props.title}</h3>
			<p className='eventCard__info'>{props.description}</p>
			<p className='eventCard__info'>${props.price}</p>
			<p className='eventCard__info'>{new Date(props.date).toLocaleDateString()}</p>
			{props.token && props.status !== 'booking' ?
				<button onClick={bookingHandler}>BOOK</button> :
				<button onClick={bookingCancel}>CANCEL</button>
			}
			
		</li>
	);
}

export default EventCard;