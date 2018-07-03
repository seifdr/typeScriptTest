//Script by Duncan Seif for the Feinberg Web Team on 07/03/18
//dynamically add youtube iframe API
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//select hero image button 
var button = document.body.querySelector('.hero-image a.button');
button.addEventListener('click', function (e) {
    //get a reference to the hero container
    var heroContainer = this.closest('.hero-image');
    //copy the hero container's orginal inner html to a variable for reference later
    var heroContainerDefaultContent = heroContainer.innerHTML;
    //build the iframe using the href from the hero btn
    var videoFrame = document.createElement('iframe');
    videoFrame.id = 'existing-iframe-example';
    videoFrame.src = this.href;
    videoFrame.frameBorder = '0';
    videoFrame.allowFullscreen = true;
    //replace hero html with video
    heroContainer.innerHTML = videoFrame.outerHTML;
    //activate the YouTubeiFrameAPI 
    var player;
    player = new YT.Player('existing-iframe-example', {
        events: {
            // 'onReady': onPlayerReady,
            'onStateChange': function (event) {
                // -1 is unstarted, 0 is ended, 1 is playing, 2 is paused, 3 is buffering, and 5 is cued
                if (event.data == 0) {
                    heroContainer.innerHTML = heroContainerDefaultContent;
                }
            }
        }
    });
    e.preventDefault();
});
