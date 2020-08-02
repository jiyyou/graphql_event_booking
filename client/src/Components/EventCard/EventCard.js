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
				console.log(res);
			})
			.catch(err => {
				window.alert(err);
			})
	}

	return (
		<li className='eventCard'>
			<h3 className='eventCard__title'>{props.title}</h3>
			<p className='eventCard__info'>{props.description}</p>
			<p className='eventCard__info'>${props.price}</p>
			<p className='eventCard__info'>{new Date(props.date).toLocaleDateString()}</p>
			<button onClick={bookingHandler}>BOOK</button>
		</li>
	);
}

export default EventCard;