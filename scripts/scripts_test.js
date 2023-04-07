function lookupProduct() {

    let SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E'
    let SHEET_TITLE = 'data';
    let SHEET_RANGE = 'A:C'

    let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

    fetch(FULL_URL)
    .then(res=>res.text())
    .then(rep=> {
      let data = JSON.parse(rep.substr(47).slice(0, -2));
      console.log(data);

   // let barcode = document.getElementById('barcode');
    const barcode = document.getElementById("barcode").value;
    console.log("barcode " + barcode);
    //let product = document.getElementById('product');
    let length = data.table.rows.length;
    console.log("length " + length);

    console.log("data " + data.table.rows[3].c[0].v);

    barcode.innerHTML = data.table.rows[3].c[0].v;
    //product.innerHTML = data.table.rows[0].c[1].v;

    for(let i = 0; i < length; i++) {
      
      let NewBoxBarcode = document.createElement('div');
        NewBoxBarcode.id = ("box"+i);
        NewBoxBarcode.className = "Some_Style";
        barcode.append(NewBoxBarcode);
        NewBoxBarcode.innerHTML = data.table.rows[i].c[0].v;

      //  let NewBoxProduct = document.createElement('div');
      //  NewBoxProduct.id = ("box"+i);
      //  NewBoxProduct.className = "Some_Style";
      //  barcode.append(NewBoxProduct);
      //  NewBoxProduct.innerHTML = data.table.rows[i].c[1].v;

        
    
 };

});
};


// function lookupProduct() {
//   const barcode = document.getElementById("barcode").value;
//   const sheetUrl = 'https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/gviz/tq?tqx=out:json';
//   const sheetQuery = encodeURIComponent(`SELECT C WHERE A='${barcode}'`);
//   const sheetFullUrl = `${sheetUrl}&tq=${sheetQuery}`;
//   console.log("qty" + sheetQuery);
//   console.log("sheet " + sheetFullUrl);
  
//   const range = 'data!A:A';
//   console.log("range" + range);

//     // const rows = response.data.values;
    
//     // // Loop through the rows to find the matching number
//     // for (let i = 0; i < rows.length; i++) {
//     //   if (rows[i][0] === number.toString()) {
//     //     // Return the value from column C
//     //     return rows[i][2];
//     //   }
//     // }


// }




//  function lookupProduct() {

// // Load the required client library
// const {google} = require('googleapis');

// // Initialize the client with credentials
// const auth = new google.auth.GoogleAuth({
//   // Your authentication credentials
// });

// // Create a function to get the value from column C
// async function getValueFromColumnC(number) {
//   // Load the sheets API
//   const sheets = google.sheets({version: 'v4', auth});
  
//   // Define the range to search in (in this case, Column A)
//   const range = 'Jackson_Grocery!A:A';
  
//   try {
//     // Call the sheets API to get the values
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: 'YOUR_SPREADSHEET_ID',
//       range,
//     });
    
//     // Extract the values from the response
//     const rows = response.data.values;
    
//     // Loop through the rows to find the matching number
//     for (let i = 0; i < rows.length; i++) {
//       if (rows[i][0] === number.toString()) {
//         // Return the value from column C
//         return rows[i][2];
//       }
//     }
    
//     // If no match is found, return null
//     return null;
//   } catch (error) {
//     // Handle any errors
//     console.error(error);
//     return null;
//   }
// }

// // Call the function with a sample number (change this to the actual number you want to search for)
// getValueFromColumnC(123).then((value) => {
//   console.log(value);
// });




// function lookupProduct() {
//   const barcode = document.getElementById("barcode").value;
//   const sheetUrl = 'https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/gviz/tq?tqx=out:json';
//   const sheetQuery = encodeURIComponent(`SELECT C WHERE A='${barcode}'`);
//   const sheetFullUrl = `${sheetUrl}&tq=${sheetQuery}`;
//   console.log("sheet " + sheetFullUrl)

//   fetch(sheetFullUrl)
//     .then(response => response.text())
//     .then(text => {
//       console.log("Am I here?")
//       const json = JSON.parse(text.substr(47).slice(0, -2));
//       console.log(json)
//       console.log("ami here 82?")
//       if (json.table.rows.length > 0) {
//         // Barcode already exists in sheet, so update quantity
//         const ProductQty = parseInt(json.table.rows[0].c[0].v) + 1;
//         console.log("Am I here 333?")
//         console.log("here" + barcode + "  " + ProductQty)
//         updateGoogleSheet(barcode, ProductQty);
//       } else {
//         // Barcode not found in sheet, so look up on website
//         const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
//         fetch(url)
//           .then(response => response.json())
//           .then(data => {
//             const ProductName = data.product.product_name;
//             const ProductQty = 1;
//             const imageUrl = data.product.image_url;

//             document.getElementById("ProductBarcode").value = barcode;
//             document.getElementById("ProductName").value = ProductName;
//             document.getElementById("ProductQty").value = ProductQty;
//             document.getElementById("product-image").src = imageUrl;
//             document.getElementById("barcode").value = "";
//             sendToGoogle(barcode, ProductName, ProductQty);
//           })
//           .catch(error => {
//             console.error(error);
//             alert("No product found");
//             document.getElementById("ProductBarcode").value = barcode;
//             document.getElementById("ProductName").value = "";
//             document.getElementById("ProductQty").value = "";
//             document.getElementById("product-image").src = "";
//             document.getElementById("barcode").value = "";
//             document.getElementById("product-description").style.display = "block";
//           });
//       }
//     })
//     console.log("I'm in the error section")
//     .catch(error => console.error(error));
// }

// function updateGoogleSheet(barcode, ProductQty) {
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec';
//   const form = document.forms['submit-to-google-sheet'];
//   form.elements["Barcode"].value = barcode;
//   form.elements["Qty"].value = ProductQty;

//   var audio = new Audio('Sounds/positive.mp3');
//   audio.play();

//   fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//     .then(response => console.log('Success!', response))
//     .catch(error => console.error('Error!', error.message));
// }

// function sendToGoogle(barcode, ProductName, ProductQty) {
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec';
//   const form = document.forms['submit-to-google-sheet'];
//   form.elements["Barcode"].value = barcode;
//   form.elements["Name"].value = ProductName;
// }