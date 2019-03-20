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
let img_url;
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
let cat_limit = 5;
var cat_delivery_type;
var cat_sort;
var cat_page=1;
var cur_no_itm = cat_limit;
var company_id = 2;
var token1 = localStorage.getItem("token");
var token = "Bearer " + token1.substring(1, token1.length-1);
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



function getcity(state_id){
    let city = "";
    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/common/cities",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
               city = "<option value=''>Select A City</option>"
                $.each(msg.data.address, function(key,value){
                    city += "<option value='"+value.id+"' data-city='"+value.city_id+"' data-state='"+value.state_id+"'>"+value.address+"</option>";
                });
                $('#delivery-city').html(city);
            }else if(msg.status == 401){
                logout();
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });
}

$(document).on('change','#delivery-state', function(){

    del_state_id = $('option:selected', this).val();
    del_state_name = $('option:selected', this).attr('data-state');
   getcity(del_state_id);
});



$(document).on('change','#delivery-city', function(){

    del_city_id = $('option:selected', this).val();
    del_city_name = $('option:selected', this).attr('data-state');

});


function getdeliveryprice(address_id){

    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/common/delivery/cost",
        headers: {"Authorization": token},
        data:{"address_id": address_id},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
             delivery_price = msg.data.data.price;
             totalprice();
            }else if(msg.status == 401){
                logout();
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });
}

function getstate(){
    let state = "";
    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/common/state",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                state = "<option value=''>Select A State</option>"
                $.each(msg.data.states, function(key,value){
                    state += "<option value='"+value.state_id+"'  data-state='"+value.state_name+"'>"+value.state_name+"</option>";
                });
                $('#delivery-state').html(state);
            }else if(msg.status == 401){
                logout();
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });
}

function pulladdress(){

    let addrp = "";
    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/address/list",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                addrp += "<option value='new'>Enter New Address</option>";
                $.each(msg.data.address, function(key,value){
                    addrp += "<option value='"+value.id+"' data-city='"+value.city_id+"' data-state='"+value.state_id+"' data-fname='"+value.firstname+"' data-lname='"+value.lastname+"' data-email='"+value.email+"'data-phone='"+value.phone+"' data-address = '"+value.address+"'>"+value.address+"</option>";
                });
                $('#recipient-address').html(addrp);
            }else if(msg.status == 401){
                logout();
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });
}

function addaddress(){
    var first_name = $.trim($('#txtfname').val());
    var last_name = $.trim($('#txtlname').val());
    var email = $.trim($('#txtemail').val());
    var phone = $.trim($('#txtphone').val());
    var address = $.trim($('#txtaddress').val());

    let payload = {
        "firstname": first_name,
        "lastname": last_name,
        "email": email,
        "phone": phone,
        "address": address,
        "state_id": del_state_id,
        "city_id": del_city_id,
        "state_name": del_state_name,
        "city_name": del_city_name
    };

    if(first_name && last_name && email && address && state_id && city_id){
        $.ajax({
            type: "POST",
            url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/address/create",
            headers: {"Authorization": token},
            data: payload,
            dataType: "json",
            beforeSend: function() {
                $('.loading-div').show();
            },
            success: function (msg) {
                $('.loading-div').hide();
                if (msg.status == 200) {
                    myApp.alert("Address has been added");
                    addressid = msg.data.address.id;
                    getdeliveryprice(addressid);
                }else if(msg.status == 401){
                    logout();
                }
                else {
                    myApp.alert(msg.message);
                }
            }
        });
    }else{
        myApp.alert("Kindly fill all fields");
    }
}

function totalshipitm() {

    totalshipping = parseFloat(tprice) + parseFloat(delivery_price);
    $('#grand-total').html(totalshipping +" "+currency);
}


function calccombo() {
    let self = this;
    $.each(productdetails[0].data.combinations, function (index, value) {

        let comboi = custvar.length;
        let trackmain = 0;

        $.each(custvar, function (i, val) {
            let track;
            let tracki = 0;

            track = (value.comb[i].includes(val));

            if (track) {

                trackmain += 1;

            }
            else {

            }

        })
        if (trackmain == comboi) {
            //  console.log(value.price)
            $('.product-price').html(value.price);
            prdprice = value.price;
            // self.editproductdetailsprice(value.price)

            trackmain = 0;
            return false;
        }

    })
}


function logout(){
    window.location.replace("index.html");
}

function cartcount(){

    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/cart/count",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
               $('#cart-count').html(msg.data);
            }else if(msg.status == 401){
                logout();
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });
    return false;
}

function cartitem(){
    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/cart/list",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                let result = "";
                if(msg.data != "") {
                   // console.log(cartitms);
                    $.each(msg.data.cart_items, function (key, value) {
                        result += '<tr>';
                        result += '<td classs="summary-td-content">';
                        result += '<h4 class="summary-prd-name">' + value.name + '</h4>';
                        result += '<h4 class="summary-unit-price">N ' + value.price + '</h4>';
                        if (value.delivery_type == 1) {
                            result += '<p class="summ-delivery-type">Pick Up</p>';
                            result += '<p><b>Location: </b>' + value.pickup_location_name + '</p>';
                            delivery_price = 0;
                            $('#recipient-address').hide();
                        } else if (value.delivery_type == 2) {
                            result += '<p class="summ-delivery-type">Delivery</p>';
                            hasdelivery = 1;
                            pulladdress();
                            $('#txtfname').prop("disabled", true);
                            $('#txtlname').prop("disabled", true);
                            $('#txtemail').prop("disabled", true);
                            $('#txtphone').prop("disabled", true);
                            $('#txtaddress').prop("disabled", true);
                            $('#delivery-state').prop("disabled", true);
                            $('#delivery-city').prop("disabled", true);
                        }
                        result += '<input type="number" id="'+ value.id +'" class="summ-qty inputtype" min="1" value="' + value.qty + '" max="' + max_quant + '" data-id="' + value.id + '"> <a href="#" class="btn-summ-update" style="display: none;" data-id="' + value.id + '">Update</a>';

                        result += '</td>';
                        result += '<td>';
                        result += '<a href="#" class="delete-itm-cart" data-id="' + value.id + '"><i class="fa fa-close"></td></a>';
                        result += '</td>';
                        result += '</tr>';
                    });
                }else{
                    result = "<tr><td><h3>Cart is empty</h3></td></tr>";
                }

                $('.table-prd-item').html(result);
                tprice = msg.data.cart_value.total_cart_price;
                currency = msg.data.cart_value.currency;

                $('#cost-price').html(msg.data.cart_value.total_cart_price +" "+msg.data.cart_value.currency);
                //console.log(tprice);
                totalshipitm();


                // console.log(msg.data.cart_value.total_cart_price +" "+msg.data.cart_value.currency);

            }else if(msg.status == 401){
                logout();
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });
    return false;
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

$(document).on('click', '#logout', function () {
    window.location.replace('index.html');
    return false;


});
myApp.onPageInit('catalogue', function (page) {
    //myApp.alert("catalogue page loaded");

    cartcount();

    let list_table = "";
    var d = 0;

    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/category/catalogue",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                cat_list = msg.data;
                $.each(msg.data, function (key, value) {
                    list_table += "<tr>";
                    list_table += "<td width='90%'>";
                    list_table += "<a class='cat-link' href='#' data-count='" + d + "' data-catname='" + value.name + "'><b>" + value.name + "</b></a>";
                    list_table += "</td>";
                    list_table += "<td width='10%'>";
                    list_table += "<a class='cat-link' href='#' data-count='" + d + "' data-catname='" + value.name + "'><i class='fa fa-chevron-right'></i></a>";
                    list_table += "</td>";
                    list_table += "</tr>";

                    d++;

                })
                cat_level_0 = list_table;
                $('.list-categories').html(list_table);
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });

});

myApp.onPageInit('index-inner', function (page) {
    //alert(token);
       // cartcount();
});

myApp.onPageInit('index', function (page) {

    localStorage.clear();
});

myApp.onPageInit('cinema-page', function (page) {
    cartcount();
    let list_table = "";
    var d = 0;

    $.ajax({
        type: "GET",
        //url: "getcinemas.php",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/cinemas/movies",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();

            if (msg.status == 200) {
                cinema_list = msg.data;
                console.log(cinema_list);
                $.each(msg.data, function (key, value) {
                    list_table += "<tr>";
                    list_table +="<td width='35%'>";
                    list_table += "<a class='cinema-link' href='#' data-count='" + d + "' data-cinemaname='" + value.name + "'>";
                    list_table +="<img src='"+value.thumbnail+"'>";
                    list_table +="</a>";
                    list_table +="</td>";
                    list_table += "<td width='60%'>";
                    list_table += "<a class='cinema-link' href='#' data-count='" + d + "' data-cinemaname='" + value.name + "' data-imgsrc='"+value.thumbnail+"'><b>" + value.name + "</b></a>";
                    list_table += "</td>";
                    list_table += "<td width='5%'>";
                    list_table += "<a class='cinema-link' href='#' data-count='" + d + "' data-cinemaname='" + value.name + "'><i class='fa fa-chevron-right'></i></a>";
                    list_table += "</td>";
                    list_table += "</tr>";

                    d++;

                })
                cat_level_0 = list_table;
                $('.list-cinemas').html(list_table);
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                $('.list-cinemas').html(msg.message);
            }
        }
    });

});


