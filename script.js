const form = document.getElementById('registration-form');
const playerNameInput = document.getElementById('player-name');
const playerList = document.getElementById('player-list');
const resetButton = document.getElementById('reset-button');
const linkButton = document.getElementById('link-button');

// Recuperar lista de jugadores guardada en LocalStorage
function loadPlayers() {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    players.forEach(playerName => {
        addPlayerToList(playerName);
    });
}

// Guardar la lista de jugadores en LocalStorage
function savePlayers() {
    const players = [];
    const playerItems = document.querySelectorAll('#player-list li');
    playerItems.forEach(item => {
        players.push(item.textContent.replace('Eliminar', '').trim());
    });
    localStorage.setItem('players', JSON.stringify(players));
}

// Agregar jugador a la lista
function addPlayerToList(playerName) {
    const listItem = document.createElement('li');
    listItem.textContent = playerName;

    // Crear botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
        const password = prompt('Introduce la contraseña para eliminar este jugador:');
        if (password === '009') {
            playerList.removeChild(listItem);
            savePlayers(); // Guardar la lista actualizada
            alert('Jugador eliminado correctamente.');
        } else {
            alert('Contraseña incorrecta. No se puede eliminar el jugador.');
        }
    });

    // Añadir el botón de eliminar al item
    listItem.appendChild(deleteButton);

    // Añadir el nombre a la lista
    playerList.appendChild(listItem);
}

// Cargar los jugadores guardados en LocalStorage al cargar la página
loadPlayers();

// Agregar jugador al hacer submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        addPlayerToList(playerName);
        savePlayers(); // Guardar la lista actualizada
        playerNameInput.value = ''; // Limpiar el campo de texto
    }
});

// Redirigir al enlace
linkButton.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
});

// Resetear lista con validación de contraseña
resetButton.addEventListener('click', () => {
    const password = prompt('Introduce la contraseña para resetear la lista:');
    if (password === '009') {
        playerList.innerHTML = ''; // Vaciar la lista de jugadores
        localStorage.removeItem('players'); // Eliminar la lista guardada
        alert('Lista reseteada correctamente.');
    } else {
        alert('Contraseña incorrecta. No se puede resetear la lista.');
    }
});
