# FSD-Memory-Game
How to Play -Click on a card to flip it and reveal its face. Click on another card to see if it matches the first: If the cards match, they stay face-up. If they don’t match, they flip back after a brief delay. Continue until all pairs are matched. Click the Restart button at any time to shuffle and reset the game.
How to Set Up- Download or clone this repository,Open the project folder,Open the index.html file in any modern web browser.


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memory Game</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background-color: #f0f4f8;
    }
    h1 {
      margin-bottom: 10px;
    }
    button {
      margin-bottom: 20px;
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .game-board {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 10px;
      width: 90%;
      max-width: 600px;
    }
    .card {
      position: relative;
      width: 100px;
      height: 120px;
      perspective: 1000px;
    }
    .card-inner {
      width: 100%;
      height: 100%;
      position: absolute;
      transition: transform 0.6s;
      transform-style: preserve-3d;
      cursor: pointer;
    }
    .card.flipped .card-inner {
      transform: rotateY(180deg);
    }
    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .card-front {
      background-color: white;
      color: #333;
    }
    .card-back {
      background-color: #007bff;
      transform: rotateY(180deg);
    }
  </style>
</head>
<body>
  <h1>Memory Game</h1>
  <button id="restart">Restart Game</button>
  <div class="game-board" id="gameBoard"></div>

  <script>
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restart');

    const cards = [
      'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
      'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];

    let flippedCards = [];
    let matchedPairs = 0;

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function createCardElement(value) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">${value}</div>
          <div class="card-back"></div>
        </div>
      `;
      card.addEventListener('click', () => handleCardClick(card, value));
      return card;
    }

    function initializeGame() {
      gameBoard.innerHTML = '';
      matchedPairs = 0;
      flippedCards = [];
      shuffle(cards);
      cards.forEach(cardValue => {
        const cardElement = createCardElement(cardValue);
        gameBoard.appendChild(cardElement);
      });
    }

    function handleCardClick(card, value) {
      if (card.classList.contains('flipped') || flippedCards.length === 2) {
        return;
      }

      card.classList.add('flipped');
      flippedCards.push({ card, value });

      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }

    function checkForMatch() {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.value === secondCard.value) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cards.length / 2) {
          setTimeout(() => alert('Congratulations! You won!'), 500);
        }
      } else {
        setTimeout(() => {
          firstCard.card.classList.remove('flipped');
          secondCard.card.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }

    restartButton.addEventListener('click', initializeGame);

    // Initialize the game on load
    initializeGame();
  </script>
</body>
</html>
