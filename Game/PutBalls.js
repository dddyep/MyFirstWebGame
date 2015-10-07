/**
 * Created by danye on 9/23/15.
 */
var nBalls = 500;
var backNode = document.getElementById("guessBoard");
var imgH = backNode.offsetHeight;
var imgW = backNode.offsetWidth;
var ballNodes = new Array;

function Ball(id, r){
    this.ballId = String(id);
    if (r == "")
        this.r = Math.floor(Math.random() * 80);
    else
        this.r = parseFloat(r);
    this.divNode = document.createElement("div");
    backNode.appendChild(this.divNode);
    this.divNode.id = "ballDiv"+this.ballId;
    this.divNode.style.position = "absolute";
    this.divNode.style.width = String(this.r*2)+"px";
    this.divNode.style.height = String(this.r*2)+"px";
    this.divNode.style.left = String(Math.floor(Math.random()*(imgW-this.r*2)))+"px";
    this.divNode.style.top = String(Math.floor(Math.random()*(imgH-this.r*2)))+"px";
    //console.log(this.divNode.style.left);
    //this.divNode.style.backgroundColor = "yellow";
    this.svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.divNode.appendChild(this.svgNode);
    this.svgNode.setAttribute("height", "100%");
    this.svgNode.setAttribute("width", "100%");
    this.ballNode = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.svgNode.appendChild(this.ballNode);
    this.ballNode.setAttribute("cx", String(this.r));
    this.ballNode.setAttribute("cy", String(this.r));
    this.ballNode.setAttribute("r", String(this.r));
    this.ballNode.setAttribute("opacity", "1.0");
    this.ballNode.setAttribute("fill", "red");
}

function putNewBalls(){
    var i;
    for (i = 0; i < nBalls; i ++)
        ballNodes.push(new Ball(String(i), ""));
}

function moveOneBall(curBall){
    var curX = curBall.divNode.offsetLeft;
    var curY = curBall.divNode.offsetTop;
    var r = parseInt(curBall.ballNode.getAttribute("r"));
    var nextX = Math.floor(Math.random()*(imgW-curBall.r*2));
    var nextY = Math.floor(Math.random()*(imgH-curBall.r*2));
    $("#ballDiv"+curBall.ballId).animate(
        {left: String(nextX)+"px",
        top: String(nextY)+"px"
        },
        "slow"
    );
}

function moveBalls(){
    var i;
    for (i = 0; i < nBalls; i ++){
        moveOneBall(ballNodes[i]);
    }
}

function scatterOneBall(curBallNode){
    curBallNode.r = curBallNode.r / 2;
    curBallNode.ballNode.setAttribute("r", String(curBallNode.r));
    curBallNode.ballNode.setAttribute("cx", String(curBallNode.r));
    curBallNode.ballNode.setAttribute("cy", String(curBallNode.r));
    curBallNode.divNode.style.height = String(curBallNode.r*2)+"px";
    curBallNode.divNode.style.width = String(curBallNode.r*2)+"px";
    var newBall = new Ball(String(nBalls), String(curBallNode.r));
    ballNodes.push(newBall);
    nBalls ++;
}

function scatterBalls(){
    var i;
    var preNBall = nBalls;
    for (i = 0; i < preNBall; i ++)
        scatterOneBall(ballNodes[i]);
}

function halveBalls(){
    var i;
    var nDel = Math.floor(nBalls / 3);
    var delPos;
    var divId;
    for (i = 0; i < nDel; i ++){
        delPos = Math.floor(Math.random() * nBalls);
        divId = "#ballDiv" + ballNodes[delPos].ballId;
        ballNodes.splice(delPos, 1);
        $(divId).remove();
        nBalls --;
    }
}

function clearBalls(){
    var i;
    var opacity;
    for (i = 0; i < nBalls; i ++){
        opacity = ballNodes[i].ballNode.getAttribute("opacity");
        ballNodes[i].ballNode.setAttribute("opacity", String(opacity / 1.5));
    }
}

putNewBalls();
setInterval(moveBalls, 1000);
$("#btnScatter").click(scatterBalls);
$("#btnClear").click(clearBalls);
$("#btnHalve").click(halveBalls);