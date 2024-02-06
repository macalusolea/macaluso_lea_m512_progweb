import { Country } from './Country.js';

export class Game {
    #score = 0; // propriété privée du score

    constructor(countriesData) {
        this.countries = countriesData;
        this.countryIndex = 0;
        this.currentCountry = new Country(this.countries[this.countryIndex]);
        this.currentCountry.displayFlag();
    }

    get score() {
        return this.#score;
    }

    addPoint() { // Ajouter un point au score
        this.#score += 1;
    }

    finishGame() {
        return this.countryIndex >= this.countries.length;
        // si + grand retourne true sinon retourne false
    }

    nextCountry() {
        if (this.finishGame()) return;

        this.countryIndex += 1; // incrémente l'index de la partie
        this.currentCountry = new Country(this.countries[this.countryIndex]); // je fais comme dans le constructor
        this.currentCountry.displayFlag(); // affiche le nouveau drapeau
    }
}
