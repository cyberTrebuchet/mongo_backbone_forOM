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
      date: null,
      nods: 0,
      parent: null
    }
  });

  var Blinks = Backbone.Collection.extend({
    url: '/blinks',
    model: Blink,
    parse: function(data){
      return data.blinks;
    }
  });

  var BlinkView = Backbone.View.extend({
    tagName: 'li',
    className: 'blink',
    template: _.template($('#blink-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove)
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
        $list.append(blink.render().$el);
      }, this);

      return this;
    },

    events: {
      'submit #new-blink-form': 'saveBlink'
    },

    saveBlink: function(e){
      var newBlink = $(e.currentTarget).serializeObject();
      console.log(newBlink);
      blinks.create(newBlink);
      return false; // to keep page from refreshing after event
    }
  });

  var blinks = new Blinks();
  blinks.fetch();

  var blinksList = new BlinksList({ collection: blinks });

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