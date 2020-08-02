import React from 'react';
import axios from 'axios';
import EventCard from '../../Components/EventCard/EventCard';
import AuthContext from '../../context/authContext';
import './Booking.scss';

class Booking extends React.Component {
	state = {
		bookings: []
	}

	static contextType = AuthContext;

	componentDidMount() {
		axios
			.post('http://localhost:8080/api/', {
				query: `
					query {
						bookings {
							_id
							event {
								_id
								title
								description
								price
								date
								creator {
									_id
								}
							}
							user {
								_id
								email								
							}
							createdAt
							updatedAt
						}
					}
				`
			}, {
				headers: {
					'Authorization': 'Bearer ' + this.context.token
				}			
			})
			.then(res => {
				this.setState({
					bookings: res.data.data.bookings
				})
			})
	}

	//Render events
	renderEvents = () => {
		return this.state.bookings.map(booking => {
			return <EventCard
				key={booking.event._id}
				id={booking.event._id}
				title={booking.event.title} 
				description={booking.event.description}
				price={booking.event.price}
				date={booking.event.date}
				author={booking.event.creator._id}
				userId={this.context.userId}
				token={this.context.token}
				status='booking'
				bookingId={booking._id}
				eraseBooking={this.eraseBooking}
			/>	
		})
	}

	//Cancel booking
	eraseBooking = (bookingId) => {
		const newBookings = this.state.bookings.filter(booking => {
			if (bookingId !== booking._id) {
				return booking;
			}
		})
		this.setState({
			bookings: newBookings
		})
	}

	render() {
		return (
			<section className='booking'>
				{this.state.bookings.length === 0 ? <h2>No Bookings!</h2> : ''}
				<ul>
					{this.renderEvents()}
				</ul>
			</section>
		)
	}
}

export default Booking;