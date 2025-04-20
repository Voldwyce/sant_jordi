let currentIndex = 0;
let playerName = "";
let canClick = false;
let escribiendo = false;
let textoCompleto = "";
let intervalo = null;
let jugandoMinijuego = false;

const startScreen = document.getElementById("startScreen");
const dialogueScreen = document.getElementById("dialogueScreen");
const startButton = document.getElementById("startButton");
const dialogueText = document.getElementById("dialogueText");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("playerNameInput");
const triangleIndicator = document.getElementById("triangleIndicator");
const choicesContainer = document.getElementById("choices");
const backToMenu = document.getElementById("backToMenu");
const backgroundContainer = document.getElementById("backgroundContainer");
const bookOpen = document.getElementById("bookOpen");
const bookFrame = document.getElementById("bookFrame");

const musicTheme = document.getElementById("musicTheme");
const clickSound = document.getElementById("clickSound");
const volumeSlider = document.getElementById("volumeSlider");

// Volumen inicial
musicTheme.volume = volumeSlider.value / 100;

volumeSlider.addEventListener("input", actualizarVolume);


actualizarVolume();

startButton.addEventListener("click", () => {
  if (musicTheme.paused) musicTheme.play();

  backToMenu.style.display = "none";
  startScreen.style.display = "none";
  dialogueScreen.style.display = "flex";
  document.querySelectorAll(".heart").forEach(h => h.src = "assets/images/heart_full.png");
  document.getElementById("flameInstructions").style.display = "none";
  document.getElementById("flameHUD").style.display = "none";
  document.getElementById("playerKnight").style.display = "block";
  minigameFlames.style.display = "none";
  clickSound.play();

  currentIndex = 0;
  playerName = "";

  backgroundContainer.style.backgroundImage = "url('assets/images/scene_dragon_attack.png')";
  bookOpen.style.display = "block";
  bookFrame.style.display = "block";
  dialogueBox.style.display = "block"; // Mostrar diálogo al iniciar

  mostrarDialogo();
});

backToMenu.addEventListener("click", () => {
  backToMenu.style.display = "none";
  dialogueScreen.style.display = "none";
  startScreen.style.display = "flex";

  // Limpieza total
  backgroundContainer.style.backgroundImage = "";
  bookFrame.style.display = "block";
  bookOpen.style.display = "block";
  dialogueText.textContent = "";
  triangleIndicator.style.display = "none";
  nameForm.style.display = "none";
  choicesContainer.innerHTML = "";
  dialogueBox.style.display = "none"; // ← 🔴 AÑADE ESTA LÍNEA
});

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (name !== "") {
    playerName = name;
    nameForm.style.display = "none";
    currentIndex++;
    mostrarDialogo();
  }
});

document.body.addEventListener("click", () => {
  if (jugandoMinijuego) return;

  if (nameForm.style.display !== "none") return;

  if (escribiendo) {
    clearInterval(intervalo);
    dialogueText.textContent = textoCompleto;
    triangleIndicator.style.display = "block";
    escribiendo = false;
    canClick = true;
    return;
  }

  if (canClick) {
    currentIndex++;
    mostrarDialogo();
  }
});


