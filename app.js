// import { shuffle } from "lodash";
import { Game } from './Game.js';

// ici je récupère les données de lAPI
async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data.map(country => ({
        translations: country.translations,
        flags: country.flags
    }));
}

// Je n'ai pas réussi à implémenter la fonction shuffle de lodash, je l'ai donc fait moi-même
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

async function initialization() {
    try {
        const countries = await fetchCountries();
        const shuffledCountries = shuffle(countries);
        const game = new Game(shuffledCountries.slice(0, 250));
        form(game);
        displayHighScore();
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function form(game) {
    const form = document.querySelector('form');
    const input = form.querySelector('input');
    const scoreElement = document.getElementById('score').querySelector('h1');

    form.addEventListener('submit', event => {
        event.preventDefault(); // désactive comportement par défaut
        const isCorrect = game.currentCountry.checkAnswer(input.value);
        if (!isCorrect) { // si la réponse entrée est incorrecte
            alert('Incorrect! Try the next one.');
        } else { // si la réponse est correcte
            game.addPoint();
            scoreElement.textContent = `Score: ${game.score}`; // pour pouvoir afficher le score
            updateHighScore(game.score);
        }
        if (game.isGameOver()) {
            alert(`Game over! Your final score is ${game.score}`);
        } else {
            game.nextCountry();
        }

        form.reset();
    });
}

function displayHighScore() {
    const highScore = localStorage.getItem('highscore') || 0;
    const highScoreElement = document.getElementById('highscore').querySelector('h1');
    highScoreElement.textContent = `Highscore: ${highScore}`;
}

function updateHighScore(newScore) {
    const highScore = localStorage.getItem('highscore') || 0;
    if (newScore > highScore) {
        localStorage.setItem('highscore', newScore); // stocke dans le navigateur
        displayHighScore();
    }
}

initialization();
