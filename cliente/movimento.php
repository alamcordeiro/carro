<?php

if(isset($_REQUEST['movimento'])){

	$client = new SoapClient(null, array(
      'location' => "http://localhost/carro/servidor/server.php",
      'uri'      => "http://localhost/carro/servidor/server.php",
      'trace'    => 1 ));

	echo $return = $client->__soapCall("setMovimento",array((int) $_REQUEST['movimento']));
}

?>
