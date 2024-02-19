type Mensagem = { opcaoId: string, votos: number }
type Inscrito = (mensagem: Mensagem) => void

class VotosPubSub {
    private canais: Record<string, Inscrito[]> = {}

    inscrito(enqueteId: string, inscrito: Inscrito) {
        if (!this.canais[enqueteId]){
            this.canais[enqueteId] = []
        }

        this.canais[enqueteId].push(inscrito)
    }

    publish(enqueteId: string, mensagem: Mensagem) {
        if (!this.canais[enqueteId]) {
            return;
        }

        for (const inscrito of this.canais[enqueteId]) {
            inscrito(mensagem)
        }
    }
}

export const votando = new VotosPubSub();
