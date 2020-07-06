$(document).ready(function(){
 
/*gnb & scroll*/

var pageNum = 0, 
currentPageNum = 0;

const pageContents = [$('.visual'),$('.ingre'),$('.store'),$('.event'),$('.contact')];

const $menu_list = $('.menu_list'),
$menuLi = $('.menu_list li'),
$contact_box = $('.contact_box'),
$footer = $('#footer'),
$htmlBody = $('html,body'),
$event_list = $('.event_list');

function showMenuColor(li){
  $menu_list.find('li.on').toggleClass('on');
  $(li).parent().toggleClass('on');
}

function showFooter(){
  $contact_box.toggleClass('on');
  $footer.toggleClass('on');
}

function scrollPage(pageTop){
  $htmlBody.animate({
    scrollTop:pageTop
  },1500)
}

function checkPageTop(pageNum){
  if(currentPageNum!==pageNum){
    var pageTop = pageContents[pageNum].offset().top;
    currentPageNum=pageNum;
    scrollPage(pageTop);
  }
}

var eventShow = false;

function eventDownSlide(){
  if(!eventShow){
    $event_list.animate({
      right:'5%'
    },1000);
    eventShow = true;
  }else{
    $menuLi.eq(++pageNum).find('a').trigger('click');
  }
}

function eventUpSlide(){
  if(eventShow){
    $event_list.animate({
      right:'-35%'
    },1000);
    eventShow = false;
  }else{
    $menuLi.eq(--pageNum).find('a').trigger('click');
  }
}


function WheelDirection(delta){

  if(delta > 0 && pageNum > 0){
    if(pageNum == 5){
      showFooter();
      pageNum--;
    }else if(pageNum == 3){
      eventUpSlide()
    }else{
      $menuLi.eq(--pageNum).find('a').trigger('click');
    }
  }else if(delta < 0 && pageNum < 5){
    if(pageNum == 4){
      showFooter();
      pageNum++;
    }else if(pageNum == 3){
      eventDownSlide()
    }else{
      $menuLi.eq(++pageNum).find('a').trigger('click');
    }
  }
}

  
$('.menu_list li').each(function(num){
  $(this).find('a').on('click',function(e){
    e.preventDefault();
    if(!$htmlBody.is(':animated')){
      showMenuColor(this)
      checkPageTop(num);
      pageNum=num;
    }
  })
})


// 반응형 대응

const $window = $(window);
var checkSid,
isWeb;

checkWidth();

function checkWidth(){
  var windowWidth = $window.width();
  if(windowWidth >= 1280){
    isWeb = true;
  }else{
    isWeb = false;
  }
  checkWeb();
}

$window.on('resize',function(){
 clearInterval(checkSid)
 checkSid = setTimeout(checkWidth,500)
})

function checkWeb(){
  if(isWeb){
    jsForWeb();
  }else{
    return;
  }
}

function jsForWeb(){

  $(window).on('mousewheel',function(e){
    var delta = e.originalEvent.wheelDelta;
    if(!$htmlBody.is(':animated') && !$event_list.is(':animated') && isWeb){
      WheelDirection(delta);
    } 
  })
  return;
}


/* visual banner */

const $visual_cont = $('.visual_cont'),
$visual_bar = $('.visual_bar'),
$visual_num = $('.visual_num'),
$visual_btn = $('.visual_btn');


var visualSid=setInterval(nextVisual,5000),
visualNum = 0,
visualLength = $visual_cont.length-1;

slideBar();

function slideBar(){
  $visual_bar.stop().css('width',0).animate({
    width:'100vw'
  },5000,function(){
    $visual_bar.css('width',0)
  })
}

function visualBtnNum(num){
  $visual_num.find('a.on').removeClass('on');
  $visual_num.find('a:eq('+num+')').addClass('on');
  slideBar();
}

function prevSlide(num){
  $('.visual_cont.on').stop().animate({
    left:'100vw'
  },1000,function(){
    $(this).css('left',0).removeClass('on');
  });
  $visual_cont.eq(num).css('left','-100vw').addClass('on').stop().animate({
    left:0
  },1000);
  visualBtnNum(num);
}

function prevVisual(){
  if(--visualNum<0){
    visualNum=visualLength;
  };
  prevSlide(visualNum)
}

function nextSlide(num){
  $('.visual_cont.on').stop().animate({
    left:'-100vw'
  },1000,function(){
    $(this).css('left',0).removeClass('on');
  });
  $visual_cont.eq(num).css('left','100vw').addClass('on').stop().animate({
    left:0
  },1000);
  visualBtnNum(num);
}

function nextVisual(){
  if(++visualNum>visualLength){
    visualNum=0;
  };
  nextSlide(visualNum)
}

function checkDirection(btnClassName){
  if(btnClassName=='prev_btn'){
    prevVisual();
  }else{
    nextVisual();
  }
}

$visual_btn.find('a').on('click',function(e){
  e.preventDefault();
  clearInterval(visualSid);
  visualSid=setInterval(nextVisual,5000);
  if(!$visual_cont.is(':animated')){
    checkDirection(this.className);
  }
})

$visual_num.find('a').on('click',function(e){
  e.preventDefault();
  clearInterval(visualSid);
  visualSid=setInterval(nextVisual,5000);
  if(!$visual_cont.is(':animated') && !$(this).hasClass('on')){
    nextSlide($(this).index());
    visualNum=$(this).index();
  }
})

/* ingre */

const $ingre_btn = $('.ingre_btn'),
$ingre_list = $('.ingre_list');

$ingre_btn.find('li').on('click',function(e){
  e.preventDefault();
  if(!$(this).hasClass('on')){
    var thisClass = $(this).attr('class');
    var thisNum = $(this).index();
    $ingre_btn.find('li.on').attr('class',thisClass);
    $(this).attr('class','on');

    $ingre_list.find('li.on').removeClass('on');
    $ingre_list.find('li:eq('+thisNum+')').addClass('on');
  }
})

/* store */

const $location = $('.location li a');

$location.on('click',function(e){
  e.preventDefault();
  $(this).parent().toggleClass('on')
})

/* contact */

checkInputVal('text');
checkInputVal('tel');

function checkInputVal(type){
  $('input[type='+type+']').keyup(function(){
    if(!$(this).val()==''){
      $(this).prev('label').css('color','#ec9100')
    }else{
      $(this).prev('label').css('color','#555')
    }
  })
}

/* footer */

const $footerTop = $('#footer .top');

  $footerTop.on('click',function(){
    $menuLi.find('a:first').trigger('click');
    showFooter();
  })

})