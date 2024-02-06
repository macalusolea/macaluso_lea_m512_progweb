export class Country { // exportation de la classe Country

    constructor(countryData) {
        this.countryData = countryData;
        this.possibleAnswers = this.extractGoodAnswers();
    }

    extractGoodAnswers() {
        return new Set(Object.values(this.countryData.translations).map(translation => translation.common.toLowerCase()));
        // ici on retourne l'objet transformer en tableau avec Object.values dans un Set pour pas afficjer des doublons
    }

    get flag() { // getter pour drapeau du pays
        return this.countryData.flags.png;
    }

    checkAnswer(answer) { // vérifer les données qui nous sont envoyées
        return this.possibleAnswers.has(answer.toLowerCase());
    }

    displayFlag() {
        const flagElement = document.getElementById('flag');
        flagElement.innerHTML = `<img src="${this.flag}" alt="Flag">`;
    }
}
