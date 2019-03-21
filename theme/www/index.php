<?php include_once($_SERVER["LOCAL_PATH"]."/includes/segment.php") ?>
<!DOCTYPE html>
<html>
<head>
	<title>Er det J-dag?</title>
	<meta name="description" content="Er det J-dag?">
	<meta name = "viewport" content = "width=device-width, initial-scale=1.0">
	<meta property="og:title" content="Er det J-dag?" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="http://www.erdetjdag.dk/" />
	<meta property="og:description" content="Er det J-dag?" /> 

	<link rel="stylesheet" href="/css/lib/<?= $_SESSION["segment"] ?>/main.css">
</head>
<body>
	<div class="logo"></div>

	<div id="content" itemscope itemtype="http://schema.org/CreativeWork">

		<div class="middle">
			<div class="question" itemprop="headline"><p>Er det J-dag i dag?</p></div>
			<div class="answer">
				<p>JA!</p>
			</div>
			<div class="message"><p>Skål, vi ses derude</p></div>

			<div class="bar-list"><a href="http://www.tuborg.dk/j-dag2018/" target="_blank"></a></div>
			<div class="facebook"><a href="https://www.facebook.com/tuborgjulebryg/" target="_blank"></a></div>
		</div>


	</div>

	<div id="overlay">
		<div class="cookie-button"><p><span class="bigger">JER ER OVER 18 ÅR</span> <br> OG GIVER SAMSTYKKE TIL COOKIES</p></div>
		<div class="cookie-link"><a href="http://tuborg.dk/privatlivspolitik-og-cookiepolitik/ " target="_blank"><p>LÆS MERE OM COOKIES</p></a></div>
	</div>

	<div id="Animated"></div>


	<script src="js/pixi.min.js"></script>
	<script src="js/TweenMax.min.js"></script>

	<script src="js/lib/<?= $_SESSION["segment"] ?>/main.js"></script>
	<script src="js/lib/shared/AnimatedBanner.js"></script>
	<script src="js/lib/shared/AnimatedSnow.js"></script>
	<script src="js/lib/<?= $_SESSION["segment"] ?>/Core.js"></script>


</body>

</html>