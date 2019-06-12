<?
	$db = new PDO('mysql:host=localhost;dbname=avengers','root','');
	// $page = isset($_GET['p'])?$_GET['p']:"";
	// if ($page == 'add') {
	// 	var_dump($_POST);exit;
	// }
	if ($_POST["type"] == 1){
		$stmt = $db->prepare("SELECT gender, COUNT(*) as total FROM `characters` GROUP BY gender");
		$stmt->execute();
		$gender_query = json_encode($stmt->fetchAll(\PDO::FETCH_OBJ));
		echo $gender_query;
	}else if ( $_POST["type"] == 2) {
		$stmt = $db->prepare("SELECT t.gender, t.g_number/c1.total_year as percentage, c1.year
			FROM (
			SELECT COUNT(gender) as g_number, gender, year
			FROM `characters` as c
			GROUP BY year, gender
			    ) as t
			INNER JOIN (
			    SELECT COUNT(id) as total_year, year
			    FROM `characters` 
			    GROUP BY year
			) as c1 ON c1.year = t.year");
		$stmt->execute();
		$gender_progression_query = json_encode($stmt->fetchAll(\PDO::FETCH_OBJ));
		echo $gender_progression_query;
	}else{

	}
	
?>