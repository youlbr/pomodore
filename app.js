document.addEventListener("DOMContentLoaded", function () {
  const start = document.querySelector(".start");
  const reset = document.querySelector(".restar");
  const minutes = document.querySelector(".minutes");
  const secuns = document.querySelector(".secuns");
  const what = document.querySelector(".what-h1");
  const dasboar = document.querySelector(".content-dasboard");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const frase = document.querySelector(".phrase");
  const author = document.querySelector(".author");
  const audio = document.getElementById("audioPlayer");
  const sound = document.getElementById("audioPlayer2");
  const restAudio = document.getElementById("audioPlayer1");
  const mute = document.querySelector(".circle");
  const img = document.querySelector(".muted");

  function playAudio() {
    // audio.currentTime = 0; // Reiniciar el audio al inicio
    audio.play();

    // Detener la reproducción en 19 segundos
    audio.ontimeupdate = () => {
      if (audio.currentTime >= 17.5) {
        console.log("hola");
        // audio.pause(); // Detener la reproducción
        audio.currentTime = 1.67; // Reiniciar el tiempo
        audio.ontimeupdate = null; // Limpiar el evento para evitar bucles
      }
    };
  }

  function pauseAudio() {
    audio.pause();
    audio.currentTime = 0;
  }

  function resetAudio() {
    audio.currentTime = 0;
  }

  const frases = [
    {
      frace: "El tiempo es lo que más queremos, pero lo que peor usamos.",
      author: "William Penn",
    },
    {
      frace:
        "No es suficiente tener un buen cerebro. Lo principal es usarlo bien.",
      author: "Rene Descartes",
    },
    {
      frace:
        "El sacrificio es el precio que pagas por la oportunidad de alcanzar tus sueños.",
      author: "Michelle Obama",
    },
    {
      frace: "No hay atajos para cualquier lugar que valga la pena llegar.",
      author: "Beverly Sills",
    },
    {
      frace:
        "El tiempo es un recurso no renovable. Cada momento que pasas en algo que no es significativo es un momento perdido.",
      author: "Randy Pausch",
    },
    {
      frace:
        "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
      author: "Robert Collier",
    },
    {
      frace: "La única forma de hacer un gran trabajo es amar lo que haces.",
      author: "Steve Jobs",
    },
    {
      frace: "El tiempo que disfrutas perder no es tiempo perdido.",
      author: "Marthe Troly-Curtin",
    },
    {
      frace:
        "No se trata de cuántas horas trabajas, sino de qué haces con esas horas.",
      author: "Anonymous",
    },
    {
      frace:
        "La perseverancia es la clave del éxito. Es la diferencia entre los que renuncian y los que triunfan.",
      author: "Anonymous",
    },
  ];
  let randon = Math.floor(Math.random() * frases.length);

  frase.textContent = frases[randon].frace;
  author.textContent = frases[randon].author;
  let tiempoRestante = 60 * 60;
  let intervalo; // Declaramos el intervalo fuera de las funciones
  let isRunning = false; // Estado del temporizador (activo o pausado)
  let focus = false;
  let rest = true;
  let isMuted = false;
  let isRestAudioPlaying = false; 

  // Actualizar la pantalla
  function actualizarPantalla() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    minutes.textContent = `${minutos < 10 ? "0" : ""}${minutos}`;
    secuns.textContent = `${segundos < 10 ? "0" : ""}${segundos}`;
  }

  // Iniciar o pausar el temporizador
  function begin() {
    if (isRunning) {
      clearInterval(intervalo);
      audio.pause();
      start.textContent = "Start"; // Cambiar el texto a "Start"
      what.textContent = "Paused";
      isRestAudioPlaying = false;
    } else {
      // Si está pausado, reiniciar el temporizador
      intervalo = setInterval(() => {
        if (tiempoRestante % 240 === 0 && tiempoRestante > 0) {
          let randon = Math.floor(Math.random() * frases.length);
          frase.textContent = frases[randon].frace;
          author.textContent = frases[randon].author;
        }

        if (rest) {
          playAudio();
          what.textContent = "Focus";
          metaThemeColor.setAttribute("content", "#82e0aa");
          dasboar.style.backgroundColor = "#82e0aa";
          isRestAudioPlaying=false
        } else {
          pauseAudio();
          if (!isRestAudioPlaying) { // Solo reproducir si no está sonando
            restAudio.play();
            sound.play()
            isRestAudioPlaying = true; // Marcar como sonando
           
          }
          what.textContent = "Relax";
          metaThemeColor.setAttribute("content", "#ffa07a");
          dasboar.style.backgroundColor = "#FFA07A";
        }
        start.textContent = "Pause"; // Cambiar el texto a "Pause"

        if (tiempoRestante > 0) {
          tiempoRestante--;
          actualizarPantalla();
          reset.style.opacity = 1;
          mute.style.opacity = 1;
          mute.style.cursor = "pointer";
          reset.style.cursor = "pointer";
          mute.addEventListener("click", muted);
          reset.addEventListener("click", resetTimer);
        } else {
          if (focus) tiempoRestante = 60 * 60;
          if (rest) tiempoRestante = 10 * 60;
          focus = !focus;
          rest = !rest;
        }
      }, 1000);
    }
    isRunning = !isRunning; // Cambiar el estado (activo/pausado)
    console.log(isRunning);
  }

  // Restablecer el temporizador
  function resetTimer() {
    pauseAudio();
    mute.removeEventListener("click", muted);
    reset.removeEventListener("click", resetTimer);
    restAudio.pause();
    resetAudio.currentTime = 0;
    audio.volume = 1;
    img.setAttribute("src", "./asset/volumen.svg");
    mute.style.cursor = `url('./asset/cursor.svg'),auto`;
    reset.style.cursor = `url('./asset/cursor.svg'),auto`;
    mute.style.opacity = 0.1;
    reset.style.opacity = 0.1;
    clearInterval(intervalo); // Detener el temporizador
    tiempoRestante = 60 * 60; // Restablecer a 2 minutos
    actualizarPantalla(); // Actualizar la pantalla con el tiempo inicial
    what.textContent = "";
    start.textContent = "Start"; // Cambiar el texto a "Start"
    metaThemeColor.setAttribute("content", "#f0f3f4");
    dasboar.style.backgroundColor = "#f0f3f4";
    isRunning = false; // Establecer el estado como no corriendo
  }
  function muted() {
    if (isMuted) {
      audio.volume = 1;
      img.setAttribute("src", "./asset/volumen.svg");
    } else {
      audio.volume = 0;
      img.setAttribute("src", "./asset/silencio.svg");
    }
    isMuted = !isMuted;
  }

  // Registrar los eventos de clic
  start.addEventListener("click", begin);

  // Inicializar la pantalla
  actualizarPantalla();
});