$(document).on('click', 'a.cinema-link', function () {

    cinema_id = null;
    cinema_name = $(this).attr('data-cinemaname');
    counta = $(this).attr('data-count');
    var e = 0;
    var menu = cinema_list[counta].tickets;
    //console.log(menu);

    let list_table1 = "";

    list_table1 += "<tr class='row-back'>";
    list_table1 += "<td colspan='3'>";
    list_table1 += "<a href='#' class='cin-back-link'><i class='fa fa-chevron-left color-white'></i> <span class='color-white'>Back</span></a>";
    list_table1 += "</td>";
    list_table1 += "</tr>";


    $.each(menu, function (key, value) {
        list_table1 += "<tr>";
        list_table1 +="<td width='35%'>";
        list_table1 += "<a class='cinema-link1' href='#' data-count='" + e + "' data-prodcode='" + value.product_code +"' data-moviename='" + value.name + "'>";
        list_table1 +="<img src='"+value.thumbnail+"'>";
        list_table1 +="</a>";
        list_table1 +="</td>";
        list_table1 += "<td width='60%'>";

        list_table1 += "<a class='cinema-link1' href='#' data-prodcode='" + value.product_code + "'  data-count='" + e + "' data-moviename='" + value.title + "'><b>" + value.title + "</b></a>";
        list_table1 += "</td>";
        list_table1 += "<td width='5%'>";
        list_table1 += "<a class='cinema-link1' data-count='" + e + "' href='#' data-prodcode='" + value.product_code +"' data-moviename='" + value.name + "'><i class='fa fa-chevron-right'></i></a>";
        list_table1 += "</td>";
        list_table1 += "</tr>";
        e++;

    })
    cat_level_1 = list_table1;
    $('.list-cinemas').html(list_table1);


});


$(document).on('click', 'a.cinema-link1', function () {
    product_code = null;
    product_code = $(this).attr('data-prodcode');
   // alert(product_code);
    movie_name = $(this).attr('data-moviename');
    mainView.router.loadPage('movie.html');
});

myApp.onPageInit('movie-details', function (page) {

    cartcount();

    var result;
    var movie_date;
    var movie_time;


    var i = 0;
    ticket_count = 0;

    $('.cinema-name').html(cinema_name);
    $('.movie-name').html(movie_name);




    $.ajax({
        type: "GET",
        //url:"https://rewardsboxnigeria.com/rewardsbox/api/v1/?api=movie_details&product_code="+product_code,
        url: "getmoviedetails.php",
        headers: {"token": token},
        //data: {product_code: product_code},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {

            $('.loading-div').hide();

            if(msg.status == 200){
                $('.movie-banner').html('<img src="'+msg.data.artwork+'">')
                $('.movie-desc').html(msg.data.description);
                img_url = msg.data.artwork;


                result='';
                $.each(msg.data.showtimes.day, function(key, value){
                   // console.log(value.day);
                    movie_details.push(value);
                    console.log(movie_details);

                    result += '<li class="accordion-item"><a href="#" class="item-content item-link">';
                    result += '<div class="item-inner">';
                    result += '<div class="item-title">';
                    result += value.day;
                    result += " ";
                    //console.log(value);

                    result +='<i>(';
                    result += value.date;
                    result +=')</i>';
                    result += '<i class="fa fa-chevron-right cinema-arrow"></i>';
                    result += '</div>';
                    result += '</div></a>';
                    result += '<div class="accordion-item-content">';
                    result += '<div class="block">';

                    $.each(value.times, function(key1, value1){

                        result += '<a href="#" class="button btn-showtimes" data-daycount="'+movie_day_count+'" data-ticketcount="'+ticket_count+'">';
                        result += value1.time;
                        result += '</a>';
                        ticket_count++;

                    });

                    result += '</div>';
                    result += '</div>';
                    result += '</li>';
                    movie_day_count++;

                });
                $('.list-showtime').html(result);




            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }else{
                $('.div-showtime').html(msg.message);

            }

        }
    });

});

$(document).on('click', '.btn-showtimes', function(){

    movie_day_count = $(this).attr("data-daycount");
    ticket_count = $(this).attr("data-ticketcount");
    //console.log(movie_details[movie_day_count].times[ticket_count].date_time);

    mainView.router.loadPage("movie-summary.html");


});


myApp.onPageInit('movie-cart', function (page) {

    cartcount();

    var ticket_dropdown = "";
    var e = 1;
    prod_signature = "";
    $('.movie-image').attr('src',img_url);
    $('.movie-title').html(movie_name);
    $('.movie-daytime').html(movie_details[movie_day_count].times[ticket_count].date_time);
    $('.movie-location').html(cinema_name);


    $.each(movie_details[movie_day_count].times[ticket_count].ticket, function(key, value){
        ticket_dropdown += "<option value='"+e+"' data-price='"+value.price+"' data-type='"+value.type+"' data-maxquant='"+value.max_quantity+"' data-sign='"+value.signature+"'>";
        ticket_dropdown  += value.type +" ("+value.price+")";
        ticket_dropdown += "</option>";
        e++;

    });
   // console.log(ticket_dropdown);
    $('.drp-movie-ticket').append(ticket_dropdown);

});

$(document).on('change','.drp-movie-ticket', function(){
    prod_signature = "";
    prod_signature = $('option:selected', this).attr('data-sign');
    var cmaxquant = $('option:selected', this).attr('data-maxquant');
    $('#movie-qty').attr('max',cmaxquant);
    prod_quant = 1;
    $('#movie-qty').val('1');
    movie_price = $('option:selected', this).attr('data-price');
    total_movie_price = parseFloat(prod_quant) * parseFloat(movie_price);
    $('#grand-total').html(total_movie_price);

});

$(document).on('change','#movie-qty', function(){
    prod_quant = $(this).val();
    total_movie_price = parseFloat(prod_quant) * parseFloat(movie_price);
    $('#grand-total').html(total_movie_price);


});

$(document).on('click', '#btn-movie-buy', function () {
    //myApp.alert("This button works");

    var email = $.trim($('#txtemail').val());
    var phone = $.trim($('#txtphone').val());

    if (prod_signature == ""){
        myApp.alert("Select Ticket Type");
        $('.drp-movie-ticke').focus();
        return false;
    } else if (email == "") {
        myApp.alert("Enter Email Address");
        return false;
    } else if (phone == "") {
        myApp.alert("Enter Phone Number");
        return false;
    } else {

        let payload = {
            quantity: prod_quant,
            price: total_movie_price,
            signature: prod_signature,
            email: email,
            phone_no: phone
        };

        $.ajax({

            type: "POST",
            url: "cinema_purchase.php",
            //url: "http://rewardsboxnigeria.com/rewardsbox/api/v1/?api=cinema_purchase",
            headers: {token: token},
            data: payload,
            dataType: "json",
            beforeSend: function() {
                $('.loading-div').show();
            },
            success: function (msg) {
                $('.loading-div').hide();
                if (msg.status == 200) {

                    voucher_code = msg.voucher_code;
                    order_no = msg.order_no;
                    mainView.router.loadPage('success.html');
                    delivery_type = "";
                    return false;
                } else {
                    myApp.alert(msg.message);
                    return false;
                }
            }
        });

    }

});

