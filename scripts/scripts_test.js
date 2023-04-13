function updateCellValueInSheet() {
  const {google} = require('googleapis');

  // Replace the placeholders with your actual values
  const CLIENT_EMAIL = '<your test email>';
  const PRIVATE_KEY = '<your private key>';
  const SHEET_ID = '<your Google Sheet ID>';
  const WEB_APP_URL = '<your web app URL>';

  // Authorize with the Google Sheets API
  const auth = new google.auth.JWT(
    CLIENT_EMAIL,
    null,
    PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  // Call the Google Apps Script function using the Google Sheets API
  google.script.run('myFunction')
    .withSuccessHandler((result) => {
      console.log(result);
    })
    .withFailureHandler((error) => {
      console.error(error);
    })
    .withUserObject({spreadsheetId: SHEET_ID, webAppUrl: WEB_APP_URL})
    .executeAsync(auth);
  };



// const { google } = require("googleapis");

// function updateCellValueInSheet() {

//   const url = "https://script.google.com/macros/s/AKfycbw6cLCucWaLt1C-jWEkd1uHq-Y3u3s3D7zB7QaZxh7sXXk_d7hyQU8wNsRKPJdWTC9P/exec";

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       functionName: "updateCellValueInSheet",
//       parameters: [5, 4, "This is a test"]
//     })
//   };
  
//   fetch(url, options)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
  

// }


// function updateCellValueInSheet() {
//   const row = 1;
//   const column = 2;
//   const newValue = "this is a test to see if it works";
//   const url = "https://script.google.com/macros/s/AKfycbw6cLCucWaLt1C-jWEkd1uHq-Y3u3s3D7zB7QaZxh7sXXk_d7hyQU8wNsRKPJdWTC9P/exec";

//   const options = {
//     method: "POST",
//     mode: 'no-cors',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ row, column, newValue })
//   };

//   fetch(url, options)
//    .then(response => response.json())
//    .then(data => console.log(data))
//    .catch(error => console.error(error));
// }


//   fetch('https://script.google.com/macros/s/AKfycbw6cLCucWaLt1C-jWEkd1uHq-Y3u3s3D7zB7QaZxh7sXXk_d7hyQU8wNsRKPJdWTC9P/exec', {
//   method: 'GET',
//   mode: 'no-cors'
// })
//   .then(response => {
//     // handle response
//   })
//   .catch(error => {
//     // handle error
//   });



//https://docs.google.com/spreadsheets/d/1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E/edit?usp=sharing





// function doGet(e) {
//   var sheet = SpreadsheetApp.openById('1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E').getActiveSheet();
//   var row = e.parameter.row;
//   var col = e.parameter.col;
//   var value = e.parameter.value;
  
//   sheet.getRange(row, col).setValue(value);
  
//   var result = {
//     status: 'SUCCESS',
//     message: 'Cell updated successfully'
//   };
  
//   return ContentService.createTextOutput(JSON.stringify(result))
//     .setMimeType(ContentService.MimeType.JSON);
// }

// function addProduct_test() {
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec'
//   const row = 3;
//   const column = 3;
//   const value = 'This is a test';
  
//   fetch(`${scriptURL}?row=${row}&col=${column}&value=${encodeURIComponent(value)}`)
//     .then(response => console.log('Success!', response))
//     .catch(error => console.error('Error!', error.message));
// }

// // This function will be called when the form is submitted
// function handleFormSubmit() {
//   getId();
//   addProduct_test();
// }

// function getId() {
//   console.log("aaaaammmm I here????")
//   Browser.msgBox('Spreadsheet key: ' + SpreadsheetApp.getActiveSpreadsheet().getId());
// }

// Add a listener to the form submit button
//document.getElementById('submit-button').addEventListener('click', handleFormSubmit);


// function doGet(e) {
//   var sheet = SpreadsheetApp.openById('1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E').getActiveSheet();
//   var row = e.parameter.row;
//   var col = e.parameter.col;
//   var value = e.parameter.value;
  
//   sheet.getRange(row, col).setValue(value);
  
//   var result = {
//     status: 'SUCCESS',
//     message: 'Cell updated successfully'
//   };
  
//   return ContentService.createTextOutput(JSON.stringify(result))
//     .setMimeType(ContentService.MimeType.JSON);
// }



// function addProduct_test() {
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec'
//   const row = 3;
//   const column = 3;
//   const value = 'This is a test';
  
//   fetch(`${scriptURL}?row=${row}&col=${column}&value=${encodeURIComponent(value)}`)
//     .then(response => console.log('Success!', response))
//     .catch(error => console.error('Error!', error.message));
// }




//  function addProduct_test() {
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec'
//     const form = document.forms['submit-to-google-sheet']
//           var audio = new Audio('Sounds/positive.mp3');
//               audio.play();
  
//     fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//         .then(response => console.log('Success!', response))
//         .catch(error => console.error('Error!', error.message))

// }




// function doGet(e) {
//   const SHEET_ID = "1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E";
//   const SHEET_NAME = "data";
//   const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
//   const rows = sheet.getDataRange().getDisplayValues();
//   const headers = rows[0];

//   const data = rows.slice(1).map((row) => {
//     return headers.reduce((obj, header, i) => {
//       obj[header] = row[i];
//       return obj;
//     }, {});
//   });

//   const result = {
//     status: "success",
//     data: data,
//   };

//   return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
// }

// function addProduct_test() {
//   const barcode = document.getElementById("barcode").value;
//   console.log("here is the barcode: " + barcode);

//   const SHEET_ID = "1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E";
//   const ROW_INDEX = 3;
//   const COLUMN_INDEX = 2;
//   const VALUE = "This is a test";

//   //const url = `https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec?row=${ROW_INDEX}&col=${COLUMN_INDEX}&value=${VALUE}`;
//   const url = `https://script.google.com/home/projects/19WMHLsw1mfy4K9OrkGxVtWFAI8-NiXq2YIajzG6frnNbcEuQTg0VgqWh/edit?row=${5}&col=${3}&value=${"test"}`;

//   fetch(url)
//     .then((response) => {
//       console.log(response);
//       if (response.status === 200) {
//         console.log(`Updated row ${ROW_INDEX}, column ${COLUMN_INDEX} with value "${VALUE}"`);
//       } else {
//         console.log(`Error updating row ${ROW_INDEX}, column ${COLUMN_INDEX}`);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }




// function addProduct_test() {
//   const barcode = document.getElementById("barcode").value;
//   console.log("here is the barcode" + barcode);
//   let SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E'
//   let SHEET_TITLE = 'data';
//   let SHEET_RANGE = 'A:C'
//   let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
  
//   fetch(FULL_URL)
//     .then(res => res.text())
//     .then(rep => {
//       let data = JSON.parse(rep.substr(47).slice(0, -2));
//       let rowIdx = 19; // set the row index to 3
//       let colIdx = 6; // set the column index to 2 (column C)
//       let updateValue = "This is a test"; // set the value to update
//       let updateURL = `https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec?row=${rowIdx}&col=${colIdx}&value=${updateValue}`;
//       fetch(updateURL);
//       console.log(`Updated row ${rowIdx}, column ${colIdx} with value ${updateValue}`);
//     });
// }




// function addProduct_test() {
//   const barcode = document.getElementById("barcode").value;
//   console.log("here is the barcode" + barcode);
//   let SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E'
//   let SHEET_TITLE = 'data';
//   let SHEET_RANGE = 'A:C'

//   let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

//   return fetch(FULL_URL)
//     .then(res => res.text())
//     .then(rep => {
//       let data = JSON.parse(rep.substr(47).slice(0, -2));
//       console.log(data);
//       // Find the row where the barcode matches column 1
//       let row = data.table.rows.findIndex(row => row.c && row.c[0] && row.c[0].v === barcode);
//       console.log("row  ...  " + row);
//       if (row !== -1) {
//         // If the row is found, increment the quantity in column 3 by 1
//         console.log("I'm here now!!!!")
//         let qty = data.table.rows[row].c[2].v + 1;
//         console.log("this is the new qty:   " + qty);
//         let rowIdx = data.table.rows.findIndex(row => row.c && row.c[0] && row.c[0].v === barcode);

//         console.log("Row Idx..." + rowIdx);

//         if (!rowIdx) {
//           console.log(`Row index not found for barcode ${barcode}`);
//           return;
//         }
//         let updateURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec'
//         fetch(updateURL);
//         console.log(`Updated row ${rowIdx}: ProductQty=${qty}`);
//       } else {
//         console.log(`Barcode ${barcode} not found in the sheet`);
//       }
//     });
// };


    // if (data.table && data.table.rows) { // check if data.table and data.table.rows are defined
    //   let length = data.table.rows.length;
    //   console.log("length " + length);
    //   barcodeIndex = data.table.rows.findIndex(row => row.c && row.c[0] && row.c[0].v === barcode);
    //   console.log("barcodeIndex  " + barcodeIndex);
    //   if (barcodeIndex !== -1) { // check if barcode is found in the array
    //     SHEET_ID.getRange(barcodeIndex, 3).setValue(data[i][2] + 1);
    //     console.log("data again " + data.table.rows[barcodeIndex].c[2].v);
    // //    break;
    //   }
        
    //   };

    // });



  //   const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

//   let barcodeIndex;
//   console.log("first bc index  " + barcodeIndex);

//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//        // Check if product data is available
//        if (!data.product) {
//         var audio = new Audio('Sounds/negative.mp3');
//         audio.onended = function() {
//           alert("Product not Found");
//         };
//         audio.play();
//         return;
//       }

//       const ProductName = data.product.product_name;
//       const imageUrl = data.product.image_url;

//       findBarcodeinSheet(barcode)
//         .then(({newQty, barcodeIndex}) => {
//           //console.log("xxBarcde in sheet  " + barcode)
//           console.log("xxxnew Qty  " + newQty)
//           console.log("xxxbarcode index  " + barcodeIndex)
//           var ProductQty = newQty;
//           document.getElementById("ProductBarcode").value = barcode;
//           document.getElementById("ProductName").value = ProductName;
//           document.getElementById("ProductQty").value = ProductQty;
//           document.getElementById("product-image").src = imageUrl;
//           document.getElementById("barcode").value = "";
//           sendToGoogle(barcode, ProductName, ProductQty);
//         })
//         .catch(error => console.error(error));
//     })
//     .catch(error => console.error(error));
// }

// function findBarcodeinSheet(barcode){
//   console.log("here is the barcode"  + barcode);
//   let SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E'
//   let SHEET_TITLE = 'data';
//   let SHEET_RANGE = 'A:C'

//   let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

//   return fetch(FULL_URL)
//     .then(res => res.text())
//     .then(rep => {
//       let data = JSON.parse(rep.substr(47).slice(0, -2));

//       console.log("Barcode third: " + barcode)
//       if (data.table && data.table.rows) { // check if data.table and data.table.rows are defined
//         let length = data.table.rows.length;
//         console.log("length " + length);

//         //barcodeIndex = data.table.rows.findIndex(row => row.c[0].v === barcode);
//         barcodeIndex = data.table.rows.findIndex(row => row.c && row.c[0] && row.c[0].v === barcode);
//         console.log("barcodeIndex  " + barcodeIndex);
//         if (barcodeIndex !== -1) { // check if barcode is found in the array
//           console.log("data again " + data.table.rows[barcodeIndex].c[2].v);

//           const newQty = parseInt(data.table.rows[barcodeIndex].c[2].v) + 1;
//           console.log("new qty...  " + newQty);

//           return {newQty, barcodeIndex};
//         }
//       }
//       return {newQty: 1, barcodeIndex: -1}; // return 1 if barcode is not found or data.table is not defined
//     })
//     .catch(error => console.error(error));
// }

// async function sendToGoogle() {
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec';
//   const form = document.forms['submit-to-google-sheet'];

//   var audio = new Audio('Sounds/positive.mp3');
//   audio.play();

//   const barcode = document.getElementById("ProductBarcode").value;
//   const qty = parseInt(document.getElementById("ProductQty").value);
//   console.log("barc and qty   " + barcode + " " + qty)

//   try {
//     const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
//     console.log('Success!', response);

//     const json = await response.json();
//     let sheetData = JSON.parse(json.substring(47).slice(0, -2));
//     console.log("here I ammmmm");

//     // find the index of the row with the barcode
//     console.log("bc index...   " + sheetData)
//     const barcodeIndex = sheetData.findIndex(row => row[0] === barcode);
//     console.log("bc index333...   " + barcodeIndex)

//     if (barcodeIndex !== -1) {
//       // if the row exists, update the quantity
//       sheetData[barcodeIndex][2] = qty;
//     } else {
//       // if the row does not exist, add a new row
//       sheetData.push([barcode, document.getElementById("ProductName").value, qty]);
//     }

//     // update the sheet with the new data
//     await updateGoogleSheet(sheetData);
//     return qty;
//   } catch (error) {
//     console.error('Error!', error.message);
//   }
// }

// async function updateGoogleSheet(data) {
//   const SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E';
//   const SHEET_NAME = 'data';
//   const RANGE = 'A1:C' + data.length;
//   const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${RANGE}?valueInputOption=USER_ENTERED`;

//   const requestBody = {
//     values: data
//   };

//   const options = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${ACCESS_TOKEN}`
//     },
//     body: JSON.stringify(requestBody)
//   };

//   try {
//     const response = await fetch(URL, options);
//     console.log('Sheet updated!', response);
//   } catch (error) {
//     console.error('Error updating sheet!', error.message);
//   }
//}


