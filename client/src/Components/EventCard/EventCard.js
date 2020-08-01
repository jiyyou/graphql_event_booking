import React from 'react';
import './EventCard.scss';

function EventCard(props) {
	return (
		<li className='eventCard'>
			<h3 className='eventCard__title'>{props.title}</h3>
			<p className='eventCard__info'>{props.description}</p>
			<p className='eventCard__info'>${props.price}</p>
			<p className='eventCard__info'>{new Date(props.date).toLocaleDateString()}</p>
			<button>BOOK</button>
		</li>
	);
}

export default EventCard;