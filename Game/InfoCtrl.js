/**
 * Created by danye on 9/24/15.
 */
var curTime = 0;

function updateTime(){
    curTime ++;
    $("#timePanel").html(String(curTime));
}

function foolYou(){
    alert("Hahahaha");
}

setInterval(updateTime, 1000);