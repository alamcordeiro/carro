<?php 
class Carro {

	private $pdo;

	public function __construct(){

		$this->pdo = new PDO("mysql:host=localhost;dbname=carro",'root','');
	}

	public function setMovimento($movimento) {
		$this->pdo->query('INSERT INTO movimento(tipo) VALUES('.(int) $movimento.')');
    	return $movimento;
  	}


  	public function getMovimentos($id){
  		  $sql = $this->pdo->prepare('SELECT * FROM movimento
                                   WHERE
                                      id > '. (int) $id. ' AND 
                                      time BETWEEN timestamp(DATE_SUB(NOW(), INTERVAL 5 MINUTE)) AND timestamp(NOW())
                                    LIMIT 100');
        $sql->execute();
    		$movimentos = $sql->fetchAll();
    	  return $movimentos;
  	}

}

try {
  $server = new SOAPServer(
    NULL,
    array(
     'uri' => 'http://199.168.139.21/carro/server.php'
    )
  );

  $server->setClass('Carro');
  $server->handle();
}

catch (SOAPFault $f) {
  print $f->faultstring;
}

?>
