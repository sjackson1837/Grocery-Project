<?php
// Connect to the database
$host = "srjdb.c9g2xoa52vhw.us-east-1.rds.amazonaws.com";
$username = "admin";
$password = "ert33MNB";
$dbname = "jacksongrocerydb";
$conn = mysqli_connect($host, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Retrieve the product data from the database
$sql = "SELECT * FROM jacksongrocery";
$result = mysqli_query($conn, $sql);

// Display the product data in an HTML table
echo "<table border='1'>
<tr>
<th>Product Barcode</th>
<th>Product Name</th>
<th>Product Category</th>
<th>Minimum Quantity</th>
<th>Product Quantity</th>
</tr>";

while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['productbarcode'] . "</td>";
    echo "<td>" . $row['productname'] . "</td>";
    echo "<td>" . $row['productcategory'] . "</td>";
    echo "<td>" . $row['min'] . "</td>";
    echo "<td>" . $row['productqty'] . "</td>";
    echo "</tr>";
}

echo "</table>";

// Close the database connection
mysqli_close($conn);
?>
