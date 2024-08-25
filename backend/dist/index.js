"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("./schema");
const app = (0, express_1.default)();
// Configure CORS to allow all origins
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
const yoga = (0, graphql_yoga_1.createYoga)({
    schema: schema_1.schema,
    graphqlEndpoint: '/', // Path to the GraphQL endpoint
});
app.use('/', yoga);
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
