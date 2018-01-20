var $el, $ps, $up, totalHeight;

$(document).ready(function(){

    //$('div#newsIndex li').css('border', '1px solid blue');

    // Get an array of news items
    _newsItems = $('div#newsIndex li');

    //loop through news items
    $.each( _newsItems, function(){

        //count the number of paragraphs in each news item
        _countOfParagraphs = $(this).children('div.newsDetail').children('p').length;

        //if count of news is greated than one
        if( _countOfParagraphs > 1 ){
            //append a read more link
            //$(this).append('<div class="readMoreNews"><a href="#"><span>Read</span> More <i class="fa fa-chevron-circle-right">&#160;</i></a></div>');
            //hide all extra text with css
            $(this).addClass('morePlease');
        } else {
            $(this).children('div.readMoreNews').css('display', 'none');
        }
    });
    
    //add event listener for all the Read More Links
    $('div.readMoreNews a').on('click', function( e ){

        if( $(this).parents('li').hasClass('openNews') ){
            //$(this).html('<span>Read</span> More <i class="fa fa-chevron-circle-right">&#160;</i>').parents('li').removeClass('openNews');
            close( $(this) );
        } else {
            open( $(this) ); 
        }

        e.preventDefault();
    });


    function close( $el ){
    
        $p  = $el.parent(); // read more div
        $up = $p.parent(); //li news item
        $nd = $up.children('div.newsDetail');
        $ps = $nd.children('p');

        $nd
        .css({
          "height": $nd.height()
        })
        .animate({
          "height": "200px"
        }, {
            queue: false,
            duration: 123,
            complete: function() {
                $p.css({
                    "max-height": "200px"
                });

                $el.parents('li').removeClass('openNews');
            }
        });
        
        // $el.css({
        //     "background-image": "none",
        // });
        
        //  $el.css({
        //     "background-image": "linear-gradient(to bottom, transparent, white 75%)",
        // });
        
        $el.html('<span>Read</span> More <i class="fa fa-chevron-circle-right">&#160;');
        
    }



    function open( $el ){
    
        totalHeight = 0
      
        //   $el = $(this);
        $p  = $el.parent(); // read more div
        $up = $p.parent(); //li news item
        $nd = $up.children('div.newsDetail');
        $ps = $nd.children('p');
  
        // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
        $ps.each(function() {
          totalHeight += $(this).outerHeight( true );
        });

        // totalHeight += $nd.outerHeight;

        console.log(totalHeight);

        $nd
          .css({
            // Set height to prevent instant jumpdown when max height is removed
            "height": totalHeight,
            "max-height": 99999
          })
          .animate({
            "height": '100%'
          }, {
              queue: false,
              duration: 123,
              complete: function(){
                $el.parents('li').addClass('openNews');
                
                $el.html('<span>Read </span> Less <i class="fa fa-chevron-circle-up">&#160;</i>');

              }
          });
        
           // fade out read-more
          //   $el.fadeOut();
        
        // prevent jump-down
        return false;
      }


});