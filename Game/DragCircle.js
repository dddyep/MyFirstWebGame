/**
 * Created by danye on 9/22/15.
 */
var x
var y;
var circleDivX;
var circleDivY;
var circleDivNode;
var backNode;
var dragging = false;

var mvPic = function movePic(ev) {
    ev = ev || window.event;
    switch (ev.type) {
        case "mousemove":
            var curX = ev.clientX;
            var curY = ev.clientY;
            if (dragging == true) {
                var postX = curX - x + circleDivX;
                var postY = curY - y + circleDivY;
                if ((postX < 0) || (postY < 0))
                    break;
                console.log(String(backNode.offsetWidth)+" "+String(backNode.offsetHeight))
                if ((postX > backNode.offsetWidth-circleDivNode.offsetWidth) ||
                    (postY > backNode.offsetHeight-circleDivNode.offsetHeight))
                    break;
                circleDivNode.style.left = String(postX) + "px";
                circleDivNode.style.top = String(postY) + "px";
            }
            break;
        case "mousedown":
            if (ev.srcElement.id != "circle")
                break;
            circleDivX = circleDivNode.offsetLeft;
            circleDivY = circleDivNode.offsetTop;
            x = ev.clientX;
            y = ev.clientY;
            dragging = true;
            console.log(ev.srcElement.id);
            break;
        case "mouseup":
            dragging = false;
    }
}


circleDivNode = document.getElementById("circleDiv");
backNode = document.getElementById("backImg");
document.addEventListener("mousedown", mvPic, false);
document.addEventListener("mousemove", mvPic, false);
document.addEventListener("mouseup", mvPic, false);

