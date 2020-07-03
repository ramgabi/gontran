$(document).ready(function(){
 
/*gnb & scroll*/

var pageNum = 0;
var currentPageNum = 0;
var pageContents = [$('.visual'),$('.ingre'),$('.store'),$('.event'),$('.contact')];

function showMenuColor(li){
  $('.menu_list li.on').toggleClass('on');
  $(li).parent().toggleClass('on');
}

function showFooter(){
  $('.contact_box').toggleClass('on');
  $('#footer').toggleClass('on');
}

function scrollPage(pageTop){
  $('html,body').animate({
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

var eventLiWidth = $('.event_list li').width();
var eventLiMargin = parseInt(($('.event_list li').css('marginRight')));
var eventLiLength = $('.event_list li').length+1;
var eventWidth = (eventLiWidth+eventLiMargin)*eventLiLength+'px';



$(window).on('resize',function(){
  $('.event_list').css('width',eventWidth)
})

function eventSlide(){
  var eventShow = false;
  if(eventShow){
    
  }
}

function WheelDirection(delta){
  const menuLi = $('.menu_list li');

  if(delta > 0 && pageNum > 0){
    if(pageNum == 5){
      showFooter();
      pageNum--;
    }else if(pageNum == 3){
      eventSlide()
    }else{
      menuLi.eq(--pageNum).find('a').trigger('click');
    }
  }else if(delta < 0 && pageNum < 5){
    if(pageNum == 4){
      showFooter();
      pageNum++;
    }else{
      menuLi.eq(++pageNum).find('a').trigger('click');
    }
  }
}

$(window).on('mousewheel',function(e){
  var delta = e.originalEvent.wheelDelta;
  if(!$('html,body').is(':animated')){
    WheelDirection(delta);
  } 
})

$('.menu_list li').each(function(num){
  $(this).find('a').on('click',function(e){
    e.preventDefault();
    if(!$('html,body').is(':animated')){
      showMenuColor(this)
      checkPageTop(num);
      pageNum=num;
    }
  })
})

/* visual banner */

var visualSid=setInterval(nextVisual,5000)
var visualNum = 0;
var visualLength = $('.visual_cont').length-1;

slideBar();

function slideBar(){
  $('.visual_bar').stop().css('width',0).animate({
    width:'100vw'
  },5000,function(){
    $(this).css('width',0)
  })
}

function visualBtnNum(num){
  $('.visual_num a.on').removeClass('on');
  $('.visual_num a:eq('+num+')').addClass('on');
  slideBar();
}

function prevSlide(num){
  $('.visual_cont.on').stop().animate({
    left:'100vw'
  },1000,function(){
    $(this).css('left',0).removeClass('on');
  });
  $('.visual_cont').eq(num).css('left','-100vw').addClass('on').stop().animate({
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
  $('.visual_cont').eq(num).css('left','100vw').addClass('on').stop().animate({
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

$('.visual_btn a').on('click',function(e){
  e.preventDefault();
  clearInterval(visualSid);
  visualSid=setInterval(nextVisual,5000);
  if(!$('.visual_cont').is(':animated')){
    checkDirection(this.className);
  }
})

$('.visual_num a').on('click',function(e){
  e.preventDefault();
  clearInterval(visualSid);
  visualSid=setInterval(nextVisual,3000);
  if(!$('.visual_cont').is(':animated') && !$(this).hasClass('on')){
    nextSlide($(this).index());
    visualNum=$(this).index();
  }
})

/* ingre */

$('.ingre_btn li').on('click',function(e){
  e.preventDefault();
  if(!$(this).hasClass('on')){
    var thisClass = $(this).attr('class');
    var thisNum = $(this).index();
    $('.ingre_btn li.on').attr('class',thisClass);
    $(this).attr('class','on');

    $('.ingre_list li.on').removeClass('on');
    $('.ingre_list li:eq('+thisNum+')').addClass('on');
  }
})

/* store */

// const storeList = ['서울','인천','경기','경남','부산','충남','대구','강원','제주']

$('.location li a').on('click',function(e){
  e.preventDefault();
  $(this).parent().toggleClass('on')
})




})