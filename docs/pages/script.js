
  document.addEventListener('DOMContentLoaded', () => {
            const gameBoard = document.getElementById('gameBoard');
            const statusDisplay = document.getElementById('status');
            const restartButton = document.getElementById('restartButton');
            const cells = Array.from(gameBoard.children);

            let board = ['', '', '', '', '', '', '', '', ''];
            let currentPlayer = 'X';
            let isGameActive = true;

            const winningConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]            // Diagonals
            ];

            function handleResultValidation() {
                let roundWon = false;
                for (let i = 0; i < winningConditions.length; i++) {
                    const winCondition = winningConditions[i];
                    const a = board[winCondition[0]];
                    const b = board[winCondition[1]];
                    const c = board[winCondition[2]];

                    if (a === '' || b === '' || c === '') {
                        continue;
                    }
                    if (a === b && b === c) {
                        roundWon = true;
                        break;
                    }
                }

                if (roundWon) {
                    statusDisplay.textContent = `Player ${currentPlayer} has won!`;
                    isGameActive = false;
                    return;
                }

                const roundDraw = !board.includes('');
                if (roundDraw) {
                    statusDisplay.textContent = 'Game is a draw!';
                    isGameActive = false;
                    return;
                }

                changePlayer();
            }

            function changePlayer() {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
            }

            function userAction(cell, index) {
                if (isGameActive && board[index] === '') {
                    board[index] = currentPlayer;
                    cell.textContent = currentPlayer;
                    cell.classList.add(currentPlayer.toLowerCase());
                    handleResultValidation();
                }
            }

            function restartGame() {
                board = ['', '', '', '', '', '', '', '', ''];
                isGameActive = true;
                currentPlayer = 'X';
                statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o');
                });
            }

            cells.forEach((cell, index) => {
                cell.addEventListener('click', () => userAction(cell, index));
            });

            restartButton.addEventListener('click', restartGame);
        });

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    // Function to fetch and display product data
    const fetchProductData = async () => {
        try {
            // Replace with your server's URL
            const response = await fetch('http://localhost:4093/data'); 
            const product = await response.json();
            console.log(product)
            // Create and append the product element
            if (product && product.length> 0) {
              product.forEach((item)=>{
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p class="price">$${item.price}</p>
                <p class="availability">${item.availability}</p>
            `;
            productContainer.appendChild(productElement);


              })
            }
          

        } catch (error) {
            console.error('Error fetching product data:', error);
            productContainer.innerHTML = '<p>Failed to load product data. Please try again later.</p>';
        }
    };

    fetchProductData();
});