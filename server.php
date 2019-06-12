<?
	$db = new PDO('mysql:host=localhost;dbname=avengers','root','');

	//Limpa a tabela a cada nova entrada
	$stmt = $db->prepare("TRUNCATE `avengers`.`characters`");
	$stmt->execute();

	// pega dados
	$dados = json_decode($_POST['json']);
	
	foreach ($dados as $k => $v) {
		$stmt = $db->prepare("INSERT INTO characters values ('', ?, ?)");
		$stmt->bindParam(1,$v->year);
		$stmt->bindParam(2,$v->gender);
		$stmt->execute();
	}
?>