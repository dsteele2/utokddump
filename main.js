
let NWsort = 'asc';
function sortTableByColumnm(table,column,acs=true){
const tBody=table.tBody;
const rows=Array.from(tBody.querySelectorAll('tr'));

const sortedRows=rows.sort((a,b)=>{
    const aColText=a.querySelector('td:nth-child(${column +1})').textContent.trim()
    const bColText=b.querySelector('td:nth-child(${column +1})').textContent.trim()

    return aColText>bColText ? (1+dirModifier):(-1 * dirModifier);

});

while(tBody.firstChild){
    tBody.removeChild(tBody.firstChild);
}
tBody.append(...sortedRows);

table.querySelectorAll("th").foreach(th=> th.classlist.remove('th-sort-asc','th-sort-desc'))

}




function buildTable(sortdirection='asc') {
 
  $(document).ready(function(){
  $.ajax({
  method: "GET",
  url: "https://api.allorigins.win/raw?url=https://utopia-game.com/wol/game/kingdoms_dump/?key=l1FdkNfdklAs",
  success: 
  function (response) {
    
    var table = document.getElementById("myTable");
    table.innerHTML=""
    response.sort(function(a, b) {
      return parseFloat(a.nw) - parseFloat(b.nw)
    })
    if(sortdirection=='desc'){
      response.reverse()
    }

    
    console.log(response);

    for (var i = 1; i < response.length - 1; i++) {
      var wars
      var row = `<tr>
                        <td>${response[i].loc}</td>
                        <td>${response[i].name}</td>
                        <td>${(response)[i].nw.toLocaleString().concat(" GC")}</td>
                        <td>${(response)[i].land.toLocaleString().concat(" acres")}</td>
                        <td>${response[i].count}</td>
                        <td>${response[i].stance}</td>
                        <td>${response[i].wars}</td>
                  </tr>`;
      table.innerHTML += row;
     
    }
    
    NWsort=(NWsort == 'asc' ? 'desc' : 'asc');
  },
});
  })

  

}
var element = document.getElementById('sortup');
element.onclick = function() {buildTable(NWsort);};
buildTable(NWsort)



