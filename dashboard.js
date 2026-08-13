// SISTEMA DE DASHBOARDS - MODO HARDCORE
// Missão: Manipulação complexa de Arrays e Interatividade Sonora.

const frotaDoDia = [
    { codigo: "G3-11", status: "Confirmado", passageiros: 120 },
    { codigo: "LA-22", status: "Atrasado", passageiros: 200 },
    { codigo: "AZ-33", status: "Emergência", passageiros: 90 },
    { codigo: "AF-44", status: "Atrasado", passageiros: 300 }
];

console.log("=== PAINEL GERENCIAL DA DIRETORIA ===");


let totalPassageiros = frotaDoDia.reduce((total, onibus) => {
    return total + onibus.passageiros;
}, 0);

console.log(`📊 TOTAL: Temos ${totalPassageiros} passageiros operando hoje.`);



let qtdAtrasados = voosDoDia.filter(voo => voo.atrasado).length;

console.log(`⚠️ ALERTA: Temos ${qtdAtrasados} voos atrasados no momento!`);


export function verificarEmergencia(frotaDoDia) {
   function verificarEmergencia(listaDeVoos) {
    let temEmergencia = listaDeVoos.find(voo => voo.status === "Emergência");
    
    if (temEmergencia) {
        console.error(`🚨 EMERGÊNCIA DECLARADA NO VOO ${temEmergencia.codigo}! 🚨`);

        let sirene = new Audio("https://www.myinstants.com/media/sounds/nuclear-alarm.mp3");

        sirene.play();
    }
}
}

export const frotaDoDia = [];

// Para testar o áudio, é recomendado atrelar esta função a um clique de botão no HTML!
// O navegador bloqueia áudios que tocam sozinhos ao carregar a página por motivos de spam.
// Testem rodando a função verificarEmergencia(frotaDoDia); ao clicar num botão "Atualizar Painel".
