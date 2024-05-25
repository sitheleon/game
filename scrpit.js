function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function play(playerSelection) {
    const computerSelection = computerPlay();
    let result = '';

    if (playerSelection === computerSelection) {
        result = "It's a tie!";
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        result = 'You win!';
    } else {
        result = 'You lose!';
    }

    document.getElementById('result').textContent = `You chose ${playerSelection}, computer chose ${computerSelection}. ${result}`;
}

// script.js

const socket = io();

socket.on('updatePlayers', (players) => {
    // Update player list or handle other updates
});

function play(playerSelection) {
    socket.emit('play', playerSelection);
}

socket.on('connect', () => {
    socket.emit('newPlayer');
});
