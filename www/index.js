import { Universe } from "wasm-game-of-life";

const pre = document.getElementById("game-of-life-canvas");
const playPauseButton = document.getElementById("play-pause");

const universe = Universe.new();

let animationId = null;

function renderLoop(){
    pre.textContent = universe.render();
    universe.tick();
    animationId = requestAnimationFrame(renderLoop);
};

function isPaused(){
    return animationId === null
}

function pause(){
    playPauseButton.textContent = "▶";
    cancelAnimationFrame(animationId);
    animationId = null;
}

function play(){
    playPauseButton.textContent = "⏸";
    renderLoop();
}

playPauseButton.addEventListener("click", event => {
    if (isPaused()) {
        play();
        return
    }
    pause();
});

play();