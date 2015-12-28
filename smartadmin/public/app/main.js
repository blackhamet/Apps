// Defer AngularJS bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

define([
    'require',
    'jquery',
    'angular',
    'domReady',

    //'pace',
    'bootstrap',
    'app',
    'includes'
], function (require, $, ng, domReady, pace) {
    'use strict';

    //pace.start({
    //    restartOnRequestAfter: true
    //});

    domReady(function (document) {
        ng.bootstrap(document, ['app']);
        ng.resumeBootstrap();
    });
});
