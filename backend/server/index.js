const express = require('express');
const app = express();
const config = require('../config');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String,
    }
`);

const root = {
    hello: () => {
        return 'Hello World';
    },
    test: () => {
        return ['test', true, 42, 4.2]
    }
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.use(express.json());


app.listen(config.port, () => {
    console.log('running graphql and backend server.')
})
