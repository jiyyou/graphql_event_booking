const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();

require('dotenv').config();
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;

const Event = require('./models/event');
const User = require('./models/user');

app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
	schema: buildSchema(`
		type Event {
			_id: ID!
			title: String!
			description: String!
			price: Float!
			date: String!
		}
		
		type User {
			_id: ID!
			email: String!
			password: String
		}

		input EventInput {
			title: String!
			description: String!
			price: Float!
			date: String!
		}

		input UserInput {
			email: String!
			password: String!
		}

		type RootQuery {
			events: [Event!]!

		}

		type RootMutation {
			createEvent(eventInput: EventInput): Event
			createUser(userInput: UserInput): User
		}
		
		schema {
			query: RootQuery
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () => {
			return Event.find()
				.then(events => {
					return events.map(event => {
						return { ...event._doc };
					})
				})
				.catch(err => {
					throw err;
				});
		},
		createEvent: (args) => {
			const event = new Event({
				title: args.eventInput.title,
				description: args.eventInput.description,
				price: +args.eventInput.price,
				date: new Date(args.eventInput.date),
				creator: '5f1b828ebd151c48c32dfc09'
			});
			let createdEvent;
			return event
				.save()
				.then(res => {
					createdEvent = {...res._doc}
					return User.findById('5f1b828ebd151c48c32dfc09')					
				})
				.then(user => {
					if (!user) {
						throw new Error('User not found');
					}
					user.createdEvents.push(event);
					return user.save();
				})
				.then(res => {
					return createdEvent;
				})
				.catch(err => {
					console.log(err);
					throw err;
				});
		},
		createUser: (args) => {
			return User.findOne({email: args.userInput.email})
				.then(user => {
					if (user) {
						throw new Error('User exists already');
					}
					return bcrypt.hash(args.userInput.password, 12)
				})
				.then(hashedPassword => {
					const user = new User({
						email: args.userInput.email,
						password: hashedPassword
					});
					return user.save();
				})
				.then (result => {
					return {...result._doc, password: null}
				})
				.catch(err => {
					throw err;
				});

		}
	},
	graphiql: true
}));

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.y2hkq.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(8080);
	})
	.catch(err => {
		console.log(err);
	})

