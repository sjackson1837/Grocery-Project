let SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E'
let SHEET_TITLE = 'data';
let SHEET_RANGE = 'A:C'

let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

fetch(FULL_URL)
.then(res=>res.text())
.then(rep=> {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
  console.log(data)

//  let barcode = document.getElementById('barcode');
  //let product = document.getElementById('product');
  let length = data.table.rows.length ;
  //console.log(length)
  //console.log(data.table.rows[0].c[0].v);
  //barcode.innerHTML = data.table.rows[0].c[0].v;
  //product.innerHTML = data.table.rows[0].c[1].v;
  
    var barcodeQtyMap = {};
    console.log("bcmap" + barcodeQtyMap)
    console.log("datalength" + length)
    for (var i = 0; i < length; i++) {
      console.log("am i here");
      var barcode = data.table.rows[i].c[0].v;
      console.log("barcode "+barcode);
      var qty = data.table.rows[i].c[2].v;
      console.log(`qtyx ${qty}`)
      if (barcodeQtyMap[barcode]) {
        barcodeQtyMap[barcode] += qty;
        console.log("equals " + qty);
      } else {
        barcodeQtyMap[barcode] = qty;
        console.log("not equals " + qty);
      }
    }
    var resultArray = [];
    console.log("what is" + resultArray)
    for (var barcode2 in barcodeQtyMap) {
      resultArray.push([barcode, barcodeQtyMap[barcode]]);
    }
    return resultArray;
  });



  // for(let i = 0; i < length; i++) {
  //             var barcodesrj = data.table.rows[i].c[0].v;
  //             console.log(barcodesrj)
  //             //var name = row[1];
  //             //var qty = Number(row[2]);
  //             if (barcodesrj) {
  //               barcodesrj;
  //             } else {
  //               barcodesrj = {
  //               };
  //             };
  //           };
  //         });
  // let NewBoxBarcode = document.createElement('barcode');
  // NewBoxBarcode.id = (barcodesrj);
  // NewBoxBarcode.className = "Some_Style";
  // barcode.append(NewBoxBarcode);
  // NewBoxBarcode.innerHTML = data.table.rows[i].c[0].v;

  // function sumQtyByBarcode() {
  //   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  //   var range = sheet.getDataRange();
  //   var values = range.getValues();
  //   var barcodeQtyMap = {};
  //   for (var i = 1; i < values.length; i++) {
  //     var barcode = values[i][0];
  //     var qty = values[i][2];
  //     if (barcodeQtyMap[barcode]) {
  //       barcodeQtyMap[barcode] += qty;
  //     } else {
  //       barcodeQtyMap[barcode] = qty;
  //     }
  //   }
  //   var resultArray = [];
  //   for (var barcode in barcodeQtyMap) {
  //     resultArray.push([barcode, barcodeQtyMap[barcode]]);
  //   }
  //   return resultArray;
  // }
  








            ;
  // getBarcodeValues();
  
  
  // function getBarcodeValues() {
  //   console.log("did I make it here???")
  //   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  //   var range = sheet.getRange("B:B"); // Replace "B:B" with the actual column range that contains the barcode values
  //   var values = range.getValues();
  //   var barcodeArray = [];
  //   for (var i = 0; i < values.length; i++) {
  //     barcodeArray.push(values[i][0]);
  //   }
  //   return barcodeArray;
  // }
  




  //   removeDuplicates(data);

// //----
// function removeDuplicates(data) {
//   console.log("did I make it here?");
//   var uniqueList = [];
//   //console.log(data.length);
//   for (var i = 0; i < data.length; i++) {
//     console.log("did I make it here also?")
//     if (uniqueList.indexOf(list[i]) === -1) {
//       uniqueList.push(list[i]);
//     }
//   }
//   return uniqueList;
// }
// //---



// 
//     //------
//     console.log(data.table.rows[0].c[0].v);

  //    data.forEach(function(row) {
  //            var barcodesrj = row[0];
  //            //var name = row[1];
  //            //var qty = Number(row[2]);
  //            if (barcodesrj) {
  //              barcodesrj;
  //            } else {
  //              barcodesrj = {
  //              };
  //            };
  //  //        });
  //    //----
  //    console.log(barcode)
   
            
    
    
    //}}
  //   let NewBoxProduct = document.createElement('div');
  //   NewBoxProduct.id = ("box"+i);
  //   NewBoxProduct.className = "Some_Style";
  //   barcode.append(NewBoxProduct);
  //   NewBoxProduct.innerHTML = data.table.rows[i].c[0].v;
 
  //};