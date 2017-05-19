// var WINDOW_WIDTH = document.body.clientWidth;
// var WINDOW_HEIGHT = 500;
// var BALL_R = 8;
// var BEGIN_Y = 10;
// var BEGIN_X = 10;
// var NUM_WID = 145;
// var ICON_WID =80;

var WINDOW_WIDTH = document.body.clientWidth*3/4;
var WINDOW_HEIGHT = WINDOW_WIDTH/2;
var BALL_R = WINDOW_WIDTH/128.75;
var BEGIN_Y = WINDOW_WIDTH/103;
var BEGIN_X = WINDOW_WIDTH/103;
var NUM_WID = WINDOW_WIDTH/7.1;
var ICON_WID =WINDOW_WIDTH/12.875;
var BLAN_BALL = WINDOW_WIDTH/51.5;

// const endTime = new Date(2017,4,19,15,23,44);
var timeSeconds = 0;
var lastHours;
var lastMinutes;
var lastSeconds;
var lastNumArray = [0,0,0,0,0,0];

var ball = [];
const color = ["#33B5E5","#0099CC","#AA66CC","#CCFF00","#FF3300","#00FF33","#CC99FF","#6600FF"];

window.onload = function(){
	var canvar = document.getElementById("canvas");
	canvar.width = WINDOW_WIDTH;
	canvar.height = WINDOW_HEIGHT;
	var context = canvar.getContext('2d');

	
	setInterval(function(){
		timeSeconds = getTimeSeconds();
		var hmsTime = getTimehms();
		var hours = hmsTime.hours;
		var minutes = hmsTime.minutes;
		var seconds = hmsTime.seconds;
		render(hours,minutes,seconds,context);
		if (seconds != lastSeconds) {
			lastHours = hours;
			lastMinutes = minutes;
			lastSeconds = seconds;
		}
		update(context);
	}
		,30);
}

function update(ctx){
	// ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hmsTime = getTimehms();
	var hours = hmsTime.hours;
	var minutes = hmsTime.minutes;
	var seconds = hmsTime.seconds;

	if(lastNumArray[0] != parseInt(hours/10)){
		lastNumArray[0] = parseInt(hours/10);
		addBallList(BEGIN_X,BEGIN_Y,lastNumArray[0]);
	}
	if(lastNumArray[1] != hours%10){
		lastNumArray[1] = hours%10;
		addBallList(BEGIN_X+NUM_WID,BEGIN_Y,lastNumArray[1]);
	}

	if(lastNumArray[2] != parseInt(minutes/10)){
		lastNumArray[2] = parseInt(minutes/10);
		addBallList(BEGIN_X+2*NUM_WID+ICON_WID,BEGIN_Y,lastNumArray[2]);
	}
	if(lastNumArray[3] != minutes%10){
		lastNumArray[3] = minutes%10;
		addBallList(BEGIN_X+3*NUM_WID+ICON_WID,BEGIN_Y,lastNumArray[3]);
	}

	if(lastNumArray[4] != parseInt(seconds/10)){
		lastNumArray[4] = parseInt(seconds/10);
		addBallList(BEGIN_X+4*NUM_WID+2*ICON_WID,BEGIN_Y,lastNumArray[4]);
	}
	if(lastNumArray[5] != seconds%10){
		addBallList(BEGIN_X+5*NUM_WID+2*ICON_WID,BEGIN_Y,lastNumArray[5]);
		lastNumArray[5] = seconds%10;
	}

	for(i=0;i<ball.length;i++){
		ctx.beginPath();
		ctx.arc(ball[i].x,ball[i].y,BALL_R,0,2*Math.PI);
		ctx.fillStyle = ball[i].color;
		ctx.closePath();
		ctx.fill();

		// if((WINDOW_HEIGHT-ball[i].y)<BALL_R){
		// 	ball[i].y = WINDOW_HEIGHT-BALL_R;
		// 	ball[i].vy = -ball[i].vy*0.7;
		// }

		//物理效果函数
		if(ball[i].y+ball[i].vy>WINDOW_HEIGHT-BALL_R){
			ball[i].y = WINDOW_HEIGHT-BALL_R;
			ball[i].vy =  -ball[i].vy*0.7;
		}else{
			ball[i].y+=ball[i].vy;
		}
		if(ball[i].x+ball[i].vx>WINDOW_WIDTH-BALL_R||ball[i].x+ball[i].vx<BALL_R){
			ball[i].vx =  -ball[i].vx*0.7;
		}else{
			ball[i].x+=ball[i].vx;
		}
		// ball[i].x+=ball[i].vx;
		ball[i].vy+=ball[i].g;

		}
	clearBall();
}

