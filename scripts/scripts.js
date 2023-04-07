function lookupProduct() {
  const barcode = document.getElementById("barcode").value;
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  // Check if barcode exists in Google Sheet and increase quantity by 1 if it does
  const sheetId = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z0';
  const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:C?key=YOUR_API_KEY`;
  fetch(sheetUrl)
    .then(response => response.json())
    .then(data => {
      const barcodeIndex = data.values.findIndex(row => row[0] === barcode);
      if (barcodeIndex !== -1) {
        const newQty = parseInt(data.values[barcodeIndex][2]) + 1;
        const range = `Sheet1!C${barcodeIndex+1}`;
        const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?valueInputOption=USER_ENTERED&key=YOUR_API_KEY`;
        fetch(updateUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            range,
            majorDimension: 'ROWS',
            values: [[newQty]]
          })
        })
          .then(() => console.log(`Updated quantity for barcode ${barcode}`))
          .catch(error => console.error(error));
      } else {
        // Barcode does not exist in sheet, fetch product data and save to sheet
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const ProductName = data.product.product_name;
            const ProductQty = 1;
            const imageUrl = data.product.image_url;

            document.getElementById("ProductBarcode").value = barcode;
            document.getElementById("ProductName").value = ProductName;
            document.getElementById("ProductQty").value = ProductQty;
            document.getElementById("product-image").src = imageUrl;
            document.getElementById("barcode").value = "";
            sendToGoogle();
          })
          .catch(error => {
            console.error(error);
            alert("No product found");
            document.getElementById("ProductBarcode").value = barcode;
            document.getElementById("ProductName").value = "";
            document.getElementById("ProductQty").value = "";
            document.getElementById("product-image").src = "";
            document.getElementById("barcode").value = "";
            document.getElementById("product-description").style.display = "block";
          });
      }
    })
    .catch(error => console.error(error));
}