myApp.onPageInit('view-restaurants', function (page) {
    //myApp.alert("catalogue page loaded");

    cartcount();

    let list_table = "";
    var d = 0;



    $.ajax({
        type: "GET",
        //url: "getrestaurants.php",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/category/meals",
        headers: {"token": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();

            if (msg.status == 200) {
                cat_list = msg.data;
               // console.log(cat_list);
                $.each(msg.data, function (key, value) {
                    list_table += "<tr>";
                    list_table +="<td width='35%'>";
                    list_table += "<a class='meal-link' href='#' data-count='" + d + "' data-catname='" + value.name + "'>";
                    list_table +="<img src='"+value.image+"'>";
                    list_table +="</a>";
                    list_table +="</td>";
                    list_table += "<td width='60%'>";
                    list_table += "<a class='meal-link' href='#' data-count='" + d + "' data-catname='" + value.name + "' data-imgsrc='"+value.image+"'><b>" + value.name + "</b></a>";
                    list_table += "</td>";
                    list_table += "<td width='5%'>";
                    list_table += "<a class='meal-link' href='#' data-count='" + d + "' data-catname='" + value.name + "'><i class='fa fa-chevron-right'></i></a>";
                    list_table += "</td>";
                    list_table += "</tr>";

                    d++;

                })
                cat_level_0 = list_table;
                $('.list-categories').html(list_table);
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });

});

$(document).on('click', 'a.meal-link', function () {

    category_id = null;
    category_name = $(this).attr('data-catname');
    counta = $(this).attr('data-count');
    img_url = $(this).attr('data-imgsrc');
    var e = 0;
    var f = 0;
    var menu = cat_list[counta].child_menu;
    var meal_id =[];

    //console.log(menu);

    let list_table1 = "";

    list_table1 += "<tr class='row-back'>";
    list_table1 += "<td colspan='2'>";
    list_table1 += "<a href='#' class='back-link'><i class='fa fa-chevron-left color-white'></i> <span class='color-white'>Back</span></a>";
    list_table1 += "</td>";
    list_table1 += "</tr>";




    $.each(menu, function (key, value) {

        //loop all the category id out
        $.each(value.category, function (key, val) {
            meal_id.push(val.id);
            f++;
        });

        list_table1 += "<tr>";
        list_table1 += "<td width='80%'>";
        list_table1 += "<a class='meal-link1' href='#'  data-count='" + e + "' data-catname='" + value.name + "' data-branchid = '" + value.id + "' data-catdata = '" + meal_id + "' ><b>" + value.name + "</b></a>";
        list_table1 += "</td>";
        list_table1 += "<td width='10%'>";

        list_table1 += "<a class='meal-link1' data-count='" + e + "' href='#' data-catname='" + value.name + "' data-branchid = '" + value.id + "' data-catdata = '" + meal_id + "'><i class='fa fa-chevron-right'></i></a>";
        list_table1 += "</td>";
        list_table1 += "</tr>";
        e++;

    })
    cat_level_1 = list_table1;
    $('.list-categories').html(list_table1);


});

$(document).on('click', 'a.meal-link1', function () {
    branch_id = null;
    category_name = $(this).attr('data-catname');
    branch_id = $(this).attr('data-branchid');
    category_data = $(this).attr('data-catdata');
    mainView.router.loadPage('meal-menu.html');
    });



$(document).on('click', 'a.cat-link', function () {

    category_id = null;
    category_name = $(this).attr('data-catname');
    counta = $(this).attr('data-count');
    var e = 0;
    var menu = cat_list[counta].child_menu;

    let list_table1 = "";

    list_table1 += "<tr class='row-back'>";
    list_table1 += "<td colspan='2'>";
    list_table1 += "<a href='#' class='back-link'><i class='fa fa-chevron-left color-white'></i> <span class='color-white'>Back</span></a>";
    list_table1 += "</td>";
    list_table1 += "</tr>";


    $.each(menu, function (key, value) {
        list_table1 += "<tr>";
        list_table1 += "<td width='90%'>";
        list_table1 += "<a class='cat-link1' href='#'  data-count='" + e + "' data-catname='" + value.name + "'><b>" + value.name + "</b></a>";
        list_table1 += "</td>";
        list_table1 += "<td width='10%'>";
        list_table1 += "<a class='cat-link1' data-count='" + e + "' href='#' data-catname='" + value.name + "'><i class='fa fa-chevron-right'></i></a>";
        list_table1 += "</td>";
        list_table1 += "</tr>";
        e++;

    })
    cat_level_1 = list_table1;
    $('.list-categories').html(list_table1);


});

$(document).on('click', 'a.cat-link1', function () {

    category_id = null;
    category_name = $(this).attr('data-catname');
    countb = $(this).attr('data-count');
    var menu1 = cat_list[counta].child_menu[countb].category;

    let list_table2 = "";

    list_table2 += "<tr class='row-back'>";
    list_table2 += "<td colspan='2'>";
    list_table2 += "<a href='#' class='back-link1'><i class='fa fa-chevron-left color-white'></i> <span class='color-white'>Back</span></a>";
    list_table2 += "</td>";
    list_table2 += "</tr>";


    $.each(menu1, function (key, value) {
        list_table2 += "<tr>";
        list_table2 += "<td width='90%'>";
        list_table2 += "<a class='cat-link2' href='#' data-catname='" + value.name + "' data-catid='" + value.id + "'><b>" + value.name + "</b></a>";
        list_table2 += "</td>";
        list_table2 += "<td width='10%'>";
        list_table2 += "<a class='cat-link2' href='#' data-catname='" + value.name + "' data-catid='" + value.id + "'><i class='fa fa-chevron-right'></i></a>";
        list_table2 += "</td>";
        list_table2 += "</tr>";

    })
    $('.list-categories').html(list_table2);


});



$(document).on('click', 'a.back-link', function () {

    $('.list-categories').html(cat_level_0);

});

$(document).on('click', 'a.cin-back-link', function () {

    $('.list-cinemas').html(cat_level_0);

});

$(document).on('click', 'a.back-link1', function () {

    $('.list-categories').html(cat_level_1);

});


$(document).on('click', 'a.cat-link2', function () {


    category_id = null;
    category_name = $(this).attr('data-catname');
    category_id = $(this).attr('data-catid');
    mainView.router.loadPage('shop-list.html');
});

$(document).on('click', 'a.exp-list-link', function () {
    category_id = null;
    category_name = $(this).attr('data-catname');
    category_id = $(this).attr('data-catid');
    mainView.router.loadPage('exp-list.html');
});


myApp.onPageInit('meal-list', function (page) {

    cartcount();

    $('.eatery-venue').html(category_name);
    $('.rest-img').attr("src", img_url);

var a = 1;

    var prd_itm = "";
    var result = "";


    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/meals/content",
        headers: {"token": token},
        data: {branch_id: branch_id, categories: category_data.split(',')},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
          if(msg.status == 200){
             // console.log(msg.data);
              $.each(msg.data, function(key, value){
              result += '<li class="accordion-item"><a href="#" class="item-content item-link">';
              result += '<div class="item-inner">';
              result += '<div class="item-title">';
              result += value.category_name;
              result += '<i class="fa fa-chevron-right meallist-arrow"></i>';
              result += '</div>';
              result += '</div></a>';
              result += '<div class="accordion-item-content">';
              result += '<div class="block">';
              result += '<table class="no-left-border">';

                  if (value.data.length){
              $.each(value.data, function(key, val){

                  result += '<tr>';
                  result += '<td>';
                  result +='<img src="'+val.image[0].image_url+'" class="food-img"/>';
                  result += '</td>';
                  result += '<td>';
                  result +='<p><b>'+val.product_name+'</b></p>';
                  result +='<p>N'+val.price+'</p>';
                  result +='<p><i>'+val.description+'</i></p>';
                  if(val.delivery_type == 1){
                      result +='<p><i class="fa fa-truck"></i> <i>Pick Up</i></p>';
                      delivery_type = 1;
                  }else if(val,delivery_type == 2){
                      result +='<p><i class="fa fa-truck"></i> <i>Delivery</i></p>';
                      delivery_type = 2;
                  }else{
                      result +='<p><i class="fa fa-truck"></i> ';
                      result +='<select class="drp-redeem" id="'+a+'">';
                      result +='<option value="3">Select your Redemption Method</option>';
                      result +='<option value="1">Pick Up</option>';
                      result +='<option value="2">Delivery</option>';
                      result +='</select>';
                      result +='</p>';
                  }
                  result += '</td>';
                  result += '<td>';
                  result += '<a href="#" class="button btn-mealredeem" id="btn-meal-redeem" data-identity ="'+a+'" data-prd-name="'+val.product_name+'" data-sign="'+val.signature+'" data-branch_id="'+val.branch_details[0].branch_id+'"   data-branch_name="'+branch_name+'" data-food_img="'+val.image[0].image_url+'" data-max_qty = "'+val.max_quantity+'" data-price = "'+val.price+'" data-delivery_type="'+val.delivery_type+'" >Redeem</a>';
                  result += '</td>';

                  result += '</tr>';
                  a++;

              });
                  }else{
                      result += '<tr><td colspan="3"><b>No Item In This Meal Category</b></td></tr>'
                  }


                  result += '</table>';
              result += '</div>';
              result += '</div>';
              result += '</li>';
              });
              $('.meal-listing').html(result);




          }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }else if (msg.status == 0){
              $('.meal-container').html("<h3 class='no-meal-text'>No meal menu from this restaurant</h3>");

          }else{
              $('.meal-container').html(msg.message);

          }

        }
    });

});

//changes delivery type on the meal redemption button
$(document).on('change', '.drp-redeem', function () {
    var drpselect = $(this).val();
    var identity = $(this).attr('id');
    $('#btn-real-redeem[data-identity="'+identity+'"]').attr('data-delivery_type', drpselect);

});

$(document).on('click', '#btn-meal-redeem', function () {


    prod_signature = $(this).attr('data-sign');
    product_name = $(this).attr('data-prd-name');
    img_url = $(this).attr('data-food_img');
    branch_id = $(this).attr('data-branch_id');
    //alert(branch_id);
    branch_name = category_name;
    delivery_type = $(this).attr('data-delivery_type');
    unitprice = $(this).attr('data-price');
    max_quant = $(this).attr('data-max_quantity');
    prod_quant = 1;
    prdprice = $(this).attr('data-price');

    if(delivery_type == 3) {
        myApp.alert("Select Redemption Method");
        return false;
    }else {
        $.ajax({
            type: "POST",
            url:"addtocart.php",
            //url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/cart/add",
            headers: {token: token},
            data: {delivery_method: delivery_type,signature:prod_signature, price: unitprice, qty:1, name:product_name,pickup_location:branch_id},
            dataType: "json",
            beforeSend: function() {
                $('.loading-div').show();
            },
            success: function (msg) {
                if (msg.status == 200) {
                    $('.loading-div').hide();
                    myApp.alert(msg.message);
                    cartcount();





                }else if (msg.status == 401){
                    window.location.replace("index.html");
                    return false;
                }
            }
        });

        }

});


myApp.onPageInit('bills-list', function (page) {

    cartcount();

    //myApp.alert("catalogue page loaded");
    let list_table = "";
    var d = 0;

    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/category/bills",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();

            if (msg.status == 200) {
                cat_list = msg.data;
                //console.log(cat_list);
                $.each(msg.data, function (key, value) {
                    list_table += "<tr>";
                    list_table += "<td width='90%'>";
                    list_table += "<a class='bills-link' href='#' data-count='" + d + "' data-catname='" + value.category_name + "'><b>" + value.category_name + "</b></a>";
                    list_table += "</td>";
                    list_table += "<td width='10%'>";
                    list_table += "<a class='bills-link' href='#' data-count='" + d + "' data-catname='" + value.category_name + "'><i class='fa fa-chevron-right'></i></a>";
                    list_table += "</td>";
                    list_table += "</tr>";

                    d++;

                })
                cat_level_0 = list_table;
                $('.list-categories').html(list_table);
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                alert(msg.message);
            }
        }
    });


});


$(document).on('click', 'a.bills-link', function () {

    category_id = null;
    category_name = $(this).attr('data-catname');
    counta = $(this).attr('data-count');
    var e = 0;
    var menu = cat_list[counta].vendors;

    let list_table1 = "";

    list_table1 += "<tr class='row-back'>";
    list_table1 += "<td colspan='2'>";
    list_table1 += "<a href='#' class='back-link'><i class='fa fa-chevron-left color-white'></i> <span class='color-white'>Back</span></a>";
    list_table1 += "</td>";
    list_table1 += "</tr>";


    $.each(menu, function (key, value) {
        list_table1 += "<tr>";
        list_table1 += "<td width='80%'>";
        list_table1 += "<a class='bills-link1' href='#'  data-count='" + e + "' data-catname='" + value.name + "' data-catid = '" + value.id + "'><b>" + value.name + "</b></a>";
        list_table1 += "</td>";
        list_table1 += "<td width='10%'>";
        list_table1 += "<a class='bills-link1' data-count='" + e + "' href='#' data-catname='" + value.name + "' data-catid = '" + value.id + "'><i class='fa fa-chevron-right'></i></a>";
        list_table1 += "</td>";
        list_table1 += "</tr>";
        e++;

    })
    cat_level_1 = list_table1;
    $('.list-categories').html(list_table1);


});