function mostrarDialogo() {
  if (currentIndex >= dialogues.length) {
    dialogueText.textContent = "Fin de la historia.";
    triangleIndicator.style.display = "none";
    backToMenu.style.display = "inline-block";
    return;
  }

  const d = dialogues[currentIndex];

  if (d.fondo) {
    backgroundContainer.style.backgroundImage = `url('assets/images/${d.fondo}')`;
    bookOpen.style.display = "none";
    bookFrame.style.display = "block";
  }

  if (d.tipo === "final") {
    if (d.fondo) {
      backgroundContainer.style.backgroundImage = `url('assets/images/${d.fondo}')`;
      bookOpen.style.display = "none";
      bookFrame.style.display = "block";
    }

    const textoFinal = d.texto.replace(/{{nombre}}/g, playerName);
    dialogueText.innerHTML = `<span style="font-size: 16px; color: red;">${textoFinal}</span>`;
    triangleIndicator.style.display = "none";
    canClick = false;
    choicesContainer.innerHTML = "";
    nameForm.style.display = "none";

    setTimeout(() => {
      backToMenu.style.display = "inline-block";
    }, 2000);
    return;
  }

  if (d.tipo === "nombre") {
    dialogueText.textContent = d.texto;
    nameForm.style.display = "block";
    triangleIndicator.style.display = "none";
    canClick = false;
    return;
  }

  if (d.tipo === "decision") {
    dialogueText.textContent = d.texto.replace("{{nombre}}", playerName);
    mostrarOpciones(d.opciones);
    triangleIndicator.style.display = "none";
    canClick = false;
    return;
  }

  if (d.tipo === "minijuego_llamas") {
    iniciarMinijuegoLlamas();
    return;
  }

  const personaje = d.personaje ? d.personaje.replace(/{{nombre}}/g, playerName) + ": " : "";
  const texto = d.texto.replace(/{{nombre}}/g, playerName);
  textoCompleto = personaje + texto;
  dialogueText.textContent = "";
  dialogueBox.style.display = "block"; // Asegura que el cuadro de texto esté visible
  let i = 0;
  escribiendo = true;
  canClick = false;
  triangleIndicator.style.display = "none";
  choicesContainer.innerHTML = "";

  intervalo = setInterval(() => {
    dialogueText.textContent += textoCompleto[i];
    i++;
    if (i >= textoCompleto.length) {
      clearInterval(intervalo);
      escribiendo = false;
      triangleIndicator.style.display = "block";
      canClick = true;
    }
  }, 30);
}


function mostrarOpciones(opciones) {
  canClick = false;
  triangleIndicator.style.display = "none";
  choicesContainer.innerHTML = "";
  opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op.texto;
    btn.addEventListener("click", () => {
      clickSound.play();
      const nextIndex = dialogues.findIndex(d => d.id === op.siguiente);
      if (nextIndex !== -1) {
        currentIndex = nextIndex;
        mostrarDialogo();
      }
    });
    choicesContainer.appendChild(btn);
  });
}

