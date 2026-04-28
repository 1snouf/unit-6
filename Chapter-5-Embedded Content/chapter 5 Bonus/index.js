// AUDIO DATA
const samples = [
  { name: "Ah-Ha", file: "audio/aha.mp3" },
  { name: "Dan", file: "audio/dan.mp3" },
  { name: "Back of the net", file: "audio/back.mp3" },
  { name: "Bang out of order", file: "audio/bang.mp3" },
  { name: "email of the evening ", file: "audio/email.mp3" },
  { name: "hello partrigde", file: "audio/hello.mp3" },
  { name: "ia tea scotchegg", file: "audio/Ia.mp3" },
  { name: "im confused", file: "audio/im confused.mp3" },

  // EXTRA PAGE
  { name: "Extra 1", file: "audio/extra1.mp3" },
  { name: "Extra 2", file: "audio/extra2.mp3" },
  { name: "Extra 3", file: "audio/extra3.mp3" }
];

let currentPage = 0;
const perPage = 9;

function loadSamples() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const start = currentPage * perPage;
  const pageItems = samples.slice(start, start + perPage);

  pageItems.forEach(sample => {
    const div = document.createElement("div");
    div.className = "sample";

    const audio = new Audio(sample.file);

    // GET DURATION
    audio.addEventListener("loadedmetadata", () => {
      const duration = audio.duration.toFixed(2);

      div.innerHTML = `
        <h3>${sample.name}</h3>
        <p>${duration}s</p>
      `;
    });

    div.onclick = () => {
      audio.currentTime = 0;
      audio.play();
    };

    grid.appendChild(div);
  });

  // ARROW VISIBILITY
  document.getElementById("prev").style.display =
    currentPage === 0 ? "none" : "inline-block";

  document.getElementById("next").style.display =
    (start + perPage >= samples.length) ? "none" : "inline-block";
}

// NAVIGATION
function nextPage() {
  currentPage++;
  loadSamples();
}

function prevPage() {
  currentPage--;
  loadSamples();
}

// TEXT TO SPEECH
function speakText() {
  const text = document.getElementById("text").value;
  const speech = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speech);
}

// INIT
loadSamples();