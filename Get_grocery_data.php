<!DOCTYPE html>
<html>
<head>
	<title>Grocery Inventory</title>
</head>
<body>
	<h1>Grocery Inventory</h1>
	<table>
		<tr>
			<th>Product ID</th>
			<th>Product Barcode</th>
			<th>Product Name</th>
			<th>Product Category</th>
			<th>Product Min</th>
			<th>Quantity</th>
		</tr>
		<?php
			// Connect to the database
			$servername = "localhost";
			$username = "groceryuser";
			$password = "groceryapp";
			$dbname = "grocery_inv";

			$conn = new mysqli($servername, $username, $password, $dbname);

			if ($conn->connect_error) {
				die("Connection failed: " . $conn->connect_error);
			}

			// Retrieve data from the Products table
			$sql = "SELECT * FROM Products";
			$result = $conn->query($sql);

			if ($result->num_rows > 0) {
				// Output data of each row
				while($row = $result->fetch_assoc()) {
					echo "<tr><td>" . $row["id"] . "</td><td>" . $row["ProductBarcode"] . "</td><td>" . $row["ProductName"] . "</td><td>" . $row["ProductMin"] . "</td></tr>". $row["ProductQty"] . "</td></tr>";
				}
			} else {
				echo "0 results";
			}

			$conn->close();
		?>
	</table>
</body>
</html>
