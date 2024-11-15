let power = 100;
let doorsOpen = { left: true, right: true };
let enemies = [
    { id: 1, position: 'room1' },
    { id: 2, position: 'room2' },
    { id: 3, position: 'room3' },
    { id: 4, position: 'room4' }
];

const rooms = ['room1', 'room2', 'room3', 'room4', 'office'];

// Function to update the info panel
function updateInfoPanel(message) {
    const infoPanel = document.getElementById('info-panel');
    infoPanel.innerHTML += `<p>${message}</p>`; // Append new message
    infoPanel.scrollTop = infoPanel.scrollHeight; // Scroll to the bottom
}

// Function to check the camera
function checkCamera(cameraId) {
    if (power > 0) {
        power -= 10; // Use power when checking the camera
        updatePowerBar();
        // Logic to check if an enemy is present
        let enemyPresent = enemies.some(enemy => enemy.position === `room${cameraId}`);
        if (enemyPresent) {
            updateInfoPanel(`Enemy detected in camera ${cameraId}.`);
        } else {
            updateInfoPanel(`No enemies detected in camera ${cameraId}.`);
        }
    } else {
        updateInfoPanel('Not enough power to check the camera!');
    }
}

// Function to toggle doors
function toggleDoor(door) {
    if (power > 0) {
        doorsOpen[door] = !doorsOpen[door];
        power -= 5; // Use power to toggle doors
        updatePowerBar();
        updateInfoPanel(`${door.charAt(0).toUpperCase() + door.slice(1)} door is now ${doorsOpen[door] ? 'open' : 'closed'}.`);
    } else {
        updateInfoPanel('Not enough power to toggle the door!');
    }
}

// Function to update the power bar
function updatePowerBar() {
    const powerBar = document.getElementById('power-bar');
    powerBar.style.width = power + '%';
    powerBar.style.backgroundColor = power > 30 ? 'green' : 'red';
    if (power <= 0) {
        updateInfoPanel('Power has run out! Game Over!');
        stopGame();
    }
}

// Function to move enemies randomly
function moveEnemies() {
    enemies.forEach(enemy => {
        // Randomly choose a new room (except for the office)
        let randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        
        // Prevent the enemy from moving directly to the office
        if (randomRoom !== 'office') {
            enemy.position = randomRoom;
        } else {
            // If an enemy moves to the office, end the game
            updateInfoPanel(`Enemy ${enemy.id} has reached the office! Game Over!`);
            stopGame();
        }
    });
}

// Function to stop the game
function stopGame() {
    clearInterval(enemyMovementInterval); // Stop the enemy movement
    // You can add more game-over logic here, like resetting the game or showing a restart button
}

// Call moveEnemies every 15 seconds
const enemyMovementInterval = setInterval(moveEnemies, 15000);

// Initial call to update the power bar on load
updatePowerBar();