import fs from "fs"

import { BuscarJogo } from "./Jogos.js"

class Usuario {

    constructor(Nome, Dia, Mes, Ano) {

        this.Nome = Nome

        this.Nascimento = new Date(Ano, Mes - 1, Dia)

        this.JogosNaColecao = []

    }

    get Idade() {

        let Hoje = new Date()

        let idade = Hoje.getFullYear() - this.Nascimento.getFullYear()

        let jaFezAniversario =
            Hoje.getMonth() > this.Nascimento.getMonth() ||
            (Hoje.getMonth() === this.Nascimento.getMonth() &&
            Hoje.getDate() >= this.Nascimento.getDate())

        if (!jaFezAniversario) idade--

        return idade

    }

    AdicionarJogo(NomeJogo) {

        let jogo = BuscarJogo(NomeJogo)

        if (jogo == null) return "Jogo não encontrado"

        let i = 0

        while (i < this.JogosNaColecao.length) {

            if (this.JogosNaColecao[i].Jogo.toLowerCase() == jogo.Nome.toLowerCase()) {

                return `${this.Nome} já possui "${jogo.Nome}" na coleção`

            }

            i++

        }

        this.JogosNaColecao.push({

            Jogo: jogo.Nome,

            Nota: null,

            Avaliacao: ""

        })

        SalvarUsuarios()

        return `"${jogo.Nome}" adicionado à coleção de ${this.Nome}`

    }

    AvaliarJogo(NomeJogo, Nota, Avaliacao) {

        let i = 0

        while (i < this.JogosNaColecao.length) {

            let jogo = this.JogosNaColecao[i]

            if (jogo.Jogo.toLowerCase() == NomeJogo.toLowerCase()) {

                jogo.Nota = Nota

                jogo.Avaliacao = Avaliacao

                SalvarUsuarios()

                return `Avaliação de "${jogo.Jogo}" salva com sucesso`

            }

            i++

        }

        return `${this.Nome} não possui "${NomeJogo}" na coleção`

    }

}

let Usuarios = []

if (fs.existsSync("usuarios.json")) {

    let dados = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"))

    let i = 0

    while (i < dados.length) {

        let u = dados[i]

        let nasc = new Date(u.Nascimento)

        let usuario = new Usuario(
            u.Nome,
            nasc.getDate(),
            nasc.getMonth() + 1,
            nasc.getFullYear()
        )

        // Converte coleções antigas para o novo formato

        let colecao = u.JogosNaColecao || u.LivrosComprados || []

        let j = 0

        while (j < colecao.length) {

            if (typeof colecao[j] == "string") {

                usuario.JogosNaColecao.push({

                    Jogo: colecao[j],

                    Nota: null,

                    Avaliacao: ""

                })

            } else {

                usuario.JogosNaColecao.push({

                    Jogo: colecao[j].Jogo,

                    Nota: colecao[j].Nota ?? null,

                    Avaliacao: colecao[j].Avaliacao || ""

                })

            }

            j++

        }

        Usuarios.push(usuario)

        i++

    }

} else {

    Usuarios = []

    SalvarUsuarios()

}

function SalvarUsuarios() {

    fs.writeFileSync("usuarios.json", JSON.stringify(Usuarios, null, 2))

}

export { Usuario, Usuarios, SalvarUsuarios }