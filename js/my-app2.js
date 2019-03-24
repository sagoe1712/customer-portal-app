// Initialize your app
var mixes = [];
var productdetails = [];
var custvar = [];
var proditm = [];
var quantity;
var prdprice;
var unitprice;
var category_id;
var category_name;
var product_code;
var prod_quant;
var totalprdprice;
var prod_signature;
var max_quant;
var img_url;
var branch_id;
var branch_name;
var delivery_type;
var state_id;
var product_name;
var city_id;
var delivery_price = 0;
var tprice;
var totalshipping;
var hasvariant;
//var member_no = 2111;
var voucher_code;
var order_no;
var mdt;
var exp_country_id;
var exp_country_name;
var exp_city_id;
var exp_city_name;
var exp_cate_id;
var exp_cate_name;
var exp_adult_price;
var exp_child_price;
var exp_location_id;
var exp_location_name;
var exp_day_slot = [];
var cat_list;
var cinema_list;
var counta;
var countb;
var cat_level_0;
var cat_level_1;
var exp_total_adult = 0;
var exp_total_kid = 0;
var exp_total_price = 0;
var exp_adult_quant;
var exp_kid_quant;
var exp_date, exp_start_time;
var exp_address_id;
var category_data=[];
var bill_name;
var customer_id_text;
var food_img;
var cinema_id;
var cinema_name;
var movie_name;
var events = [];
var event_name;
var event_count;
var event_ticket_type;
var event_venue;
var ticket_count;
var movie_details = [];
var movie_day_count = 0;
var movie_price;
var total_movie_price;
var cat_limit = 5;
var cat_delivery_type;
var cat_sort;
var cat_page=1;
var cur_no_itm = cat_limit;
var company_id = 2;
var package_name;
var currency_name;
var hasdelivery = 0;
var currency;
var del_state_id;
var del_state_name;
var del_city_id;
var del_city_name;
var addressid;
var event_total;

var myApp = new Framework7();

function logout(){
    window.location.replace("index.html");
}



// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

var mySwiper = myApp.swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
});

var mySwiper = myApp.swiper('.swiper-container2', {});
var mySwiper = myApp.swiper('.swiper-container3', {});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    cartcount();
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

(function ($) {
    "use strict";

    $(document).ready(function () {
        /*------------------------
        menu toggle
        --------------------------*/

        $(".js-toggle-menu").on('click', function () {
            $(".show-menu").slideToggle();
        });

        $(".js-toggle-menu2").on('click', function () {
            $(".show-menu2").slideToggle();
        });

        $('.swipebox').swipebox();

        $(".clickopen").on('click', function () {
            $(".popover-links").slideToggle();
        });


    });


})(jQuery);


$(document).on('click', '#btn-login', function () {



    var username = $('#txtUsername').val();
    var password = $('#pwdPass').val();
//	myApp.alert(username +" "+ password);
    if (username) {
        if (password) {

            //alert(username+" "+password);
            $.ajax({
                type: "POST",
                url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/login",
                dataType: "json",
                data:{"email":username, "password":password, "company_id":company_id},
                beforeSend: function(){
                    $('.loading-div').show();
                },
                success: function (msg) {
                    $('.loading-div').hide();
                    if (msg.status == 200) {
                        localStorage.setItem("token", JSON.stringify(msg.access_token));
                        window.location.replace('inner.html');

                    }
                    else {
                        myApp.alert(msg.message);
                        return false;
                    }
                }
            });
            return false;

        } else {
            myApp.alert("Kindly Enter Password");
            return false;
        }

    } else {
        myApp.alert("Kindly Enter Email Address");
        return false;
    }

});

$(document).on('click', '#btn-email-reset', function () {
    var resetemail = $('#resetemail').val();

    if(resetemail){
        $.ajax({
            type: "POST",
            url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/password/reset/request",
            dataType: "json",
            data:{"email":resetemail, "company_id":company_id},
            beforeSend: function(){
                $('.loading-div').show();
            },
            success: function (msg) {
                $('.loading-div').hide();
                if (msg.status == 200) {

                    myApp.alert(msg.message);
                    return false;

                }
                else {
                    myApp.alert(msg.message);
                    return false;
                }
            }
        });
        return false;
    }else {
        myApp.alert("Kindly Enter Email Address");
        return false;
    }

});

$(document).on('click', '#logout', function () {
    window.location.replace('index.html');
    return false;


});
