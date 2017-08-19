$(function(){
    $('.homepage-image img:gt(0)').hide();
    setInterval(function(){
            $('.homepage-image :first-child').fadeOut()
                .next('img').fadeIn()
                .end().appendTo('.homepage-image');},
        3000);
});