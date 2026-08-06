// A URL do Satélite Meteorológico apontada para Assis Chateaubriand/PR
const urlSatelite = "https://api.open-meteo.com/v1/forecast?latitude=-24.41&longitude=-53.52&current_weather=true";

// ========================================================
// DESAFIO 1: A BUSCA ASSÍNCRONA (A Mágica do Tempo)
// ========================================================
// PESQUISE NO GOOGLE: "JavaScript async await MDN"
// PESQUISE NO GOOGLE: "JavaScript Fetch API W3Schools"

// 1. Coloque a palavra mágica antes de 'function' para avisar que esta função lida com o tempo.
async function buscarClimaAtual() {
    
    try {
        console.log("Conectando ao satélite...");

        // 2. Use a função 'fetch' para buscar os dados na 'urlSatelite'. 
        // ATENÇÃO: Você precisa mandar o JavaScript ESPERAR a resposta usando a palavra 'await'.
        const resposta = await fetch(urlSatelite);
        const dadosJson = await resposta.json()
        console.log(dadosJson)

        // 3. A resposta chega como um pacote de texto. Mande o JS ESPERAR a conversão para JSON.
       
        
        // Extraindo a temperatura do JSON que chegou
        let temperaturaAtual = dadosJson.current_weather.temperature;
        
        // 4. Mostrando na tela! (Crie um <h3 id="painelClima"> no seu HTML para isso funcionar)
        document.getElementById("painelClima").innerText = `Temperatura Local: ${temperaturaAtual}°C 🌡️`;
        document.getElementById("painelClima").style.color = "cyan";

    } catch (erro) {
        // Se a internet cair, o sistema cai aqui!
        console.error("Falha na comunicação com o satélite:", erro);
        document.getElementById("painelClima").innerText = "Satélite Offline ❌";
        document.getElementById("painelClima").style.color = "red";
    }
}

// Executando a função ao carregar o sistema
buscarClimaAtual();
