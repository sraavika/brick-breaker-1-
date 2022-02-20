var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var x = canvas.width/2;
var y= canvas.height-30;
var dx=2;
var dy=-2;
var ballRadius=10;

var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width - paddleWidth)/2;

var rightPress=false;
var leftPress=false;


function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight)
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2)
    ctx.fillStyle="orangered";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBall();
    drawPaddle();
    x+=dx;
    y+=dy;
    if(x+dx<ballRadius ||x+dx>canvas.width - ballRadius){
        dx=-dx;
    }
    if(y+dy <ballRadius){
        dy=-dy;
    } 
    else if(y+dy>canvas.height - ballRadius){
        if(x>paddleX && x<paddleX+paddleWidth){
            dy=-dy;
        }
        else{
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
        }
       
   
   if(rightPress){
       paddleX+=7;
       if(paddleX + paddleWidth > canvas.width){
           paddleX=canvas.width - paddleWidth
       }
   }
   else if(leftPress){
    paddleX-=7;
    if(paddleX<0){
        paddleX=0;
    }
   }
}
function keyDownHandler(e){
    if(e.key=="Right" ||e.key=="ArrowRight"){
        rightPress=true;
    }
    else{
        if(e.key=="Left" ||e.key=="ArrowLeft"){
            leftPress=true;
    }
}
}
function keyUpHandler(e){
    if(e.key=="Right" ||e.key=="ArrowRight"){
        rightPress=false;
    }
    else if(e.key=="Left" ||e.key=="ArrowLeft"){
            leftPress=false;
        }
    }

document.addEventListener("keydown",keyDownHandler,false)
document.addEventListener("keyup",keyUpHandler,false)

var interval = setInterval(draw,10);