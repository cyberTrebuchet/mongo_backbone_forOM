'use strict';

$(function(){
  console.log('Here I am in ur internetz!');

  var Blink = Backbone.Model.extend({
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
          })
          that.$el.html(template);
        }
      })
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