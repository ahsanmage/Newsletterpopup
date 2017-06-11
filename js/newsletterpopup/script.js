var EsNewsSubscribers = {

    cookieLiveTime: 100,

    cookieName: 'es_newssubscriber',

    baseUrl: '',

    setCookieLiveTime: function(value)
    {
        this.cookieLiveTime = value;
    },

    setCookieName: function(value)
    {
        this.cookieName = value;
    },

    setBaseUrl: function(url)
    {
        this.baseUrl = url;
    },

    getBaseUrl: function(url)
    {
        return this.baseUrl;
    },

    createCookie: function() {
        var days = this.cookieLiveTime;
        var value = 1;
        var name = this.cookieName;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = escape(name)+"="+escape(value)+expires+"; path=/";
    },

    readCookie: function(name) {
        var name = this.cookieName;
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
        }
        return null;
    },

    boxClose: function()
    {
        jQuery('#esns_background_layer').fadeOut();
    },

    boxOpen: function()
    {
        setTimeout(function () {
            jQuery('#esns_box_layer').show(600);
            jQuery('#esns_background_layer').fadeIn();
        }, 6000);
    }
};

jQuery(function() {
	jQuery("#exclusiveguest").hide()
if((GetURLParameter('welcomenewcustomer') || (Mage.Cookies.get('exclusivePopup') == 1)) && (Mage.Cookies.get('exclusive-check') != '1') && (Mage.Cookies.get('exclusiveDiv') != 1) ) {
Mage.Cookies.set('es_newsletterpopup', '1');
Mage.Cookies.set('exclusivePopup', '1');
jQuery("#exclusiveguest").show();
}
function GetURLParameter(sParam)
	{
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++)
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam)
	        {
	            return sParameterName[1];
	        }
	    }
	}
    if (EsNewsSubscribers.readCookie() != 1) {
        EsNewsSubscribers.createCookie();
        EsNewsSubscribers.boxOpen();
    }

    jQuery('#esns_submit').click(function(){
        var email = jQuery('#esns_email').val();
        var gender = jQuery("input:radio:checked").val();
        var campaign = jQuery('#esns_campaign').val();
        jQuery.post(EsNewsSubscribers.getBaseUrl()+'newsletter/subscriber/newajax/', {'email':email,'gender':gender}, function(resp) {
            if (resp.errorMsg) {
                jQuery('#esns_box_subscribe_response_error').html(resp.errorMsg);
            } else {
                jQuery('#esns_box_subscribe_response_error').html('');
                jQuery('#esns_box_subscribe_form').css('display','none');
                jQuery('#esns_box_title').css('display','none');
                jQuery('#esns_box_success_html').css('display','block');
                jQuery('#esns_box_subscribe_response_success').css('display','none');
            }
        });
    });
    jQuery('#esns_box_close').click(function(){
        EsNewsSubscribers.boxClose();
    });
    jQuery('#esns_continue').click(function(){
        var gender = jQuery("#esns_box_layer input:radio:checked").val();
        if (gender == 2) {
            window.location = EsNewsSubscribers.getBaseUrl()+"womens";
        } else if(gender == 1) {
            window.location = EsNewsSubscribers.getBaseUrl()+"mens";
        } else {
            EsNewsSubscribers.boxClose();
        }
    });

});