<?php

if(isset($_REQUEST['movimento'])){

	$client = new SoapClient(null, array(
      'location' => "http://199.168.139.21/carro/server.php",
      'uri'      => "http://199.168.139.21/carro/server.php",
      'trace'    => 1 ));

	echo $return = $client->__soapCall("setMovimento",array((int) $_REQUEST['movimento']));
}

?>
