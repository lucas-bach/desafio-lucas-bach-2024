class RecintosZoo {
    constructor() {
        this.recintos = [
            { id: 1, bioma: "savana", tamanho: 10, animais:{macaco : 3} },
            { id: 2, bioma: "floresta", tamanho: 5, animais: {} },
            { id: 3, bioma: "savana e rio", tamanho: 7, animais: {gazela : 1 }},
            { id: 4, bioma: "rio", tamanho: 8, animais: {}},
            { id: 5, bioma: "savana", tamanho: 9, animais: {leao : 1} },
        ];



        this.animais = {
            leao: {  tamanho: 3, bioma: "savana" },
            leopardo: {  tamanho: 2, bioma: "savana" },
            crocodilo: {  tamanho: 3, bioma: "rio" },
            macaco: {  tamanho: 1, bioma: "savana ou floresta" },
            gazela: {  tamanho: 2, bioma: "savana" },
            hipopotamo: {  tamanho: 4, bioma: "savana ou rio" },
        }
    }


    analisaRecintos(animal, quantidade) {
        if(!this.animais[animal.toUpperCase()]) {
            return {
                erro: "Animal inválido",
                recintosViaveis: []
            }
        }

        if(quantidade <= 0 || !Number.isInteger(quantidade)) {
            return {
                erro: "Quantidade inválida",
                recintosViaveis: []
            }
        }

        const animalData = this.animais[animal.toUpperCase()];
        const biomaAnimal = animalData.bioma;
        const tamanhioAnimal = animalData.tamanho;
        const recintosViaveis = [];

        


    }

}