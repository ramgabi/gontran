$(document).ready(function(){
 
  // 반응형 대응
  
  const $window = $(window),
  $visual_cont = $('.visual_cont'),
  $visual_bar = $('.visual_bar'),
  $visual_num = $('.visual_num'),
  $visual_btn = $('.visual_btn');


  var checkSid,
  isWeb,
  isTab,
  windowHeight,
  windowWidth;
  
checkSize();

function checkSize(){
  windowWidth = $window.width();
  windowHeight = $window.height();
  isWeb = false;
  isTab = false;
  isMobile = false;
  if(windowWidth >= 1280){
    isWeb = true;
    slideBar();
  }else if(windowWidth >= 768 && windowWidth <= 1280){
    isTab = true;
    $visual_bar.stop().css('width','0');
  }
}

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
  $htmlBody.stop().animate({
    scrollTop:pageTop
  },1500)
  clearInterval(CheckScroll);
}

function checkPageTop(pageNum){
  if(currentPageNum!==pageNum){
    var pageTop = pageContents[pageNum].offset().top;
    currentPageNum=pageNum;
    scrollPage(pageTop);
  }
}


function moveEventRight(){
  $event_list.stop().animate({
    right:'5%'
  },1000);
  eventShow = true;
}

function moveEventLeft(){
  $event_list.stop().animate({
    right:'-35%'
  },1000);
  eventShow = false;
}

var eventShow = false;

function eventDownSlide(){
  if(!eventShow){
    moveEventRight();
  }else{
    $menuLi.eq(++pageNum).find('a').trigger('click');
  }
}

function eventUpSlide(){
  if(eventShow){
    moveEventLeft();
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

  
$menuLi.each(function(num){
  $(this).find('a').on('click',function(e){
    e.preventDefault();
    if(!$htmlBody.is(':animated')){
      showMenuColor(this)
      checkPageTop(num);
      pageNum=num;
    }
    clearInterval(CheckScroll);
  })
})

$window.on('resize',function(){
 clearInterval(checkSid)
 checkSid = setTimeout(checkSize,500)
})

$window.on('mousewheel',function(e){
    var delta = e.originalEvent.wheelDelta;
    if(!$htmlBody.is(':animated') && !$event_list.is(':animated') && isWeb){
      WheelDirection(delta);
    } 
  })

//tablet

var touchStartX,
touchEndX,
CheckScroll;

function checkEventWay(){
  var touchCal = touchEndX-touchStartX
  if(touchCal < 0){
    moveEventRight();
  }else{
    moveEventLeft();
  }
}

$event_list.parent().on({
  touchstart:function(e){
    touchStartX = e.originalEvent.changedTouches[0].pageX;
  },
  touchend:function(e){
    touchEndX = e.originalEvent.changedTouches[0].pageX;
    if(isTab){
      checkEventWay();
    }
  }
})

$event_list.parent().on({
  mousedown:function(e){
    touchStartX = e.pageX;
  },
  mouseup:function(e){
    touchEndX = e.pageX;
    if(isTab){
      checkEventWay();
    }
  }
})

//mobile

//scroll menu

checkMenu();

function checkMenu(){
  var scrollPos = $window.scrollTop();
  const pageContLength = pageContents.length-1
  
  for(var i = 0 ; i <= pageContLength; i++ ){
    if(scrollPos > pageContents[i].offset().top-(windowHeight/3)){
      var scrollLi = $menuLi.eq(i).find('a');
      showMenuColor(scrollLi);
      currentPageNum=scrollLi.parent().index();
      pageNum=scrollLi.parent().index();
    }
  }
}

$window.on('scroll',function(){
  clearInterval(CheckScroll);
  CheckScroll = setTimeout(checkMenu,500);
})



/* visual banner */

var visualSid=setInterval(nextVisual,8000),
visualNum = 0,
visualLength = $visual_cont.length-1;

slideBar();

function slideBar(){
  if(isWeb){
    $visual_bar.stop().css('width',0).animate({
      width:'100vw'
    },8000,function(){
      $visual_bar.css('width',0)
    })
  }else{
    return;
  }
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
  visualSid=setInterval(nextVisual,8000);
  if(!$visual_cont.is(':animated')){
    checkDirection(this.className);
  }
})

$visual_num.find('a').on('click',function(e){
  e.preventDefault();
  clearInterval(visualSid);
  visualSid=setInterval(nextVisual,8000);
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

  $footerTop.on('click',function(e){
    e.preventDefault();
    clearInterval(CheckScroll);
    if(isWeb){
      showFooter();
    }
    $menuLi.find('a:first').trigger('click');
  })

})