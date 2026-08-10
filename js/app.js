
import { db, ref, onValue, set, update } from "./firebase.js";

const initialState = {
  turn: "hammam",
  scores: { hammam: 0, monia: 0 },
  stats: { games: 0, wins: { hammam: 0, monia: 0 } },
  active: { type: "home", file: "" }
};

let state = null;
let currentPlayer = null;

const $ = id => document.getElementById(id);

window.Space = {
  getState: () => state,
  getPlayer: () => currentPlayer,

  addPoints(player, points) {
    if (!state) return;
    const u = {};
    u[`scores/${player}`] = (state.scores?.[player] || 0) + Number(points);
    u["stats/games"] = (state.stats?.games || 0) + 1;
    u[`stats/wins/${player}`] = (state.stats?.wins?.[player] || 0) + 1;
    return update(ref(db, "spaceData"), u);
  },

  setTurn(player) {
    return update(ref(db, "spaceData"), { turn: player });
  },

  changeTurn() {
    return this.setTurn(currentPlayer === "hammam" ? "monia" : "hammam");
  },

  update(values) {
    return update(ref(db, "spaceData"), values);
  },

  resetState() {
    return set(ref(db, "spaceData"), initialState);
  },

  async share(text) {
    if (navigator.share) {
      try { await navigator.share({ title: "بدر × شمس", text }); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(text);
      alert("تم نسخ النص.");
    } catch {
      alert(text);
    }
  }
};

window.loginAs = function(player) {
  currentPlayer = player;
  sessionStorage.setItem("bs_player", player);
  $("login").classList.add("hidden");
  $("app").classList.remove("hidden");
  startSync();
};

function startSync() {
  onValue(ref(db, "spaceData"), snapshot => {
    if (!snapshot.exists()) {
      set(ref(db, "spaceData"), initialState);
      return;
    }
    state = snapshot.val();
    render();
    if (window.renderGameFrame) window.renderGameFrame();
  });
}

function render() {
  if (!state || !currentPlayer) return;
  $("bScore").textContent = state.scores?.hammam || 0;
  $("sScore").textContent = state.scores?.monia || 0;
  $("playerName").textContent = currentPlayer === "hammam" ? "بدر" : "شمس";
  $("playerRole").textContent = currentPlayer === "hammam" ? "همام" : "منية";

  const myTurn = state.turn === currentPlayer;
  $("turn").textContent = myTurn
    ? "دورك الآن ✨"
    : `الدور الآن لـ ${state.turn === "hammam" ? "بدر" : "شمس"} ⏳`;
  $("turn").className = "turn " + (myTurn ? "my-turn" : "");

  if (state.active?.type === "game" && state.active?.file) {
    loadGame(state.active.file, false);
  }
}

window.openGame = function(file, title) {
  update(ref(db, "spaceData"), {
    active: { type: "game", file, title }
  });
};

window.openActivity = function(file, title) {
  update(ref(db, "spaceData"), {
    active: { type: "activity", file, title }
  });
};

window.goHome = function() {
  update(ref(db, "spaceData"), { active: { type: "home", file: "" } });
  $("gamePanel").classList.add("hidden");
  $("homePanel").classList.remove("hidden");
};

async function loadGame(file, syncState = true) {
  $("homePanel").classList.add("hidden");
  $("gamePanel").classList.remove("hidden");
  $("gameTitle").textContent = state?.active?.title || "لعبة";
  const frame = $("gameFrame");
  frame.src = file + (file.includes("?") ? "&" : "?") + "v=1";
  if (syncState) {
    await update(ref(db, "spaceData"), { active: { type: "game", file, title: state?.active?.title || "لعبة" } });
  }
}

window.renderGameFrame = function() {
  if (!state) return;
  if (state.active?.type === "home") {
    $("gamePanel").classList.add("hidden");
    $("homePanel").classList.remove("hidden");
  } else {
    $("homePanel").classList.add("hidden");
    $("gamePanel").classList.remove("hidden");
    $("gameTitle").textContent = state.active.title || "محتوى";
    $("gameFrame").src = state.active.file + "?v=1";
  }
};

window.addEventListener("message", event => {
  if (!event.data || event.data.source !== "badr-shams-game") return;
  const action = event.data.action;
  if (action === "points") Space.addPoints(event.data.player, event.data.points);
  if (action === "turn") Space.changeTurn();
  if (action === "home") goHome();
});

const saved = sessionStorage.getItem("bs_player");
if (saved === "hammam" || saved === "monia") {
  window.loginAs(saved);
}
