<!DOCTYPE html>
<html lang="pt_BR">
  <head>
    <meta charset="utf-8">
    <title>Maio Teste</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 80px;
      }

    </style>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/fontawesome.min.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="/js/html5shiv.js"></script>
      <script src="/js/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  	<div>
  		<img src="img/logo-maio.png" class="rounded mx-auto d-block">
  	</div>
		<!--Div that will hold the dashboard-->
  	<div id="dashboard_div" class="col-md-6 offset-md-5">
			<!-- Create a div where the graph will take place -->
			<button class= "dataset_btn" disabled onclick="update(1)">Dataset 1</button>
      
      <!--Divs that will hold each control and chart-->
      <div id="filter_div"></div>
      <div id="chart_div"></div>
  	</div>
  </body>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="/js/jquery-3.4.1.min.js"></script>
    <script src="/js/maio.js"></script>
</html>
