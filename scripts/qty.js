let SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E'
let SHEET_TITLE = 'data';
let SHEET_RANGE = 'A:C'

let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

fetch(FULL_URL)
.then(res=>res.text())
.then(rep=> {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
 // console.log(data)

 let barcode = document.getElementById('barcode');
 let product = document.getElementById('product');
 let srjbarcode = document.getElementById('srjbarcode');
 let srjproduct = document.getElementById('srjproduct');
 let length = data.table.rows.length -1;

 console.log(data.table.rows[0].c[0].v);
 barcode.innerHTML = data.table.rows[0].c[0].v;
 product.innerHTML = data.table.rows[0].c[1].v;

 for(let i = 0; i < length; i++) {
   
   let NewBoxBarcode = document.createElement('div');
    NewBoxBarcode.id = ("box"+i);
    NewBoxBarcode.className = "Some_Style";
    barcode.append(NewBoxBarcode);
    NewBoxBarcode.innerHTML = data.table.rows[i].c[0].v;

    let NewBoxProduct = document.createElement('div');
    NewBoxProduct.id = ("box"+i);
    NewBoxProduct.className = "Some_Style";
    barcode.append(NewBoxProduct);
    NewBoxProduct.innerHTML = data.table.rows[i].c[1].v;

    
    
 }

})