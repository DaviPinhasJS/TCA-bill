
class Jogo {
    constructor() {
        // Telas do jogo
        this.menu = document.getElementById("menu");
        this.cenario = document.getElementById("cenario");
        this.telaMemorias = document.getElementById("tela-memorias");

        // Elementos do diálogo
        this.nome = document.getElementById("nome");
        this.texto = document.getElementById("texto");
        this.escolhas = document.getElementById("escolhas");
        this.continuar = document.getElementById("continuar");

        // Música de fundo
        this.musica = document.getElementById("musica-fundo");

        if (this.musica) {
            this.musica.volume = 0.25;
        }

        // Progresso
        this.cenaAtual = 0;
        this.memoriaAtual = null;
        this.memoriaEmReproducao = false;
        this.memoriaDesbloqueada = [];

        // Cenas iniciais
        this.cenas = [
            {
                nome: "",
                texto: "Você não se lembra de como chegou aqui.\n\nSó sabe que está cansado.",
                escolhas: [
                    {
                        texto: "Abrir os olhos",
                        acao: () => this.mostrarCena(1)
                    },
                    {
                        texto: "Continuar dormindo",
                        acao: () => this.morrer(
                            "Você escolheu não despertar.\n\nTalvez fugir fosse mais fácil."
                        )
                    }
                ]
            },
            {
                nome: "",
                texto: "Uma estação vazia.\n\nO ar é frio. As luzes piscam sobre os trilhos.\n\nVocê sente uma culpa que não consegue explicar.",
                escolhas: [
                    {
                        texto: "Levantar",
                        acao: () => this.mostrarCena(2)
                    },
                    {
                        texto: "Ficar sentado",
                        acao: () => this.morrer(
                            "Você permanece imóvel.\n\nO último trem passa sem fazer barulho.\n\nQuando percebe, está sozinho outra vez."
                        )
                    }
                ],
                mostrarEstacao: true
            },
            {
                nome: "",
                texto: "Você se levanta.\n\nDo outro lado dos trilhos, existe uma passagem que não estava ali antes.\n\nUma voz distante sussurra:",
                escolhas: [
                    {
                        texto: "Seguir a voz",
                        acao: () => this.mostrarCena(3)
                    },
                    {
                        texto: "Tentar voltar para casa",
                        acao: () => this.morrer(
                            "Você caminha na direção contrária.\n\nMas a estação nunca termina."
                        )
                    }
                ]
            },
            {
                nome: "???",
                texto: "Você finalmente chegou.\n\nAqui, ninguém pode esconder aquilo que realmente é.\n\nSete caminhos estão diante de você.\n\nEscolha com cuidado.",
                escolhas: [
                    {
                        texto: "Entrar na passagem",
                        acao: () => this.mostrarCena(4)
                    }
                ]
            },
            {
                nome: "",
                texto: "A passagem se fecha atrás de você.\n\nO silêncio pesa sobre seus ombros.\n\nVocê sente que este lugar está esperando alguma coisa de você.",
                escolhas: [
                    {
                        texto: "Continuar",
                        acao: () => this.mostrarCena(5)
                    }
                ]
            },
            {
                nome: "",
                texto: "Uma porta aparece à sua frente.\n\nNela, há uma frase escrita:\n\n\"Você já esteve aqui antes.\"",
                escolhas: [
                    {
                        texto: "Abrir a porta",
                        acao: () => this.mostrarCena(6)
                    },
                    {
                        texto: "Recusar",
                        acao: () => this.morrer(
                            "Você se recusa a seguir em frente.\n\nA escuridão toma conta de tudo."
                        )
                    }
                ]
            },
            {
                nome: "",
                texto: "Do outro lado, você encontra sete portas.\n\nCada uma parece guardar algo que você tentou esquecer.\n\nUma delas começa a se abrir sozinha.",
                escolhas: [
                    {
                        texto: "Entrar",
                        acao: () => this.mostrarCena(7)
                    }
                ]
            },
            {
                nome: "???",
                texto: "Antes de continuar, você precisa entender uma coisa.\n\nEste lugar não está julgando quem você é.\n\nEstá mostrando aquilo que você fez.",
                escolhas: [
                    {
                        texto: "Eu quero saber a verdade",
                        acao: () => this.mostrarCena(8)
                    },
                    {
                        texto: "Eu não quero lembrar",
                        acao: () => this.morrer(
                            "Você fecha os olhos.\n\nMas algumas lembranças nunca deixam de existir."
                        )
                    }
                ]
            },
            {
                nome: "",
                texto: "O chão desaparece sob seus pés.\n\nVocê cai em um lugar que parece não ter fim.\n\nAo longe, uma voz chama pelo seu nome.",
                escolhas: [
                    {
                        texto: "Seguir em frente",
                        acao: () => this.mostrarCena(9)
                    }
                ]
            },
            {
                nome: "",
                texto: "Você chegou ao início do seu julgamento.\n\nNão existem respostas fáceis aqui.\n\nApenas escolhas.",
                escolhas: [
                    {
                        texto: "Começar",
                        acao: () => this.mostrarCena(10)
                    }
                ]
            },
            {
                nome: "",
                texto: "Diante de você, surge uma figura encapuzada.\n\nEla estende a mão e pergunta:\n\n\"Qual parte de você está disposto a enfrentar primeiro?\"",
                escolhas: [
                    {
                        texto: "Aceitar a mão",
                        acao: () => this.mostrarCena(11)
                    },
                    {
                        texto: "Afastar-se",
                        acao: () => this.morrer(
                            "A figura desaparece.\n\nVocê percebe que continua no mesmo lugar."
                        )
                    }
                ]
            },
            {
                nome: "???",
                texto: "Então escolha.\n\nE lembre-se: toda escolha tem um preço.",
                escolhas: [
                    {
                        texto: "Continuar",
                        acao: () => this.mostrarCena(12)
                    }
                ]
            },
            {
                nome: "",
                texto: "Uma sensação estranha percorre seu corpo.\n\nPor um instante, você reconhece aquele lugar.\n\nMas a lembrança desaparece antes que possa alcançá-la.",
                escolhas: [
                    {
                        texto: "Investigar a sensação",
                        acao: () => this.mostrarCena(13)
                    },
                    {
                        texto: "Ignorá-la",
                        acao: () => this.morrer(
                            "Você tenta ignorar o passado.\n\nEle encontra você mesmo assim."
                        )
                    }
                ]
            },
            {
                nome: "",
                texto: "Você encontra um espelho.\n\nSeu reflexo não acompanha seus movimentos.\n\nEle parece decepcionado com você.",
                escolhas: [
                    {
                        texto: "Olhar nos próprios olhos",
                        acao: () => this.mostrarCena(14)
                    },
                    {
                        texto: "Quebrar o espelho",
                        acao: () => this.morrer(
                            "O vidro se parte.\n\nCada fragmento mostra uma versão diferente de você."
                        )
                    }
                ]
            },
            {
                nome: "Reflexo",
                texto: "Você realmente não se lembra?\n\nOu apenas prefere não lembrar?",
                escolhas: [
                    {
                        texto: "Eu não sei",
                        acao: () => this.mostrarCena(15)
                    },
                    {
                        texto: "Eu não fiz nada de errado",
                        acao: () => this.morrer(
                            "O reflexo sorri.\n\n\"É isso que todos dizem.\""
                        )
                    }
                ]
            },
            {
                nome: "",
                texto: "O espelho desaparece.\n\nÀ sua frente, sete símbolos brilham na escuridão.\n\nVocê entende que cada um representa uma parte de si mesmo.",
                escolhas: [
                    {
                        texto: "Aproximar-se dos símbolos",
                        acao: () => this.mostrarCena(16)
                    }
                ]
            },
            {
                nome: "",
                texto: "Uma última mensagem surge no escuro:\n\n\"Você não pode mudar o que aconteceu. Mas pode decidir se vai continuar fugindo.\"",
                escolhas: [
                    {
                        texto: "Enfrentar o primeiro caminho",
                        acao: () => this.mostrarCena(17)
                    }
                ]
            },
            {
                nome: "",
                texto: "O primeiro caminho está diante de você.\n\nVocê sente que algo terrível aconteceu em sua vida passada.\n\nMas ainda não sabe o quê.",
                escolhas: [
                    {
                        texto: "Entrar",
                        acao: () => this.mostrarCena(18)
                    },
                    {
                        texto: "Voltar",
                        acao: () => this.morrer(
                            "Você tenta voltar.\n\nA porta já não existe."
                        )
                    }
                ]
            },
            {
                nome: "",
                texto: "A escuridão se fecha ao seu redor.\n\nUma lembrança começa a despertar...",
                escolhas: [
                    {
                        texto: "Continuar",
                        acao: () => this.mostrarCena(19)
                    }
                ]
            },
            {
                nome: "",
                texto: "Por enquanto, só existe silêncio.\n\nE a certeza de que sua jornada está apenas começando.",
                escolhas: [
                    {
                        texto: "Voltar ao menu",
                        acao: () => this.voltarMenu()
                    }
                ]
            }
        ];

        // Memórias desbloqueáveis
        this.memorias = [
            {
                id: "preguica",
                titulo: "Memória I — A oportunidade",
                texto: "Você se lembra de um dia em que poderia ter feito a diferença.\n\nMas estava cansado demais para tentar.\n\nNaquele momento, parecia que nada mudaria se você simplesmente deixasse para depois.\n\nVocê nunca descobriu o que teria acontecido se tivesse agido."
            },
            {
                id: "ganancia",
                titulo: "Memória II — O preço",
                texto: "Você tinha a chance de ajudar alguém.\n\nMas escolheu ficar com aquilo que poderia perder.\n\nNa época, chamou isso de necessidade.\n\nAgora, não consegue deixar de pensar no preço que outra pessoa pagou."
            },
            {
                id: "ira",
                titulo: "Memória III — As últimas palavras",
                texto: "A discussão começou por algo pequeno.\n\nVocê queria vencer. Queria que a outra pessoa sentisse a mesma dor que você.\n\nDisse coisas que não poderia retirar depois.\n\nE aquela foi a última vez que vocês conversaram."
            },
            {
                id: "inveja",
                titulo: "Memória IV — A comparação",
                texto: "Você olhava para a vida dos outros e sentia que a sua era insuficiente.\n\nAos poucos, começou a tratar como rival alguém que só queria estar ao seu lado.\n\nQuando percebeu o que estava fazendo, a relação já havia mudado."
            },
            {
                id: "orgulho",
                titulo: "Memória V — A verdade",
                texto: "Você sabia que estava errado.\n\nMesmo assim, preferiu sustentar a mentira a admitir a verdade.\n\nAlguém tentou estender a mão.\n\nVocê recusou, porque aceitar ajuda parecia uma derrota."
            },
            {
                id: "gula",
                titulo: "Memória VI — O vazio",
                texto: "Você tentou preencher um vazio com tudo o que conseguia encontrar.\n\nMais coisas, mais distrações, mais excessos.\n\nPor alguns instantes, funcionava.\n\nDepois, o vazio voltava — maior do que antes."
            },
            {
                id: "luxuria",
                titulo: "Memória VII — O desejo",
                texto: "Você queria tanto alguma coisa que deixou de enxergar a pessoa diante de você.\n\nSeus desejos falaram mais alto que os sentimentos e os limites de alguém.\n\nQuando tudo terminou, você percebeu que conseguir o que queria não significava ter conquistado alguma coisa."
            }
        ];

        // Botões do menu
        document.getElementById("novo-jogo").addEventListener("click", () => {
            this.cenaAtual = 0;
            this.memoriaEmReproducao = false;

            if (this.musica) {
                this.musica.play().catch(() => {
                    console.log("A música não pôde começar.");
                });
            }

            this.mostrarTela("cenario");
            this.mostrarCena();
        });

        document.getElementById("memorias").addEventListener("click", () => {
            this.mostrarMemorias();
        });

        document.getElementById("sair").addEventListener("click", () => {
            this.nome.textContent = "";
            this.texto.textContent =
                "Você fecha os olhos.\n\nA escuridão permanece.";
            this.escolhas.innerHTML = "";
            this.criarBotao("Voltar ao menu", () => this.voltarMenu());
            this.mostrarTela("cenario");
        });

        // Botões das telas
        document.getElementById("voltar-menu").addEventListener("click", () => {
            this.voltarMenu();
        });

        document.getElementById("voltar-memorias").addEventListener("click", () => {
            this.mostrarTela("menu");
        });

        // Botão para avançar diálogos
        this.continuar.addEventListener("click", () => {
            if (this.memoriaEmReproducao) {
                this.mostrarMemorias();
                return;
            }

            this.mostrarCena(this.cenaAtual + 1);
        });
    }

