<?php
$objXML = simpleXml_load_file('common.xml');
if(!$objXML)
{
	echo 'Error loading xml';
}
else
{
	$response = '';
	$action = $_GET['action'];
	switch($action)
	{
		case 'all':
			$book = $objXML->xpath('//book/name');
			$response .= '</ul>';
			foreach ($book as $item) {
				$response .= '<li>';
				$response .= $item[0] . '(' . $item['year'] . ')';
				$response .= '</li>';
			}
			$response .= '</ul>';
			break;
		case 'total':
			$response .= '<ul>';
			$stroes = $objXML->xpath('//story');
			foreach ($stroes as $story) {
				
			}
	}
}