const express = require('express');

const actionRoutes=require('./../api/actions/actions-router');

const projectRoutes=require('./../api/projects/projects-router');
const server = express();

server.use(express.json())
server.use('/api/actions', actionRoutes) //why not connecting??
server.use('/api/projects',projectRoutes)
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;

