'use strict';

$(function(){
  console.log('Here I am in ur internetz!');

  // This function turns form data into JSON for BlinksList.saveBlink()
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
      nods: 0,
      parent: null
    }
  });

  var Blinks = Backbone.Collection.extend({
    url: '/blinks',
    model: Blink
  });

  var BlinkView = Backbone.View.extend({
    tagName: 'li',
    className: 'blink',
    template: _.template($('#blink-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove)
      this.listenTo(this.model, 'sync change', this.render)
    },

    render: function() {
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      return this;
    },

    events: {
      'click .remove': 'onRemove'
    },

    onRemove: function() {
      this.model.destroy();
    }
  });

  var BlinksList = Backbone.View.extend({
    el: '.blinks',

    initialize: function() {
      this.listenTo(this.collection, 'sync change', this.render);
      this.collection.fetch();
      this.render();
    },
    render: function() {
      var $list = this.$('ul.blinks-list').empty();

      this.collection.each(function(model) {
        var blink = new BlinkView({ model: model });
        $list.prepend(blink.render().$el);
      }, this);

      return this;
    },

    events: {
      'submit #new-blink-form': 'saveBlink'
    },

    saveBlink: function(e){
      var newBlink = $(e.currentTarget).serializeObject();
      console.log(newBlink);
      this.collection.create(newBlink, {
        success: function(res){
          $('#new-blink').val(''); // clear input field upon creation
        }
      });
      return false; // to keep page from refreshing after event
    }
  });

  var blinks = new Blinks();

  var blinksList = new BlinksList({ collection: blinks });

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });

  var router = new Router();

  router.on('route:home', function(){
    console.log('Backbone home route hit! Rendering Blinks...');
  });

  Backbone.history.start();
});