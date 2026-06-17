let playerName = "";
let lives = 3;
let score = 0;
let inventory = [];

const content = document.getElementById("content");

function welcomeScreen() {
  content.innerHTML = `
    <h2>Bienvenido a la ciudad CyberNova</h2>

    <p>
      En un futuro ciberpunk, una empresa secreta llamada Anti-Glitch Corps
      recluta soldados especiales para atrapar virus digitales y glitches
      que están infectando la ciudad.
    </p>

    <p>
    Vos sos un soldado con zapatillas propulsoras, capaz de volar entre edificios
    como un héroe urbano. Tu misión es encontrar el virus central antes de que
    destruya toda la red.
    </p>

    <input id="nameInput" type="text" placeholder="Escribí tu nombre de jugador">
    <br><br>
    <button onclick="startGame()">Comenzar aventura</button>
  `;
}

function startGame() {
  const input = document.getElementById("nameInput").value;

  if (input === "") {
    alert("Primero escribí tu nombre.");
  } else {
    playerName = input;
    levelOne();
  }
}

function showStats() {
  return `
    <div class="stats">
      Jugador: ${playerName} | Vidas: ${lives} | Puntos: ${score} | Inventario: ${inventory.join(", ") || "Vacío"}
    </div>
  `;
}

function loseLife() {
  lives--;

  if (lives <= 0) {
    defeatScreen();
  }
}

function levelOne() {
  content.innerHTML = `
    ${showStats()}
    <h2>Nivel 1: Callejón Neón</h2>
    <img src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80" alt="Ciudad ciberpunk">
    <p>
      Recibís una señal extraña desde un callejón oscuro lleno de luces violetas.
      Un glitch menor está escondido entre los cables.
    </p>
    <p>¿Qué hacés?</p>

    <button onclick="scanAlley()">Escanear el callejón</button>
    <button onclick="enterFast()">Entrar corriendo</button>
  `;
}

function scanAlley() {
  score += 10;
  inventory.push("Radar Glitch");

  content.innerHTML = `
    ${showStats()}
    <h2>Buena decisión</h2>
    <p>
      Usaste el escáner y encontraste la ruta segura. Además conseguiste un Radar Glitch.
    </p>
    <button onclick="levelTwo()">Continuar al Nivel 2</button>
  `;
}

function enterFast() {
  loseLife();

  if (lives > 0) {
    content.innerHTML = `
      ${showStats()}
      <h2>¡Trampa digital!</h2>
      <p>
        Entraste demasiado rápido y un virus explosivo te golpeó. Perdiste una vida.
      </p>
      <button onclick="levelTwo()">Continuar al Nivel 2</button>
    `;
  }
}

function levelTwo() {
  content.innerHTML = `
    ${showStats()}
    <h2>Nivel 2: Vuelo entre rascacielos</h2>
    <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80" alt="Rascacielos futuristas">
    <p>
      Activás tus zapatillas propulsoras y volás entre edificios.
      Un dron infectado empieza a perseguirte.
    </p>
    <p>¿Cómo escapás?</p>

    <button onclick="fightDrone()">Enfrentar al dron</button>
    <button onclick="escapeDrone()">Escapar por los techos</button>
  `;
}

function fightDrone() {
  if (inventory.includes("Radar Glitch")) {
    score += 20;

    content.innerHTML = `
      ${showStats()}
      <h2>Dron derrotado</h2>
      <p>
        Gracias al Radar Glitch detectaste su punto débil y lo desactivaste.
      </p>
      <button onclick="levelThree()">Continuar al Nivel 3</button>
    `;
  } else {
    loseLife();

    if (lives > 0) {
      content.innerHTML = `
        ${showStats()}
        <h2>Combate difícil</h2>
        <p>
          El dron era más fuerte de lo esperado. Lograste escapar, pero perdiste una vida.
        </p>
        <button onclick="levelThree()">Continuar al Nivel 3</button>
      `;
    }
  }
}

function escapeDrone() {
  score += 10;

  content.innerHTML = `
    ${showStats()}
    <h2>Escape extremo</h2>
    <p>
      Volaste entre carteles holográficos y lograste perder al dron.
    </p>
    <button onclick="levelThree()">Continuar al Nivel 3</button>
  `;
}

function levelThree() {
  content.innerHTML = `
    ${showStats()}
    <h2>Nivel 3: Núcleo del Virus</h2>
    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80" alt="Centro tecnológico">
    <p>
      Llegás al centro de datos de CyberNova. El virus principal aparece frente a vos:
      una entidad digital llamada V-0ID.
    </p>
    <p>Tenés una última decisión.</p>

    <button onclick="attackVirus()">Atacar directamente</button>
    <button onclick="useCodeTrap()">Usar trampa de código</button>
  `;
}

function attackVirus() {
  loseLife();

  if (lives > 0) {
    content.innerHTML = `
      ${showStats()}
      <h2>Ataque arriesgado</h2>
      <p>
        El virus era demasiado poderoso. Sobreviviste, pero perdiste una vida.
      </p>
      <button onclick="finalDecision()">Última oportunidad</button>
    `;
  }
}

function useCodeTrap() {
  score += 30;
  victoryScreen();
}

function finalDecision() {
  content.innerHTML = `
    ${showStats()}
    <h2>Última oportunidad</h2>
    <p>
      El virus está debilitado. Solo queda lanzar el parche final.
    </p>
    <button onclick="victoryScreen()">Lanzar parche final</button>
  `;
}

function victoryScreen() {
  content.innerHTML = `
    ${showStats()}
    <h2 class="victory">¡Victoria!</h2>
    <p>
      Felicidades, ${playerName}. Destruiste el virus V-0ID y salvaste CyberNova.
      La ciudad vuelve a brillar entre luces neón.
    </p>
    <p>Puntuación final: ${score}</p>
    <button onclick="restartGame()">Jugar otra vez</button>
  `;
}

function defeatScreen() {
  content.innerHTML = `
    <h2 class="defeat">Derrota</h2>
    <p>
      Te quedaste sin vidas. El virus tomó el control de CyberNova.
    </p>
    <button onclick="restartGame()">Intentar de nuevo</button>
  `;
}

function restartGame() {
  lives = 3;
  score = 0;
  inventory = [];
  playerName = "";
  welcomeScreen();
}

welcomeScreen();