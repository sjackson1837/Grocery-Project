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

// Get the data from the form
$barcode = $_POST['ProductBarcode'];
$productname = $_POST['ProductName'];
$productcategory = $_POST['ProductCategory'];
$min = $_POST['MinQty'];
$productqty = $_POST['ProductQty'];

// Insert the data into the database
$sql = "INSERT INTO jacksongrocery (ProductBarcode, ProductName, ProductCategory, MinQty, ProductQty) VALUES ('$barcode', '$productname', '$productcategory', '$min', '$productqty')";
if (mysqli_query($conn, $sql)) {
    echo "Product added successfully.";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);
?>
