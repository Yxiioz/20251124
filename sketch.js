let sprite1, sprite2, sprite3;
const FRAMES1 = 8;
const FRAMES2 = 9;
const FRAMES3 = 8;
let frameW1, frameH1, frameW2, frameH2, frameW3, frameH3;
const FRAME_DURATION = 100; // ms per frame (shared)

function preload() {
  sprite1 = loadImage('1/all1.png');
  sprite2 = loadImage('2/all2.png');
  sprite3 = loadImage('3/all3.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  if (sprite1) {
    frameW1 = sprite1.width / FRAMES1;
    frameH1 = sprite1.height;
  }
  if (sprite2) {
    frameW2 = sprite2.width / FRAMES2;
    frameH2 = sprite2.height;
  }
  if (sprite3) {
    frameW3 = sprite3.width / FRAMES3;
    frameH3 = sprite3.height;
  }
}

function draw() {
  background('#1ba72eff');

  if (!sprite1 || !sprite2 || !sprite3) return;

  // current frames
  const idx1 = floor((millis() / FRAME_DURATION) % FRAMES1);
  const sx1 = idx1 * frameW1;

  const idx2 = floor((millis() / FRAME_DURATION) % FRAMES2);
  const sx2 = idx2 * frameW2;

  const idx3 = floor((millis() / FRAME_DURATION) % FRAMES3);
  const sx3 = idx3 * frameW3;

  // scale sprites to fit nicely (max 60% of window height)
  const maxDisplayH = height * 0.6;
  const scale1 = maxDisplayH / frameH1;
  const scale2 = maxDisplayH / frameH2;
  const scale3 = maxDisplayH / frameH3;
  const dW1 = frameW1 * scale1;
  const dH1 = frameH1 * scale1;
  const dW2 = frameW2 * scale2;
  const dH2 = frameH2 * scale2;
  const dW3 = frameW3 * scale3;
  const dH3 = frameH3 * scale3;

  const gap = 40; // pixels between animations

  // compute group width and positions so the trio is centered as a group
  const totalWidth = dW1 + gap + dW2 + gap + dW3;
  const centerX = width / 2;
  const leftCenterX = centerX - totalWidth / 2;
  const x1 = leftCenterX + dW1 / 2;
  const x2 = leftCenterX + dW1 + gap + dW2 / 2;
  const x3 = leftCenterX + dW1 + gap + dW2 + gap + dW3 / 2;
  const y = height / 2;

  // draw frames
  image(sprite1, x1, y, dW1, dH1, sx1, 0, frameW1, frameH1);
  image(sprite2, x2, y, dW2, dH2, sx2, 0, frameW2, frameH2);
  image(sprite3, x3, y, dW3, dH3, sx3, 0, frameW3, frameH3);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
