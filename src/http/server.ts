import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';     
import { z } from 'zod';


const app = fastify();

const prisma = new PrismaClient();

app.post('/enquete', async (request, reply) => {
    const createEnqueteSchema = z.object({
        titulo: z.string()
    })


    const { titulo } = createEnqueteSchema.parse(request.body);

    const enquete = await prisma.enquete.create({
        data: {
            titulo,
        }
    })

    return reply.code(201).send(enquete);
})

app.get('/hello', () => {
    return 'Hello, World!';
})

app.listen({ port:3333 }).then(() => {
    console.log('Server is running on port 3333');
});