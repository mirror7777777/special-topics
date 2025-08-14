
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
window.onload = () => {
  const productList = document.getElementById('product-list');
  const cartList = document.getElementById('cart');
  let cart = [];

  async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:4093/data'); // Replace with your actual API
      const products = await response.json();
      console.log(products)
      displayProducts(products);
    } catch (error) {
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'Failed to load products.';
      productList.appendChild(errorMsg);
      console.error(`an error occured : ${error}`);
    }
  }

  function displayProducts(products) {
    productList.innerHTML = ''; // Clear previous content

    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;

      const name = document.createElement('h4');
      name.textContent = product.name;

      const price = document.createElement('p');
      price.textContent = `$${product.price.toFixed(2)}`;

      const availability = document.createElement('p');
      availability.textContent = product.availability ? 'In Stock' : 'Out of Stock';

      const button = document.createElement('button');
      button.textContent = 'Add to Cart';
      if (!product.availability) {
        button.disabled = true;
      }
      button.onclick = () => addToCart(product);

      div.appendChild(img);
      div.appendChild(name);
      div.appendChild(price);
      div.appendChild(availability);
      div.appendChild(button);

      productList.appendChild(div);
    });
  }

  function addToCart(product) {
    cart.push(product);
    updateCart();
  }

  function updateCart() {
    cartList.innerHTML = ''; // Clear previous cart items

    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartList.appendChild(li);
    });
  }

  fetchProducts();
};