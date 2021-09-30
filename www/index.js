import { Universe } from "wasm-game-of-life";

const pre = document.getElementById("game-of-life-canvas");
const playPauseButton = document.getElementById("play-pause");

const universe = Universe.new();

let animationId = null;
const ticksPerFrame = document.getElementById("ticks-per-frame");

function renderLoop(){
    pre.textContent = universe.render();
    let ticks = 0;
    while(ticks <= ticksPerFrame.valueAsNumber){
        universe.tick();
        ticks += 1
    }
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