function clearBall(){
	var newBall = new Array;
	for(i=0;i<ball.length;i++){
		if(ball[i].y<WINDOW_HEIGHT-4*BALL_R||Math.abs(ball[i].vy)>2){
			newBall.push(ball[i]);
		}
	}
	ball = newBall;
}
function addBallList(x,y,val){
	var now_x = 0;
	var now_y = 0;
	for(i=0,now_x=0;i<7;i++){
		for(j=0,now_y=0;j<10;j++){
			now_y+=BLAN_BALL;
			if(digit[val][j][i]==1){
				var aBall = {
					x:x+now_x,
					y:y+now_y,
					vx:6*Math.random()-3,
					vy:10*Math.random()-7,
					g:1.5+Math.random(),
					color:color[parseInt(color.length*Math.random())]
				};
				ball.push(aBall);
			}
		}
		now_x+=BLAN_BALL;
	}
}

function getTimeSeconds(){
	var nowTime = new Date();
	var lastDay = new Date(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate());
	// var ret = endTime.getTime()-nowTime.getTime();
	var ret = nowTime.getTime()-lastDay.getTime();
	ret = Math.round(ret/1000);
	return ret >= 0? ret:0;
}

function render(h,m,s,ctx){
	ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	// var hmsTime = getTimehms();
	var hours = h;
	var minutes = m;
	var seconds = s;
	renderDigit(BEGIN_X,BEGIN_Y,parseInt(hours/10),ctx);
	renderDigit(BEGIN_X+NUM_WID,BEGIN_Y,hours%10,ctx);
	renderColon(BEGIN_X+2*NUM_WID,BEGIN_Y,ctx);
	renderDigit(BEGIN_X+2*NUM_WID+ICON_WID,BEGIN_Y,parseInt(minutes/10),ctx);
	renderDigit(BEGIN_X+3*NUM_WID+ICON_WID,BEGIN_Y,minutes%10,ctx);
	renderColon(BEGIN_X+4*NUM_WID+ICON_WID,BEGIN_Y,ctx);
	renderDigit(BEGIN_X+4*NUM_WID+2*ICON_WID,BEGIN_Y,parseInt(seconds/10),ctx);
	renderDigit(BEGIN_X+5*NUM_WID+2*ICON_WID,BEGIN_Y,seconds%10,ctx);
}

function getTimehms(){
	var theTime={
		hours:parseInt(timeSeconds/3600),
		minutes:parseInt((timeSeconds-parseInt(timeSeconds/3600)*3600)/60),
		seconds:timeSeconds%60
	};
	return theTime;
}


function renderDigit(x,y,val,ctx){
	var now_x = 0;
	var now_y = 0;
	for(i=0,now_x=0;i<7;i++){
		for(j=0,now_y=0;j<10;j++){
			now_y+=BLAN_BALL;
			if(digit[val][j][i]==1){
				ctx.beginPath();
				ctx.arc(x+now_x,y+now_y,BALL_R,0,2*Math.PI);
				ctx.fillStyle="#005588";
				ctx.fill();
				ctx.stroke();
			}
		}
		now_x+=BLAN_BALL;
	}
}

function renderColon(x,y,ctx){
	var now_x = 0;
	var now_y = 0;
	for(i=0,now_x=0;i<4;i++){
		for(j=0,now_y=0;j<10;j++){
			now_y+=BLAN_BALL;
			if(digit[10][j][i]==1){
				ctx.beginPath();
				ctx.arc(x+now_x,y+now_y,BALL_R-1,0,2*Math.PI);
				ctx.fillStyle="#005588";
				ctx.fill();
				ctx.stroke();
			}
		}
		now_x+=BLAN_BALL;
	}
}