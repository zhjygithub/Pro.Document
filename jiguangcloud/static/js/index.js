$(function(){
    // 禁止F12
    // $("*").keydown(function (e) {//判断按键
    //     e = window.event || e || e.which;
    //     if (e.keyCode == 123) {
    //         e.keyCode = 0;
    //         return false;
    //     }
    // });
    // //禁止审查元素
    // $(document).bind("contextmenu",function(e){
    //     return false;
    // });
    $$.fontSize(document,window);
    var swiper = new Swiper('.swiper-container', {
                speed: 1000,
                effect:'slide',
                direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 30,
                mousewheel: true,
                pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        })
    $('.skill-main .skill-li').hover(function(){
        $(this).find('.skill_p').hide()
        $(this).find('.skill_span').show()
    },function(){
        $(this).find('.skill_p').show()	
        $(this).find('.skill_span').hide()
    })    
})
