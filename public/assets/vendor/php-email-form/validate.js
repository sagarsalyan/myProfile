/**
* PHP Email Form Validation - v2.1
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
!(function($) {
  "use strict";

  $('form.php-email-form').submit(function(e) {
    e.preventDefault();
    var this_form = $(this);
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();

    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
  
    php_email_form_submit(this_form);
    
    return true;
  });

  function php_email_form_submit(this_form) {

    try{
      var firebaseConfig = {
        apiKey: "AIzaSyDPHGwivqlWr43tdV7BtC_xZmUMWvHtxGk",
        authDomain: "profile-sagarsalyan.firebaseapp.com",
        databaseURL: "https://profile-sagarsalyan.firebaseio.com",
        projectId: "profile-sagarsalyan",
        storageBucket: "profile-sagarsalyan.appspot.com",
        messagingSenderId: "561073738805",
        appId: "1:561073738805:web:791071b286fec7a3d74d7c",
        measurementId: "G-8YT0G3X86Q"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      
      //Reference Message collection
      var messageRef = firebase.database().ref('message');
  
      var newMessageRef = messageRef.push();
      newMessageRef.set({
        name: this_form.find("#name").val(),
        email: this_form.find("#email").val(),
        subject:this_form.find("#subject").val(),
        message: this_form.find("#message").val()
      }).then(function(){
        this_form.find('.loading').slideUp();
          this_form.find('.sent-message').slideDown();
          this_form.find("input:not(input[type=submit]), textarea").val('');
      }).catch(function(){
        // console.log(data);
        var error_msg = "Form submission failed!<br>";
        this_form.find('.loading').slideUp();
        this_form.find('.error-message').slideDown().html(error_msg);
      });
    }catch{
        var error_msg = "Form submission failed!<br>";
        this_form.find('.loading').slideUp();
        this_form.find('.error-message').slideDown().html(error_msg);
    }
    

  }

})(jQuery);
