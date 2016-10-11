<?php

	$servername = $_ENV["MYSQL_PORT_3306_TCP_ADDR"];
	$username = "root";
	$password = "launchcode";

	$conn = new mysqli($servername, $username, $password);
	$conn->select_db("injection");

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	$query = "SELECT name FROM users WHERE id=" . $_GET["id"];

	$results = $conn->query($query);

	echo mysqli_fetch_all($results, MYSQLI_ASSOC);

	mysqli_free_result($result);

	// Clean up and close connection
	$conn->close();
?>
