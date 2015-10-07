/**
 * Created by danye on 9/22/15.
 */
var xmlhttp;
var level;
var theme;

function ChoosePic(){
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    level = document.forms["picForm"]["level"].value;
    theme = document.forms["picForm"]["theme"].value;
    var url = "ChoosePicture.php?level="+level+"&theme="+theme;
    url=url+"&sid="+Math.random()
    xmlhttp.onreadystatechange = stateChanged;
    xmlhttp.open("GET", url , true);
    xmlhttp.send();
}

function stateChanged(){
    if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)){
    	var imgurl = "url('"+xmlhttp.responseText+"')";
    	alert(imgurl);
        document.getElementById("guessBoard").style.backgroundImage = imgurl;
    }
}

$(document).ready(function(){
    $("#picForm").submit(function (event){
        event.preventDefault();
        ChoosePic();
    });
});