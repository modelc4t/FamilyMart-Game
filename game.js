// game.js

alert("Script Loaded!");  // This alert is to check if the script is loading properly.

let score = 0;
const scoreDisplay = document.getElementById('score');
const player = document.getElementById('player');
const fallingItem = document.getElementById('falling-item');

let playerPositionX = window.innerWidth / 2 - player.offsetWidth / 2;
let fallingSpeed = 3;
let fallingItemPositionX = Math.random() * (window.innerWidth - fallingItem.offsetWidth);

player.style.left = `${playerPositionX}px`;
fallingItem.style.left = `${fallingItemPositionX}px`;

function movePlayer(e) {
    if (e.key === 'ArrowLeft') {
        playerPositionX -= 10;
    } else if (e.key === 'ArrowRight') {
        playerPositionX += 10;
    }

    if (playerPositionX < 0) playerPositionX = 0;
    if (playerPositionX > window.innerWidth - player.offsetWidth) playerPositionX = window.innerWidth - player.offsetWidth;

    player.style.left = `${playerPositionX}px`;
}

function moveFallingItem() {
    const itemPositionY = parseInt(fallingItem.style.top || '0');
    fallingItem.style.top = `${itemPositionY + fallingSpeed}px`;

    if (itemPositionY > window.innerHeight) {
        resetFallingItem();
    }

    // Check for collision with player
    if (itemPositionY + fallingItem.offsetHeight >= window.innerHeight - player.offsetHeight &&
        itemPositionY + fallingItem.offsetHeight <= window.innerHeight - player.offsetHeight + 10 &&
        parseInt(fallingItem.style.left) + fallingItem.offsetWidth / 2 >= playerPositionX &&
        parseInt(fallingItem.style.left) + fallingItem.offsetWidth / 2 <= playerPositionX + player.offsetWidth) {
        
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        resetFallingItem();
    }
}

function resetFallingItem() {
    const randomX = Math.random() * (window.innerWidth - fallingItem.offsetWidth);
    fallingItem.style.top = '0px';
    fallingItem.style.left = `${randomX}px`;
}

document.addEventListener('keydown', movePlayer);
setInterval(moveFallingItem, 20);