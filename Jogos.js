
import fs from "fs"

class Jogo {

    constructor(Nome, Generos, Ano, Plataformas, Desenvolvedora, ModoDeJogo) {

        this.Nome = Nome
        this.Generos = Generos
        this.Ano = Ano
        this.Plataformas = Plataformas
        this.Desenvolvedora = Desenvolvedora
        this.ModoDeJogo = ModoDeJogo

    }

    EditarNome(NomeNovo) {

        this.Nome = NomeNovo
        SalvarJogos()

    }

    EditarGeneros(GenerosNovo) {

        this.Generos = GenerosNovo
        SalvarJogos()

    }

    EditarAno(AnoNovo) {

        this.Ano = AnoNovo
        SalvarJogos()

    }

    EditarPlataformas(PlataformasNovas) {

        this.Plataformas = PlataformasNovas
        SalvarJogos()

    }

    EditarDesenvolvedora(DesenvolvedoraNova) {

        this.Desenvolvedora = DesenvolvedoraNova
        SalvarJogos()

    }

    EditarModoDeJogo(ModoDeJogoNovo) {

        this.ModoDeJogo = ModoDeJogoNovo
        SalvarJogos()

    }

}

let Jogos = []

if (fs.existsSync("jogos.json")) {

    // o JSON volta como objeto comum, sem os métodos, então recria cada jogo com new Jogo

    let dados = JSON.parse(fs.readFileSync("jogos.json", "utf-8"))

    let i = 0

    while (i < dados.length) {

        let j = dados[i]

        Jogos.push(new Jogo(
            j.Nome,
            j.Generos,
            j.Ano,
            j.Plataformas,
            j.Desenvolvedora,
            j.ModoDeJogo
        ))

        i++

    }

} else {

    // lista padrão, usada só quando o jogos.json ainda não existe

    Jogos = [

        new Jogo("Hollow Knight", "Metroidvania, Aventura, Indie", 2017, "Xbox One, PS4, Nintendo Switch, PC, Mac, Linux", "Team Cherry", "Single-player"),

        new Jogo("Hollow Knight: Silksong", "Metroidvania, Aventura, Indie", 2025, "Xbox One, Xbox Series X|S, PS5, Nintendo Switch, Nintendo Switch 2, PC, Mac, Linux", "Team Cherry", "Single-player"),

        new Jogo("Termo do Jacó", "Jogo Mental", 2026, "Web", "Davi J.", "Single-player"),

        new Jogo("Red Dead Redemption 2", "Tiro, Aventura, RPG", 2018, "Xbox One, PS4, PC", "Rockstar Games", "Single-player"),

        new Jogo("Far Cry 3", "Tiro, Aventura", 2012, "Xbox 360, PS3, PC", "Ubisoft", "Single-player, Multiplayer, Coop"),

        new Jogo("Sekiro: Shadows Die Twice", "Ação, Soulslike, Hack and Slash", 2019, "Xbox One, PS4, PC", "FromSoftware", "Single-player")

    ]

    SalvarJogos()

}

function SalvarJogos() {

    fs.writeFileSync("jogos.json", JSON.stringify(Jogos, null, 2))

}

// procura o jogo pelo nome, sem ligar para maiúsculas e minúsculas

function BuscarJogo(Nome) {

    let i = 0

    while (i < Jogos.length) {

        if (Jogos[i].Nome.toLowerCase() == Nome.toLowerCase()) return Jogos[i]

        i++

    }

    return null

}

export { Jogo, Jogos, SalvarJogos, BuscarJogo }
