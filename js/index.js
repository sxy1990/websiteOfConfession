var mh = document.documentElement.clientHeight;
$(window).on('load resize',function(){
	mh=mh<770?770:mh;
	$('.page').css('height',mh);
});
jQuery(function($){
	var timer1 = null;
	var $trig=$('#J_slide_page .trig');
	var $page = $('.page');
    var currentPage = 0;      //当前的页面数
    var lock = true;        //函数节流，给定的一个变量
    move1();
    function move1(){
    	var index = 0;
    	var $pagetxt = $('.start .pagetxt');
    	var height = $pagetxt.find('p').outerHeight();
		var size = $pagetxt.find('p').size();
    	clearInterval(timer1);
    	$pagetxt.height(0);
    	if(currentPage==0){
			timer1 = setInterval(function(){
				index++;
				if(index>=size){
					clearInterval(timer1);
				}
				$pagetxt.stop(true,true).animate({
					'height':height*index
				},'slow');
				
			},1000);
		}else{
			index == size;
		}
		
    }
    function lover(){
    	var $lover = $('.start .lover');
    	$lover.find('img').attr('src','images/love2.png').end().css({
    		'left':'188px',
    		'top':'154px'
    	});
		$lover.fadeOut(1000,function(){
				$(this).find('img').attr('src','images/xisui.png').end().fadeIn().css({
					'left':'84px',
					'top':'74px'
				});
			});
	
    }
    
	
	//音乐播放
	var $play = $('.play');
	var $audio = document.getElementById('audio'); 
	$play.click(function(){
		if($audio.paused){
			$audio.play();
		}else{
			$audio.pause();
		}
	});
	$( "#snow.start" ).fallingSnow();
	
//滚屏
	
function navigate(currentPage){
	$(".container").animate({"top": -currentPage * mh + "px"},300, "easieEaseOutCubic");
        $page.eq(currentPage).addClass('start').siblings().removeClass('start'); 
		$trig.eq(currentPage).addClass('trig-current').siblings().removeClass('trig-current');
		move1(); 
        if(currentPage == 2){
        	lover();
        }
}
	$('.trigWrap').on('click','.trig',function(){
		var index = $(this).index();
		navigate(index);
	});
	$('#J_slide_page').on('click','.up',function(){
		
		currentPage = (--currentPage)<0?0:currentPage;
		navigate(currentPage);
	});
	$('#J_slide_page').on('click','.down',function(){
		
		currentPage = (++currentPage)>3?3:currentPage;
		navigate(currentPage);
	});
    $(document).mousewheel(function (e, delta) {
        if (lock) {
            currentPage = currentPage - delta;
            if (currentPage < 0) {
                currentPage = 0;
            }
            if (currentPage > 3) {
                currentPage = 3;
            }
             
//                让container进行动画
            navigate(currentPage);
           	
            
            //函数节流
            lock = false;
            //设置一个定时器，当这个时间到了以后，Lock又恢复为true
            setTimeout(function(){
                lock=true;
            },600);
        }
    });
});