    mostrarTela(tela) {
        this.menu.classList.add("escondido");
        this.cenario.classList.add("escondido");
        this.telaMemorias.classList.add("escondido");

        if (tela === "menu") {
            this.menu.classList.remove("escondido");
        } else if (tela === "cenario") {
            this.cenario.classList.remove("escondido");
        } else if (tela === "memorias") {
            this.telaMemorias.classList.remove("escondido");
        }
    }

    mostrarCena(indice) {
        if (indice !== undefined) {
            this.cenaAtual = indice;
        }

        const cena = this.cenas[this.cenaAtual];

        if (!cena) {
            this.morrer("O caminho termina aqui.\n\nPor enquanto.");
            return;
        }

        // Controla quando a imagem da estação aparece
        if (cena.mostrarEstacao) {
            this.cenario.classList.add("estacao-visivel");
        } else if (this.cenaAtual === 0) {
            this.cenario.classList.remove("estacao-visivel");
        }

        this.nome.textContent = cena.nome;
        this.texto.textContent = cena.texto;
        this.escolhas.innerHTML = "";

        // Mostra as escolhas disponíveis
        if (cena.escolhas && cena.escolhas.length > 0) {
            this.continuar.classList.add("escondido");

            cena.escolhas.forEach((escolha) => {
                this.criarBotao(escolha.texto, escolha.acao);
            });
        } else {
            this.continuar.classList.remove("escondido");
        }
    }

