<?php
	$level = $_REQUEST["level"];
	$theme = $_REQUEST["theme"];
	$con = new mysqli("127.0.0.1","root","","PictureInfo", 3307);
	if ($con->connect_errno) {
	    echo "Failed to connect to MySQL: (" . $con->connect_errno . ") " . $con->connect_error;
	}
	if ((strcmp($level,"random")==0) && (strcmp($theme,"random")==0)){
		$result = $con->query("SELECT COUNT(p_id) FROM pictures");
		$row = $result->fetch_row();
		$count = $row[0];
		$pick = rand(1, $count);
		$result = $con->query("SELECT pic_url FROM pictures WHERE p_id=".$pick);
		$row = $result->fetch_assoc();
	}
	elseif (strcmp($level,"random")==0){
		$result = $con->query("SELECT COUNT(p_id) FROM pictures WHERE pic_theme='".$theme."'");
		$row = $result->fetch_row();
		$count = $row[0];
		$pick = rand(1, $count);
		$result = $con->query("SELECT p_url FROM pictures WHERE pic_theme='".$theme."'");
		for ($i=0; $i<$pick; $i++)
			$row = $result->fetch_row();
	}
	else{
		$result = $con->query("SELECT COUNT(p_id) FROM picture_level WHERE pic_level=".$level);
		$row = $result->fetch_row();
		$count = $row[0];
		$pick = rand(1, $count);
		$result = $con->query("SELECT p_id FROM picture_level WHERE pic_level=".$level);
		for ($i=0; $i<$pick; $i++)
			$row = $result->fetch_row();
		$pickId = $row[0];
		$result = $con->query("SELECT pic_url FROM pictures WHERE p_id=".$pickId);
		$row = $result->fetch_assoc();
	}
	$con->close();
	
	echo $row["pic_url"];
?>