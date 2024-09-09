class RecintosZoo {
    constructor() {
        
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { macaco: 3 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { gazela: 1 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { leão: 1 } }
        ];

        
        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: 'savana ou floresta' },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: 'savana ou rio' }
        };
    }

    analisaRecintos(animal, quantidade) {
        
        if (!this.animais[animal.toUpperCase()]) {
            return { erro: "Animal inválido", recintosViaveis: [] };
        }
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: [] };
        }

        const animalData = this.animais[animal.toUpperCase()];
        const biomaAnimal = animalData.bioma;
        const tamanhoAnimal = animalData.tamanho;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const recTipoBioma = recinto.bioma;
            const tamanhoDisponivel = recinto.tamanhoTotal - this.getTamanhoOcupado(recinto.animais, this.animais);

            if (this.podeAcomodar(animal, recTipoBioma, tamanhoDisponivel, tamanhoAnimal, quantidade, recinto.animais)) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${tamanhoDisponivel - (tamanhoAnimal * quantidade)} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: [] };
        }

        return { erro: null, recintosViaveis: recintosViaveis.sort((a, b) => a.localeCompare(b)) };
    }

    
    podeAcomodar(animal, biomaRecinto, tamanhoDisponivel, tamanhoAnimal, quantidade, animaisNoRecinto) {
        if (biomaRecinto.includes('e') && !this.biomaPodeAcomodar(animal)) {
            return false;
        }

        if (animal === 'HIPOPOTAMO' && biomaRecinto !== 'savana e rio') {
            return false;
        }

        if (animal === 'MACACO' && Object.keys(animaisNoRecinto).length > 0) {
            return false;
        }

        const totalEspacoOcupado = this.getTotalEspacoOcupado(animaisNoRecinto, this.animais) + (tamanhoAnimal * quantidade) + (Object.keys(animaisNoRecinto).length > 0 ? 1 : 0);
        
        return tamanhoDisponivel >= totalEspacoOcupado;
    }

    
    biomaPodeAcomodar(animal) {
        const biomasAnimal = this.animais[animal.toUpperCase()].bioma.split(' ou ');
        return biomasAnimal.some(bioma => this.recintos.some(r => r.bioma === bioma));
    }

    
    getTamanhoOcupado(animaisNoRecinto, animais) {
        return Object.entries(animaisNoRecinto).reduce((total, [animal, quantidade]) => total + (animais[animal.toUpperCase()].tamanho * quantidade), 0);
    }

    
    getTotalEspacoOcupado(animaisNoRecinto, animais) {
        return Object.entries(animaisNoRecinto).reduce((total, [animal, quantidade]) => total + (animais[animal.toUpperCase()].tamanho * quantidade), 0);
    }
}

export { RecintosZoo as RecintosZoo };
