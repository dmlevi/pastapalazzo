$(document).ready(function() {
	
	boilWater();
	addNoodles();
	ladleSauce();
	serve();
	enjoy();
	
});

function boilWater() {
	var $background1 = ("images/bg-01.jpg");
	var $background2 = ("images/bg-02.jpg");
	var $background3 = ("images/bg-03.jpg");
	var $background4 = ("images/bg-04.jpg");
	$('#main').prepend('<img class="bg" src="'+$background1+'" style="z-index:2" />'+
	    '<img class="bg" src="'+$background2+'" style="z-index:1" />'+
	    '<img class="bg" src="'+$background3+'" style="z-index:1" />'+
	    '<img class="bg" src="'+$background4+'" style="z-index:1" />');

    // var $window = $(window);
    //     var $bg = $('.bg,.mask');
    // 
    //     $(window).scroll(function() {
        
        // if( $window.scrollTop > $bg.offset().top  ) {
        //             $bg.data('top',$bg.offset().top);
        //         }
        //         $('.bg,.mask').css('top',$(document).scrollTop());
    // });
}

function addNoodles() {
	
	$('.bg').eq(0).animate({'opacity':'1.0'})
	
	$(window).scroll(function(){
		var $menu = $('#menu').offset().top -50;
		var $about = $('h2.about').offset().top -50;
		var $reviews = $('.review').offset().top -50;
		var y = $(window).scrollTop();

		if( y < $menu ){
			$('.bg').animate({
				'opacity' : '0.0'
			},{queue:false});
			$('.bg').eq(0).animate({
				'opacity' : '1.0'
			},{queue:false});
			$('nav li').removeClass('on');
		}
		if( y >= $menu && y < $about ){			
			$('.bg').animate({
				'opacity' : '0.0'
			},{queue:false});
			$('.bg').eq(1).animate({
				'opacity' : '1.0'
			},{queue:false});
			$('nav li').removeClass('on');
			$('nav li.menu').addClass('on');
		}
		if( y >= $about && y < $reviews ){			
			$('.bg').animate({
				'opacity' : '0.0'
			},{queue:false});
			$('.bg').eq(2).animate({
				'opacity' : '1.0'
			},{queue:false});
			$('nav li').removeClass('on');
			$('nav li.about').addClass('on');
		}
		if( y >= $reviews){			
			$('.bg').animate({
				'opacity' : '0.0'
			},{queue:false});
			$('.bg').eq(3).animate({
				'opacity' : '1.0'
			},{queue:false});
			$('nav li').removeClass('on');
			$('nav li.reviews').addClass('on');
		}
		
	});
}

function ladleSauce() {
    
    $('nav ul li').each(function() {
		$(this).click(function() {
			$('nav ul li').removeClass('on');
			$(this).addClass('on');
			
			var findMe = $(this).index()+2;

			$('html, body').animate({
		        scrollTop: $('h2').eq(findMe).offset().top
		    },1000);
		});
	});
	
	$('.backtotop a').click(function() {
        $('html, body').animate({
	        scrollTop: 0
	    },1000);
    	return false;
	});
    
}

function serve() {
    
    $('.tweet').tweet({
        query: "from:pasta_palazzo #TodaysSpecials",
		count: 8,
		loading_text: "loading today's specials...",
		template: "{text}{time}"
	});
	 
	 $('.tweet').bind('loaded', function() {
	     fork();
	 }); 
    
}

function fork() {
    
        $('.tweet_text').each(function() {
            var $price = $(this).text().match(/(\d+(\.\d+)?)/);
            //var $price = $(this).text().match(/(\$\d+(\.\d+)?)/);
            //var $price = $(this).text().match(/^[0-9]+(\.[0-9]{1,2})?$/);
            var $priceIt = '<span class="price">'+$price[0]+'</span>';            
            $(this).replaceText($price[0],$priceIt)
        });
        
        console.log($('.tweet_text:contains("minutes")').length > 0)
        
        if( $('.ttime:contains("just")').length > 0 || $('.ttime:contains("second")').length > 0 || $('.ttime:contains("minute")').length > 0 || $('.ttime:contains("hour")').length > 0  ) {
            var monthNames = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
            var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

            var newDate = new Date();
            newDate.setDate(newDate.getDate());    
            $('#date').html(dayNames[newDate.getDay()] + " " + monthNames[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear());
            $('.ttime:contains("day")').each(function() {
                $(this).parent('li').hide();
            });
        }
        else {
            $('#date').html("We're sorry, but today's specials have not been updated. Please check back later or call us for this info!");
            $('.tweet').remove();
        }

}

function enjoy() {
    if( $(window).width() > 650  ) {        
        // $('#masthead').css({
        //             'position' : 'fixed'
        //         });
        $('.bg').css({
            'height' : 'auto'
        });
        $('.mask').css({
            'height' : 'auto',
            'display' : 'block'
        });
        $(window).scroll(function() {
            $('#masthead').animate({
                'top' : $(document).scrollTop()
            },{queue: false})
        });
    }
}