$z(document).ready(function(){
	$z('ul.zpmarkactive.default li a.active').parents('li').each(function(index){
		var that = this;
		if ( index > 0 ){
			$z(that).addClass('open');
		}
		$z(that).addClass('active');
	});
	$z("ul.zpmarkactive.default").removeClass("zpmarkactive");
});
$z(document).ready(function() {
	var useCssAnimation = false;
	var autoplay = true;
	if ( $z("body").hasClass("zpreducemotion") && 'slide' !== 'fade' ){  // don't allow moving animations
		autoplay = false;
	}
	function initSlider(){
		$z('#headerslider .flex-container').flexslider({
			useCSS: useCssAnimation,
			touch: true,
			keyboard: true,
			itemMargin: 0,
			animation: 'slide',
			controlsContainer: '#headerslider.flexslider',
			slideshow: autoplay,
			slideshowSpeed: 7000,
			directionNav: false,
			controlNav: false,
			randomize: false,
			start: function(){ setTimeout(zpieInit,1000); },
			pauseOnHover: true,
			smoothHeight: true,
			prevText: "zur&#252;ck",
			nextText: "weiter"
		});
		$z('#headerslider.flexslider').addClass("inited");
	}
	if ( $z('#headerslider .flex-container ul.slides li img').length > 0 ){
		$z('#headerslider .flex-container ul.slides li img').first().one("load", initSlider).each(function() {
			if(this.complete) $z(this).trigger('load');
		});
	}else{
		initSlider();
	}
	$z('#headerslider .flex-container ul.slides li[data-clickurl]').css("cursor","pointer");
	$z('#headerslider .flex-container ul.slides li[data-clickurl]').click(function (event){
		var targ;
		if (event.target){
			targ = event.target;
		}else if (event.srcElement) {
			targ = event.srcElement;
		}
		if (targ.nodeName == "A") {
			return;
		}
		if ( $z(this).data("clicktarget") ){
			window.open($z(this).data("clickurl"), $z(this).data("clicktarget"));
		}else{
			window.location = $z(this).data("clickurl");
		}
		event.preventDefault;
		return false;
	});
});
var sf, body;
var breakpoint = 768;
$z(document).ready(function () {
	$z("a#mobilenavtoggle").on("click", function(e){
		$z("#navbar").slideToggle(300, function (){
			$z("#navbar, #navbar ul.mainmenu, #mobilenavtoggle").toggleClass("on");
			$z(this).css("display",""); 	
		});
	});
});