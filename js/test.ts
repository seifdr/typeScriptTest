//Script by Duncan Seif for the Feinberg Web Team on 07/03/18

//dynamically add youtube iframe API
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// event.target.tagName 

//select section.hero element. We'll capture click event bubbling up the a.button tag here. 
//we have to capture bubbling events, because anything farther down the DOM gets broken on responsive sites, 
//and/or after the script succefully executes once

var button = document.body.querySelector('section.hero');

button.addEventListener('click', function(e:Event){ 

    //make sure the event bubble is orginating from an anchor tag
    if( e.target.tagName == 'A' || e.target.tagName == 'a' ){
        //make sure that event bubble anchor tag has a class button
        if( e.target.className == 'button'){

                //get a reference to the hero image. We will be swapping out the HTML of this element.
                var heroContainer = this.querySelector('.hero-image');

                //copy the hero container's orginal inner html to a variable for reference later
                var heroContainerDefaultContent = heroContainer.innerHTML;

                //build the iframe using the href from the hero btn
                var videoFrame = document.createElement('iframe');
                videoFrame.id = 'hero-iframe-swap';
                videoFrame.src = e.target.href;
                videoFrame.frameBorder = '0';
                videoFrame.allowFullscreen = true;

                //replace hero html with video
                heroContainer.innerHTML = videoFrame.outerHTML;

                // //activate the YouTubeiFrameAPI 
                var player;
                player = new YT.Player('hero-iframe-swap', {
                    events: {
                        // 'onReady': onPlayerReady,
                        'onStateChange': function(event){
                            // -1 is unstarted, 0 is ended, 1 is playing, 2 is paused, 3 is buffering, and 5 is cued
                            if( event.data == 0 ){
                                heroContainer.innerHTML = heroContainerDefaultContent;
                            }
                        }
                    }
                });

        } // end - if( e.target.className == 'button'){
    }

    e.preventDefault(); 
});