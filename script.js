class JogoDaForca{
    gridTeclado = document.querySelector('.teclado')
    palavraMostradaElement = document.getElementById('palavra-mostrada')
    letrasErradasElement = document.getElementById('letras-erradas')
    imgForca = document.getElementById('forca-img')

    palavras = [
        "ABACATE", "ABACAXI", "ACEROLA", "AÇAI", "ARAÇA", "ABACATE", "BACABA", "BACURI", 
        "BANANA", "CAJA", "CAJU", "CARAMBOLA", "CUPUAÇU", "GRAVIOLA", "GOIABA", "JABUTICABA", 
        "JENIPAPO", "MAÇA", "MANGABA", "MANGA", "MARACUJA", "MURICI", "PEQUI", "PITANGA", 
        "PITAYA", "SAPOTI", "TANGERINA", "UMBU", "UVA", "UVAIA"
    ]
    
    palavra = ''
    letrasCorretas = new Set()
    letrasErradas = new Set()
    tentativasMaximas = 6
    tentativas = 0
    
    constructor(){
        this.escolherPalavra()
        this.registrarEventos()
    }

    registrarEventos() {
        this.gridTeclado.childNodes.forEach(botao => {
            botao.addEventListener('click', (e) => this.digitarCaractere(e))
        })
    }

    digitarCaractere(evento) {
        const letraClicada = evento.target.textContent
        this.checarChute(letraClicada)
    }

    escolherPalavra() {
        this.palavra = this.palavras[Math.floor(Math.random() * this.palavras.length)]
        this.letrasCorretas.clear()
        this.letrasErradas.clear()
        this.tentativas = 0
        
        this.palavraMostradaElement.textContent = '_'.repeat(this.palavra.length)
        this.letrasErradasElement.textContent = ''
        
        this.imgForca.src = '/assets/forca.png'
        
        console.log(this.palavra)
    }

    desenharForca() {
        
        if (this.tentativas == 1) {
            this.imgForca.src = '/assets/forca01.png'
            console.log('não perdeu')
        }else if (this.tentativas == 2) {
            this.imgForca.src = '/assets/forca02.png'
            console.log('não perdeu')
        }else if (this.tentativas == 3) {
            this.imgForca.src = '/assets/forca03.png'
            console.log('não perdeu')
        }else if (this.tentativas == 4) {
            this.imgForca.src = '/assets/forca04.png'
            console.log('não perdeu')
        }else if (this.tentativas == 5) {
            this.imgForca.src = '/assets/forca05.png'
            console.log('não perdeu')
        }else if (this.tentativas == 6) {
            this.imgForca.src = '/assets/forca06.png'
            console.log('perdeu')
        }
    }

    atualizarPalavraMostrada() {
        let palavraMostrada = ''
        
        for (let letra of this.palavra) {
            if (this.letrasCorretas.has(letra)) {
                palavraMostrada += letra
            } else {
                palavraMostrada += '_'
            }
        }
        
        this.palavraMostradaElement.textContent = palavraMostrada
    }
    
    atualizarLetrasErradas() {
        this.letrasErradasElement.textContent = Array.from(this.letrasErradas).join(' ')
    }
      
    checarChute(letra) {
        const chute = letra

        if (chute.length !== 1 || !chute.match(/[A-ZÇ]/)) return;
        
        if (this.letrasCorretas.has(chute) || this.letrasErradas.has(chute)) {
            alert('Você já tentou essa letra.')
            return
        }
        
        if (this.palavra.includes(chute)) {
            this.letrasCorretas.add(chute)
        } else {
            this.letrasErradas.add(chute)
            this.tentativas++
        }
        
        this.atualizarPalavraMostrada()
        this.atualizarLetrasErradas()
        this.desenharForca()

        if (this.palavraMostradaElement.textContent === this.palavra) {
            this.exibirNotificacao('Parabéns, você venceu!', true, 3000)
            this.escolherPalavra()
        } else if (this.tentativas >= this.tentativasMaximas) {
            this.exibirNotificacao('Game over! A palavra era: ' + this.palavra, false, 3000)
            this.imgForca.style.backgroundImage('/assets/forca06.png')
            this.escolherPalavra()
        }
    }

    exibirNotificacao(mensagem, jogadorAcertou, tempo) {
        const pnlConteudo = document.getElementById('pnl-conteudo');
    
        const txtNotificacao = document.createElement('p');
        txtNotificacao.textContent = mensagem;
        
        this.classificarNotificacao(jogadorAcertou, txtNotificacao);
    
        setTimeout(function() {
            pnlConteudo.querySelector('p')?.remove();
        }, tempo);
    
        pnlConteudo.appendChild(txtNotificacao);
    }
    
    classificarNotificacao(jogadorAcertou, txtNotificacao) {
        if(jogadorAcertou) {
            txtNotificacao.classList.remove('notificacao-erro');
            txtNotificacao.classList.add('notificacao-acerto');
            return;
        }
    
        txtNotificacao.classList.remove('notificacao-acerto');
        txtNotificacao.classList.add('notificacao-erro');
    }
}

window.addEventListener('load', () => new JogoDaForca());