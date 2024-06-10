
const audioSrc = ['audio/1.mp3', 'audio/2.mp3', 'audio/3.mp3', 'audio/4.mp3', 'audio/5.mp3', 'audio/6.mp3', 'audio/7.mp3', 'audio/8.mp3', 'audio/9.mp3', 'audio/10.mp3']

let canClick = true;
let audios = [];
const cardGrid = document.querySelector('.card-grid');
var countOfClicks = 0;
const cardValues = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10'];

function generateCardValuesArray() {
    const numberOfCards = document.getElementById('numberOfCards').value;
    cardValues.length = 0;
    for (var i = 0; i < numberOfCards; i++) {
        cardValues.push(i);
        cardValues.push(i);
    }
    cardValues.sort(() => 0.5 - Math.random());
}


cardValues.sort(() => 0.5 - Math.random());


for (var i = 0; i < audioSrc.length; i++) {
    const audio = new Audio(audioSrc[i]);
    audios.push(audio);
}

function startGame() {
    cardGrid.innerHTML = ""
    generateCardValuesArray()
    for (var i = 0; i < cardValues.length; i++) {
        const imgSrc = "images/" + cardValues[i] + '.jpg'
        // images
        console.log(cardValues[i] + '.jpg')

        const card = document.createElement('div');
        const image = document.createElement('img')

        image.src = imgSrc
        image.classList.add('image')
        card.appendChild(image)

        card.classList.add('card');
        card.classList.add('notFlipped');

        card.style.color = '#a7a1a1';

        card.setAttribute('cardId', cardValues[i]);
        card.addEventListener('click', handleCardClick);
        cardGrid.appendChild(card);
    }
}
function countclick() {
    countOfClicks++;
    document.getElementById("countOfClicks").innerText = "The count of the clicks " + countOfClicks;
}

//write a function that let you see the game diffuculty by choosing the number of cards to play with
function chooseDifficulty() {
    const numberOfCards = document.getElementById('numberOfCards').value;
    cardValues.length = 0;
    for (var i = 0; i < numberOfCards; i++) {
        cardValues.push(i);
        cardValues.push(i);
    }
    cardValues.sort(() => 0.5 - Math.random());
    startGame();
}

function handleCardClick(e) {
    /* console.log('clicked card is: ', e.target)*/
    // handle the event of click on card
    countclick()
    const clickedCard = e.target; // target on the clicked card     
    if (!clickedCard.classList.contains('flipped') && canClick) {//תנאי שבודק אם הקךף הפוך או לא 
        playCardSound(clickedCard);
        console.log('flipping card')    
        clickedCard.classList.add('flipped'); // מוסיפה לקלף שנלחץ את הקלאס פליפט  
        clickedCard.classList.remove('notFlipped'); // מוסיפה לקלף שנלחץ את הקלאס פליפט  

        clickedCard.style.color = 'white';  // Show the text

        var flippedCards = document.querySelectorAll('.card.flipped'); // תמצא את כל הקלפים עם קלאס קארד וגם קלאס פליפט
        console.log('flipped cards: ', flippedCards.length)
        if (flippedCards.length === 2) { // 
            console.log('checking for match')
            checkForMatch(flippedCards);
        }
    }
}

function checkForMatch(flippedCards) {
    // תנאי שבודק העאם יש להם אותו ערך 
    canClick = false;
    console.log('checking for match', flippedCards[0].getAttribute('cardId'), " ", flippedCards[1].getAttribute('cardId'))
    if (flippedCards[0].getAttribute('cardId') === flippedCards[1].getAttribute('cardId')) {
        console.log('found Match!', flippedCards[0].getAttribute('cardId'), " ", flippedCards[1].getAttribute('cardId'))
        // אם המשתמש צודק
        for (var i = 0; i < flippedCards.length; i++) {
            flippedCards[i].removeEventListener('click', handleCardClick);
            flippedCards[i].classList.remove('flipped');
            flippedCards[i].classList.add('matched');
        }
        canClick = true;
        resetFlippedCards();
    } else {
        console.log('No Match found', flippedCards[0].getAttribute('cardId'), " ", flippedCards[1].getAttribute('cardId'))
        // אם המשתמש לא צודק
        setTimeout(() => {
            //חכה שנייה, ואז תשנה את הקלף למצד הקודם שלו 
            for (var i = 0; i < flippedCards.length; i++) {
                flippedCards[i].classList.remove('flipped');
                flippedCards[i].classList.add('notFlipped'); // מוסיפה לקלף שנלחץ את הקלאס פליפט  

            }
            resetFlippedCards();
            canClick = true;
        }, 1000);

    }
}``

function resetFlippedCards() {

    checkIfGameEnded();

    // עוברת על כל הקלפים שיש להם את הקלאס קארד, ומורידה את הקלאס פליפט
    let cards = document.querySelectorAll('.card');
    // מתוך הדוקיומט, מביא כל מה שיש לו קלאס קארד
    for (var i = 0; i < cards.length; i++) {
        if (!cards[i].classList.contains('matched')) {
            cards[i].classList.remove('flipped');
            cards[i].classList.add('notFlipped'); // מוסיפה לקלף שנלחץ את הקלאס פליפט  
        }
    }
}

function playCardSound(clickedCard){
    pauseAllSounds();
    const cardId = clickedCard.getAttribute('cardId');
    if(audios[cardId] === undefined) return;
    const audio = audios[cardId];
    audio.play();
    

}

function pauseAllSounds(){
    for (var i = 0; i < audios.length; i++) {
        audios[i].currentTime = 0;
        audios[i].pause();
    }
}

function playAgain(){
    countOfClicks = 0;
    startGame();
}

//check if game ended, if so, show a message to the user and ask if he wants to play again
function checkIfGameEnded(){
    const matchedCards = document.querySelectorAll('.card.matched');
    if (matchedCards.length === cardValues.length) {
        alert('You won! Do you want to play again?');
        playAgain();
    }
}

function handleSliderChange(e){
    const value = e.target.value;
    for (var i = 0; i < audios.length; i++) {
        audios[i].volume = value;
    }
}

function addDiffucultySlider(){
    //add text to the slider indicating the difficulty level
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 2;
    slider.max = 10;
    slider.step = 2;
    slider.value = 6;

    slider.addEventListener('input', handleDiffucultySlider);
    slider.id = 'numberOfCards';
    
    header = document.getElementById('header')
    
    const sliderText = document.createElement('p');
    sliderText.id = 'difficultyText';

    sliderText.textContent = 'Difficulty Level: ' + slider.value;
    header.appendChild(sliderText);

    header.appendChild(slider);

}

function handleDiffucultySlider(e){
    const difficultyText = document.getElementById('difficultyText');
    difficultyText.textContent = 'Difficulty Level: ' + e.target.value;
    startGame();
}

addDiffucultySlider()
startGame()