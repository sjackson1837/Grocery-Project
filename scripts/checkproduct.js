function checkProduct() {

    const barcode = document.getElementById("barcode").value;
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
    document.getElementById("ProductName").value = "";
    document.getElementById("product-image").src = "";
  

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const ProductName = data.product.product_name;
        const imageUrl = data.product.image_url;

        document.getElementById("ProductBarcode").value = barcode;
        document.getElementById("ProductName").value = ProductName;
        document.getElementById("product-image").src = imageUrl;
        document.getElementById("barcode").value = "";

        console.log('ProductName:', ProductName);
        console.log('ProductName truthy and not empty:', ProductName && ProductName.trim() !== '');

        //Check if product is found
        if (ProductName && ProductName.trim() !== ''){
          var audio = new Audio('Sounds/positive.mp3');
		      audio.play();
          console.log("Here");
        } else {
          console.log("Not Here");
          document.getElementById("ProductName").value = "not found";
          var audio = new Audio('Sounds/negative.mp3');
		      audio.play();
        }
      })
      .catch(error => console.error(error));
  }