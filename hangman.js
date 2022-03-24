const form = document.getElementById('guess-letter-form');
const phrase = document.getElementById('phrase');
const udpateUser = document.getElementById('update');
const alreadyGuessed = document.getElementById('guessed');
const wordURL = 'https://random-word-api.herokuapp.com/word?number=1';
let guessLetter = document.getElementById('guessLetter');
let wrongLetter = [];
let guessesRemaining = 6;
let emptyPhrase = [];
const backgroundColor = document.getElementsByTagName('body')[0];
let changeBackgroundColor = 100;
const intervalTime = 200;

function getRandomWord() {
    return fetch(wordURL)
        .then(function (data) {
            return data.json();
        })
        .then(function (responseJson) {
            const randomWord = responseJson[0];
            return randomWord;
        })
};

getRandomWord().then(randomWord => {
    for (let index = 0; index < randomWord.length; index++) {
        emptyPhrase.push('_');
        phrase.innerText = emptyPhrase.join(' ');
    }
    form.addEventListener('submit', function (e) {
        const hangCatImage = document.getElementById('hangcat-img');
        const hangCatFinalBackground = document.getElementById('hangcat-final-background');
        const fallingCat = document.getElementById('falling-cat');
        e.preventDefault();
        if (randomWord.includes(guessLetter.value) === false) {
            udpateUser.innerText = "Guess again!"
            if (wrongLetter.includes(guessLetter.value.toUpperCase())) {
                udpateUser.innerText = `You already guessed ${guessLetter.value.toUpperCase()}, try again!`
            } else {
                wrongLetter.push(guessLetter.value.toUpperCase())
                guessesRemaining--
                console.log(guessesRemaining)
                hangCatImage.src = (`hangcat-wrong-${guessesRemaining}.png`)
                alreadyGuessed.innerText = `Guesses remaining: ${guessesRemaining} Wrong letters guessed: ${wrongLetter.join(' ')}`;
            }
            if (guessesRemaining === 0) {
                udpateUser.innerText = `Game over! The word is ${randomWord}!`
                fallingCat.classList.remove("hidden");
                fallingCat.classList.add("show");
                hangCatFinalBackground.classList.remove("hidden");
                hangCatFinalBackground.classList.add("showBackground");
                hangCatImage.classList.remove("show");
                hangCatImage.classList.add("hidden");
                changeStyle();
                setInterval(function () {
                    if (changeBackgroundColor > 0) {
                        backgroundColor.style.backgroundColor = `rgb(${changeBackgroundColor}, ${changeBackgroundColor}, ${changeBackgroundColor})`;
                        changeBackgroundColor--;
                    } else {
                        clearInterval(100);
                    }
                }, intervalTime);
            } form.reset()
        }
        else {
            randomWord.split("").map((letter, index) => {
                if (letter === guessLetter.value) {
                    udpateUser.innerText = "Correct!"
                    emptyPhrase[index] = randomWord[index];
                    phrase.innerText = emptyPhrase.join(' ').toUpperCase();
                } 
            }) 
        }  form.reset()
    })
}
);

function changeStyle() {
    phrase.style.display = 'none';
    alreadyGuessed.style.display = 'none';
    form.style.display = 'none';
    udpateUser.style.color = 'gray';
};