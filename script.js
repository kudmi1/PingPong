import * as m from "./modules.js";

window.addEventListener("keydown", m.changeDirection);
m.resetBtn.addEventListener("click",m.resetGame);
m.drawPaddles();
m.startGame();


