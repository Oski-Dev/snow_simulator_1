// Symulacja prostego wahadła w p5.js
let origin;         // punkt mocowania (środek ekranu)
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
  origin = createVector(width / 2, height / 2); // środek ekranu
  len = 150; // długość linki
  
  // oblicz kąt na podstawie wektora od zaczepiania do kursora
  let dx = mouseX - origin.x;
  let dy = mouseY - origin.y;
  angle = atan2(dx, dy); // atan2(x, y) dla kąta względem osi pionowej
  
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

  // instrukcja: kliknięcie ustawia kąt wahadła na pozycję kursora
  noStroke();
  fill(0);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Kliknij, aby ustawić wychylenie na pozycję kursora', 10, 10);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  // zaktualizuj punkt mocowania po zmianie rozmiaru
  origin = createVector(width / 2, height / 2);
}

function mousePressed() {
  resetPendulum();
}