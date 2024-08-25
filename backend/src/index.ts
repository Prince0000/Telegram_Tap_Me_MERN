import express from 'express';
import cors from 'cors';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import { createServer } from 'http';

const app = express();

// Configure CORS to allow all origins
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/', // Path to the GraphQL endpoint
});

app.use('/', yoga);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
