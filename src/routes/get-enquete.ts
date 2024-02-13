import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getEnquete(app: FastifyInstance) {
    app.get('/enquete/:enqueteId', async (request, reply) => {
        const getEnqueteParametros = z.object({
            enqueteId: z.string().uuid(),
        })
    
    
        const { enqueteId } = getEnqueteParametros.parse(request.params);
    
        const enquete = await prisma.enquete.findUnique({
            where: {
                id: enqueteId
            },
            include: {
                opcao: {
                    select: {
                        id: true,
                        descricao: true
                    } 
                }
            }
        })

    
        return reply.send(enquete);
    })
}