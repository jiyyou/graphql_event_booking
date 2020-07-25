const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const events = [];

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

		input EventInput {
			title: String!
			description: String!
			price: Float!
			date: String!
		}

		type RootQuery {
			events: [Event!]!
		}

		type RootMutation {
			createEvent(eventInput: EventInput): Event
		}
		
		schema {
			query: RootQuery
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () => {
			return events;
		},
		createEvent: (args) => {
			const event = {
				_id: Math.random().toString(),
				title: args.eventInput.title,
				description: args.eventInput.description,
				price: +args.eventInput.price,
				date: args.eventInput.date
			};
			events.push(event);
			return event;
		}
	},
	graphiql: true
}));

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.y2hkq.mongodb.net/<dbname>?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(8080);
	})
	.catch(err => {
		console.log(err);
	})

