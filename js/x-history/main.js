	var $homeWrapper = $('#home');
	var $win = $(window);
	var $body = $('body, html');
	var $singleChapter = $('.single-chapter');
	var $chaptersWrapper = $('#carousel');
	var $draggableHandle = $('.handle');
	var $audio = $('audio');
	var singleChapterLength = $singleChapter.length;
	var dragged = 0;
	var audioPlaying = 0;
	var audioFile;
	var audioFileWrapper;
	var target;
	var active;
    var winHeight = $win.height();
	var	winWidth = $win.width();
	var chapterTitle;
	var storyTitle;
	var winHeight;
	var winWidth;
    var pausePlayButton;
	var pausePlayIcon;
	var nextAudio;
	var bigPausePlayButton;	
	var $scrubBarPlayPause = $('#scrub-wrapper').find('.icon-play');
	var $scrubBarPlayPauseIcon = $scrubBarPlayPause.find('i');
	var $individualSongPlayPause = $('.single-play .icon-play');
	var allStories = $('.story');
	var $scrubWrapperWidth = $('#scrub-wrapper .right').width();
	var $seekBar = $('.played');
	var loadBarWidth;
	
	

    
    // reset dimensions initially
    reset();
    
//     $('#loader').css({height:winHeight})


// ============================== //
//          EVENTS                //
// ============================== //
	
	$win.ready(function(){
		
		console.log('window-loaded')
        $('#loader').fadeOut('slow')

        //initialize the slider/scrubber
        $seekBar.slider();
		
	});
	
    // if it's mobile change the download buttons
    if ( Modernizr.touch  ) {
        $body.addClass('touch');
    } else {
        $body.addClass('no-touch');
    }
	
	
	// resize dimensions on window resize
	$win.resize(function(){
		draggable.reflow();
		reset();
	});
	
	
    // keyboard navigation
    $(document).on("keydown", function(e) {

        switch (e.which) {
            
            //spacebar
            case 32:

            if (audioPlaying === 0 && typeof audioFileWrapper != 'undefined' ) {
                
                playAudio();
                
            } else if (audioPlaying === 1) {
                
                pauseAudio();
                console.log('puase that shits')
                
            }


        }


    });





    $('#scroll-placeholder').css({'height':winHeight*2})
    
    $win.on('scroll', function(){
                
        if ( $win.scrollTop() > winHeight && $('#main-wrapper').hasClass('fixed') ) {
            
            console.log('unfix mainwrapper')
            
            $('#main-wrapper').removeClass('fixed');
            $('#scroll-placeholder').css({'height':0})
            
        } 
        
        else if ($win.scrollTop() < winHeight && !$('#main-wrapper').hasClass('fixed')) {
            
            console.log('fix mainwrapper');
            $('#main-wrapper').addClass('fixed');
            $('#scroll-placeholder').css({'height':winHeight*2})
        }
        
        
    });



    $('.scroll-to-first').on('click', function(){
        
        $body.animate({scrollTop: winHeight + 10}, 1000, 'easeOutQuint');
        
        console.log('clicked')
        
    });




	// individual song play icons
	$individualSongPlayPause.on("click", function(){
		
		pausePlayButton = this; // returns <span class = "icon-play"></span>
		pausePlayIcon = $(pausePlayButton).children().children(); // returns i.fa.fa-play object		
		
		if ( pausePlayIcon.hasClass('fa-play') ) {
    	
    		playAudio();
		
		} else if ( pausePlayIcon.hasClass('fa-pause') ) {
    		
    		pauseAudio();
    		
		}		
		
		return false;
		
	});
	
	
