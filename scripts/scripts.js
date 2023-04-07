function addProduct() {
  const barcode = document.getElementById("barcode").value;
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const ProductName = data.product.product_name;
      //const ProductDescription = data.product.generic_name;
      //const ProductQty = "new";
      var ProductQty = 1;
      const imageUrl = data.product.image_url;

      document.getElementById("ProductBarcode").value = barcode;
      document.getElementById("ProductName").value = ProductName;
      //document.getElementById("ProductDescription").value = ProductDescription;
      document.getElementById("ProductQty").value = ProductQty;
      document.getElementById("product-image").src = imageUrl;
      document.getElementById("barcode").value = "";
//        var audio = new Audio('Sounds/positive.mp3');
//		    audio.play();
      sendtogoogle();
    })
    .catch(error => console.error(error));
//      var audio = new Audio('Sounds/negative.mp3');
//      audio.play();
  
}

function sendtogoogle() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec'
  const form = document.forms['submit-to-google-sheet']
        var audio = new Audio('Sounds/positive.mp3');
            audio.play();

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  }