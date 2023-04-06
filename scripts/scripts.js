function lookupProduct() {
  const barcode = document.getElementById("barcode").value;
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const ProductName = data.product.product_name;
      const ProductQty = 22;
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
      alert("No product found.");
      document.getElementById("ProductName").readOnly = false;
      document.getElementById("ProductName").value = "";
      document.getElementById("ProductQty").value = "";
      document.getElementById("product-image").src = "";
      document.getElementById("barcode").value = "";
    });
}

function sendToGoogle() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec'
  const form = document.forms['submit-to-google-sheet'];
  var audio = new Audio('Sounds/positive.mp3');
  audio.play();

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message));
}