/*
	$('.donation').on('click', function(){
    	
    	$(this).next('.thanks.hidden').removeClass('hidden')
    	
    	return false;
    	
    	
	});
*/
	
	
	//scrub bar play button
	$scrubBarPlayPause.on('click', function(){
    	
    	if ( $scrubBarPlayPauseIcon.hasClass('fa-play') ) {
        	
    		playAudio();
        	
    	} else if ( $scrubBarPlayPauseIcon.hasClass('fa-pause') ) {
        	
    		pauseAudio();
        	
    	}
    	
    	return false;
    	
    	
	});
	
	function playNext() {
    	
    	pausePlayButton = nextAudio.parent().find('.icon-play')[0];
    	pausePlayIcon = $(pausePlayButton).children().children();
    	
    	setTimeout(function(){
        	playAudio();
    	}, 10);
		
    	
	}

	


	// find each stories length
	function setStoryDuration() {
    	$audio.each(function(){
        	
            // convert the time to minutes and seconds
            var minutes = Math.floor(this.duration / 60);
            var seconds = Math.floor(this.duration - (minutes * 60));
            seconds = seconds < 10 ? "0"+ seconds : seconds;
            var convertedTime = minutes + ":" + seconds;
            
        	// drop in the duration for each story
        	$(this).closest('.story').find('.audio-duration').html(convertedTime)
        	
        	console.log(this)
        	console.log(convertedTime)
    	});
	}

	
	
	
	function playAudio() {
        
        console.log(pausePlayButton)
        console.log(pausePlayIcon)
        
        // grab all the info about the story that's playing
        audioFileWrapper = $(pausePlayButton).nextAll('audio');
        audioFile = audioFileWrapper[0];
        chapterNumber = audioFileWrapper.closest('.single-chapter').attr('data-index') ;
        chapterTitle = audioFileWrapper.closest('.single-chapter').find('h2').text();
        storyTitle = audioFileWrapper.closest('.story').find('h4').text();
        nextAudio = audioFileWrapper.closest('.story').next().find('audio');
                                    	
    	// if another story is playing pause it
    	if (audioPlaying === 1) {
        	
        	console.log('another songs playing so pause it and clear the timer')
        	
        	// reset the timer
        	clearInterval(songTimer)
        	
            // pause any that are playing
        	$('audio.playing')[0].pause();
        	$('audio.playing')[0].currentTime = 0;
        	
        	// remove .playing to the button
        	$('.icon-play.playing').removeClass('playing');
        	
        	// change pause icon to play
            $('.fa-pause').removeClass('fa-pause').addClass('fa-play')
        	
        	// remove playing class from any that are playing
        	$('audio.playing').removeClass('playing')
            $scrubBarPlayPause.removeClass('playing');        
        	
//         	$(pausePlayButton).removeClass('playing');
        	
        	
    	} 
    	
    	
    	if ( $('.scrub-hidden').length ) {
        	
        	$('.footer').removeClass('.scrub-hidden').addClass('scrub-visible');
        	
    	}
        	
    	// drop in the chapter number, chapter title and story title into the scrub bar
    	$('#scrub-wrapper .chapter-number').html(chapterNumber)
        $('#scrub-wrapper .chapter-title').html(chapterTitle)   
        $('#scrub-wrapper .story').html(storyTitle)  
    	
    	// turn the scrub bar play button to a pause button
    	$scrubBarPlayPause.find('i').removeClass('fa-play').addClass('fa-pause')
    	
    	// play the audio
    	audioFile.play();
    	
    	// add .playing to the button
    	$(pausePlayButton).addClass('playing');
        $scrubBarPlayPause.addClass('playing');        
    	
    	// change play icon to pause
    	pausePlayIcon.removeClass('fa-play').addClass('fa-pause')
        
        // add playing class to audioFileWrapper
        audioFileWrapper.addClass('playing');	
    	
    	// let us know htere's audio playing
        audioPlaying = 1;
        	
    	
    	
    	songTimer = setInterval(function(){
        	
        	updateTime();
        	
//         	console.log('timers running')
        	
        	
    	}, 100);
    	
    	
        // let us know when the story ends
        trackAudioEnd(audioFileWrapper, audioFile); 
        
        
        
        audioFile.addEventListener('progress', function(){
              
              var bufferedTimes =[];
              
              for ( i = 0; i < audioFile.buffered.length; i++ ) {
                  
                  bufferedTimes.push([ audioFile.buffered.end(i) ])
                  
                  console.log(bufferedTimes)
                  
                  
                  loadBarWidth = (100 / audioFile.duration) * bufferedTimes[i];
                  $('.load-bar').css({width:  loadBarWidth + "%" });
                  console.log(loadBarWidth)
                  console.log(bufferedTimes[i])
                
                if ( audioFile.currentTime >= bufferedTimes[i]) {
                 
                  $('.fa-pause').removeClass('fa-pause').addClass('fa-refresh fa-spin');  
                 
                  console.log('display spinning icon')
                } else if ( $('.fa-refresh').length ) {
                  
                  $('.fa-refresh').removeClass('fa-refresh fa-spin').addClass('fa-pause')
                  
                }
                  
                  
                console.log (i)
                

                  
              }
              
              
        }, false);           	
    	
    	
    	
    	console.log('playAudio')
	}
	
	
	
	
	
	function trackAudioEnd() {
    	
    	// track when the story ends
    	audioFile.addEventListener('ended',function(){
            
            console.log('storys over bro');
        	
        	pauseAudio();            
        	
        	
        	// if there's another song in the queue play it
        	if ( nextAudio.length ) {
            	
            	console.log('theres another song coming up')

                // use timeout to block skipping over the next song when dragging the slider 
                // to the end position of the scrub bar
                setTimeout(function(){
                    playNext();
                }, 0);
                
        	} else {
            	
            	$('.footer').removeClass('scrub-visible').addClass('scrub-hidden');
            	
        	}
        	
        	
            $('audio').each(function(){
                
                $(this).currentTime = 0;
                
            });
        	        	
            
            
    	})
    	
	}
	
	
	
	
	
	
	
	function updateTime() {
    	
        var currentTime = audioFile.currentTime;
        var currentTimeMinutes = Math.floor(currentTime / 60);
        var currentTimeseconds = Math.floor(currentTime - (currentTimeMinutes * 60));
        currentTimeseconds = currentTimeseconds < 10 ? "0"+ currentTimeseconds : currentTimeseconds;
        var convertedCurrentTime =  currentTimeMinutes + ":" + currentTimeseconds;    
        
           
        var duration = audioFile.duration;
/*
        var durationMinutes = Math.floor(duration/60);
        var durationSeconds = Math.floor(duration - (durationMinutes * 60) )
        durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;
        var convertedDuration = durationMinutes;
*/
        
        var timeLeft = duration - currentTime;
        var timeLeftMinutes = Math.floor(timeLeft/60);
        var timeLeftSeconds = Math.floor( timeLeft - (timeLeftMinutes * 60) )
        timeLeftSeconds = timeLeftSeconds < 10 ? "0" + timeLeftSeconds : timeLeftSeconds;
        var convertedTimeLeft = timeLeftMinutes + ":" + timeLeftSeconds
        
        
/*
        var minutes = Math.floor(this.duration / 60);
        var seconds = Math.floor(this.duration - (minutes * 60));
        seconds = seconds < 10 ? "0"+ seconds : seconds;
        var convertedTime = minutes + ":" + seconds;
    	var timeIn = audioFile.currentTime;
    	var timeLeft = audioFile.duration - audioFile.currentTime;
*/
            
/*
        console.log(convertedCurrentTime)
        console.log(isNaN(12))
        console.log(convertedTimeLeft)
        console.log(isNaN(convertedTimeLeft))
*/

/*
        console.log(timeLeft)
        console.log(currentTime)
*/
    	
        if ( isNaN(timeLeft) || isNaN(currentTime) ) {
            
//             console.log('not a number display zero')
            
            $('#scrub-wrapper .current-time').html('0:00');
            $('#scrub-wrapper .remaining-time').html('0:00');
            
            
        } else {
            
//             console.log('both are numbers')
            
            $('#scrub-wrapper .current-time').html(convertedCurrentTime);
            $('#scrub-wrapper .remaining-time').html("-" + convertedTimeLeft);
            
        }
        
/*
        console.log(duration)
        console.log(convertedCurrentTime)
        console.log(100/duration)
*/
        
        var value = (100 / duration) * currentTime;
        
        
        // seekbar
                
        // update the seekbar with the value
        $seekBar.slider('option', 'value', value);
        
    	
	}
	


    $seekBar.slider({
        step: .01,
        animate: "fast",
        slide: function(event, ui) {

            audioFile.currentTime = ui.value * (audioFile.duration / 100);            


        }
    });

	
	
	
	
	
	function pauseAudio() {
		
        console.log(pausePlayButton)
        console.log(pausePlayIcon)
    	
    	// pause the audio
        audioFile.pause();   
    	
    	// let us know the audio is not playing
		audioPlaying = 0;
		
    	// remove .playing to the button
    	$(pausePlayButton).removeClass('playing');
        $scrubBarPlayPause.removeClass('playing');        
    	
    	// change pause icon to play
    	pausePlayIcon.removeClass('fa-pause').addClass('fa-play')
    	
    	// turn the scrub bar play button to a pause button
    	$scrubBarPlayPause.find('i').removeClass('fa-pause').addClass('fa-play')
        
        // remove playing class to audioFileWrapper
        audioFileWrapper.removeClass('playing');	
		
		// clear the scrub bar timer
		clearInterval(songTimer)
				
		
	}
	
	
	function stopAudio(pausePlayButton, pausePlayIcon) {
		
		
		audioPlaying = 0;
		
	}


