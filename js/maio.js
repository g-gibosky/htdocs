// Create a function that takes a dataset as input and update the plot:
function update(type) {
  getData(type);
}

 function saveData(json){
  json = JSON.stringify(json);
  $.ajax({
    type: "POST",
    url:"server.php?p=add",
    data:"json="+json,
    success: function(msg){
      alert("Dados dos Heróis Atualizados");
      $(".dataset_btn").prop("disabled", false)
    }
  })
 }

 function getData(option){
  // TODO: Make the js get the parameters
  var title = "Gender Total";
  $.ajax({
    type: "POST",
    url:"getData.php?p=get",
    data:"type="+option,
    success: function(data){
      data = $.parseJSON(data);
      if (option == 1 || option == 3) {        
        var aux = [];
        var g_data = new google.visualization.DataTable();
        g_data.addColumn('string', 'Gender');
        g_data.addColumn('number', 'Value');
        g_data.addColumn({type: 'string', role: 'style'});
        $.each(data, function(i,v){
          if (v["gender"] == "male") {
            arr = [v["gender"], parseInt(v["total"], 10), "green"];
          }else{
            arr = [v["gender"], parseInt(v["total"], 10), "pink"];
          }
          g_data.addRow(arr);
        })
        // Set chart options
        var options = {
          chartArea:{left:0,top:40,width:"80%",height:"80%"},
          animation:{
            duration: 1000,
            easing: 'linear',
            startup: true
          },
          height: 400,
          hAxis: {
            title: g_data.getColumnLabel(0)
          },
          theme: 'material',
          title: title,
          is3D: true
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        google.visualization.events.addListener(chart, 'ready', getData);
        chart.draw(g_data, options);

        // console.log(data);
      }else if (option == 2 || option == 4) {
        title = "Gender Percentage"
        var aux = [];
        var arr = ["Gender", "Percentage", "Year"];
        aux[0] = arr;
        $.each(data, function(i,v){
          var aux_arr = [v["gender"],parseFloat(v["percentage"]),v["year"]];
          aux.push(aux_arr);
        });
        var g_data = google.visualization.arrayToDataTable([aux]);
        // var data = google.visualization.arrayToDataTable([
        
        // Set chart options
        var options = {
          chartArea:{left:0,top:40,width:"80%",height:"80%"},
          animation:{
            duration: 1000,
            easing: 'linear',
            startup: true
          },
          height: 600,
          hAxis: {
            title: "Gender"
          },
          theme: 'material',
          title: title
        };
        console.log(g_data);
         var chart = new google.charts.ColumnChart(document.getElementById('chart_div'));
        google.visualization.events.addListener(chart, 'ready', getData);
        chart.draw(g_data, options);
        // chart.draw(g_data, options);
      }
    }
  })
 }

function myReadyHandler() {
    
}

// Create datasets


var requestURL = 'https://pkgstore.datahub.io/five-thirty-eight/avengers/avengers_json/data/6f632015b57e34e17ed0a01e19a9e422/avengers_json.json';

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
  var superHeroes = request.response;
  saveData(request.response);

}

// Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart','bar','controls']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(getData);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  



// At the beginning, I run the update function on the first dataset:
// update(2)