import axios from 'axios';
import inquirer from 'inquirer';

const menù = [
    {
        type: 'list',
        name: 'menù',
        message: 'Cosa vuoi fare?',
        choices: ['Visualizza prodotti', 'Inserisci prodotto', 'Esci']
    }
];

const domandeInserimento = [
    {
        type: 'input',
        name: 'nome',
        message: 'Il Nome del prodotto:',
        validate: (value) => {
            if (value.length > 0) {
                return true;
            } else {
                return 'Inserisci il nome del prodotto!';
            }
        }
    },
    {
        type: 'number',
        name: 'prezzo',
        message: 'Il Prezzo del prodotto:',
        validate: (value) => {
            if (value >= 0) {
                return true;
            } else {
                return 'Inserisci un prezzo maggiore di 0!';
            }
        }
    },
    {
        type: 'number',
        name: 'quantità',
        message: 'La Quantità del prodotto:',
        validate: (value) => {
            if (value >= 0) {
                return true;
            } else {
                return 'Inserisci una quantità maggiore di 0!';
            }
        }
    }
];

function main() {
    inquirer.prompt(menù).then((answers) => {
        switch(answers.menù) {
            case 'Visualizza prodotti':
                axios.get('http://localhost:3000/api/prodotti').then((response) => {
                    console.log(response.data);
                });
                break;
            case 'Inserisci prodotto':
                inquirer.prompt(domandeInserimento).then((answers) => {
                    axios.post('http://localhost:3000/api/prodotto', {
                        nome: answers.nome,
                        prezzo: answers.prezzo,
                        quantità: answers.quantità
                    }).then((response) => {
                        console.log(response.data);        
                    }).catch((err) => {
                        console.log(err.response.data);
                    });
                });
                break;
            case 'Esci':
                console.log("Ciao!");
                return;
        }
    });
}


main();