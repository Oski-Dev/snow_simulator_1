// Symulacja podwójnego wahadła w p5.js
// Pierwsze wahadło
let origin;         // punkt mocowania (środek ekranu, 1/4 wyżej)
let len1;           // długość linki pierwszego (piksele)
let angle1;         // kąt wychylenia pierwszego (radiany)
let aVel1 = 0;      // prędkość kątowa pierwszego
let aAcc1 = 0;      // przyspieszenie kątowe pierwszego

// Drugie wahadło (zaczepione na końcu pierwszego)
let len2;           // długość linki drugiego (piksele)
let angle2;         // kąt wychylenia drugiego (radiany)
let aVel2 = 0;      // prędkość kątowa drugiego
let aAcc2 = 0;      // przyspieszenie kątowe drugiego

let gravity = 1;    // stała g (skalowana dla pikseli)
let bobRadius = 13; // promień boba

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  resetPendulum();
}

function resetPendulum() {
  origin = createVector(width / 2, height / 4); // 1/4 wyżej
  
  // oblicz wektor od zaczepiania do kursora
  let dx = mouseX - origin.x;
  let dy = mouseY - origin.y;
  
  // długość linki pierwszego wahadła to większa ze składowych X i Y
  let componentX = abs(dx);
  let componentY = abs(dy);
  len1 = max(componentX, componentY);
  
  // ogranicz długość: minimum 100, maksimum połowa wysokości okna
  len1 = constrain(len1, 100, height / 2);
  
  // kierunek to wektor między punktem zaczepiania a kursorem
  angle1 = atan2(dx, dy);
  
  // drugie wahadło - takie same parametry co pierwsze
  len2 = len1 *0.8; // drugie krótsze
  angle2 = 0; // początkowo pionowo w dół
  
  // zeruj prędkości i przyspieszenia
  
  aVel1 = 0;
  aAcc1 = 0;
  aVel2 = 0;
  aAcc2 = 0;
}

function draw() {
  background(200);

  // === PIERWSZE WAHADŁO ===
  // równanie ruchu: aAcc = - (g / L) * sin(theta)
  aAcc1 = (-gravity / len1) * sin(angle1);
  aVel1 += aAcc1;
  aVel1 *= 0.997; // tłumienie
  angle1 += aVel1;

  // pozycja końca pierwszego wahadła
  let bob1X = origin.x + len1 * sin(angle1);
  let bob1Y = origin.y + len1 * cos(angle1);

  // rysuj linkę pierwszego wahadła
  stroke(0);
  strokeWeight(2);
  line(origin.x, origin.y, bob1X, bob1Y);

  // rysuj punkt mocowania
  fill(0);
  noStroke();
  circle(origin.x, origin.y, 8);

  // === DRUGIE WAHADŁO ===
  // zaczepiamy na końcu pierwszego
  let origin2 = createVector(bob1X, bob1Y);

  aAcc2 = (-gravity / len2) * sin(angle2);
  aVel2 += aAcc2;
  aVel2 *= 0.997; // tłumienie
  angle2 += aVel2;

  // pozycja końca drugiego wahadła
  let bob2X = origin2.x + len2 * sin(angle2);
  let bob2Y = origin2.y + len2 * cos(angle2);

  // rysuj linkę drugiego wahadła
  stroke(0);
  strokeWeight(2);
  line(origin2.x, origin2.y, bob2X, bob2Y);

  // rysuj boby (masy)
  fill(50, 120, 200);
  stroke(0);
  strokeWeight(1);
  circle(bob1X, bob1Y, bobRadius * 2);
  circle(bob2X, bob2Y, bobRadius * 2);

  // instrukcja: kliknięcie ustawia kąt wahadła na pozycję kursora
  noStroke();
  fill(0);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Kliknij, aby ustawić wychylenie na pozycję kursora :)', 10, 10);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  // zaktualizuj punkt mocowania po zmianie rozmiaru
  origin = createVector(width / 2, height / 4);
}

function mousePressed() {
  resetPendulum();
}