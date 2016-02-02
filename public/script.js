'use strict';

$(function(){
  console.log('Here I am in ur internetz!');

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });

  var router = new Router();
  router.on('route:home', function(){
    console.log('Backbone home route hit!');
  });

  Backbone.history.start();
});