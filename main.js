
let sortdir = 'asc';

function buildTable(sortdirection='asc',sortCol='sortNW') {
 
  $(document).ready(function(){
  $.ajax({
  method: "GET",
  url: "https://api.allorigins.win/raw?url=https://utopia-game.com/wol/game/kingdoms_dump/?key=l1FdkNfdklAs",
  success: 
  function (response) {
    
    var table = document.getElementById("myTable");
    table.innerHTML=""
    console.log(response)

    response=modify_data(response)

    switch(sortCol){
      case 'sortNW':
        response.sort(function(a, b) {
          return parseFloat(a.nw) - parseFloat(b.nw)
        });
      break;
      case 'sortLoc':
        response.sort(function(a, b) {
          return parseFloat(a.ISLANDNUMBER) - parseFloat(b.ISLANDNUMBER) || parseFloat(a.KDNUMBER)- parseFloat(b.KDNUMBER)
        });
      break;
      case 'sortLand':
        response.sort(function(a, b) {
          return parseFloat(a.land) - parseFloat(b.land)
        });
      break;
      case 'sortProvs':
        response.sort(function(a, b) {
          return parseFloat(a.count) - parseFloat(b.count)
        });
      break;
      case 'sortWW':
        response.sort(function(a, b) {
          return parseFloat(a.WARWINS) - parseFloat(b.WARWINS)
        });
      break;
      case 'sortTW':
        response.sort(function(a, b) {
          return parseFloat(a.TOTALWARS) - parseFloat(b.TOTALWARS)
        });
      break;
      case 'sortWinP':
        response.sort(function(a, b) {
          return parseFloat(a.WINPERCENT) - parseFloat(b.WINPERCENT)
        });
      break;
      case 'sortStance':
        response.sort(function(a, b) {
          return a.stance - b.stance
        });
      break;


      
      

    }
  
    if(sortdirection=='desc'){
      response.reverse()
    }

    
    console.log(response);
    response = modify_data(response);
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
                        <td>${response[i].WARWINS}</td>
                        <td>${response[i].TOTALWARS}</td>
                        <td>${(response)[i].WINPERCENT.toLocaleString().concat("%")}</td>
                  </tr>`;
      table.innerHTML += row;
     
    }
    
    sortdir=(sortdir == 'asc' ? 'desc' : 'asc');
  },
});
  })

}

function modify_data(response=[]){
  for (var i = 1; i < response.length - 1; i++) {
    
    response[i].KDNUMBER=response[i].loc.split(':')[1]
    response[i].ISLANDNUMBER=response[i].loc.split(':')[0]
    response[i].WARWINS=response[i].wars[0]
    response[i].TOTALWARS=response[i].wars[1]
    if (response[i].TOTALWARS==0){
      var winP=0
      winP=winP.toFixed(2)
      response[i].WINPERCENT=winP
        }
    else{
      response[i].WINPERCENT=(parseFloat(response[i].WARWINS)/parseFloat(response[i].TOTALWARS)*100).toFixed(2)
    }
    


  }
  return response
}
var sortNW = document.getElementById('sortNW');
var sortLoc = document.getElementById('sortLoc');
var sortLand = document.getElementById('sortLand');
var sortProvs = document.getElementById('sortProvs');
var sortWW = document.getElementById('sortWW');
var sortTW= document.getElementById('sortTW');
var sortWinP= document.getElementById('sortWinP');
var sortStance = document.getElementById('sortStance');

sortNW.onclick = function() {buildTable(sortdir,'sortNW');
}
sortLoc.onclick = function() {buildTable(sortdir,'sortLoc');
}
sortLand.onclick = function() {buildTable(sortdir,'sortLand');
}
sortProvs.onclick = function() {buildTable(sortdir,'sortProvs');
}
sortWW.onclick = function() {buildTable(sortdir,'sortWW');
}
sortWinP.onclick = function() {buildTable(sortdir,'sortWinP');
}
sortTW.onclick = function() {buildTable(sortdir,'sortTW');
}
sortStance.onclick = function() {buildTable(sortdir,'sortStance');
}

buildTable(sortdir,'sortNW')



