let timer;
let isRunning = false;
let time = 1500;
let currentSession = "work";
let workSessions = 0;

const timerDisplay = document.getElementById("timer");
const sessionType = document.getElementById("session-type");
const sessionCount = document.getElementById("session-count");
const alarm = document.getElementById("alarm-sound");

const inputs = {
  work: document.getElementById("work-input"),
  short: document.getElementById("short-input"),
  long: document.getElementById("long-input"),
};

function updateDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function getSessionDuration(type) {
  return Math.max(1, parseInt(inputs[type].value)) * 60;
}

function setSession(type) {
  pauseTimer();
  currentSession = type;
  document.querySelectorAll(".session-btn").forEach((btn) => btn.classList.remove("bg-red-500", "text-white"));

  const btnMap = {
    work: "btn-work",
    short: "btn-short",
    long: "btn-long",
  };
  document.getElementById(btnMap[type]).classList.add("bg-red-500", "text-white");

  time = getSessionDuration(type);
  sessionType.textContent = {
    work: "Work",
    short: "Short Break",
    long: "Long Break",
  }[type];
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      alarm.play();
      clearInterval(timer);
      isRunning = false;

      if (currentSession === "work") {
        workSessions++;
        sessionCount.textContent = workSessions;
        setSession(workSessions % 4 === 0 ? "long" : "short");
        startTimer();
      } else {
        setSession("work");
        startTimer();
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  setSession(currentSession);
}

setSession("work");