import readline from "readline/promises"

import { Jogo, Jogos, SalvarJogos, BuscarJogo } from "./Jogos.JS"

import { Usuario, Usuarios, SalvarUsuarios } from "./Usuario.JS"

// procura o usuário pelo nome, sem ligar para maiúsculas e minúsculas

function BuscarUsuario(Nome) {

    let i = 0

    while (i < Usuarios.length) {

        if (Usuarios[i].Nome.toLowerCase() == Nome.toLowerCase()) return Usuarios[i]

        i++

    }

    return null

}

// transforma "dd/mm/aaaa" em Date, ou devolve null se a data for inválida

function LerData(Texto) {

    let partes = Texto.split("/")

    if (partes.length != 3) return null

    let dia = Number(partes[0])

    let mes = Number(partes[1])

    let ano = Number(partes[2])

    if (!Number.isInteger(dia) || !Number.isInteger(mes) || !Number.isInteger(ano)) return null

    let data = new Date(ano, mes - 1, dia)

    if (data.getDate() != dia || data.getMonth() != mes - 1 || data.getFullYear() != ano) return null

    return data

}

function CriarUsuario(Nome, Dia, Mes, Ano) {

    if (BuscarUsuario(Nome) != null) return `Já existe um usuário chamado ${Nome}`

    let usuario = new Usuario(Nome, Dia, Mes, Ano)

    if (usuario.Nascimento > new Date()) return "A data de nascimento não pode ser no futuro"

    Usuarios.push(usuario)

    SalvarUsuarios()

    return `Usuário ${Nome} criado`

}

function CriarJogo(Nome, Generos, Ano, Plataformas, Desenvolvedora, ModoDeJogo) {

    if (BuscarJogo(Nome) != null) return `Já existe um jogo chamado "${Nome}"`

    let jogo = new Jogo(Nome, Generos, Ano, Plataformas, Desenvolvedora, ModoDeJogo)

    Jogos.push(jogo)

    SalvarJogos()

    return `Jogo "${Nome}" cadastrado`

}

let rl = readline.createInterface({ input: process.stdin, output: process.stdout })

// faz a pergunta e tira os espaços sobrando do começo e do fim

async function Perguntar(Texto) {

    return (await rl.question(Texto)).trim()

}

let rodando = true

while (rodando) {

    console.log("\n===== Catálogo de Jogos =====")

    console.log("1 - Listar jogos")

    console.log("2 - Listar usuários")

    console.log("3 - Adicionar jogo à coleção")

    console.log("4 - Avaliar jogo")

    console.log("5 - Adicionar usuário")

    console.log("6 - Adicionar jogo ao catálogo")

    console.log("0 - Sair")

    let opcao = await Perguntar("Escolha: ")

    if (opcao == "1") {

        if (Jogos.length == 0) console.log("Nenhum jogo cadastrado")

        let i = 0

        while (i < Jogos.length) {

            let j = Jogos[i]

            console.log(`\n${j.Nome}`)

            console.log(`  Desenvolvedora: ${j.Desenvolvedora}`)

            console.log(`  Ano: ${j.Ano}`)

            console.log(`  Gêneros: ${j.Generos}`)

            console.log(`  Plataformas: ${j.Plataformas}`)

            console.log(`  Modo de jogo: ${j.ModoDeJogo}`)

            i++

        }

    } else if (opcao == "2") {

        if (Usuarios.length == 0) console.log("Nenhum usuário cadastrado")

        let i = 0

        while (i < Usuarios.length) {

            let u = Usuarios[i]

            console.log(`\n${u.Nome} (${u.Idade} anos)`)

            if (u.JogosNaColecao.length == 0) {

                console.log("  Coleção: nenhum jogo")

            } else {

                console.log("  Coleção:")

                let j = 0

                while (j < u.JogosNaColecao.length) {

                    let jogo = u.JogosNaColecao[j]

                    console.log(`    ${jogo.Jogo}`)

                    console.log(`      Nota: ${jogo.Nota == null ? "Não avaliado" : jogo.Nota + "/10"}`)

                    console.log(`      Avaliação: ${jogo.Avaliacao == "" ? "Nenhuma avaliação escrita" : jogo.Avaliacao}`)

                    j++

                }

            }

            i++

        }

    } else if (opcao == "3") {

        let usuario = BuscarUsuario(await Perguntar("Seu nome: "))

        if (usuario == null) {

            console.log("Usuário não encontrado")

        } else {

            console.log(usuario.AdicionarJogo(await Perguntar("Nome do jogo: ")))

        }

    } else if (opcao == "4") {

        let usuario = BuscarUsuario(await Perguntar("Seu nome: "))

        if (usuario == null) {

            console.log("Usuário não encontrado")

        } else {

            let nomeJogo = await Perguntar("Nome do jogo: ")

            let notaTexto = await Perguntar("Nota de 0 a 10: ")

            let nota = Number(notaTexto.replace(",", "."))

            if (notaTexto == "" || !Number.isFinite(nota) || nota < 0 || nota > 10) {

                console.log("Nota inválida. Digite um número de 0 a 10")

            } else {

                let avaliacao = await Perguntar("Escreva sua avaliação: ")

                console.log(usuario.AvaliarJogo(nomeJogo, nota, avaliacao))

            }

        }

    } else if (opcao == "5") {

        let nome = await Perguntar("Nome: ")

        if (nome == "") {

            console.log("O nome não pode ficar vazio")

        } else {

            let nasc = LerData(await Perguntar("Data de nascimento (dd/mm/aaaa): "))

            if (nasc == null) {

                console.log("Data inválida, use o formato dd/mm/aaaa")

            } else {

                console.log(CriarUsuario(nome, nasc.getDate(), nasc.getMonth() + 1, nasc.getFullYear()))

            }

        }

    } else if (opcao == "6") {

        let nome = await Perguntar("Nome do jogo: ")

        let generos = await Perguntar("Gêneros: ")

        let ano = await Perguntar("Ano de lançamento: ")

        let plataformas = await Perguntar("Plataformas: ")

        let desenvolvedora = await Perguntar("Desenvolvedora: ")

        let modoDeJogo = await Perguntar("Modo de jogo (Single-player, Multiplayer, Coop etc.): ")

        if (nome == "" || generos == "" || plataformas == "" || desenvolvedora == "" || modoDeJogo == "") {

            console.log("Nenhum campo pode ficar vazio")

        } else if (ano == "" || !Number.isInteger(Number(ano)) || Number(ano) < 1950 || Number(ano) > new Date().getFullYear()) {

            console.log("Ano de lançamento inválido")

        } else {

            console.log(CriarJogo(nome, generos, Number(ano), plataformas, desenvolvedora, modoDeJogo))

        }

    } else if (opcao == "0") {

        rodando = false

    } else {

        console.log("Opção inválida, escolha um número de 0 a 6")

    }

}

rl.close()