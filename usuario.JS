
import fs from "fs"

import { BuscarJogo } from "./Jogos.JS"

class Usuario {

    constructor(Nome, Dia, Mes, Ano) {

        this.Nome = Nome

        this.Nascimento = new Date(Ano, Mes - 1, Dia)

        this.JogosNaColecao = []

        this.JogosAlugados = []

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

    // verifica se o jogo existe

    PodeAdicionar(jogo) {

        if (jogo == null) return "Jogo não encontrado"

        return ""

    }

    AdicionarJogo(NomeJogo) {

        let jogo = BuscarJogo(NomeJogo)

        let erro = this.PodeAdicionar(jogo)

        if (erro != "") return erro

        let i = 0

        while (i < this.JogosNaColecao.length) {

            if (this.JogosNaColecao[i].toLowerCase() == jogo.Nome.toLowerCase()) {

                return `${this.Nome} já possui "${jogo.Nome}" na coleção`

            }

            i++

        }

        this.JogosNaColecao.push(jogo.Nome)

        SalvarUsuarios()

        return `"${jogo.Nome}" adicionado à coleção de ${this.Nome}`

    }

    Alugar(NomeJogo, DiaEntrega, MesEntrega, AnoEntrega) {

        let jogo = BuscarJogo(NomeJogo)

        let erro = this.PodeAdicionar(jogo)

        if (erro != "") return erro

        let i = 0

        while (i < this.JogosAlugados.length) {

            if (this.JogosAlugados[i].Jogo.toLowerCase() == jogo.Nome.toLowerCase()) {

                return `${this.Nome} já está com "${jogo.Nome}" alugado`

            }

            i++

        }

        let Hoje = new Date()

        Hoje.setHours(0, 0, 0, 0)

        let Entrega = new Date(AnoEntrega, MesEntrega - 1, DiaEntrega)

        if (Entrega < Hoje) return "A data de entrega não pode ser antes de hoje"

        this.JogosAlugados.push({

            Jogo: jogo.Nome,

            Entrega: Entrega

        })

        SalvarUsuarios()

        return `Aluguel feito: "${jogo.Nome}", entregar até ${Entrega.toLocaleDateString("pt-BR")}`

    }

    Devolver(NomeJogo) {

        let i = 0

        while (i < this.JogosAlugados.length) {

            if (this.JogosAlugados[i].Jogo.toLowerCase() == NomeJogo.toLowerCase()) {

                let nome = this.JogosAlugados[i].Jogo

                this.JogosAlugados.splice(i, 1)

                SalvarUsuarios()

                return `"${nome}" devolvido`

            }

            i++

        }

        return `${this.Nome} não está com "${NomeJogo}" alugado`

    }

}

let Usuarios = []

if (fs.existsSync("usuarios.json")) {

    // as datas voltam do JSON como texto, então converte de volta para Date

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

        // permite aproveitar os dados antigos, caso existam

        usuario.JogosNaColecao = u.JogosNaColecao || u.LivrosComprados || []

        let j = 0

        let alugados = u.JogosAlugados || u.LivrosAlugados || []

        while (j < alugados.length) {

            usuario.JogosAlugados.push({

                Jogo: alugados[j].Jogo || alugados[j].Livro,

                Entrega: new Date(alugados[j].Entrega)

            })

            j++

        }

        Usuarios.push(usuario)

        i++

    }

} else {

    // lista padrão, usada só quando o usuarios.json ainda não existe

    Usuarios = [

        new Usuario("Lucas", 12, 5, 2015),

        new Usuario("Ana", 3, 11, 2011),

        new Usuario("Pedro", 25, 8, 2009),

        new Usuario("Mariana", 7, 2, 2001),

        new Usuario("Carlos", 30, 12, 1980)

    ]

    SalvarUsuarios()

}

function SalvarUsuarios() {

    fs.writeFileSync("usuarios.json", JSON.stringify(Usuarios, null, 2))

}

export { Usuario, Usuarios, SalvarUsuarios }
