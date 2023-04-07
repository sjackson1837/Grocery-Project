function lookupProduct() {
  const barcode = document.getElementById("barcode").value;
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  console.log("hey srj!")

  // Check if barcode exists in Google Sheet and increase quantity by 1 if it does
  let SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E'
let SHEET_TITLE = 'data';
let SHEET_RANGE = 'A:C'

let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

fetch(FULL_URL)
.then(res=>res.text())
.then(rep=> {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
  console.log("data here: " + data);

    let barcode = document.getElementById('barcode');
    //let product = document.getElementById('product');
    let length = data.table.rows.length;
     console.log("length " + length);
     console.log("data again" + data.table.rows[0].c[0].v + data.table.rows[0].c[1].v + data.table.rows[0].c[2].v);


      //const barcodeIndex = data.values.findIndex(row => row[0] === barcode);
      const barcodeIndex = data.table.rows.findIndex(row => row.c[0].v === barcode);
      console.log("barcodeindex" + barcodeIndex);
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
        console.log("I'm Here222")
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
            console.log("I'm Here333")
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
    console.log("I'm Here444")
}
