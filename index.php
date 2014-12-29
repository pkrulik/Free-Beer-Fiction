<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="img/brand/favicon.ico">
    <title>Free Beer & Fiction</title>
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.css">
    <link rel="stylesheet" href="//cloud.typography.com/791380/631026/css/fonts.css"><!-- typography dot com: Gotham -->
    <link rel="stylesheet" href="css/screen-fbf.css">
    <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  	<script src="//use.typekit.net/mbh1rcr.js"></script><!-- typekit dot com: Myriad -->
    <script>try{Typekit.load();}catch(e){}</script><!-- typekit dot com: Myriad -->
<!--     <script src="js/vendor/modernizr-2.6.2.min.js"></script> -->
    <!--[if gte IE 9]>
      <style type="text/css"> .gradient { filter: none;} </style>
    <![endif]-->
    <meta property="og:title" content="Free Beer & Fiction"/>
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://freebeerandfiction.com" />
    <meta property="og:image" content="https://freebeerandfiction.com/img/brand/fb-share.png"/>
    <meta property="og:description" content=""/>
<!--     <meta property="fb:page_id" content="115315355166456" /> -->

  </head>

<body>

    <div id = "loader"></div>
  <?php include 'incl/home.php'; ?>

  <div id = "main-wrapper" class = "fixed" style="overflow:hidden">
    <div id="branding">
      <div class="wrap expand-max">
        <a href="http://www.theviaagency.com" target="_blank"><img class="via-logo" src="img/via.svg" alt="The VIA Agency"></a>
        <div class="fbf-logotype"><p>Free Beer <img src="img/circ-ampersand.svg" alt="and"> <span>Fiction</span></p></div>
      </div><!--.wrap-->   
    </div><!--#branding-->

  <?php include 'incl/preamble.php'; ?>

    <div id="carousel" class="dragdealer">
    <div id="gradiation" class="across-chapters"></div><!--#gradiation-->
        <div class = "handle page">
            <?php include 'incl/2014-01.php'; ?>
            <?php include 'incl/2014-02.php'; ?>
            <?php include 'incl/2014-03.php'; ?>
            <?php include 'incl/2014-04.php'; ?>
            <?php include 'incl/2014-05.php'; ?>
            <?php include 'incl/2014-06.php'; ?>
            <?php include 'incl/2014-07.php'; ?>
            <?php include 'incl/2014-08.php'; ?>
            <?php include 'incl/2014-09.php'; ?>
            <?php include 'incl/2014-10.php'; ?>
        </div>
    </div>

    <div class="footer scrub-hidden">
      <?php include 'incl/2014-nav.php'; ?>
      <?php include 'incl/scrub.php'; ?>
    </div>

  </div>

    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js"></script>
    <script src="js/vendor/jquery.address.js"></script>
    <script src="js/vendor/dragdealer.js"></script>
    <script src="js/vendor/jquery-ui/jquery-ui.min.js"></script>
    <script src="js/jquery.tooltipster.min.js"></script>
	<script src="js/smooth-scroll.min.js"></script>
    <script src="js/pushy.min.js"></script>
    <script src="js/vendor/easing.1.3.js"></script>
    <script src="js/main.js"></script>

   


    <script type="text/javascript">
    
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-24019610-3']);
      _gaq.push(['_trackPageview']);
    
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    
    </script>   


	<script>
		smoothScroll.init({
			speed: 1000,
			easing: 'easeInOutCubic',
			updateURL: false,
		});
	</script>

    <script>
        $('.tooltip').tooltipster({
           animation: 'fade',
           delay: 350,
           theme: 'tooltipster-default',
           touchDevices: false,
           hideOnClick: true,
           speed: 300,
           trigger: 'hover'
        });    
    </script>


</body>
