$(document).on('click', 'a.bills-link1', function () {

    category_id = null;
    category_name = $(this).attr('data-catname');
    category_id = $(this).attr('data-catid');
    mainView.router.loadPage('biller-product.html');

});

$(document).on('click','#loadMore', function () {
    $('#loadMore').hide();
    cat_page++;
    var prd_itm;
    var temp_count = cur_no_itm;
    cur_no_itm = parseInt(temp_count) + parseInt(cat_limit);
    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/category/catalogue/content",
        //url: "getproduct.php",
        headers: {"token": token},
        data: {category_id: category_id, limit: cat_limit, delivery_type: cat_delivery_type, sort: cat_sort, page: cat_page},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                $.each(msg.data, function (key, value) {
                    prd_itm += '<div class="single-shop-list">';
                    prd_itm += '<div class="shop-inner">';
                    prd_itm += '<div class="shop-img">';
                    prd_itm += '<img src="' + value.image_url + '" alt=""/>';
                    prd_itm += '</div>';
                    prd_itm += '<div class="shop-content">';
                    prd_itm += '<h3>' + value.product_name + '</h3>';
//		 prd_itm += '<div class="pro-rating-s">';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '</div>';
                    prd_itm += '<div class="price-box">';
                    prd_itm += '<span class="new-price">' + value.price + ' <span class="color-black">'+value.currency_name+'</span> </span>';
                    prd_itm += '</div>';
                    prd_itm += '<a href="#" class="button btn-details cat-product-link" data-product_code="' + value.product_code + '">View Product</a>'
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                })
                $('.shop-area').html(prd_itm);
                if(msg.total > cat_limit){
                    $('#loadMore').show();
                }
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                myApp.alert("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });
});

$(document).on('change','#drpshopsort', function () {
    $('#loadMore').hide();
    cat_sort =  $('option:selected', this).val();
    cat_page = 1;
    var prd_itm = "";
    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/category/catalogue/content",
        headers: {"token": token},
        data: {category_id: category_id, limit: cat_limit, delivery_type: cat_delivery_type, sort: cat_sort, page: cat_page},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                $.each(msg.data, function (key, value) {
                    prd_itm += '<div class="single-shop-list">';
                    prd_itm += '<div class="shop-inner">';
                    prd_itm += '<div class="shop-img">';
                    prd_itm += '<img src="' + value.image_url + '" alt=""/>';
                    prd_itm += '</div>';
                    prd_itm += '<div class="shop-content">';
                    prd_itm += '<h3>' + value.product_name + '</h3>';
//		 prd_itm += '<div class="pro-rating-s">';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '</div>';
                    prd_itm += '<div class="price-box">';
                    prd_itm += '<span class="new-price">' + value.price + ' <span class="color-black">'+value.currency_name+'</span> </span>';
                    prd_itm += '</div>';
                    prd_itm += '<a href="#" class="button btn-details cat-product-link" data-product_code="' + value.product_code + '">View Product</a>'
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                })
                $('.shop-area').html(prd_itm);
                if(msg.total > cat_limit){
                    $('#loadMore').show();
                }
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }else if (msg.status == 0) {
                $('.shop-area').append('<h3>There is no item in this category</h3>');
            }
            else {
                myApp.alert("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });

});

$(document).on('change','#drpshopmethod', function () {
    $('#loadMore').hide();
    cat_delivery_type =  $('option:selected', this).val();
    cat_page = 1;
    var prd_itm;
    $.ajax({
        type: "POST",
        //url:"https://rewardsboxnigeria.com/rewardsbox/api/v1/?api=get_products",
        url: "getproduct.php",
        headers: {"token": token},
        data: {category_id: category_id, limit: cat_limit, delivery_type: cat_delivery_type, sort: cat_sort, page: cat_page},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                $.each(msg.data, function (key, value) {
                    prd_itm += '<div class="single-shop-list">';
                    prd_itm += '<div class="shop-inner">';
                    prd_itm += '<div class="shop-img">';
                    prd_itm += '<img src="' + value.image_url + '" alt=""/>';
                    prd_itm += '</div>';
                    prd_itm += '<div class="shop-content">';
                    prd_itm += '<h3>' + value.product_name + '</h3>';
//		 prd_itm += '<div class="pro-rating-s">';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '</div>';
                    prd_itm += '<div class="price-box">';
                    prd_itm += '<span class="new-price">' + value.price + ' <span class="color-black">'+value.currency_name+'</span> </span>';
                    prd_itm += '</div>';
                    prd_itm += '<a href="#" class="button btn-details cat-product-link" data-product_code="' + value.product_code + '">View Product</a>'
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                })
                $('.shop-area').html(prd_itm);
                if(msg.total > cat_limit){
                    $('#loadMore').show();
                }
            }
            else if (msg.status == 0) {
                $('.shop-area').append('<h3>There is no item in this category</h3>');
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            } else {
                myApp.alert("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });
    return false;

});

myApp.onPageInit('biller-product', function (page) {

    cartcount();

    $('#category-name').html(category_name);

    var prd_itm = "";
    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/bills/content",
        headers: {"Authorization": token},
        data: {category_id: category_id},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if(msg.status==200){
                $.each(msg.data, function (key, value) {
                    prd_itm += '<div class="single-shop-list">';
                    prd_itm += '<div class="bills-left">';
                    prd_itm += '<h3>' + value.product_name + '</h3>';
                    prd_itm += '<div class="bill-box">';
                    prd_itm += '<span class="new-price">' + value.price + ' <span class="color-black">'+ value.currency_name +'</span> </span>';
                    prd_itm += '</div>';
                    prd_itm += '</div>';

                    prd_itm += '<div class="bill-right">';

//		 prd_itm += '</div>';

                    prd_itm += '<a href="#" class="button btn-bills-pay bills-product-link" data-product_name="'+value.product_name+'" data-product_price="'+value.price+'"  data-prd_sign="' + value.signature + '" data-currency="'+value.currency_name+'" data-customer_id_text = "'+value.customer_id_text+'">Pay</a>'
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                    prd_itm += '<br><br>';
                })
                $('.shop-area').html(prd_itm);
            }
            else if (msg.status == 0) {
                $('.shop-area').html('<h3>There is no item in this category</h3>');
            }
            else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                alert("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });


});

$(document).on('click', 'a.bills-product-link', function () {

    prod_signature = null;
    prod_signature = $(this).attr('data-prd_sign');

    tprice = null;
    tprice = $(this).attr('data-product_price');

    bill_name = null;
    bill_name = $(this).attr('data-product_name');

    customer_id_text = $(this).attr('data-customer_id_text');
    currency_name = $(this).attr('data-currency');



    mainView.router.loadPage('bill_summary.html');

});

myApp.onPageInit('bill-cart', function (page) {

    cartcount();

    var bill_item ="";
    package_name = bill_name;

    bill_item +='<div>'
    bill_item +='<p><b class="color-black">'+category_name+' '+bill_name+'</b></p>';
    bill_item += '<b><span class="new-price yellow-text">' + tprice + ' <span class="color-black">'+currency_name+'</span></span></b>';
    bill_item +='</div>';

    $('.bill-item').html(bill_item);

//alert(customer_id_text);

    if(customer_id_text == null){
        $('.cust_id').hide();
    }else {
        $('.cust_id').show();
        $('#txtcustid').attr("placeholder",customer_id_text)
    }

});

$(document).on('blur', '#txtcustid', function () {
    var customer_id = $.trim($('#txtcustid').val());
    if(customer_id == null){
        myApp.alert("Enter the "+customer_id_text)
        return false;
    }else {
        let payload = {

            signature: prod_signature,
            customer_id: customer_id

        }


        $.ajax({

            type: "POST",
            url: "validate.php",
            //url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/bills/validate",
            headers: {Authorization: token},
            data: payload,
            dataType: "json",
            beforeSend: function() {
                $('.loading-div').show();
            },
            success: function (msg) {
                $('.loading-div').hide();
                if (msg.status == 200) {
                    $('.div-customer-info').html(msg.data.name);
                } else {
                    myApp.alert(msg.message);
                    // $('#txtcustid').focus();
                    return false;
                }
            }
        });

    }
});

$(document).on('click', '#btn-bill-pay', function () {

    var customer_id = $.trim($('#txtcustid').val());
    var email = $.trim($('#txtemail').val());
    var phone = $.trim($('#txtphone').val());

    if(customer_id == null){
        myApp.alert("Enter the "+customer_id_text)
        return false;
    }else if (email == "") {
        myApp.alert("Enter Email Address");
    } else if (phone == "") {
        myApp.alert("Enter Phone Number");
    } else {
        let payload = {

            signature: prod_signature,
            price: tprice,
            email: email,
            phone_no: phone,
            customer_id: customer_id,
            qty: 1,
            customer_id_text: customer_id_text,
            package_name: package_name,
            customer_id_text: customer_id_text

        }


        $.ajax({

            type: "POST",
            url: "billpayment.php",
            //url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/bills/checkout",
            headers: {Authorization: token},
            data: payload,
            dataType: "json",
            beforeSend: function() {
                $('.loading-div').show();
            },
            success: function (msg) {
                $('.loading-div').hide();
                if (msg.status == 200) {
                    voucher_code = msg.voucher_code;
                    order_no = msg.data.order_id;
                    mainView.router.loadPage('success.html');
                    delivery_type = "";
                } else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }else {
                    myApp.alert(msg.message + "\n" + msg.data);
                }
            }
        });

    }

});

myApp.onPageInit('shop-list', function (page) {



    cat_delivery_type = "";
    cat_sort = "";

    $('#category-name').html(category_name);

    var prd_itm = "";

    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/category/catalogue/content",
        headers: {"Authorization": token},
        data: {category_id: category_id, limit: cat_limit, delivery_type: cat_delivery_type, sort: cat_sort, page: cat_page},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                $.each(msg.data, function (key, value) {
                    prd_itm += '<div class="single-shop-list">';
                    prd_itm += '<div class="shop-inner">';
                    prd_itm += '<div class="shop-img">';
                    prd_itm += '<img src="' + value.image_url + '" alt=""/>';
                    prd_itm += '</div>';
                    prd_itm += '<div class="shop-content">';
                    prd_itm += '<h3>' + value.product_name + '</h3>';
//		 prd_itm += '<div class="pro-rating-s">';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '</div>';
                    prd_itm += '<div class="price-box">';
                    prd_itm += '<span class="new-price">' + value.price + ' <span class="color-black">'+value.currency_name+'</span> </span>';
                    prd_itm += '</div>';
                    prd_itm += '<a href="#" class="button btn-details cat-product-link" data-product_code="' + value.product_code + '">View Product</a>'
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                })
                $('.shop-area').html(prd_itm);
                if(msg.total > cat_limit){
                    $('#loadMore').show();
                }
            }
            else if (msg.status == 0) {
                $('.shop-area').append('<h3>There is no item in this category</h3>');
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                myApp.alert("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });

    cartcount();



});

myApp.onPageInit('events-list', function (page) {

   // $('#category-name').html(category_name);

    cartcount();

    var prd_itm = "";
    var e = 0;

    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/events/list",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {

                events = msg.data;
                console.log(events);
                $.each(msg.data, function (key, value) {
                    prd_itm += '<div class="single-shop-list">';
                    prd_itm += '<div class="shop-inner">';
                    prd_itm += '<div class="shop-img">';
                    prd_itm += '<img src="' + value.artwork + '" alt=""/>';
                    prd_itm += '</div>';
                    prd_itm += '<div class="shop-content">';
                    prd_itm += '<h3>' + value.event_title + '</h3>';
//		 prd_itm += '<div class="pro-rating-s">';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '</div>';
                    prd_itm += '<div class="price-box">';
                    prd_itm += '<b>Date & Time</b>';
                    prd_itm += '<p class="new-price"><span class="color-black">'+value.date+'</span></p>';
                    prd_itm += '</div>';
                    prd_itm += '<a href="#" class="button btn-details event-det-link" data-count="'+e+'">View Details</a>'
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                    prd_itm += '</div>';

                    e++;
                })
                $('.shop-area').html(prd_itm);
            }
            else if (msg.status == 0) {
                $('.shop-area').append('<h3>There is no event available</h3>');
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                myApp.alert("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });

});

$(document).on('click', 'a.event-det-link', function () {
   // alert("event has been hit");
    event_count = $(this).attr('data-count');
    mainView.router.loadPage('event-details.html');

});


myApp.onPageInit('event-details', function (page) {
  //  console.log(events[event_count].title);

    cartcount();

    $('.category-name').html(events[event_count].event_title);


    let result = "";

    result += '<div class="single-product">';
    result += '<div class="single-event-img">';
    result += '<img src="' + events[event_count].banner + '" alt="" />';
    result += '</div>';
    result += '<div class="single-product-content">';
    result += '<h1 class="product_title">' + events[event_count].event_title + '</h1>';

    result += '<b>Date & Time</b>';
    result += '<p class="color-black">';
    result += events[event_count].date;
    result += '</p>';
//						result += '</div>';
    result += '<div class="short-description">';
    result += '<p class="color-black">' + events[event_count].event_description + '</p>';
    result += '</div>';
    result += '<table class="ticket-types">';
    result += '<tr>';
    result += '<th>Ticket Type</th>';
    result += '<th>Price</th>';
    result += '<th>Event Venue</th>';
    result += '<th></th>';
    result += '</tr>';
    $.each(events[event_count].tickets,function(key, value){
        result += '<tr>';
        result += '<td>';
        result += value.title;
        result += '</td>';
        result += '<td>';
        result += value.price;
        result += " ";
        result += value.currency_name;
        result += '</td>';
        result += '<td>';
        result += value.venue;
        result += '</td>';
        result += '<td>';
        result += '<a class="button btn-event-redeem" data-venue="'+value.venue+'" data-prod-sign="'+value.signature+'" data-price="'+value.price+'" data-ticket-type="'+value.title+'" data-eventname="'+events[event_count].event_title+'">Redeem</a>';
        result += '</td>';
        result += '</tr>';

    });





    result += '</table>';
    result += '</div>';
    result += '</div>';



    $('.single-product-area').html(result)

});

$(document).on('click', 'a.btn-event-redeem', function () {
    event_ticket_type = $(this).attr('data-ticket-type');
    prod_signature = $(this).attr('data-prod-sign');
    prdprice = $(this).attr('data-price');
    prod_quant = 1;
    delivery_price = 0;
    event_venue = $(this).attr('data-venue');
    event_name = $(this).attr('data-eventname');
    mainView.router.loadPage("event-summary.html");
});

$(document).on('change', '#event-qty', function () {
    var event_qty = $('#event-qty').val();
    event_total = event_qty * prdprice;
    $('#grand-total').html(event_total);
});

myApp.onPageInit('event-cart', function (page) {

    cartcount();

    $('.event-title').html(events[event_count].title);
    $('.event-ticket').html(event_ticket_type);
    //$('.event-datetime').html(events[event_count].date);
    $('.event-venue').html(event_venue);
    $('#event-qty').val('1');
    var event_qty = $('#event-qty').val();
    event_total = event_qty * prdprice;
    $('#grand-total').html(event_total);
});

$(document).on('click', '#btn-event-buy', function () {
    //myApp.alert("This button works");

    var email = $.trim($('#txtemail').val());
    var phone = $.trim($('#txtphone').val());
    prod_quant = $.trim($('#event-qty').val());
    if (email == "") {
        myApp.alert("Enter Email Address");
        return false;
    } else if (phone == "") {
        myApp.alert("Enter Phone Number");
        return false;
    } else {

        let exp_payload = {
            qty: prod_quant,
            price: prdprice,
            signature: prod_signature,
            email: email,
            phone_no: phone,
            event_name: event_name
        };

        $.ajax({

            type: "POST",
            //url: "event_purchase.php",
            url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/events/checkout",
            headers: {Authorization: token},
            data: exp_payload,
            dataType: "json",
            beforeSend: function() {
                $('.loading-div').show();
            },
            success: function (msg) {
                $('.loading-div').hide();
                if (msg.status == 200) {

                    voucher_code = msg.voucher_code;
                    order_no = msg.data;
                    mainView.router.loadPage('success.html');
                    delivery_type = "";
                    return false;
                }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            } else {
                    myApp.alert(msg.message);
                    return false;
                }
            }
        });

    }

});

myApp.onPageInit('profile-page', function (page) {
    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/profile",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
              $('#txtfname').val(msg.data.firstname);
              $('#txtlname').val(msg.data.lastname);
              $('#txtphone').val(msg.data.phone);
              $('#txtemail').val(msg.data.email);
              $('#txtaddress').val(msg.data.address);
              $('#memberno').html(msg.data.member_no);
              $('#point-balance').html(msg.account_balance);


            }
           else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                alert("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });

});

myApp.onPageInit('biller-listing', function (page) {

    cartcount();

    $('#category-name').html(category_name);

    var prd_itm = "";

    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/category/catalogue/content",
        headers: {"Authorization": token},
        data: {category_id: category_id},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                $.each(msg.data, function (key, value) {
                    prd_itm += '<div class="single-shop-list">';
                    prd_itm += '<div class="shop-inner">';
                    prd_itm += '<div class="shop-img">';
                    prd_itm += '<img src="' + value.image + '" alt=""/>';
                    prd_itm += '</div>';
                    prd_itm += '<div class="shop-content">';
                    prd_itm += '<h3>' + value.product + '</h3>';
//		 prd_itm += '<div class="pro-rating-s">';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '<a href="#"><i class="fa fa-star"></i></a>';
//		 prd_itm += '</div>';
                    prd_itm += '<div class="price-box">';
                    prd_itm += '<span class="new-price"><span class="color-black">N</span> ' + value.price + '</span>';
                    prd_itm += '</div>';
                    prd_itm += '<a href="#" class="button btn-details bills-product-link" data-product_code="' + value.product_code + '">View Product</a>'
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                })
                $('.shop-area').html(prd_itm);
            }
            else if (msg.status == 0) {
                $('.shop-area').append('<h3>There is no item in this category</h3>');
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                alert("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });

});


$(document).on('click', 'a.cat-product-link', function () {

    product_code = null;
    product_code = $(this).attr('data-product_code');
    mainView.router.loadPage('single-product.html');

});


$(document).on('click', 'a.exp-product-link', function () {

    product_code = null;
    product_code = $(this).attr('data-product_code');
    mainView.router.loadPage('experience-product.html');

});


myApp.onPageInit('single-product', function (page) {
    //alert(product_code);
    //alert(category_id);



    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/catalogue/product",
        headers: {"Authorization": token},
        data: {product_code: product_code},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            //	console.log(msg);

            productdetails.push(msg);

            if (msg.status == 200) {

                prdprice = msg.data.price;
                unitprice = msg.data.price;
                max_quant = msg.data.max_quantity;
               // img_url = msg.data.image[0].image_url;
                product_name = msg.data.product_name;
                hasvariant = msg.data.is_variant;
                //delivery_type = msg.data.delivery_type;


                let result = "";

                result += '<div class="single-product">';
                result += '<div class="single-product-img">';
                result += '<a href="#"><img src="' + msg.data.image[0].image_url + '" alt="" /></a>';
                result += '</div>';
                result += '<div class="single-product-content">';
                result += '<h1 class="product_title">' + msg.data.product_name + '</h1>';
                result += '<div class="price-box">';
                result += '<span class="new-price product-price"><span class="color-black">N</span> ' + msg.data.price + '</span>';
                result += '</div>';
//						result += '<div class="pro-rating">';
//						result += '<a href="#"><i class="fa fa-star"></i></a>';
//						result += '<a href="#"><i class="fa fa-star"></i></a>';
//						result += '<a href="#"><i class="fa fa-star"></i></a>';
//						result += '<a href="#"><i class="fa fa-star"></i></a>';
//						result += '<a href="#"><i class="fa fa-star"></i></a>';
//						result += '</div>';
                result += '<div class="short-description">';
                result += '<p>' + msg.data.description + '</p>';
                result += '</div>';
                result += '<form action="#">';

                let result2 = "";
                if (msg.data.delivery_type == 1) {
                    delivery_type = 1;
                    result2 += '<p class=""><input type="radio" class="rad-delmet" value="1" checked="checked"/>';
                    result2 += 'Pickup';
                    result2 += '</p><p><select class="constant-pickup drppickup">';
                    result2 += '<option>Pickup Location</option>';

                    $.each(msg.data.branch_details, function (key, value) {
                        result2 += ('<option value="' + value.branch_id + '">' + value.branch_name + '</option>');
                    });
                    result2 += '</select></p>';
                    // $('.div-cat-itm-info').html(result2);
                    delivery_type = 1;
                }


                else if (msg.data.delivery_type == 2) {
                    delivery_type = 2;

                    result2 += '<div><input type="radio" class="rad-delmet" value="2" checked="checked"/> Delivery</div>';

                }
                else if (msg.data.delivery_type == 3) {
                    mdt = 3;
                    delivery_type = "";
                    result2 += '<p><input type="radio" class="rad-delmet rad-opt-met" value="2" name="rad-delmet" id="rad-del" /> Delivery <input type="radio" class="rad-delmet rad-opt-met" value="1" name="rad-delmet" id="rad-pickup" /> Pickup</p><p class="div-sel-pickup" style="display:none;"><select class="constant-pickup drppickup"><option value="">Pickup Location</option>';
                    $.each(msg.data.branch_details, function (key, value1) {
                        result2 += '<option value="' + value1.branch_id + '"  data-branchname="' + value1.branch_name + '">' + value1.branch_name + '</option>';
                    });
                    result2 += '</select></p>';
                    delivery_type = 2;
                }

                if (msg.data.is_variant == 1) {//It is a boolean to show product has some attributes 1 is true and 0 is false

                    result2 += '<div class="varient-div">';

                    $.each(msg.data.attributes, function (key2, attributes) {
                        result2 += '<p><select data-name ="' + attributes.name + '" class="sel-varient constant-pickup" id="' + attributes.id + '"><option value="">Select ' + attributes.name + '</option>';
                        $.each(attributes.details, function (key3, details) {
                            result2 += '<option value="' + details.variant_id + '">' + details.variant_name + '</option>';
                        });
                        result2 += '</select></p>';
                    });

                    result2 += '</div>';

                    $.each(msg.data.combinations, function (key, comb) {
                        mixes.push([comb]);
                    });

                }

                result += result2;

                result += '<div class="quantity">';
                result += '<input type="number" id="itm-quant" value="1" min="1" max="' + msg.data.max_quantity + '" placeholder="Quantity">';
                result += '<a href="#" id="btn-buy">Add To Cart</a>';
                result += '</div>';
                result += '</form>';
                result += '</div>';
                result += '</div>';


                prod_signature = msg.data.signature;

                cartcount();

                $('.single-product-area').html(result)

            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                $('.single-product-area').html("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });
});


$(document).on('change', '.sel-varient', function () {

    custvar = [];
//	//myApp.alert(mixes);
    let self = this;
    $.each($('.varient-div select'), function (index, value) {
        // console.log($(value).find('option:selected').val())
        // return false
        //console.log($(value));
        if ($(value).find('option:selected').val() == '') {
            //myApp.alert('Please complete the form');
            return false;
        } else {
            //console.log('Else area')
            custvar.push($(value).find('option:selected').val());

            //console.log("the array has ",custvar);

            //self.canaddtocart = true;
            // console.log(self.$store.state.combo)
            calccombo();


        }

    });


});

$(document).on('change', '.rad-delmet', function () {
    if ($("#rad-pickup").is(":checked")) {
        $('.div-sel-pickup').show();
        delivery_type = 1;
    }
    else if ($("#rad-del").is(":checked")) {
        $('.div-sel-pickup').hide();
        delivery_type = 2;
    }
    else {
        $('.div-sel-pickup').hide();
    }
});

$(document).on('click', '#btn-buy', function () {
    //myApp.alert(delivery_type);
    // let delmet = $(".rad-opt-met").val();
    // alert(delmet);
    let check_variant = 0;
    let check_name = "";
    if (hasvariant == 1) {
        $('.sel-varient').each(function () {
            if ($(this).val() == "") {
                check_variant = 1;
                check_name = $(this).attr('data-name');
                //alert(check_name);
            }
        });
    }


    if (check_variant == 0) {
        if ($('#itm-quant').val() == "") {
            myApp.alert('Enter Quantity');
            return false;
        } else if ($('#itm-quant').val() < 1) {
            myApp.alert('Enter Quantity minimum of 1');
            return false;
        }
        else if (mdt == 3 && delivery_type == "") {
            myApp.alert('Select a Delivery Method');
            return false;
        } else if (delivery_type == 1 && $('.drppickup').val() == "") {
            myApp.alert('Select a pickup location');
            return false;
        }
        else {


            prod_quant = $('#itm-quant').val();
            var store_id = $('.drppickup').val();
           // mainView.router.loadPage('summary.html');

            $.ajax({
                type: "POST",
                //url:"addtocart.php",
                url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/cart/add",
                headers: {token: token},
                data: {delivery_method: delivery_type,signature:prod_signature, price: unitprice, qty:1, name:product_name,pickup_location:store_id},
                dataType: "json",
                beforeSend: function() {
                    $('.loading-div').show();
                },
                success: function (msg) {
                    if (msg.status == 200) {
                        $('.loading-div').hide();
                        myApp.alert(msg.message);
                        cartcount();
                        mainView.router.loadPage('catalogue-new.html');




                    }else if (msg.status == 401){
                        window.location.replace("index.html");
                        return false;
                    }
                }
            });


        }
    } else {

        myApp.alert('Select Product ' + check_name);
        return false;
    }
});



myApp.onPageInit('shopping-cart', function (page) {
    // Following code will be executed for page with data-page attribute equal to "about"
    // myApp.alert('This is the auction description page');

    //var delivery_name;
    //alert(delivery_name);
    cartcount();
    cartitem();

    // let result;
    // let result2;
    //
    // if (delivery_type == 1) {
    //     delivery_name = "Pick Up:";
    //     $('.table-cart-address').hide();
    //     $('.p-delivery').hide();
    //
    //
    // } else if (delivery_type == 2) {
    //     delivery_name = "Delivery";
    //     $('.table-cart-address').show();
    //     $('.p-delivery').show();
if(hasdelivery == 1) {
    $('.table-cart-address').show();
    $('.p-delivery').show();
}else {
    $('.table-cart-address').hide();
    $('.p-delivery').hide();
}





});



$(document).on('click','#recipient-address',function(){
    addressid = $('option:selected', this).val();
    if (addressid == "new"){
        $('#txtfname').prop("disabled", false);
        $('#txtlname').prop("disabled", false);
        $('#txtemail').prop("disabled", false);
        $('#txtphone').prop("disabled", false);
        $('#txtaddress').prop("disabled", false);
        $('#delivery-city').prop("disabled", false);
        $('#delivery-state').prop("disabled", false);
        getstate();
    }else if(addressid){
        $('#txtfname').prop("disabled", false);
        $('#txtlname').prop("disabled", false);
        $('#txtemail').prop("disabled", false);
        $('#txtphone').prop("disabled", false);
        $('#txtaddress').prop("disabled", true);
        $('#delivery-state').prop("disabled", true);
        $('#delivery-city').prop("disabled", true);



        $('#txtfname').val($('option:selected', this).attr("data-fname"));
        $('#txtlname').val($('option:selected', this).attr("data-lname"));
        $('#txtemail').val($('option:selected', this).attr("data-email"));
        $('#txtphone').val($('option:selected', this).attr("data-phone"));
        $('#txtaddress').val($('option:selected', this).attr("data-address"));
        $('#delivery-state').val($('option:selected', this).attr("data-state"));
        $('#delivery-city').val($('option:selected', this).attr("data-city"));
        getdeliveryprice(addressid);
    }else{
        myApp.alert("Kindly Select An Address");
        $('#txtfname').prop("disabled", true);
        $('#txtlname').prop("disabled", true);
        $('#txtemail').prop("disabled", true);
        $('#txtphone').prop("disabled", true);
        $('#txtaddress').prop("disabled", true);
        $('#delivery-city').prop("disabled", true);
        $('#delivery-city').prop("disabled", true);
    }
});

$(document).on('click','.delete-itm-cart', function(){
    var item_id = $(this).attr("data-id");
    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/cart/count",
        headers: {"Authorization": token},
        data: {"cart_item_id": item_id},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                myApp.alert(msg.message);
                cartitem();
                cartcount();
            }else if(msg.status == 401){
                logout();
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });
    return false;
});

$(document).on('blur', '.summ-qty', function () {
    var check = $(this).val();
    if (check < 1) {
        myApp.alert("Cannot enter quantity less than 1");
        $(this).val('1');
        $(this).focus();
    }
});

$(document).on('click', '.btn-summ-update', function () {
    var upitmid = $(this).attr("data-id");
    prod_quant = $('.summ-qty[data-id="'+upitmid+'"]').val();
    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/cart/update/single",
        headers: {"Authorization": token},
        data: {"item_id": upitmid, "item_qty":prod_quant},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                myApp.alert(msg.message);
            }else if(msg.status == 401){
                logout();
            }
            else {
                $('.summ-qty[data-id="'+upitmid+'"]').val("1");
                myApp.alert(msg.message);
            }
        }
    });
    $(this).hide();
});

$(document).on('change', '.summ-qty', function () {
    var upitmid = $(this).attr("data-id");
    $('.btn-summ-update[data-id="'+upitmid+'"]').show();
});

$(document).on('change', '#delivery-state', function () {
    state_id = $('#delivery-state').val();
    $.ajax({
        type: "GET",
        //url:"",
        url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/common/states",
        headers: {token: token},
        data: {state_id: state_id},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            if (msg.status == 200) {
                $('.loading-div').hide();
                $('#delivery-city').html(' <option value="">Select Delivery City..</option>');

                $.each(msg.data, function (key, value) {
                    $('#delivery-city').append('<option value="' + value.City_id + '">' + value.City_name + '</option>');
                })

            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
        }
    });

});

$(document).on('change', '#delivery-city', function () {

    city_id = $('#delivery-city').val();

    //Using the single delivery item api
   getdeliveryprice();


});


$(document).on('click', '#btn-checkout', function () {
    //myApp.alert("This button works");
    var first_name = $.trim($('#txtfname').val());
    var last_name = $.trim($('#txtlname').val());
    var email = $.trim($('#txtemail').val());
    var phone = $.trim($('#txtphone').val());
    var address = $.trim($('#txtaddress').val());

    if ($("#recipient-address").val() == "new"){
        addaddress();
        return false;


    }


    if (first_name == "") {
        myApp.alert("Enter First Name");
        return false;
    } else if (last_name == "") {
        myApp.alert("Enter Last Name");
        return false;
    } else if (email == "") {
        myApp.alert("Enter Email Address");
        return false;
    } else if (phone == "") {
        myApp.alert("Enter Phone Number");
        return false;
    } else {
        let payload = {
            "address_id": addressid,
            "delivery_price": delivery_price
        };


        $.ajax({

            type: "POST",
            //url: "checkout.php",
            url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/cart/checkout",
            headers: {token: token},
            data: payload,
            dataType: "json",
            beforeSend: function() {
                $('.loading-div').show();
            },
            success: function (msg) {
                $('.loading-div').hide();
                console.log(msg);
                if (msg.status == 200) {

                    voucher_code = msg.data.voucher_code;
                    order_no = msg.data.order_id;
                    mainView.router.loadPage('success.html');
                    delivery_type = "";
                }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            } else {
                    myApp.alert(msg.message);
                    return false;
                }
            }
        });
        return false;

    }

});

myApp.onPageInit('success-page', function () {
    cartcount();
    $('#vouch').html(voucher_code);
    $('#orderno').html(order_no);
});


myApp.onPageInit('experience', function () {
    cartcount();

    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/experience/countries",
        headers: {Authorization: token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            //alert("na we dey here");
            if (msg.status == 200) {

                $.each(msg.message.data, function (key, value) {
                    $('#exp-country').append('<option value="' + value.country_id + '" data-country="' + value.country_name + '">' + value.country_name + '</option>');
                });

            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
        }
    });
});

$(document).on('change', '.drppickup', function () {
    branch_name = $('option:selected', this).attr('data-branchname');
    branch_id = $('.drppickup').val();
});

$(document).on('change', '#exp-country', function () {
    exp_country_id = $(this).val();
    exp_country_name = $('option:selected', this).attr('data-name');
    let cityresult = "";
    //fetches the city in the country

    $.ajax({
        type: "POST",
        url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/experience/cities",
        //url: "getexpcity.php",
        headers: {Authorization: token},
        data: {country_id: exp_country_id},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            //alert("na we dey here");
            if (msg.status == 200) {
                cityresult = "<option value='0'> Select City</option>";
                $.each(msg.message.data, function (key, value) {
                    cityresult += '<option value="' + value.city_id + '" data-cityname="' + value.name + '">' + value.name + '</option>';
                });
                $('#exp-city').html(cityresult);

            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
        }
    });

});

$(document).on('change', '#exp-city', function () {
    exp_city_id = $(this).val();
    exp_city_name = $('option:selected', this).attr('data-cityname');

});


$(document).on('click', '#btn-experience', function () {
    //category_id = exp_cate_id;
    category_name = exp_cate_name;


    if (exp_country_id == null || 0) {
        myApp.alert("Kindly Select A Country");
        return false;
    } else if (exp_city_id == null || 0) {
        myApp.alert("Kindly Select A City")
        return false;
    } else {
        mainView.router.loadPage('experience2.html');
    }

});

myApp.onPageInit('experience-list', function (page) {
    //myApp.alert("catalogue page loaded");
    cartcount();
    let expcatlist;


    $.ajax({
        type: "GET",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/category/experience",
        headers: {"Authorization": token},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();

            if (msg.status == 200) {
                $.each(msg.data, function (key, value) {
                    expcatlist += "<tr>";
                    expcatlist += "<td width='90%'>";
                    expcatlist += "<a class='exp-list-link' href='#' data-catname='" + value.category + "' data-catid='" + value.category_id + "'><b>" + value.category + "</b></a>";
                    expcatlist += "</td>";
                    expcatlist += "<td width='10%'>";
                    expcatlist += "<a class='exp-list-link' href='#' data-catname='" + value.category + "' data-catid='" + value.category_id + "'><i class='fa fa-chevron-right'></i></a>";
                    expcatlist += "</td>";
                    expcatlist += "</tr>";
                })
                $('.list-categories').html(expcatlist);
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                myApp.alert(msg.message);
            }
        }
    });

});

