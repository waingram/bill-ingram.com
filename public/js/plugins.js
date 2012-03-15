// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/*
 * jQuery Backstretch
 * Version 1.2.6
 * http://srobbin.com/jquery-plugins/jquery-backstretch/
 *
 * Add a dynamically-resized background image to the page
 *
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/

;(function($) {

    $.backstretch = function(src, options, callback) {
        var defaultSettings = {
                centeredX: true         // Should we center the image on the X axis?
              , centeredY: true         // Should we center the image on the Y axis?
              , speed: 0                 // fadeIn speed for background after image loads (e.g. "fast" or 500)
            }
          , container = $("#backstretch")
          , settings = container.data("settings") || defaultSettings // If this has been called once before, use the old settings as the default
          , existingSettings = container.data('settings')
          , rootElement = ( _supportsFixed() ) ? $(window) : $(document) // Does this browser support fixed positioning?
          , imgRatio, bgImg, bgWidth, bgHeight, bgOffset, bgCSS;
                
        // Extend the settings with those the user has provided
        if(options && typeof options == "object") $.extend(settings, options);
        
        // Just in case the user passed in a function without options
        if(options && typeof options == "function") callback = options;
    
        // Initialize
        $(document).ready(_init);
  
        // For chaining
        return this;
        
        // Detecting support for position:fixed
        function _supportsFixed() {
            var top = 10
              , $div = $("<div />").css({ position: "fixed", top: top }).appendTo("body")
              , isSupported = $div.offset().top == top;
              
              $div.remove();              
              return isSupported;
        }
    
        function _init() {
            // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
            if(src) {
                var img;
                
                // If this is the first time that backstretch is being called
                if(container.length == 0) {
                    container = $("<div />").attr("id", "backstretch")
                                            .css({left: 0, top: 0, position: "fixed", overflow: "hidden", zIndex: -999999, margin: 0, padding: 0, height: "100%", width: "100%"});
                } else {
                    // Prepare to delete any old images
                    container.find("img").addClass("deleteable");
                }
                
                img = $("<img />").css({position: "absolute", display: "none", margin: 0, padding: 0, border: "none", zIndex: -999999})
                                  .bind("load", function(e) {                                          
                                      var self = $(this),
                                          imgWidth, imgHeight;
                                          
                                      self.css({width: "auto", height: "auto"});
                                      imgWidth = this.width || $(e.target).width();
                                      imgHeight = this.height || $(e.target).height();
                                      imgRatio = imgWidth / imgHeight;

                                      _adjustBG(function() {
                                          self.fadeIn(settings.speed, function(){
                                              // Remove the old images, if necessary.
                                              container.find('.deleteable').remove();
                                              // Callback
                                              if(typeof callback == "function") callback();
                                          });
                                      });
                                      
                                  })
                                  .appendTo(container);
                 
                // Append the container to the body, if it's not already there
                if($("body #backstretch").length == 0) {
                    $("body").append(container);
                }
                
                // Attach the settings
                container.data("settings", settings);
                    
                img.attr("src", src); // Hack for IE img onload event
                // Adjust the background size when the window is resized or orientation has changed (iOS)
                $(window).resize(_adjustBG);
            }
        }
            
        function _adjustBG(fn) {
            try {
                bgCSS = {left: 0, top: 0}
                bgWidth = rootElement.width();
                bgHeight = bgWidth / imgRatio;
                
                // Make adjustments based on image ratio
                // Note: Offset code provided by Peter Baker (http://ptrbkr.com/). Thanks, Peter!
                if(bgHeight >= rootElement.height()) {
                    bgOffset = (bgHeight - rootElement.height()) /2;
                    if(settings.centeredY) $.extend(bgCSS, {top: "-" + bgOffset + "px"});
                } else {
                    bgHeight = rootElement.height();
                    bgWidth = bgHeight * imgRatio;
                    bgOffset = (bgWidth - rootElement.width()) / 2;
                    if(settings.centeredX) $.extend(bgCSS, {left: "-" + bgOffset + "px"});
                }

                container.find("img:not(.deleteable)").width( bgWidth ).height( bgHeight )
                                                      .filter("img").css(bgCSS);
            } catch(err) {
                // IE7 seems to trigger _adjustBG before the image is loaded.
                // This try/catch block is a hack to let it fail gracefully.
            }
      
            // Executed the passed in function, if necessary
            if (typeof fn == "function") fn();
        }
    };
  
})(jQuery);
