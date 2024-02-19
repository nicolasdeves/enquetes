import fastify from 'fastify';    
import { criaEnquete } from '../routes/cria-enquete';
import { getEnquete } from '../routes/get-enquete';
import { votaEnquete } from '../routes/votar-enquete';
import cookie from '@fastify/cookie';
import fastifyWebsocket from '@fastify/websocket';
import { resultadosEnquete } from './ws/resultados-enquete';

const app = fastify();

app.register(cookie, {
    secret: 'my-secret',
    hook: 'onRequest'
});

app.register(fastifyWebsocket)

app.register(criaEnquete),
app.register(getEnquete)
app.register(votaEnquete)

app.register(resultadosEnquete)

app.listen({ port:3333 }).then(() => {
    console.log('Server is running on port 3333');      
});