myApp.onPageInit('exp-cat-list', function () {
    cartcount();

    $('#category-name').html(category_name);

    var prd_itm = "";

    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/category/experience/content",
        headers: {"Authorization": token},
        data: {category_id: category_id, exp_country: exp_country_id, exp_city: exp_city_id},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            if (msg.status == 200) {
                $.each(msg.data.data, function (key, value) {

                    prd_itm += '<div class="single-shop-list">';
                    prd_itm += '<div class="shop-inner">';
                    prd_itm += '<div class="shop-img">';
                    prd_itm += '<img src="' + value.image + '" alt=""/>';
                    prd_itm += '</div>';
                    prd_itm += '<div class="shop-content">';
                    prd_itm += '<h3>' + value.product + '</h3>';
                    prd_itm += '<div class="price-box">';
                    prd_itm += '</div>';
                    prd_itm += '<a href="#" class="button btn-details exp-product-link" data-product_code="' + value.product_code + '">Details</a>'
                    prd_itm += '</div>';
                    prd_itm += '</div>';
                    prd_itm += '</div>';

                })
                $('.shop-area').html(prd_itm);
            }
            else if (msg.status == 0) {
                $('.shop-area').append('<h3>There is no item in this category');
            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                alert("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });

});
$(document).on('click', '#returnsuccess', function () {
    window.location.replace('inner.html');
    return false;


});

$(document).on('click', '#btnhome', function () {
    window.location.replace('inner.html');
    return false;
});


myApp.onPageInit('experience-product', function (page) {

    //alert(category_id);
    cartcount();

    $.ajax({
        type: "POST",
        url:"http://rewardsboxnigeria.com/customerportalapi/public/v1/experience/single",
        headers: {"Authorization": token},
        data: {"product_code": product_code},
        dataType: "json",
        beforeSend: function() {
            $('.loading-div').show();
        },
        success: function (msg) {
            $('.loading-div').hide();
            //	console.log(msg);

            productdetails.push(msg);
            if (msg.status == 200) {

                var adult_price = msg.data.package.adult.adult_price;

                //var child_price = msg.data.package.kid.kid_price;
                max_quant = msg.data.max_quantity;
                img_url = msg.data.image[0];
                product_name = msg.data.product_name;
                var duration = msg.data.duration;
                var exp_start_date = msg.data.start_date;
                var exp_end_date = msg.data.end_date;
                exp_adult_price = msg.data.package.adult.adult_price;
                //exp_child_price = msg.data.package.kid.kid_price;
                var has_adult = [];
                has_adult = msg.data.package.adult;

                var has_kid = []
                has_kid = msg.data.package.kid;
                var has_pickup = [];
                has_pickup = msg.data.location.pickup_address;
                exp_day_slot = msg.data.day_slots;
                advance_book = msg.data.advance_book;
                advance_book_format = msg.data.advance_book_format;

                var has_faqs = [];
                has_faqs.push(msg.data.faqs);




                //delivery_type = msg.data.delivery_type;


                let result = "";
                let resultqty = "";
                let resultpickup = "";
                let resultadvance = "";
                let resultfaqs = "";

                result += '<div class="single-product">';
                result += '<div class="single-product-img">';
                result += '<a href="#"><img src="' + img_url + '" alt="" /></a>';
                result += '</div>';
                result += '<div class="single-product-content">';
                result += '<h1 class="product_title">' + product_name + '</h1>';
                result += '<div class="price-box">';
                result += '<span class="color-black">N </span><span class="new-price"></span>';
                result += '</div>';
                result += '<div class="short-description">';
                result += msg.data.description;
                result += '<form action="#">';
                result += '<div class="quantity">';

                if (has_adult != null) {
                    resultqty += '<table style="border-left: none !important;">';
                    resultqty += '<tr>';
                    resultqty += '<td>';
                    resultqty += 'Adult(s) (Price: <span id="adultprice">' + msg.data.package.adult.adult_price + '</span>)<br>(Min Qty: ' + msg.data.package.adult.min_adult + ' and Max Qty: ' + msg.data.package.adult.max_adult + ')';
                    resultqty += '</td>';
                    resultqty += '<td>';
                    resultqty += '<input type="number" id="exp_adult" style="float: right !important;" min="' + msg.data.package.adult.min_adult + '" max="' + msg.data.package.adult.max_adult + '" value="' + msg.data.package.adult.min_adult + '">';
                    resultqty += '</td>';

                    resultqty += '</tr>';
                    resultqty += '</table>';
                    resultqty += '<br>';
                    exp_adult_quant = msg.data.package.adult.min_adult;
                }

                if (has_kid != null) {
                    resultqty += '<table style="border-left: none !important;">';
                    resultqty += '<tr>';
                    resultqty += '<td>';
                    resultqty += 'Kid(s) (Price: <span id="kidprice">' + msg.data.package.kid_price + '</span>)<br>(Min Qty: ' + msg.data.package.min_kid + ' and Max Qty: ' + msg.data.package.max_kid + ')';
                    resultqty += '</td>';
                    resultqty += '<td>';

                    resultqty += '<input type="number" style="float: right !important;" min="' + msg.data.package.adult.min_kid + '" max="' + msg.data.package.adult.max_kid + '" value="1">';

                    resultqty += '</td>';

                    resultqty += '</tr>';

                    resultqty += '</table>';

                    exp_kid_quant = msg.data.package.kid.min_kid;
                }
                result += resultqty;
                result += '</div>';

                result += '<div>';
                result += '<p><select class="inputtype" id="exp_address_id">';
                result += '<option>Select Location</option>';
                $.each(msg.data.location, function (key, value) {
                    result += '<option value="'+value.id+'" data-store="'+value.store_name+'">"' + value.store_name + '" ' + value.exp_address + ' ' + value.city + '</option>';
                });
                result += '</select></p><br><br>';
                result += '</div>';


                if (has_pickup != null) {
                    resultpickup += '<div>';
                    resultpickup += '<p><select class="inputtype">';
                    resultpickup += '<option value="">Select Pick up Location</option>';
                    resultpickup += '</select></p><br>';
                    resultpickup += ' </div>';
                }
                result += resultpickup;

                if (advance_book != null || advance_book > 0) {
                    resultadvance = '<b class="color-red">Book before ' + advance_book + ' ' + advance_book_format + '</b>';
                }

                result += resultadvance;

                result += '<div>';
                result += '<p>Select Date</p>';

                result += '<input placeholder="Select Date" type="date" min="' + msg.data.start_date + '" max="' + msg.data.end_date + '" id="date_slot" class="inputtype" style="width:94% !important;"><br><br>';


                result += '<select id="time_slot" class="inputtype" style="width: 100% !important;">';
                result += '<option value="">Select Time Slot<option>';
                result += '</select>';
                result += '</div><br><br>';
                result += '<button class="button button-big-purple" id="btn-exp-summary">Buy Now</button>';
                result += '</form>';

                if (has_faqs != null) {
                    resultfaqs += '<div class="div-faq">';
                    resultfaqs += '<h2>FAQs</h2>';

                    $.each(msg.data.faqs, function (key, value2) {
                        resultfaqs += '<b>' + value2.question + '</b>';
                        resultfaqs += '<p>' + value2.answer + '</p>';
                    });

                    resultfaqs += '</div>';
                }
                result += resultfaqs;


                prod_signature = msg.data.signature;


                $('.single-product-area').html(result);

                var getadult_quant = $('#exp_adult').val();
                var getkid_quant = $('#exp_kid').val();

                if (getadult_quant != null) {
                    exp_total_adult = parseFloat(exp_adult_price) * parseFloat(getadult_quant);

                } else {
                    exp_total_adult = 0;
                }

                if (getkid_quant != null) {
                    exp_total_kid = parseFloat(exp_kid_price) * parseFloat(getkid_quant);

                } else {
                    exp_total_kid = 0;
                }

                exp_total_price = parseFloat(exp_total_adult) + parseFloat(exp_total_kid);
                $('.new-price').html(exp_total_price);
                prod_signature = msg.data.signature;


            }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            }
            else {
                $('.single-product-area').html("Status Code: " + msg.status + "\n" + msg.message);
            }

        }
    });
});

$(document).on('change', '#exp_adult', function () {
//    alert("something changed");
    exp_total_adult = parseFloat(exp_adult_price) * parseFloat($('#exp_adult').val());

    var getkid_quant = $('#exp_kid').val();

    if (getkid_quant != null) {
        exp_kid_quant = getkid_quant;
        exp_total_kid = parseFloat(exp_kid_price) * parseFloat(getkid_quant);
        exp_total_price = parseFloat(exp_total_adult) + parseFloat(exp_total_kid);
    } else {
        exp_total_price = exp_total_adult
    }

    $('.new-price').html(exp_total_price);

});

$(document).on('change', '#exp_kid', function () {

    exp_total_kid = parseFloat(exp_kid_price) * parseFloat($('#exp_kid').val());

    var getadult_quant = $('#exp_adult').val();

    if (getadult_quant != null) {
        exp_adult_quant = getadult_quant;
        exp_total_adult = parseFloat(exp_adult_price) * parseFloat(getadult_quant);
        exp_total_price = parseFloat(exp_total_adult) + parseFloat(exp_total_kid);
    } else {
        exp_total_price = exp_total_kid;
    }

    $('.new-price').html(exp_total_price);

});

$(document).on('change', '#date_slot', function () {
    //alert("date hit");
    var day_slot = $('#date_slot').val();
    var day_obj = new Date(day_slot);
    var day_no = day_obj.getDay();

    exp_date = day_slot;


    let result = "";

    result += '<option value="">Select Time Slot..</option>';
   // console.log(exp_day_slot[day_no]);
    if (exp_day_slot[day_no] == null) {
        result += '<option value="" selected>No Time Slot for this day</option>';
    } else{
    $.each(exp_day_slot[day_no], function (key, slot) {
        result += '<option value="'+slot.start_time+'">' + slot.start_time + slot.start_time_period + ' - ' + slot.end_time + slot.end_time_period + '</option>';
    });
}

    exp_date = day_slot;
    $('#time_slot').html(result);
});

$(document).on('change', '#time_slot', function () {
    exp_start_time = $(this).val();

});

$(document).on('change', '#exp_address_id', function () {
    exp_address_id = $(this).val();
    branch_name = $('option:selected', this).attr('data-store');

});

$(document).on('click', '#btn-exp-summary', function(){
    if (exp_adult_quant < 1 || exp_kid_quant < 1){
        myApp.alert("Kindly Enter A Valid Quantity");
        return false;
    }else if (exp_address_id == null){
        myApp.alert("Kindly Select A Location");
        $('#exp_address_id').focus();
        return false;
    }else if(exp_start_time == null){
        myApp.alert("Kindly Select A Time Slot");
        $('#time_slot').focus();
        return false;
    }else{
        mainView.router.loadPage('exp-summary.html');
        return false;

    }

});

myApp.onPageInit('experience-cart', function (page) {
    // Following code will be executed for page with data-page attribute equal to "about"
    // myApp.alert('This is the auction description page');

    //var delivery_name;
    //alert(delivery_name);

    cartcount();

    let result;
    let result2;




    result = '<tr>';
    result += '<td class="summary-td-img">';
    result += '<div class="shop-img"><img src="' + img_url + '"></div>';
    result += '</td>';
    result += '<td class="summary-td-content">';
    result += '<h2 class="summary-prd-name">' + product_name + '</h2>';

        result += '<p><b>Location: </b>' + branch_name + '</p>';
    result += '<p><b>Date: </b>' +exp_date+ '</p>';
    result += '<p><b>Time: </b>' +exp_start_time+ '</p>';

        if(exp_adult_quant != null){
            result += '<p>'+exp_adult_quant+' Adult(s)</p>';
        }
    if(exp_kid_quant != null){
        result += '<p>'+exp_kid_quant+' Kid(s)</p>';
    }


    result += '</td>';
    result += '</tr>';


    $('.table-prd-item').html(result);

    $('#grand-total').html(exp_total_price);

});

$(document).on('click', '#exp_address_id', function(){
    exp_address_id = $('#exp_address_id').val();
});

$(document).on('click', '#btn-exp-buy', function(){
    var first_name = $.trim($('#txtfname').val());
    var last_name = $.trim($('#txtlname').val());
    var email = $.trim($('#txtemail').val());
    var phone = $.trim($('#txtphone').val());
    //var exp_date_post = exp_date +' '+ exp_start_time;
    var exp_date_post = exp_date_post;

    if (first_name == "") {
        myApp.alert("Enter First Name");
        return false;
    } else if (last_name == "") {
        myApp.alert("Enter Last Name");
        return false;
    } else if (email == "") {
        myApp.alert("Enter Email Address");
        return false;
    } else if (phone == "") {
        myApp.alert("Enter Phone Number");
        return false;
    } else {
        let exp_payload = {
            exp_date: exp_date_post,
            exp_day: exp_date_post,
            price: exp_adult_price,
            //qty:,
            signature: prod_signature,
            address_id: exp_address_id,
            adult_quantity: exp_adult_quant,
            firstname: first_name,
            lastname: last_name,
            email: email,
            phone_no: phone,
            location: exp_address_id
        };

        $.ajax({

            type: "POST",
           // url: "exp_purchase.php",
            url: "http://rewardsboxnigeria.com/customerportalapi/public/v1/experience/checkout",
            headers: {Authorization: token},
            data: exp_payload,
            dataType: "json",
            beforeSend: function() {
                $('.loading-div').show();
            },
            success: function (msg) {
                $('.loading-div').hide();
                if (msg.status == 200) {

                    voucher_code = msg.voucher_code;
                    order_no = msg.order_no;
                    mainView.router.loadPage('success.html');
                    delivery_type = "";
                }else if (msg.status == 401){
                window.location.replace("index.html");
                return false;
            } else {
                    myApp.alert(msg.message);
                }
            }
        });
    }

});
