import { FastifyInstance } from "fastify";
import { request } from "http";
import z from "zod";
import { votando } from "../../utils/votos-pub-sub";

export async function resultadosEnquete(app: FastifyInstance) {
    app.get('/enquete/:enqeuteId/resultado', { websocket: true }, (connection, request) => {
        
        app.get('/enquete/:enqueteId', async (request, reply) => {
            const getEnqueteParametros = z.object({
                enqueteId: z.string().uuid(),
            })
        
        
            const { enqueteId } = getEnqueteParametros.parse(request.params);

            votando.inscrito(enqueteId, (mensagem) => {
                connection.socket.send(JSON.stringify(mensagem))
            })
        }) 


    })
}