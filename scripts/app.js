
var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');


// Board
context.beginPath();
context.lineWidth = 6;
context.strokeStyle = 'black';
context.strokeRect(25, 25, 600, 450);
