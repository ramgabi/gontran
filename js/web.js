$(document).ready(function(){
 
/*header*/

var pageNum = 0;
var currentPageNum = 0;
var pageContents = [$('.visual'),$('.ingre'),$('.store'),$('.event'),$('.contact')];

function scrollPage(pageTop){
  pageContents[pageNum].animate({
    marginTop:'-100vh'
  },1500)
}

function checkPageTop(pageNum){
  if(currentPageNum!==pageNum){
    var pageTop = pageContents[pageNum].offset().top;
    currentPageNum=pageNum;
    scrollPage(pageTop);
  }
}

function WheelDirection(delta){
  if(delta > 0 && pageNum > 0){
    pageNum--;
  }else if(delta < 0 && pageNum < 4 ){
    pageNum++;
  }
  checkPageTop(pageNum);
}

$(window).on('mousewheel scroll',function(e){
  var delta = e.originalEvent.wheelDelta;
  WheelDirection(delta);
})




})