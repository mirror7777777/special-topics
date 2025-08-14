const startBtn = document.getElementById('start-btn');
const screen = document.getElementById('screen');
const message = document.getElementById('message');
const result = document.getElementById('result');

let startTime;
let timeout;

startBtn.onclick = () => {
  message.textContent = 'Wait for green...';
  result.textContent = '';
  screen.style.backgroundColor = '#333';
  startBtn.disabled = true;

  timeout = setTimeout(() => {
    screen.style.backgroundColor = 'green';
    message.textContent = 'CLICK!';
    startTime = Date.now();
  }, Math.random() * 3000 + 2000); // 2–5 seconds
};

screen.onclick = () => {
  if (screen.style.backgroundColor === 'green') {
    const reactionTime = Date.now() - startTime;
    result.textContent = `Your reaction time: ${reactionTime} ms`;
    startBtn.disabled = false;
  } else {
    clearTimeout(timeout);
    message.textContent = 'Too soon! Try again.';
    startBtn.disabled = false;
  }
};

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
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart');
let cart = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://your-api-url.com/products'); // Replace with your actual API
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    productList.innerHTML = '<p>Failed to load products.</p>';
    console.error(error);
  }
}

function displayProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>$${product.price.toFixed(2)}</p>
      <p>${product.availability ? ' In Stock' : ' Out of Stock'}</p>
      <button ${!product.availability ? 'disabled' : ''}>Add to Cart</button>
    `;

    const button = div.querySelector('button');
    button.onclick = () => addToCart(product);

    productList.appendChild(div);
  });
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
  });
}

fetchProducts();