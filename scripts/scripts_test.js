function lookupProduct() {
  const barcode = document.getElementById("barcode").value;
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/gviz/tq?tqx=out:json';
  const sheetQuery = encodeURIComponent(`SELECT C WHERE A='${barcode}'`);
  const sheetFullUrl = `${sheetUrl}&tq=${sheetQuery}`;

  fetch(sheetFullUrl)
    .then(response => response.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2));
      if (json.table.rows.length > 0) {
        // Barcode already exists in sheet, so update quantity
        const ProductQty = parseInt(json.table.rows[0].c[0].v) + 1;
        updateGoogleSheet(barcode, ProductQty);
      } else {
        // Barcode not found in sheet, so look up on website
        const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
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
            sendToGoogle(barcode, ProductName, ProductQty);
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

function updateGoogleSheet(barcode, ProductQty) {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec';
  const form = document.forms['submit-to-google-sheet'];
  form.elements["Barcode"].value = barcode;
  form.elements["Qty"].value = ProductQty;

  var audio = new Audio('Sounds/positive.mp3');
  audio.play();

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message));
}

function sendToGoogle(barcode, ProductName, ProductQty) {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec';
  const form = document.forms['submit-to-google-sheet'];
  form.elements["Barcode"].value = barcode;
  form.elements["Name"].value = ProductName;
}