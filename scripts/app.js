
var canvas = document.getElementById('table-canvas');
var context = canvas.getContext('2d');


context.beginPath();
context.lineWidth = 4;
context.strokeStyle = 'white';
context.strokeRect(25, 25, 700, 550);


function Paddle(x,y){
  this.xPos = x;
  this.yPos = y;
  this.width = 12;
  this.height = 90;
  this.color = "white";
};

Paddle.prototype.render = function(){
  context.beginPath();
  context.fillStyle = this.color;
  context.fillRect(this.xPos, this.yPos, this.width, this.height);
};

var human = new Paddle(50, 250);
var computer = new Paddle(690, 250);

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


var ball = new Ball(380,280);


window.onload = function(){
human.render();
computer.render();
ball.render();
};
