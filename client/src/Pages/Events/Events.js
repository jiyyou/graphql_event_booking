import React from 'react';
import axios from 'axios';
import EventForm from '../../Components/EventForm/EventForm';
import EventCard from '../../Components/EventCard/EventCard';
import AuthContext from '../../context/authContext';
import './Events.scss';

class Events extends React.Component {
	state = {
		create: false,
		title: '',
		price: 0,
		date: '',
		description: '',
		events: []
	}

	static contextType = AuthContext;

	//Call events
	componentDidMount() {
		axios
			.post('http://localhost:8080/api/', {
				query: `
					query {
						events {
							_id
							title
							description
							date
							price
							creator {
								_id
								email
							}
						}
					}
				`
			})
			.then(res => {
				this.setState({
					events: res.data.data.events
				})
			})
			.catch(err => {
				window.alert(err);
			})
	}

	//Toggle create form
	toggleCreate = () => {
		if (this.state.create === true) {
			this.setState({
				create: false
			})
		}
		else {
			this.setState({
				create: true
			})
		}
	}

	//Create event
	submitHandler = e => {
		e.preventDefault();
		const token = this.context.token;		
		this.setState({
			title: e.target.title.value,
			date: e.target.date.value,
			description: e.target.description.value,
			price: e.target.price.value
		}, () => {
			axios
				.post('http://localhost:8080/api/', {
					query: `
						mutation {
							createEvent(eventInput: {title: "${this.state.title}", description: "${this.state.description}", price: ${+this.state.price}, date: "${this.state.date}"}) {
								_id
								title
								description
								date
								price
								creator {
									_id
									email
								}
							}
						}
					`
				}, {
					headers: {
						'Authorization': 'Bearer ' + token
					}
				})
				.then(res => {
					this.setState({
						events: this.state.events.concat(res.data.data.createEvent)
					})
				})
				.catch(err => {
					window.alert(err);
				})			
			})
		e.target.reset();
	}

	renderEvents = () => {
		return this.state.events.map(event => {
			return <EventCard
				key={event._id}
				title={event.title} 
				description={event.description}
				price={event.price}
				date={event.date}
			/>	
		})
	}

	render() {
		return (
			<section className='events'>
				{this.context.token ? <button onClick={this.toggleCreate}>CREATE EVENT</button> : ''}				
				{this.state.create === true ? <EventForm submitHandler={this.submitHandler} /> : ''}
				<ul className='events__list'>
					{this.renderEvents()}
				</ul>
			</section>
		);
	}
}

export default Events;