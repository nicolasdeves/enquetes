import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";
import { randomUUID } from "node:crypto";
import { FastifyReply } from "fastify";

export async function votaEnquete(app: FastifyInstance) {
    app.post('/enquete/enqueteId/voto', async (request, reply) => {
        const votoEnquete = z.object({
            opcaoId: z.string().uuid()
        })

        const votoParametro = z.object({
            enqueteId: z.string().uuid()
        })
    
    
        const { enqueteId } = votoParametro.parse(request.params);
        const { opcaoId } = votoEnquete.parse(request.body);

        let sessaoId = request.cookies.sessaoId;

        if (!sessaoId) {
            sessaoId = randomUUID();
            reply.setCookie('sessaoId', sessaoId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                signed: true,
                httpOnly: true,
            })
        }
    
        return reply.code(201).send();
    })
}