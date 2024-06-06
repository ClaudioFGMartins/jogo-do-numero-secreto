/*let titulo = document.querySelector('h1'); // seleciona a tag <h1></h1> do html
titulo.innerHTML = 'Jogo do número secreto'; // tradução de inner, dentro do html

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';*/
//antigo

//-------------------------------------------------------------------------------------

//novo daqui pra baixo
//função tem a responsabilidade de determinar alguma ação dentro do codigo.
let listaDeNumerosSorteados = []
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1

function verificarChute() { // puxando verificar chute la do onclick no html, e fazendo a função
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!')
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensaguemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensaguemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numeroSecreto) {
        exibirTextoNaTela('h1', 'Errou!')
        exibirTextoNaTela('p', 'o número secreto e menor')
        } else {
            exibirTextoNaTela('h1', 'Errou!')
            exibirTextoNaTela('p', 'O número secreto e maior')
        }
        tentativas++
        LimparCampo();


    }
};

function exibirTextoNaTela(tag, texto) { // criando a função que recebe a tag e o texto
    let campo = document.querySelector(tag) //puxa a tag
    campo.innerHTML = texto; // puxa o texto da tag
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto') // executa a função, informando tag e texto.
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10')
}

exibirMensagemInicial()

function gerarNumeroAleatorio() {
    let numerosEscolhido = parseInt(Math.random() * numeroLimite + 1)
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []
    }
    if (listaDeNumerosSorteados.includes(numerosEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
       listaDeNumerosSorteados.push(numerosEscolhido)
       console.log(listaDeNumerosSorteados) 
       return numerosEscolhido
    }
}

function LimparCampo() {
    chute = document.querySelector('input')
    chute.value = ''
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    LimparCampo()
    tentativas = 1
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled',true)
}