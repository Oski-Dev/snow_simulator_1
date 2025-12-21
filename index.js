// Symulacja prostego wahadła w p5.js
let origin;         // punkt mocowania (top-center)
let len;            // długość linki (piksele)
let angle;          // kąt wychylenia (radiany)
let aVel = 0;       // prędkość kątowa
let aAcc = 0;       // przyspieszenie kątowe
let gravity = 1;    // stała g (skalowana dla pikseli)
let bobRadius = 32; // promień boba

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  resetPendulum();
}

function resetPendulum() {
  origin = createVector(width / 2, 0);
  len = height * 0.75; // drugi punkt w odległości ~3/4 wysokości okna
  // losowe wychylenie w jedną stronę (0.2..1.0 rad)
  angle = random(0.9, 3.1) * (random() < 0.5 ? -1 : 1);
  aVel = 0;
  aAcc = 0;
}

function draw() {
  background(Math.abs(angle)*200);

  // równanie ruchu dla prostego wahadła: aAcc = - (g / L) * sin(theta)
  aAcc = (-gravity / len) * sin(angle);
  aVel += aAcc;
  // lekkie tłumienie, żeby ruch nie trwał nieskończenie długo
  aVel *= 0.995;
  angle += aVel;

  // pozycja boba w kartezjańskich współrzędnych
  let bobX = origin.x + len * sin(angle);
  let bobY = origin.y + len * cos(angle);

  // rysuj linkę
  stroke(0);
  strokeWeight(2);
  line(origin.x, origin.y, bobX, bobY);

  // rysuj punkt mocowania
  fill(0);
  noStroke();
  circle(origin.x, origin.y, 8);

  // rysuj bob (masa)
  fill(50, 120, 200);
  stroke(0);
  strokeWeight(1);
  circle(bobX, bobY, bobRadius * 2);

  // instrukcja: kliknięcie resetuje wychylenie
  noStroke();
  fill(0);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Kliknij, aby zresetować (losowe wychylenie)', 10, 10);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  // zaktualizuj długość i punkt mocowania po zmianie rozmiaru
  origin = createVector(width / 2, 0);
  len = height * 0.75;
}

function mousePressed() {
  resetPendulum();
}