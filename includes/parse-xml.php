<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function look( $var ){
    echo "<pre>". print_r( $var ) ."</pre>";
}



class RSS_Item
{
    var $title;
    var $link;
    var $pubDate;

    var $description;

    var $enclosure;

    var $guid;

    var $duration;

    var $summary;

    //try it without item image
    //try it without keywords

   var $explict = 'no';

    function ifEcho( $str = "" ){
        if( $str && !empty( $str ) ){
            return $str;
        }
    }

    function makeItem(){
        $itemXML = '<item>';



            $itemXML .= ifecho('<title>'. $this->title .'</title>');

            $itemXML .= ifecho('<link>'. $this->link .'</link>');


        $itemXML .= '</item>';
    }
}


class RSS_Feed
{
    var $items = array();

    function __construct($file_or_url)
    {
        $file_or_url = $this->resolveFile($file_or_url);
        if (!($x = simplexml_load_file($file_or_url)))
            return;

        foreach ($x->channel->item as $i )
        {
            //returns values as SIMPLE XML OBJECT, therefore you need to cast it to type
            // echo (string) $i->title;

            look( $i );

            // $item = new RSS_Item();

            // $item->title = (string) $i->title;

            // $item->link = (string) $i->link;

            // $item->link = (string) $i->pubDate;

            // $item->description = (string) $i->description;

            // $item->enclosure = array( 
            //     'url'       => (string) $i->enclosure['url'],
            //     'length'    => (string) $i->enclosure['length'],
            //     'type'      => (string) $i->enclosure['type']
            // );

            // $item->guid = (string) $i->guid;

            // $item->duration = (string) $i->duration;

            // $post->pubDate  = (string) $item->pubDate;
            // $post->ts    = strtotime($item->pubDate);
            // $post->link  = (string) $item->link;
            // $post->title = (string) $item->title;
            // $post->text  = (string) $item->description;

            // Create summary as a shortened body and remove images, 
            // extraneous line breaks, etc.
            //$post->summary = $this->summarizeText($post->text);

            $this->items[] = $item;
        }
    }

    private function resolveFile($file_or_url) {
        if (!preg_match('|^https?:|', $file_or_url))
            // $feed_uri = $_SERVER['DOCUMENT_ROOT'] .'/shared/xml/'. $file_or_url;
            $feed_uri = $file_or_url;
        else
            $feed_uri = $file_or_url;

        return $feed_uri;
    }

    private function summarizeText($summary) {
        $summary = strip_tags($summary);

        // Truncate summary line to 100 characters
        $max_len = 100;
        if (strlen($summary) > $max_len)
            $summary = substr($summary, 0, $max_len) . '...';

        return $summary;
    }
}

$rs = new RSS_Feed('test.xml');

look( $rs->items[0] );


?>