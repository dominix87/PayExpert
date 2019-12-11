$(function()
{
  Index.init();
});

var Index =
{
  init:function()
  {

    $.get("https://ipinfo.io", function(response) {
      $('input[name=city]').val(response.city);
      $('input[name=region]').val(response.region + ', ' + response.country);
      $('input[name=country]').val(response.country);
    }, "jsonp");

    const observer = lozad();
    observer.observe();


    $('input[name=phone]').mask('+38(099)999-99-99');

    Index.magnificPopUp();

  },



  magnificPopUp: function(){

    $('.popup-gallery').magnificPopup({
      type:'image',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,0] // Will preload 0 - before current, and 1 after the current image
      }
    });

    $('.openVideo').magnificPopup({
      tClose: 'Закрыть (Esc)',
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"><svg width="22px" height="22px"><path fill-rule="evenodd"  fill="rgb(0, 0, 0)" d="M-0.000,10.000 L-0.000,12.000 L10.000,12.000 L10.000,22.000 L12.000,22.000 L12.000,12.000 L22.000,12.000 L22.000,10.000 L12.000,10.000 L12.000,-0.000 L10.000,-0.000 L10.000,10.000 L-0.000,10.000 Z"/></svg></button>',
      type: 'iframe',
      preloader: true,
      fixedContentPos: true,
      midClick: true,
      closeBtnInside: false,
      mainClass: 'mfp-zoom-in',
      verticalFit: true
    });
  },


  //Инициализация прокрутки
  go_to:function(fThis, e){
    if($(window).width() < 600){
      $('.closeMenu','#mobMenu').click();
    }

    e.preventDefault();
    var id = $(fThis).attr('href');
    if( $(id).length != 0)
    {
      $('html, body').animate({scrollTop: ($(id).offset().top - 40)}, 1500);
    }
  },

  sendInit: function (fThis){

    var warning_ico = '<svg version="1.1" class="warning_ico" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 292.805 292.805" xml:space="preserve"><path style="fill:#ff0000" d="M137.583,18.265L1.709,259.709c-4.933,8.767,1.402,19.601,11.462,19.599c57.413-0.01,208.901-0.037,266.469-0.047c10.059-0.002,16.388-10.833,11.454-19.598c-44.565-79.158-135.89-241.399-135.89-241.399C151.62,11.907,141.167,11.907,137.583,18.265z M145.761,248.714c-10.028,0-18.162-8.136-18.162-18.163c0-10.029,8.134-18.165,18.162-18.165c10.03,0,18.165,8.136,18.165,18.165C163.926,240.578,155.791,248.714,145.761,248.714zM160.925,98.708c0.023,0.487,0.02,0.992,0,1.471l-5.05,104.048c-3.149-1.214-6.539-1.948-10.114-1.948c-3.572,0-6.963,0.734-10.112,1.948l-5.05-104.048c-0.402-8.376,6.051-15.493,14.428-15.898C153.403,83.876,160.52,90.332,160.925,98.708z"/></svg>';
    var error_mess_1 = '<div class="allert">' + warning_ico + '</div>';
    var error_mess_2 = '<div class="allert"><span>Введите корректное имя</span>' + warning_ico + '</div>';
    var error_mess_3 = '<div class="allert"><span>Введите корректный e-mail</span>' + warning_ico + '</div>';
    var error_mess_4 = '<div class="allert"><span>Введите корректный номер телефона</span>' + warning_ico + '</div>';


    $('.inputWrapper').each(function(){
      $(this).removeClass('error');
    });
    $(':input.error').removeClass('error');
    $('.allert').remove();


    var sbmBtn = $(fThis).find('.btn'),
        ref = $(fThis).find('[required]'),
        formData = $(fThis).serializeArray(),
        error = 0;

    $(ref).each(function() {
      if ($(this).val() == '') {
        var errorfield = $(this);
        $(this).closest('.inputWrapper').addClass('error').append(error_mess_1);
        error = 1;
        $(':input.error:first').focus();
        return;
      } else {
        if ($(this).attr('type') == 'text') {
          var thisValueL = $(this).val().length;
          if (thisValueL < 3) {
            var errorfield = $(this);
            $(this).closest('.inputWrapper').addClass('error').append(error_mess_2);
            error = 1;
            $(':input.error:first').focus();
          }
        }
        // if ($(this).attr('type') == 'tel') {
        //   if ($(this).hasClass('is-complete')) {
        //   } else {
        //     error = 1;
        //     $(':input.error:first').focus();
        //     $(this).closest('.inputWrapper').addClass('error').append(error_mess_4);
        //   }
        // }
        if($(this).attr('type') == 'email'){
          console.log($(this).val());
          var pattern =/^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
          if(pattern.test($(this).val())){
          }
          else{
            error = 1;
            $(':input.error:first').focus();
            $(this).closest('.inputWrapper').addClass('error').append(error_mess_3);
          }
        }
      }
    });

    if(error == 0)
    {
      $(sbmBtn).attr('disabled','disabled');
      $(fThis).trigger('reset');
      $(location).attr('href', 'success.html')
      // setTimeout(function(){
      //   $(location).attr('href', 'success.html')
      // }, 5000);
      // $.ajax(
      //     {
      //       url: "db/registration.php",
      //       cache: false,
      //       type: "POST",
      //       data: formData,
      //       dataType: "json",
      //       success: function(data){
      //         if(data.status == 'ok'){
      //           $(location).attr('href', '/success.html');
      //         }
      //       },
      //       error: function(){
      //         console.log('ALARM ERROR');
      //       }
      //     }
      // );
    }
    else{
      console.log('error')
    }
  },

  fixedHeader:function(){
    $(window).scroll(function()
    {
      if ($(this).scrollTop() > 20)
      {
        $('header').addClass('fixed');
      }
      if ($(this).scrollTop() < 20)
      {
        $('header').removeClass('fixed');
      }
    });
  },

  openMenu:function(){
    $('#mobMenu').css('left', 0);
  },

  closeMenu:function(){
    $('#mobMenu').css('left', '-100%');
  },

  showFormSpec:function(fThis){
    var title = $(fThis).attr('data-title'),
        btnText = $(fThis).attr('data-btnName'),
        orderType = $(fThis).attr('data-orderType');


    $('#mainForm').find('.title').html(title);
    $('#mainForm').find('.btn').html(btnText);
    $('#mainForm').find('[name=order_type]').val(orderType);


    $.magnificPopup.open({
      items:{
        src: '#mainForm',
        type: 'inline'
      }
    })
  },

  callBackForm:function(){
    $.magnificPopup.open({
      items:{
        src: '#callBackForm',
        type: 'inline'
      }
    })
  },

  openModalText: function() {
    $.magnificPopup.open({
      items:{
        src: '#modalText',
        type: 'inline'
      }
    })
  },


  openYoutube:function(fThis){
    var e = "https://www.youtube.com/embed/" + fThis.id + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1";
    $(fThis).next('.playBtn').hide();
    $(fThis).data("params") && (e += "&" + $(fThis).data("params"));
    var a = $("<iframe/>", {class:"el", frameborder: "0", src: e, width: $(fThis).width(), height: $(fThis).height()});
    $(fThis).replaceWith(a)
  },

  showPolitics:function(int){
    event.preventDefault();
    if (int == 1) {
      $.magnificPopup.open({
        items:{
          src: '#modalPolitics1',
          type: 'inline'
        }
      })
    }
    else if(int == 2){
      $.magnificPopup.open({
        items:{
          src: '#modalPolitics2',
          type: 'inline'
        }
      })
    }
    else if(int == 3){
      $.magnificPopup.open({
        items:{
          src: '#modalPolitics3',
          type: 'inline'
        }
      })
    }
  }

};