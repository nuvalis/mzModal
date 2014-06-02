<?php

namespace nuvalis\JSON;

class JSON
{

	public function render($string)
	{

		header('Cache-Control: no-cache, must-revalidate');
		header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
		header('Content-type: application/json');

		$json = json_encode($string, JSON_PRETTY_PRINT);

		echo $json;
		exit;
		
	}
	 
}