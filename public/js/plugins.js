// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/*
 * jQuery Backstretch
 * Version 1.2.5
 * http://srobbin.com/jquery-plugins/jquery-backstretch/
 *
 * Add a dynamically-resized background image to the page
 *
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/
(function(a){a.backstretch=function(l,b,j){function m(c){try{h={left:0,top:0},e=f.width(),d=e/k,d>=f.height()?(i=(d-f.height())/2,g.centeredY&&a.extend(h,{top:"-"+i+"px"})):(d=f.height(),e=d*k,i=(e-f.width())/2,g.centeredX&&a.extend(h,{left:"-"+i+"px"})),a("#backstretch, #backstretch img:not(.deleteable)").width(e).height(d).filter("img").css(h)}catch(b){}"function"==typeof c&&c()}var n={centeredX:!0,centeredY:!0,speed:0},c=a("#backstretch"),g=c.data("settings")||n;c.data("settings");var f="onorientationchange"in window?a(document):a(window),k,e,d,i,h;b&&"object"==typeof b&&a.extend(g,b);b&&"function"==typeof b&&(j=b);a(document).ready(function(){if(l){var b;0==c.length?c=a("<div />").attr("id","backstretch").css({left:0,top:0,position:"fixed",overflow:"hidden",zIndex:-999999,margin:0,padding:0,height:"100%",width:"100%"}):c.find("img").addClass("deleteable");b=a("<img />").css({position:"absolute",display:"none",margin:0,padding:0,border:"none",zIndex:-999999}).bind("load",function(b){var d=a(this),e;d.css({width:"auto",height:"auto"});e=this.width||a(b.target).width();b=this.height||a(b.target).height();k=e/b;m(function(){d.fadeIn(g.speed,function(){c.find(".deleteable").remove();"function"==typeof j&&j()})})}).appendTo(c);0==a("body #backstretch").length&&a("body").append(c);c.data("settings",g);b.attr("src",l);a(window).resize(m)}});return this}})(jQuery);