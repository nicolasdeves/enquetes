import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function criaEnquete(app: FastifyInstance) {
    app.post('/enquete', async (request, reply) => {
        const createEnqueteSchema = z.object({
            titulo: z.string(),
            opcoes: z.array(z.string())
        })
    
    
        const { titulo, opcoes } = createEnqueteSchema.parse(request.body);
    
        const enquete = await prisma.enquete.create({
            data: {
                titulo,
                opcao: {
                    createMany: {
                        data: opcoes.map(opcao => {
                            return { descricao: opcao }
                        }),
                    }
                }
            }
        })

    
        return reply.code(201).send(enquete);
    })
}