const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let painting = false;
let currentTool = 'brush';
let currentColor = 'black';

canvas.addEventListener('mousedown', (e) => {
  painting = true;
  draw(e);
});

canvas.addEventListener('mousemove', (e) => {
  if (!painting) return;
  draw(e);
});

canvas.addEventListener('mouseup', () => {
  painting = false;
  ctx.beginPath();
});

function draw(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  if (currentTool === 'brush') {
    ctx.strokeStyle = currentColor;
  } else if (currentTool === 'eraser') {
    ctx.strokeStyle = 'white'; // Assuming the canvas background is white
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Assuming you have color elements with the class 'color-option'
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach((colorOption) => {
  colorOption.addEventListener('click', () => {
    currentColor = colorOption.dataset.color;
  });
});

// Assuming you have tool elements with the class 'tool-option'
const toolOptions = document.querySelectorAll('.tool-option');

toolOptions.forEach((toolOption) => {
  toolOption.addEventListener('click', () => {
    currentTool = toolOption.dataset.tool;
  });
});

// Assuming you have a clear canvas button with the ID 'clearCanvas'
const clearCanvasButton = document.getElementById('clearCanvas');

clearCanvasButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function loadDrawing(drawingUrl) {
  const drawing = new Image();
  drawing.src = drawingUrl;
  drawing.onload = () => {
    ctx.drawImage(drawing, 0, 0, canvas.width, canvas.height);
  };
}

// Assuming you have drawing elements with the class 'drawing-option'
const drawingOptions = document.querySelectorAll('.drawing-option');

drawingOptions.forEach((drawingOption) => {
  drawingOption.addEventListener('click', () => {
    loadDrawing(drawingOption.dataset.drawingUrl);
  });
});

