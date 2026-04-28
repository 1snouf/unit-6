const samples = [
  { name: "Ah-Ha", file: "audio/ah-ha.mp3" },
  { name: "Dan", file: "audio/dan.mp3" },
  { name: "Back of the net", file: "audio/back-of-the-net.mp3" },
  { name: "Bang out of order", file: "audio/bang-out-of-order.mp3" },
  { name: "Jurassic Park", file: "audio/jurassic-park.mp3" },
  { name: "Smell my cheese", file: "audio/smell-my-cheese.mp3" },
  { name: "Goal", file: "audio/goal.mp3" },
  { name: "Kiss my face", file: "audio/kiss-my-face.mp3" },
  { name: "Hello Partridge", file: "audio/hello-partridge.mp3" },

  { name: "Lovely Stuff", file: "audio/lovely-stuff.mp3" },
  { name: "Cashback", file: "audio/cashback.mp3" },
  { name: "Monkey Tennis", file: "audio/monkey-tennis.mp3" }
];

let currentPage = 0;
const perPage = 9;

const samplesBox = document.getElementById("samples");
const bankTitle = document.getElementById("bankTitle");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

function displaySamples() {
  samplesBox.innerHTML = "";

  const start = currentPage * perPage;
  const end = start + perPage;
  const pageSamples = samples.slice(start, end);

  bankTitle.textContent = `Sample Bank ${currentPage + 1}`;

  pageSamples.forEach((sample, index) => {
    const audio = new Audio(sample.file);

    const button = document.createElement("button");
    button.className = "sample";

    button.innerHTML = `
      <h3>${start + index + 1}.</h3>
      <h4>${sample.name}</h4>
      <p>Loading...</p>
    `;

    audio.addEventListener("loadedmetadata", () => {
      button.querySelector("p").textContent = audio.duration.toFixed(2) + "s";
    });

    button.addEventListener("click", () => {
      audio.currentTime = 0;
      audio.play();
    });

    samplesBox.appendChild(button);
  });

  leftBtn.style.display = currentPage === 0 ? "none" : "inline-block";
  rightBtn.style.display = end >= samples.length ? "none" : "inline-block";
}

rightBtn.addEventListener("click", () => {
  currentPage++;
  displaySamples();
});

leftBtn.addEventListener("click", () => {
  currentPage--;
  displaySamples();
});

document.getElementById("sayBtn").addEventListener("click", () => {
  const text = document.getElementById("speechText").value;

  if (text.trim() !== "") {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
  }
});

displaySamples();