// ============================== //
//         END EVENTS             //
// ============================== //








// ============================== //
//          NAMED FUNCTIONS       //
// ============================== //

	// reset sizes
	function reset() {	
		
		winHeight = $win.height();
		winWidth = $win.width();
		$homeWrapper.css({height:winHeight})
		$singleChapter.css({width:winWidth})
    	$draggableHandle.css({width: singleChapterLength * winWidth})
// 		$chaptersWrapper.css({width: winWidth * singleChapterLength})

	}

	



	// handles dragging for navigation
	var draggable = new Dragdealer('carousel', {
	  steps: singleChapterLength,
	  speed: 0.1,
	  loose: true,
	  requestAnimationFrame: true,
	  callback: function(x, y) {

		var active = parseInt(x * singleChapterLength);
		
		// basically setting the last frame to be the right index
		if (x === 1) {
    		var active = active - 1;
		}
		
		dragged = 1;
		console.log(x, active)
		
		var newUrl = $('.single-chapter:eq(' + active + ')').attr('data-title');	
			
		$.address.value(newUrl);  	
						
		dragged = 0;

	  }

	});

	
	
	
	$(document).on('click', 'ul#nav-list li', function(e) {
	  
	  	var target = $(this).index(); // 0, 1 etc		
		var newUrl = $('.single-chapter:eq(' + target  + ')').attr('data-title');
		dragged = 0;	

		// update the url
		$.address.value(newUrl);  	
		
		console.log(target)
		
		return false;    
	  
	});

	
	$.address.change(function(event) {  
	    
		var newSlidePath = event.value.split('/');
		var newSlideTitle = newSlidePath[1];
		var newSlide = $("[data-title = " + newSlideTitle + "]")
		var newSlideIndex = newSlide.index();
	    
	    $('.single-chapter.active').removeClass('active');
	    $('.single-chapter:eq('+ newSlideIndex +')').addClass('active');
	   
	    $('ul#nav-list li a.active').removeClass('active');
	    $('ul#nav-list li a:eq('+ newSlideIndex +')').addClass('active');
	    
	    // animate the new slide in after nav is clicked -- not when it's dragged
	    if ( dragged !== 1 ) {
		    
		    draggable.setStep(newSlideIndex + 1, 0);  		    
		    
	    }
	    
	    
	    console.log('change')
	  
	}); 






// ================================= //
//       END NAMED FUNCTIONS        //
// =============================== //




