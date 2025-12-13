function setup() {
  createCanvas(window.innerWidth, window.innerHeight); // tworzy płótno 400x400 pikseli
}

function draw() {
  background(220);        // szare tło
  circle(mouseX, mouseY, 50); // kółko podążające za kursorem
}