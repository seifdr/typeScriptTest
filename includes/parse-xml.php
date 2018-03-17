<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function look( $var ){
    echo "<pre>". print_r( $var ) ."</pre>";
}

class RSS_Item
{
    function makeItem(){
        $itemXML = '<item>';

            foreach ($this as $key => $value) {
                
               $specialCases = ['enclosure', 'duration', 'summary'];
               $iTunesCases  = ['duration', 'summary'];

               if( !in_array( $key, $specialCases ) ){
                    echo "<{$key}>{$value}</{$key}>";
               } elseif( in_array( $key, $iTunesCases ) ) {
                    echo "<itunes:{$key}>$value</itunes:{$key}>";
               } elseif( $key == 'enclosure' ){
                   echo '<enclosure url="'. $value['url'] .'" type="'. $value['type'] .'" length="'. $value['length'] .'" />';
               }

            }

        $itemXML .= '</item>';
    }
}


class RSS_Feed
{
    var $header;
    var $items = array();

    function __construct($file_or_url)
    {
        $file_or_url = $this->resolveFile($file_or_url);
        if (!($x = simplexml_load_file($file_or_url)))
            return;

        $c =& $x->channel;
        $cc = $x->channel->children('http://www.itunes.com/dtds/podcast-1.0.dtd');

        $xmlHeader = '
            <channel>
            <title>'. $c->title .'</title>
            <link>'. $c->link .'</link>
            <description>'. $c->description .'</description>
            <copyright>'. $c->copyright .'</copyright>
            <lastBuildDate>'. $c->lastBuildDate .'</lastBuildDate>
            <generator>'. $c->generator .'</generator>
            <a10:link rel="self" href="'. $c->link .'" />
            <itunes:summary>'. $cc->summary .'</itunes:summary>
            <itunes:author></itunes:author>
            <pubDate>'. $c->pubDate .'</pubDate>
        ';
         
        $this->header = $xmlHeader;

        foreach ($x->channel->item as $i )
        {
            //returns values as SIMPLE XML OBJECT, therefore you need to cast it to type
            // echo (string) $i->title;

            // look( $i );

            $item = new RSS_Item();

            $iTunesNodes = $i->children('http://www.itunes.com/dtds/podcast-1.0.dtd'); 

            // look($iTunesNodes);

            $item->title = (string) $i->title;

            $item->link = (string) $i->link;

            $item->pubDate = (string) $i->pubDate;

            $item->description = (string) $i->description;

            $item->enclosure = array( 
                'url'       => (string) $i->enclosure['url'],
                'length'    => (string) $i->enclosure['length'],
                'type'      => (string) $i->enclosure['type']
            ); 

            $item->guid = (string) $i->guid;

            $item->duration = (string) $iTunesNodes->duration;

            $item->summary = (string) $iTunesNodes->summary;

            //going to try it without an image 
            //and without keywords

            $item->explicit = 'no';

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

// look( $rs->items[0] );

// $rs->items[0]->makeItem();

// look( $rs->header );

?>