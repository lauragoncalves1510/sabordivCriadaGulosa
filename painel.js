let listaDeVoos = []

const tela = document.getElementById("telaDoAeroporto");

function atualizarPainel() {
    const voosDiv = document.getElementById("voos");
    voosDiv.innerHTML = ""
    listaDeVoos.forEach(voo => {
        const divCriadaGulosa = document.createElement("div");
        voosDiv.appendChild(divCriadaGulosa);
        divCriadaGulosa.classList.add('card-voo');

        Object.entries(voo).forEach(informacao => {
            divCriadaGulosa.innerHTML += `<br>${informacao[0]}</b>: ${informacao[1]} <br>`
        })

        const botao = document.createElement('button');
        divCriadaGulosa.appendChild(botao);
        botao.classList.add('botao-decolar')
        botao.innerHTML = "Decolar."

        botao.addEventListener('click', () => {
            alert(`O voo ${voo.codigo} decolou. Tuff.`)
        })
    });
}

atualizarPainel();

const formulario = document.getElementById("formDespacho");
const campoCodigo = document.getElementById("inputCodigo");
const campoDestino = document.getElementById("inputDestino");

formulario.addEventListener("submit", function(evento) {
    
    evento.preventDefault()

    const codigoDigitado = campoCodigo.value;
    const destinoDigitado = campoDestino.value;

    const novoVoo = {
        codigo: codigoDigitado,
        destino: destinoDigitado,
        status: "Embarque",
        portao: "05"
    };

    
    listaDeVoos.push(novoVoo);  
    let arrayConvertidoEmTexto = JSON.stringify(listaDeVoos);
    localStorage.setItem("diario_de_voos", arrayConvertidoEmTexto)
    atualizarPainel();

    campoCodigo.value = ""
    campoDestino.value = ""
});

// ========================================================
// DESAFIO 1: O BOOT DO SISTEMA (Carregando a Caixa-Preta)
// ========================================================
// Em vez de começar com um Array vazio ou chumbado, vamos olhar o LocalStorage.
// PESQUISE NO GOOGLE: "JavaScript localStorage getItem MDN"
// PESQUISE NO GOOGLE: "JavaScript JSON parse W3Schools"


 // Array que vai guardar os dados

// 1. Tente buscar os voos salvos no disco com o nome "diario_de_voos"
let voosSalvos = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("diario_de_voos") != null) {
        voosSalvos = localStorage.getItem("diario_de_voos");
        atualizarPainel();
    }
    
    if (voosSalvos.length != 0) {
        listaDeVoos = JSON.parse(voosSalvos);
        atualizarPainel(); 
    }
})

// Executa a função que vocês já criaram para desenhar a tela


// ========================================================
// DESAFIO 2: SALVANDO UM NOVO VOO (Gravando na Caixa-Preta)
// ========================================================


