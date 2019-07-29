const block_length = 10;
var canvas = document.getElementById("app01");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(30,50,block_length,block_length);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();
let count = 0;
//setInterval(function(){
//    document.title = `tick ${count++}`
//},1000);


// 다음 블럭
// 점수
// 키입력
//