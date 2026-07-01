let listaDeVoos = []

const tela = document.getElementById("telaDoAeroporto");
/*---------------------------------------------------*/
atualizarPainel();

const formulario = document.getElementById("formDespacho");
const campoCodigo = document.getElementById("inputCodigo");
const campoDestino = document.getElementById("inputDestino");

formulario.addEventListener("submit", function (evento) {

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

// O Array global e o carregamento inicial do LocalStorage continuam iguais...

// ========================================================
// DESAFIO 1: A FUNÇÃO DE EXCLUIR (Delete)
// ========================================================
function cancelarVoo(codigoAlvo) {

    listaDeVoos = listaDeVoos.filter((voo) => voo.codigo !== codigoAlvo)

    // 2. Agora que o Array na RAM diminuiu, salve no disco e atualize a tela!
    salvarNoDiscoERenderizar();
}
function alterarPortao(codigoAlvo, novoPortao) {

    let index = listaDeVoos.findIndex((voo) => voo.codigo === codigoAlvo)

    // 2. Se o voo existir (index maior ou igual a 0), altere o portão dele.
    if (index !== -1) {
        listaDeVoos[index].portao = novoPortao;

        // 3. Salve no disco e atualize a tela!
        salvarNoDiscoERenderizar();
    }
}

// ========================================================
// FUNÇÃO AUXILIAR: Para evitar repetição de código (DRY)
// ========================================================
function salvarNoDiscoERenderizar() {
    localStorage.setItem("diario_de_voos", JSON.stringify(listaDeVoos));
    atualizarPainel();
}

// ========================================================
// DESAFIO 3: ADICIONAR OS BOTÕES NA RENDERIZAÇÃO
// ========================================================
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

    let tela = document.getElementById("telaDoAeroporto");
    tela.innerHTML = "";

    listaDeVoos.forEach(voo => {
        let novoCard = document.createElement("div");
        novoCard.classList.add("card-voo");
        novoCard.innerHTML = `
            <h3>Voo ${voo.codigo} - Destino: ${voo.destino}</h3>
            <p>Portão: ${voo.portao}</p>
        `;

        // CRIANDO O BOTÃO DE CANCELAR DINAMICAMENTE
        let btnCancelar = document.createElement("button");
        btnCancelar.innerText = "Cancelar Voo";
        btnCancelar.style.background = "#ff3636";

        // Adicionando o evento de clique que chama a nossa função passando o código!
        btnCancelar.addEventListener("click", function () {
            if (confirm(`Tem certeza que deseja cancelar o voo ${voo.codigo}?`)) {
                cancelarVoo(voo.codigo);
            }
        });

        // CRIANDO O BOTÃO DE ALTERAR PORTÃO (Tente fazer sozinho!)
        let btnPortao = document.createElement("button");
        btnPortao.innerText = "Mudar Portão";
        btnPortao.addEventListener("click", function () {
            let novo = prompt("Digite o novo número do portão:");
            if (novo) alterarPortao(voo.codigo, novo);
        });

        // Pendura os botões no card, e o card na tela
        novoCard.appendChild(btnPortao);
        novoCard.appendChild(btnCancelar);
        tela.appendChild(novoCard);
    });
}