    criarBotao(texto, acao) {
        const botao = document.createElement("button");
        botao.textContent = texto;
        botao.addEventListener("click", acao);
        this.escolhas.appendChild(botao);
    }

    morrer(mensagem) {
        this.nome.textContent = "";
        this.texto.textContent = mensagem;
        this.escolhas.innerHTML = "";
        this.continuar.classList.add("escondido");

        this.criarBotao("Voltar ao menu", () => {
            this.voltarMenu();
        });

        this.criarBotao("Tentar novamente", () => {
            this.cenaAtual = 0;
            this.mostrarTela("cenario");
            this.mostrarCena();
        });
    }

    voltarMenu() {
        this.memoriaEmReproducao = false;
        this.mostrarTela("menu");
        this.cenario.classList.remove("estacao-visivel");
    }

    mostrarMemorias() {
        this.mostrarTela("memorias");

        const mensagem = document.getElementById("mensagem-memorias");
        mensagem.innerHTML = "";

        if (this.memoriaDesbloqueada.length === 0) {
            mensagem.textContent =
                "Nenhuma memória foi desbloqueada ainda.\n\nContinue sua jornada para descobrir o passado.";
            return;
        }

        this.memoriaDesbloqueada.forEach((id) => {
            const memoria = this.memorias.find((item) => item.id === id);

            if (!memoria) {
                return;
            }

            const botao = document.createElement("button");
            botao.textContent = memoria.titulo;

            botao.addEventListener("click", () => {
                this.reproduzirMemoria(memoria);
            });

            mensagem.appendChild(botao);
        });

        if (this.memoriaDesbloqueada.length === this.memorias.length) {
            const final = document.createElement("p");
            final.textContent =
                "Todas as memórias foram encontradas.\n\nTalvez agora você esteja pronto para descobrir a verdade.";
            mensagem.appendChild(final);
        }
    }

    reproduzirMemoria(memoria) {
        this.memoriaEmReproducao = true;
        this.mostrarTela("cenario");

        this.nome.textContent = memoria.titulo;
        this.texto.textContent = memoria.texto;
        this.escolhas.innerHTML = "";
        this.continuar.classList.remove("escondido");
    }

    desbloquearMemoria(id) {
        if (!this.memoriaDesbloqueada.includes(id)) {
            this.memoriaDesbloqueada.push(id);
        }
    }
}

const jogo = new Jogo();
