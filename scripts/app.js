
// var canvas = document.getElementById('table-canvas');
// var context = canvas.getContext('2d');

var canvas;
var	context;
// width and height of canvas
var W = 800,
		H = 600;

// Initialize the game canvas
function init(){
	canvas = document.getElementById('table-canvas');
	context = canvas.getContext('2d');
	canvas.width = W;
	canvas.height = H;
}

// Paint the game canvas background
function paintCanvas() {
	context.fillStyle = "Green";
	context.fillRect(0, 0, W, H);
}

// context.beginPath();
// context.lineWidth = 4;
// context.strokeStyle = 'white';
// context.strokeRect(25, 25, 700, 550);

// Draws the game board (boundaries)
function drawBoundaries() {
	context.beginPath();
	context.lineWidth = 4;
	context.strokeStyle = 'White';
	context.strokeRect(25, 25, 750, 550);
}

function addKeyEvents() {
	window.addEventListener('keydown', onKeyDown, true);
}


//
// function Paddle(x,y){
//   this.xPos = x;
//   this.yPos = y;
//   this.width = 12;
//   this.height = 90;
//   this.color = "white";
// };
//
// Paddle.prototype.render = function(){
//   context.beginPath();
//   context.fillStyle = this.color;
//   context.fillRect(this.xPos, this.yPos, this.width, this.height);
// };

// Player Object constructor
function Paddle(x, y) {
	this.x = x;
	this.y = y;
	this.color = "White";
	this.width = 15;
	this.height = 100;
	this.speed = 10;
	// Move the vertical distance 'dy'
	this.move = function (dy) {
		// clear the current rectangle
		context.clearRect(this.x, this.y, this.width, this.height);
		this.y += dy;
	}
	this.render = function () {
		context.beginPath();
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	};
}


function onKeyDown(e) {
	// up arrow
	if (e.keyCode === 38) {
		// Move 10 pixels on the y axis towards the origin
		// Only if the paddle y position equals 35 or more pixels (still has room to move 10 pixels to top boundary)
		if (human.y >= 35){
			human.move(-10);
		}
	}
	// down arrow
	if (e.keyCode === 40) {
		// Move 10 pixels on the y axis away from the origin
		// Only if the paddle y position equals 365 or fewer pixels (still has room to move 10 pixels to bottom boundary)
		if (human.y <= 465){
			human.move(10);
		}
	}
}

// Declaring a human and computer paddle
var human = new Paddle(50, 250);
var computer = new Paddle(735, 250);


// Ball Object Constructor
function Ball(x,y){
  this.xPos = x;
  this.yPos = y;
  this.color = "white";
  this.radius = 8;
};

Ball.prototype.render = function(){
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.xPos, this.yPos, this.radius, 0, 2*Math.PI, false);
  context.fill();
};

// Declaring a new ball
var ball = new Ball(380,280);

var render = function () {
	paintCanvas();
	drawBoundaries();
	human.render();
	computer.render();
	ball.render();
	// redraw
	animate(render);
};

// Actions needed for each repaint
function step(){
	render();
}

// Animate function
var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};

window.onload = function () {
	init();
	step();
	addKeyEvents();
};


// window.onload = function(){
// human.render();
// computer.render();
// ball.render();
// };
