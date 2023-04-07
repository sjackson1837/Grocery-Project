function addProduct() {
  const barcode = document.getElementById("barcode").value;
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  let barcodeIndex;

  fetch(url)
    .then(response => response.json())
    .then(data => {
       // Check if product data is available
       if (!data.product) {
        alert("Product not found");
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
          console.log("Am i sending this to Google?");
          sendToGoogle(barcode, ProductName, ProductQty);
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}

function findBarcodeinSheet(barcode){
  //console.log("here is the barcode"  + barcode);
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
        //console.log("length " + length);

        barcodeIndex = data.table.rows.findIndex(row => row.c[0].v === barcode);
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

async function sendToGoogle(barcode, ProductName, ProductQty) {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec';
  const form = document.forms['submit-to-google-sheet'];
  console.log("SENT TO GOOGLE!!!!!" + barcode);

  try {
    // Check if barcode exists in sheet
    const { newQty, barcodeIndex } = await findBarcodeinSheet(barcode);
    console.log("google sent.... " + newQty + ".....index..." + barcodeIndex)

    // If barcode exists, update corresponding row
    if (barcodeIndex !== -1) {
      console.log("xxI'm HereXxx " + newQty);
      const updateForm = new FormData();
      updateForm.append('barcode', barcode);
      updateForm.append('ProductName', ProductName);
      updateForm.append('ProductQty', newQty);

      // Add a new parameter to indicate that we want to update an existing row
      updateForm.append('action', 'update');
      updateForm.append('rowIndex', barcodeIndex);

      return fetch(scriptURL, { method: 'POST', body: updateForm })
        .then(response => {
          console.log('Success!', response);

          return response.json()
            .then(data => {
              return parseInt(data.newQty);
            })
        })
        .catch(error => console.error('Error!', error.message))
    }
    // If barcode does not exist, add new row
    else {
      console.log("barcode does not exist!!!!!!")
      const addForm = new FormData(form);
      addForm.append('ProductQty', 1);

      return fetch(scriptURL, { method: 'POST', body: addForm })
        .then(response => {
          console.log('Success!', response);

          return response.json()
            .then(data => {
              return parseInt(data.newQty);
            })
        })
        .catch(error => console.error('Error!', error.message))
    }
  } catch (error) {
    console.error('Error!', error.message);
  }
}
