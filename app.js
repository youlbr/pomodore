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
  const sound2 = document.getElementById("audioPlayer3");
  const sound3 = document.getElementById("audioPlayer4");
  const restAudio = document.getElementById("audioPlayer1");
  const mute = document.querySelector(".circle");
  const img = document.querySelector(".muted");

  function playAudio() {
    audio.play();
    audio.ontimeupdate = () => {
      if (audio.currentTime >= 17.5) {
        audio.currentTime = 1.67;
        audio.ontimeupdate = null;
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
  let intervalo;
  let isRunning = false;
  let focus = false;
  let rest = true;
  let isMuted = false;
  let isRestAudioPlaying = false;

  function actualizarPantalla() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    minutes.textContent = `${minutos < 10 ? "0" : ""}${minutos}`;
    secuns.textContent = `${segundos < 10 ? "0" : ""}${segundos}`;
  }

  function begin() {
    if (isRunning) {
      clearInterval(intervalo);
      audio.pause();
      start.textContent = "Start";
      what.textContent = "Paused";
      what.style.color = "";
      isRestAudioPlaying = false;
    } else {
      intervalo = setInterval(() => {
        if (tiempoRestante % 240 === 0 && tiempoRestante > 0) {
          let randon = Math.floor(Math.random() * frases.length);
          frase.textContent = frases[randon].frace;
          author.textContent = frases[randon].author;
        }

        if (rest) {
          playAudio();
          what.textContent = "Focus";
          what.style.color = "#82cf1f";
          metaThemeColor.setAttribute("content", "#82cf1f");
          dasboar.style.color = "#82cf1f";
          isRestAudioPlaying = false;
        } else {
          pauseAudio();
          if (!isRestAudioPlaying) {
            restAudio.play();
            sound.play();
            isRestAudioPlaying = true;
          }
          console.log(tiempoRestante);
          if (tiempoRestante < 32) {
            sound2.play();
            sound3.play();
            if (tiempoRestante < 32 - 19) {
              sound2.pause();
              sound2.currentTime=0
              sound3.pause();
              sound3.currentTime=0
            }
          }
          what.textContent = "Relax";
          metaThemeColor.setAttribute("content", "#f380e6");
          what.style.color = "#f380e6";
          dasboar.style.color = "#f380e6";
        }
        start.textContent = "Pause";

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
    isRunning = !isRunning;
  }

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
    clearInterval(intervalo);
    tiempoRestante = 60 * 60;
    actualizarPantalla();
    what.textContent = "Welcome";
    what.style.color = "#fff";
minutes.style.color='#fff'
secuns.style.color='#fff'
    start.textContent = "Start";
    metaThemeColor.setAttribute("content", "#000");
    dasboar.style.backgroundColor = "#000";
    isRunning = false;
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

  start.addEventListener("click", begin);
  actualizarPantalla();
});
