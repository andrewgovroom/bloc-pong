var canvas;
var	context;
// width and height of canvas
var W = 800,
		H = 600;

var human_score = 0;
var comp_score = 0;





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

// Player Object constructor
function Paddle(x, y) {
	this.x = x;
	this.y = y;
	this.color = "White";
	this.width = 15;
	this.height = 100;
	this.speed = 30;
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


// Declaring a human and computer paddle
var human = new Paddle(50, 250);
var computer = new Paddle(735, 250);





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


function compMove(){
	if((ball.x < 0) || (ball.x > 800)) {
		return;
	}
	if((computer.y + 50 <= ball.y) && (computer.y <= 465)){
		computer.move(4);
	}
	if((computer.y + 50 >= ball.y) && (computer.y >= 35)){
		computer.move(-4);
	}

};



// Function to generate random number (between -5 and 5) for the initial y component of the velocity
// The initial x component of velocity will be the same in all cases
function randomVelocity() {
	var num = Math.floor(Math.random() * 5) + 1; // this will get a number between 1 and 5;
	num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
	return num;
}

// Ball Object Constructor
function Ball(){
  this.x = W/2;
  this.y = H/2;
  this.color = "white";
  this.radius = 8;
	this.speed = 2;

// this.edge = {
// 		right: this.x + 10,
// 		left: this.x - 10,
// 		top: this.y - 10,
// 		bottom: this.y + 10
// 	};

	this.velocity_x = randomVelocity();
	this.velocity_y = randomVelocity();

};


Ball.prototype.render = function(){
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);

	this.x += this.velocity_x * this.speed;
	this.y += this.velocity_y * this.speed;

	if ((this.y <= 33) || (this.y >= 567)) {
		this.velocity_y *= -1;
	}

	if((this.x <= human.x + 23) && (this.x >= human.x + 8) && (this.y >= human.y) && (this.y <= human.y +100)){
		if(this.velocity_x < 0){
			this.velocity_x *= -1;
		}
	}

	if((this.x >= computer.x - 8) && (this.x <= computer.x) && (this.y >= computer.y) && (this.y <= computer.y +100)){
		if(this.velocity_x > 0){
			this.velocity_x *= -1;
		}
	}

	// detect when the computer scores a point
		// reset the ball position to the middle and generate another random x and y velocity
	if(this.x <= 0){

		comp_score += 1;
		document.getElementById("comsc").textContent = comp_score;
		// reset this.x
		this.x = W/2;
		// reset this.y
		this.y = H/2;

		// get a new this.velocity_x and this.velocity_y
		this.velocity_x = randomVelocity();
		this.velocity_y = randomVelocity();
	}

	if (this.x >= 800) {
		human_score += 1;
		document.getElementById("humsc").textContent = human_score;
		// reset this.x
		this.x = W/2;
		// reset this.y
		this.y = H/2;

		// get a new this.velocity_x and this.velocity_y
		this.velocity_x = randomVelocity();
		this.velocity_y = randomVelocity();

	}
	// detect when the player scores a point
		// reset the ball position to the middle and generate another random x and y velocity

  context.fill();
};

// Declaring a new ball
var ball = new Ball();

var render = function () {
	paintCanvas();
	drawBoundaries();
	compMove();
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
	// window.webkitRequestAnimationFrame ||
	// window.mozRequestAnimationFrame ||
	// window.oRequestAnimationFrame ||
	// window.msRequestAnimationFrame ||
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
