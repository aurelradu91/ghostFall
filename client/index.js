document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:1800/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
})


const searchBtn = document.querySelector('#search-bttn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:1800/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


const addBttn = document.querySelector('#add-name-bttn');

addBttn.onclick = function (){

    const nameInput = document.querySelector('#name-input')
    
    const name = nameInput.value;

    const test = name.match(/^[a-z0-9\s]*$/i);

    console.log(test)

    if(!test || name.length<1 || name.length > 20) {
        console.log("nope")
        alert("Username must be between 1 and 20 characters.")
        return
    } else {

    fetch('http://localhost:1800/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name})
    } )
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']))}
}  

function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;}}
            tableHtml += "</tr>";

            if (isTableData) {
                table.innerHTML = tableHtml;
            } else {
                const newRow = table.insertRow();
                newRow.innerHTML = tableHtml;
            }
}

function loadHTMLTable (data){
 const table = document.querySelector('table tbody');
       
 if (data.length === 0){
    table.innerHTML = "<tr><td class='no-data' colspan=3> No Competition :( </td> </tr>";
    return
 }

 let tableHtml = "";

 data.forEach(function ({name,score, date_added}) {
    tableHtml += "<tr>";
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${score}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += "</tr>";
});

table.innerHTML = tableHtml;


}