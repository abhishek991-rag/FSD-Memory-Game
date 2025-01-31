
        document.addEventListener("DOMContentLoaded", () => {
            const gameBoard = document.getElementById("gameBoard");
            const restartButton = document.getElementById("restart");
            const movesCounter = document.getElementById("movesCount");
            const timerDisplay = document.getElementById("timer");
            const winMessage = document.getElementById("winMessage");
            
            const cardsArray = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉", "🍒", "🍒", "🍍", "🍍", "🥑", "🥑", "🍓", "🍓"];
            let firstCard = null;
            let secondCard = null;
            let lockBoard = false;
            let moves = 0;
            let matchedPairs = 0;
            let timer;
            let seconds = 0;

            function shuffleCards() {
                cardsArray.sort(() => Math.random() - 0.5);
            }

            function startTimer() {
                clearInterval(timer);
                seconds = 0;
                timer = setInterval(() => {
                    seconds++;
                    timerDisplay.textContent = seconds + "s";
                }, 1000);
            }

            function createBoard() {
                gameBoard.innerHTML = "";
                shuffleCards();
                moves = 0;
                matchedPairs = 0;
                movesCounter.textContent = moves;
                winMessage.style.display = "none";
                startTimer();
                
                cardsArray.forEach((emoji, index) => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.dataset.emoji = emoji;
                    card.addEventListener("click", flipCard);
                    gameBoard.appendChild(card);
                });
            }

            function flipCard() {
                if (lockBoard) return;
                if (this === firstCard) return;

                this.textContent = this.dataset.emoji;
                this.classList.add("flipped");

                if (!firstCard) {
                    firstCard = this;
                    return;
                }
                secondCard = this;
                moves++;
                movesCounter.textContent = moves;
                checkMatch();
            }

            function checkMatch() {
                lockBoard = true;
                let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
                isMatch ? disableCards() : unflipCards();
            }

            function disableCards() {
                firstCard.removeEventListener("click", flipCard);
                secondCard.removeEventListener("click", flipCard);
                matchedPairs++;
                resetBoard();
                if (matchedPairs === cardsArray.length / 2) {
                    clearInterval(timer);
                    winMessage.style.display = "block";
                }
            }

            function unflipCards() {
                setTimeout(() => {
                    firstCard.textContent = "";
                    secondCard.textContent = "";
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                    resetBoard();
                }, 1000);
            }

            function resetBoard() {
                [firstCard, secondCard, lockBoard] = [null, null, false];
            }

            restartButton.addEventListener("click", createBoard);
            createBoard();
        });
  