function crearPetalos(cantidad = 30) {
  const container = document.getElementById("petalContainer");

  for (let i = 0; i < cantidad; i++) {
    setTimeout(() => {
      const petal = document.createElement("div");
      petal.classList.add("petal");
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${4 + Math.random() * 4}s`;
      petal.style.animationDelay = `0s`;
      container.appendChild(petal);
    }, i * 200);
  }
}

crearPetalos(30);

function iniciarMinijuegoLlamas() {
  jugandoMinijuego = true;
  backgroundContainer.style.backgroundImage = "";
  bookOpen.style.display = "none";
  bookFrame.style.display = "block";
  dialogueBox.style.display = "none";
  minigameFlames.style.display = "flex";

  // Reset corazones
  document.querySelectorAll(".heart").forEach(h => h.src = "assets/images/heart_full.png");

  // Reset caballero
  const knight = document.getElementById("playerKnight");
  knight.style.display = "block";

  // Quitar llamas antiguas
  document.querySelectorAll(".llama").forEach(l => l.remove());

  // Mostrar instrucciones
  document.getElementById("flameInstructions").style.display = "block";
  document.getElementById("flameHUD").style.display = "none";

  document.getElementById("startFlamesGame").onclick = () => {
    document.getElementById("flameInstructions").style.display = "none";
    document.getElementById("flameHUD").style.display = "flex";
    startFlameGame();
  };
}

function terminarMinijuegoLlamas(exito) {
  jugandoMinijuego = false;
  minigameFlames.style.display = "none";
  dialogueBox.style.display = "block";

  if (exito) {
    const siguiente = dialogues.findIndex(d => d.id === "post_llamas");
    if (siguiente !== -1) {
      currentIndex = siguiente;
      mostrarDialogo();
    }
  } else {
    const derrota = dialogues.findIndex(d => d.id === "fin_derrota_llamas");
    if (derrota !== -1) {
      currentIndex = derrota;
      mostrarDialogo();
    }
  }
}


// Hacer el minijuego más difícil
function startFlameGame() {
  const gameArea = document.getElementById("flameGameArea");
  const knight = document.getElementById("playerKnight");
  const hearts = document.querySelectorAll(".heart");
  const timerEl = document.getElementById("timer");

  const llamaImg = "assets/images/sprite_llama.png";
  const width = gameArea.clientWidth;
  const knightWidth = 50;

  let x = width / 2;
  let vidas = 3;
  let tiempo = 20;
  let leftPressed = false;
  let rightPressed = false;
  let gameOver = false;

  knight.style.left = `${x}px`;

  const mover = setInterval(() => {
    if (leftPressed) x -= 4;
    if (rightPressed) x += 4;
    x = Math.max(0, Math.min(x, width - knightWidth));
    knight.style.left = `${x}px`;

    // 👇 Invertir sprite según dirección
    if (leftPressed && !rightPressed) {
      knight.style.transform = "scaleX(-1)";
    } else if (rightPressed && !leftPressed) {
      knight.style.transform = "scaleX(1)";
    }
  }, 16);


  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") leftPressed = true;
    if (e.key === "ArrowRight") rightPressed = true;
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") leftPressed = false;
    if (e.key === "ArrowRight") rightPressed = false;
  });

  const updateTimer = setInterval(() => {
    tiempo--;
    timerEl.textContent = tiempo;
    if (tiempo <= 0) clearInterval(updateTimer);
  }, 1000);

  const llamaInterval = setInterval(() => {
    const llama = document.createElement("img");
    llama.src = llamaImg;
    llama.className = "llama";
    llama.style.left = Math.random() * (width - 30) + "px";
    gameArea.appendChild(llama);

    let posY = -40;
    const anim = setInterval(() => {
      posY += 5; // velocidad mayor
      llama.style.top = posY + "px";

      const rectLlama = llama.getBoundingClientRect();
      const rectKnight = knight.getBoundingClientRect();

      // 🔽 Hitboxes reducidas
      const llamaHitbox = {
        top: rectLlama.top + 20,
        bottom: rectLlama.bottom - 20,
        left: rectLlama.left + 15,
        right: rectLlama.right - 15
      };
      const knightHitbox = {
        top: rectKnight.top + 20,
        bottom: rectKnight.bottom - 20,
        left: rectKnight.left + 25,
        right: rectKnight.right - 25
      };

      // 🔥 Colisión
      if (
        llamaHitbox.bottom > knightHitbox.top &&
        llamaHitbox.top < knightHitbox.bottom &&
        llamaHitbox.right > knightHitbox.left &&
        llamaHitbox.left < knightHitbox.right
      ) {
        clearInterval(anim);
        llama.remove();
        vidas--;
        if (hearts[vidas]) hearts[vidas].src = "assets/images/heart_empty.png";

        if (vidas <= 0 && !gameOver) {
          gameOver = true;
          clearInterval(mover);
          clearInterval(llamaInterval);
          clearInterval(updateTimer);
          knight.style.display = "none";
          terminarMinijuegoLlamas(false);
        }
      }

      if (posY > gameArea.clientHeight) {
        clearInterval(anim);
        llama.remove();
      }
    }, 16);
  }, 300); // frecuencia mayor

  setTimeout(() => {
    if (!gameOver) {
      clearInterval(mover);
      clearInterval(llamaInterval);
      clearInterval(updateTimer);
      terminarMinijuegoLlamas(true);
    }
  }, 20000);
}

function actualizarVolume() {
  const porcentaje = parseInt(volumeSlider.value); // 0-100
  const decimal = porcentaje / 100; // 0.0–1.0
  musicTheme.volume = Math.min(Math.max(decimal, 0), 1); // Seguridad

  // Cambiar el fondo dinámico del slider (funciona en navegadores modernos)
  volumeSlider.style.background = `linear-gradient(to right, #8B0000 0%, #8B0000 ${porcentaje}%, #333 ${porcentaje}%, #333 100%)`;
}



volumeSlider.addEventListener("input", actualizarVolume);
actualizarVolume(); // Al iniciar


// Llama al iniciar
actualizarVolume();

// Evento para que se actualice dinámicamente
volumeSlider.addEventListener("input", actualizarVolume);

// 🔒 Evitar que un clic en el slider avance el diálogo
volumeSlider.addEventListener("mousedown", (e) => e.stopPropagation());
volumeSlider.addEventListener("touchstart", (e) => e.stopPropagation());