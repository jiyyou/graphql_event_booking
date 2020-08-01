import React from 'react';

function EventCard(props) {
	return (
		<li>
			<h3>{props.title}</h3>
			<p>{props.description}</p>
			<p>${props.price}</p>
			<p>{props.date}</p>
		</li>
	);
}

export default EventCard;