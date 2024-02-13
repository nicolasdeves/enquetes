import fastify from 'fastify';    
import { criaEnquete } from '../routes/cria-enquete';
import { getEnquete } from '../routes/get-enquete';
import { votaEnquete } from '../routes/votar-enquete';
import cookie from '@fastify/cookie';

const app = fastify();

app.register(cookie, {
    secret: 'my-secret',
    hook: 'onRequest'
});

app.register(criaEnquete),
app.register(getEnquete)
app.register(votaEnquete)

app.listen({ port:3333 }).then(() => {
    console.log('Server is running on port 3333');      
});