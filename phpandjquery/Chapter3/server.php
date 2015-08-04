<?php
libxml_use_internal_errors(true);
$objXML = simplexml_load_file('common.xml');
if(!$objXML)
{
	$error = libxml_get_errors();
	foreach ($error as $$error) {
		echo $error->message . '<br />';
	}
}
else
{
	foreach ($objXML->book as $book) {
		echo $book->name . '<br />';
	}
}