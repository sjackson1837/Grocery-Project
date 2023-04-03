let SHEET_ID = '1ls6zFkH8epBpvfHcycXia4_M0irRBmj9z00r7LOMW6E'
let SHEET_TITLE = 'data';
let SHEET_RANGE = 'A:C'

let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

fetch(FULL_URL)
.then(res=>res.text())
.then(rep=> {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
  let length = data.table.rows.length;

  //console.log("here I am" + data.table.rows[4].c[1].v);
  //var myText = ("my text is" + data.table.rows[4].c[1].v);
  var myText = data.table.rows[4].c[1].v;

  //console.log("how about now" + myText)

  document.getElementById("myText").innerHTML = myText;

  const names = ["Alice", "Bob", "Charlie", "David"];

  const nameList = document.getElementById("nameList");
  
  names.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    nameList.appendChild(li);
  });


  for (var i = 0; i < length; i++) {
    let exerciseList = document.querySelector('.exercise-list')
    let name = "John Doe";
    console.log("Hi, my name is " + name + i);
    let myText2 = data.table.rows[i].c[1].v;
    console.log(data.table.rows[i].c[1].v);
    document.getElementById("Grid2").innerHTML = myText2

    exerciseList += '<li>' + exercise.name + '</li>'

    exerciseList.innerHTML = exerciseItems
  }

});
