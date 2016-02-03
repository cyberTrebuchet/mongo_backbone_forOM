'use strict';

$(function(){
  console.log('Here I am in ur internetz!');

  // This function turns form data into JSON for the saveU
  // Seen at: https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/videos/beginner#jquery-serializeobject
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
  };

  var Blink = Backbone.Model.extend({
    urlRoot: '/blinks',
    defaults: {
      content: null,
      author: null,
      date: null,
      nods: 0,
      parent: null
    }
  });

  var Blinks = Backbone.Collection.extend({
    url: '/blinks',
    model: Blink
  });

  var BlinksList = Backbone.View.extend({
    el: '.blinks',
    render: function(){
      var that = this;
      var blinks = new Blinks();
      blinks.fetch({
        success: function(blinks){
          console.log('Yay we fetched Blinks! And here they are:');
          console.log(blinks);
          var template = _.template($('#blink-list-template').html(), {
            blinks: blinks.models
          });
          that.$el.html(template);
        }
      })
    },
    events: {
      'submit #new-blink-form': 'saveBlink'
    },
    saveBlink: function(e){
      var newBlink = $(e.currentTarget).serializeObject();
      var blink = new Blink();
      blink.save(newBlink, {
        success: function(blink){
          console.log(blink);
        }
      });
      return false; // to keep page from refreshing after event
    }
  });

  var blinksList = new BlinksList();

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });

  var router = new Router();

  router.on('route:home', function(){
    console.log('Backbone home route hit! Rendering Blinks...');
    blinksList.render();
  });

  Backbone.history.start();
});