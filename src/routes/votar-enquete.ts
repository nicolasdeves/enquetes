import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";
import { randomUUID } from "node:crypto";
import { FastifyReply } from "fastify";
import { redis } from "../lib/redis";

export async function votaEnquete(app: FastifyInstance) {
    app.post('/enquete/:enqueteId/voto', async (request, reply) => {
        const votoEnquete = z.object({
            opcaoId: z.string().uuid()
        })

        const votoParametro = z.object({
            enqueteId: z.string().uuid()
        })
    
    
        const { enqueteId } = votoParametro.parse(request.params);
        const { opcaoId } = votoEnquete.parse(request.body);

        let { sessaoId } = request.cookies;

        if(sessaoId) {
            const votoAnteriorUsuario = await prisma.voto.findUnique({
                where: {
                    sessaoId_enqueteId: {
                        enqueteId,
                        sessaoId
                    }
                }
            })

            if(votoAnteriorUsuario && votoAnteriorUsuario.opcaoId === opcaoId) {
                await prisma.voto.delete({
                    where: {
                        id: votoAnteriorUsuario.id
                    }
                })

                await redis.zincrby(enqueteId, -1, votoAnteriorUsuario.id);
            }   else if (votoAnteriorUsuario) {
                return reply.code(400).send({erro: 'Usuário já votou nesta enquete'})
            }
        }

        if (!sessaoId) {
            sessaoId = randomUUID();
            reply.setCookie('sessaoId', sessaoId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                signed: true,
                httpOnly: true,
            })
        }
        
        const voto = await prisma.voto.create({
            data: {
                sessaoId,
                opcaoId,
                enqueteId
            }
        })

        await redis.zincrby(enqueteId, 1, opcaoId);

        return reply.code(201).send({sessaoId});
    })
}