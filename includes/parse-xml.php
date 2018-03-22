<?php 

/* 

    PHP Script written by Duncan Seif (duncan.seif@northwestern.edu) to transform the RSS feed provide by Frank Schleicher's team (f-schleicher@northwestern.edu) 
    This transformation is needed to convert a media site rss output into an acceptable RSS feed for iTunes. 

    Mediasite RSS feed is missing the following:
        - Podcast Artwork
        - category tag
        - explicit tag
        - language tag

*/

//RSS feed item
class RSS_Item
{
    function makeItem(){
        $itemXML = '<item>';

            foreach ($this as $key => $value) {
                
               $specialCases = ['enclosure', 'duration', 'summary', 'explicit', 'guid', 'subtitle'];
               $iTunesCases  = ['duration', 'summary', 'explicit', 'subtitle'];

               if( !in_array( $key, $specialCases ) ){
                    $itemXML .= "<{$key}>{$value}</{$key}>";
               } elseif( in_array( $key, $iTunesCases ) ) {
                    $itemXML .= "<itunes:{$key}>". $value ."</itunes:{$key}>";
               } elseif ( $key == 'guid' ){
                    $itemXML .= '<guid isPermaLink="false">'. $value .'</guid>';
               } elseif( $key == 'enclosure' ){
                    $itemXML .= '<enclosure url="'. $value['url'] .'" type="'. $value['type'] .'" length="'. $value['length'] .'" />';
               }

            }

        $itemXML .= '</item>';

        return $itemXML;
    }
}

//create the RSS Feed class
class RSS_Feed
{
    var $header;
    var $itemsStr;
    var $footer;
    var $items = array();
    var $dateFormat = 'D, d M Y G:i:s T';

    function __construct($file_or_url)
    {
        $file_or_url = $this->resolveFile($file_or_url);
        if (!($x = simplexml_load_file($file_or_url)))
            return;

        $c =& $x->channel;
        $cc = $x->channel->children('http://www.itunes.com/dtds/podcast-1.0.dtd');

        $xmlHeader = '<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0">
            <channel>
            <title>'. $c->title .'</title>
            <link>'. $c->link .'</link>
            <image>
                <url>http://www.feinberg.northwestern.edu/sites/fame/images/do-not-delete-fame-podcast-artwork/FSM-FAME-Pod-artwork-1400px-1400px.png</url>
                <title>'. $c->title .'</title>
                <link>'. $c->link .'</link>
            </image>
            <description>'. $c->description .'</description> 
            <language>en-us</language>
            <copyright>'. $c->copyright .'</copyright>
            <lastBuildDate>'. $this->formatDate( (string) $c->lastBuildDate, TRUE ) .'</lastBuildDate>
            <generator>'. $c->generator .'</generator>
            <itunes:summary>'. $cc->summary .'</itunes:summary>
            <itunes:author>Northwestern University Feinberg School of Medicine FAME</itunes:author> 
            <itunes:explicit>No</itunes:explicit>
            <itunes:image href="http://www.feinberg.northwestern.edu/sites/fame/images/do-not-delete-fame-podcast-artwork/FSM-FAME-Pod-artwork-1400px-1400px.png" />
            <itunes:category text="Science &amp; Medicine" />
            <pubDate>'. $this->formatDate( (string) $c->pubDate, TRUE ) .'</pubDate>
        ';
         
        $this->header = $xmlHeader;

        $this->footer = '</channel></rss>';

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

            $item->pubDate = $this->formatDate( (string) $i->pubDate );  

            $item->description = $this->summarizeText( (string) $i->description );
            //$item->description = (string) $iTunesNodes->summary;

            //$item->description = $this->summarizeText( (string) $iTunesNodes->summary );

            $item->enclosure = array( 
                'url'       => (string) $i->enclosure['url'],
                'length'    => (string) $i->enclosure['length'],
                'type'      => (string) $i->enclosure['type']
            ); 

            $item->guid = (string) $i->guid;
            //$item->guid = (string) $i->enclosure['url'];

            $item->duration = (string) $iTunesNodes->duration;

            $item->summary = $this->summarizeText( (string) $iTunesNodes->summary );

            $items->subtitle = $this->summarizeText( (string) $iTunesNodes->summary );

            //going to try it without an image 
            //and without keywords

            $item->explicit = 'no';
 
            // Create summary as a shortened body and remove images, 
            // extraneous line breaks, etc.
            //$post->summary = $this->summarizeText($post->text);

            $this->items[] = $item;

            $this->itemsStr .= $item->makeItem();
        }
        
        //Oldest pods are showing first. Reverse the array 
        $this->items = array_reverse( $this->items );
    }

    //function accepts a date and an option subtraction 
    private function formatDate( $incomingDate, $subtractHour = FALSE ){
        if( !empty( $incomingDate ) ){
            $d = new DateTime( $incomingDate, new DateTimeZone('America/Chicago'));

            if( $subtractHour ){
                // 'PT12H30M' -- The P stands for Period. The T stands for Timespan.
                // we are just subtracting an hour below.
                $tosub = new DateInterval('PT1H');
                $d->sub($tosub);
            }   

            return $d->format('D, d M Y H:i:s') . " CST";  
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
        $summary = strip_tags( $this->removeAnyURLsFromText( $summary ) );

        // Truncate summary line to 100 characters
        $max_len = 100;
        if (strlen($summary) > $max_len)
            $summary = substr($summary, 0, $max_len) . '...';

        return $summary;
    }

    //links in description were failing itunes validation, therefore this function will remove them.
    private function removeAnyURLsFromText( $string ){
        $regex = "@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@";
        return preg_replace($regex, ' ', $string);
    }
}

//$rs = new RSS_Feed('test.xml');
$rs = new RSS_Feed('https://imswebcast.feinberg.northwestern.edu/Mediasite/FileServer/Podcast/02bc8330de9e42dd83e9814d194efe1b17/feed.xml');

//create file
// w+: Open for reading and writing; place the file pointer at the beginning of the file and truncate the file to zero length. If the file does not exist, attempt to create it.
// a+: Open for reading and writing; place the file pointer at the end of the file. If the file does not exist, attempt to create it.
// $myfile = fopen("new.xml", "wa+"); 
// fwrite($myfile, $rs->header . $rs->itemsStr . $rs->footer );
// fclose($myfile);    

// echo "hello";

echo $rs->header . $rs->itemsStr . $rs->footer;

// Functions for debugging and testing only
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// function look( $var ){
//     echo "<pre>". print_r( $var ) ."</pre>";
// } 

?>