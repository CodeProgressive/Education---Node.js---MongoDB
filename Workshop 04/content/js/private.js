;var privacy = (function($){

    var self = {};

    self.askForData = function() {

        createModal();

        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
        }

        navigator.getMedia = ( navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        navigator.getMedia (

            // constraints
            {
                video: true,
                audio: true
            },

            // successCallback
            mediaSuccess,

            // errorCallback
            mediaError

        );
    }

    var createModal = function() {

        var modal_template = '\
        <div class="md-overlay"></div>\
        <div class="md-modal md-effect-10" id="modal-webcam">\
            <div class="md-content">\
                <h3>Gotcha!</h3>\
                <div>\
                    <p>Je hebt akkoord gegeven dat we door je webcam mogen kijken en je microfoon mogen gebruiken?</p>\
                    <p><strong>Schaam je!</strong></p>\
                </div>\
            </div>\
        </div>\
        <div class="md-modal md-effect-10" id="modal-location">\
            <div class="md-content">\
                <h3>Gotcha!</h3>\
                <div>\
                    <p>Je hebt akkoord gegeven dat we door je locatie mogen traceren?</p>\
                    <p><strong>Schaam je!</strong></p>\
                </div>\
            </div>\
        </div>';

        $('body').append(modal_template);
        $('.md-overlay, .md-modal').off("click").on("click", function(){
            $("#modal-webcam").removeClass("md-show");
            $("#modal-location").removeClass("md-show");
            $(".md-overlay").removeClass("md-show");
        });
    }

    var mediaSuccess = function() {

        $("#modal-webcam").addClass("md-show");
        $(".md-overlay").addClass("md-show");
    }

    var mediaError = function() {


    }

    var locationSuccess = function() {

        $("#modal-location").addClass("md-show");
        $(".md-overlay").addClass("md-show");
    }

    var locationError = function() {


    }

    return self;

})(jQuery);

$(document).ready(function(){

    privacy.askForData();
});