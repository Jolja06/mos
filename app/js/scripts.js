var PlaceholderAnimate = (function() {

    function init() {
        _setUpListners();
    }

    function _setUpListners() {
        $('.input-style').on('input', _placeholderUp );
        $('.input-pass').on('input', _changeEye );
    }

    function _placeholderUp() {
        var $this = $(this);

        if($this.val() == '') {
            $this.removeClass('placeholder--focused input-style--val');
        } else {
            $this.addClass('placeholder--focused input-style--val');
        }
    }

    function _changeEye() {
        var $this = $(this);
        if($this.val() == '') {
            $('.password-eye').css('background-position', '0px 0');
        } else {
            $('.password-eye').css('background-position', '26px 0');
        }
    }

    return {
        init: init
    }
})();

$(function() {
    $( "#city" ).selectmenu();
});

$("#tel").mask("+7 ?(999) 999 99 99");

PlaceholderAnimate.init();


