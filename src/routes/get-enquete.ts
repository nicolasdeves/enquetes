import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";

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

        if(!enquete) {
            return reply.status(400).send({message: 'Enquete não encontrada'})
        }

        const resultado = await redis.zrange(enqueteId, 0, -1, 'WITHSCORES');

        const votos = resultado.reduce((obj, line, index) => {
            if (index % 2 === 0 ) {
                const pontuacao = resultado[index + 1];

                Object.assign(obj, {[line]: Number(pontuacao)});
            }
            return obj;
        }, {} as Record<string, number>)
    
        return reply.send({
            enquete: {
                id: enquete.id,
                titulo: enquete.titulo,
                opcoes: enquete.opcao.map(opcao => {
                    return {
                        id: opcao.id,
                        titulo: opcao.descricao,
                        pontuacao: (opcao.id in votos) ? votos[opcao.id] : 0
                    }
                })
            }
        });
    })
}

// da p votar na mesma opcao da enquete mais de uma vez
// se voto em outra enquete, nao ta apagando o voto anterior e nem votando na que quero votar agr