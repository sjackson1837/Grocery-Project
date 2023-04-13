function addProduct() {
  const barcode = document.getElementById("barcode").value;
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  let barcodeIndex;
  console.log("first bc index  " + barcodeIndex);

  fetch(url)
    .then(response => response.json())
    .then(data => {
       // Check if product data is available
       if (!data.product) {
        var audio = new Audio('Sounds/negative.mp3');
        audio.onended = function() {
          alert("Product not Found");
        };
        audio.play();
        return;
      }

      const ProductName = data.product.product_name;
      const imageUrl = data.product.image_url;

      findBarcodeinSheet(barcode)
        .then(({newQty, barcodeIndex}) => {
          //console.log("xxBarcde in sheet  " + barcode)
          console.log("xxxnew Qty  " + newQty)
          console.log("xxxbarcode index  " + barcodeIndex)
          var ProductQty = newQty;
          document.getElementById("ProductBarcode").value = barcode;
          document.getElementById("ProductName").value = ProductName;
          document.getElementById("ProductQty").value = ProductQty;
          document.getElementById("product-image").src = imageUrl;
          document.getElementById("barcode").value = "";
          sendToGoogle(barcode, ProductName, ProductQty);
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}

function findBarcodeinSheet(barcode){
  console.log("here is the barcode"  + barcode);
  let SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E'
  let SHEET_TITLE = 'data';
  let SHEET_RANGE = 'A:C'

  let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

  return fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
      let data = JSON.parse(rep.substr(47).slice(0, -2));

      console.log("Barcode third: " + barcode)
      if (data.table && data.table.rows) { // check if data.table and data.table.rows are defined
        let length = data.table.rows.length;
        console.log("length " + length);

        //barcodeIndex = data.table.rows.findIndex(row => row.c[0].v === barcode);
        barcodeIndex = data.table.rows.findIndex(row => row.c && row.c[0] && row.c[0].v === barcode);
        console.log("barcodeIndex  " + barcodeIndex);
        if (barcodeIndex !== -1) { // check if barcode is found in the array
          console.log("data again " + data.table.rows[barcodeIndex].c[2].v);

          const newQty = parseInt(data.table.rows[barcodeIndex].c[2].v) + 1;
          console.log("new qty...  " + newQty);

          return {newQty, barcodeIndex};
        }
      }
      return {newQty: 1, barcodeIndex: -1}; // return 1 if barcode is not found or data.table is not defined
    })
    .catch(error => console.error(error));
}

async function sendToGoogle() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec';
  const form = document.forms['submit-to-google-sheet'];

  var audio = new Audio('Sounds/positive.mp3');
  audio.play();

  const barcode = document.getElementById("ProductBarcode").value;
  const qty = parseInt(document.getElementById("ProductQty").value);
  console.log("barc and qty   " + barcode + " " + qty)

  try {
    const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
    console.log('Success!', response);

    const json = await response.json();
    let sheetData = JSON.parse(json.substring(47).slice(0, -2));
    console.log("here I ammmmm");

    // find the index of the row with the barcode
    console.log("bc index...   " + sheetData)
    const barcodeIndex = sheetData.findIndex(row => row[0] === barcode);
    console.log("bc index333...   " + barcodeIndex)

    if (barcodeIndex !== -1) {
      // if the row exists, update the quantity
      sheetData[barcodeIndex][2] = qty;
    } else {
      // if the row does not exist, add a new row
      sheetData.push([barcode, document.getElementById("ProductName").value, qty]);
    }

    // update the sheet with the new data
    await updateGoogleSheet(sheetData);
    return qty;
  } catch (error) {
    console.error('Error!', error.message);
  }
}

async function updateGoogleSheet(data) {
  const SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E';
  const SHEET_NAME = 'data';
  const RANGE = 'A1:C' + data.length;
  const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${RANGE}?valueInputOption=USER_ENTERED`;

  const requestBody = {
    values: data
  };

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch(URL, options);
    console.log('Sheet updated!', response);
  } catch (error) {
    console.error('Error updating sheet!', error.message);
  }
}


