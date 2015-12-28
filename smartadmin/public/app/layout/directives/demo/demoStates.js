define(['layout/module', 'lodash', 'notification'], function (module, _) {

    'use strict';

    module.registerDirective('demoStates', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/layout/directives/demo/demo-states.tpl.html',
            scope: true,
            link: function (scope, element, attributes) {
                element.parent().css({
                    position: 'relative'
                });

                element.on('click', '#demo-setting', function () {
                    element.toggleClass('activate')
                })
            },
            controller: function ($scope) {
                var $root = $('body');

                $scope.$watch('fixedHeader', function (fixedHeader) {
                    localStorage.setItem('sm-fixed-header', fixedHeader);
                    $root.toggleClass('fixed-header', fixedHeader);
                    if (fixedHeader == false) {
                        $scope.fixedRibbon = false;
                    }
                });


                $scope.$watch('fixedNavigation', function (fixedNavigation) {
                    localStorage.setItem('sm-fixed-navigation', fixedNavigation);
                    $root.toggleClass('fixed-navigation', fixedNavigation);
                    if (fixedNavigation) {
                        $scope.insideContainer = false;
                    } else {
                        $scope.fixedRibbon = false;
                    }
                });


                $scope.$watch('fixedRibbon', function (fixedRibbon) {
                    localStorage.setItem('sm-fixed-ribbon', fixedRibbon);
                    $root.toggleClass('fixed-ribbon', fixedRibbon);
                    if (fixedRibbon) {
                        $scope.fixedHeader = true;
                        $scope.fixedNavigation = true;
                        $scope.insideContainer = false;
                    }
                });

                $scope.$watch('fixedPageFooter', function (fixedPageFooter) {
                    localStorage.setItem('sm-fixed-page-footer', fixedPageFooter);
                    $root.toggleClass('fixed-page-footer', fixedPageFooter);
                });

                $scope.$watch('insideContainer', function (insideContainer) {
                    localStorage.setItem('sm-inside-container', insideContainer);
                    $root.toggleClass('container', insideContainer);
                    if (insideContainer) {
                        $scope.fixedRibbon = false;
                        $scope.fixedNavigation = false;
                    }
                });

                $scope.$watch('rtl', function (rtl) {
                    localStorage.setItem('sm-rtl', rtl);
                    $root.toggleClass('smart-rtl', rtl);
                });

                $scope.$watch('menuOnTop', function (menuOnTop) {
                    $rootScope.$broadcast('$smartLayoutMenuOnTop', menuOnTop);
                    localStorage.setItem('sm-menu-on-top', menuOnTop);
                    $root.toggleClass('menu-on-top', menuOnTop);

                    if(menuOnTop)$root.removeClass('minified');
                });

                $scope.$watch('colorblindFriendly', function (colorblindFriendly) {
                    localStorage.setItem('sm-colorblind-friendly', colorblindFriendly);
                    $root.toggleClass('colorblind-friendly', colorblindFriendly);
                });


                $scope.fixedHeader = localStorage.getItem('sm-fixed-header') == 'true';
                $scope.fixedNavigation = localStorage.getItem('sm-fixed-navigation') == 'true';
                $scope.fixedRibbon = localStorage.getItem('sm-fixed-ribbon') == 'true';
                $scope.fixedPageFooter = localStorage.getItem('sm-fixed-page-footer') == 'true';
                $scope.insideContainer = localStorage.getItem('sm-inside-container') == 'true';
                $scope.rtl = localStorage.getItem('sm-rtl') == 'true';
                $scope.menuOnTop = localStorage.getItem('sm-menu-on-top') == 'true' || $root.hasClass('menu-on-top');
                $scope.colorblindFriendly = localStorage.getItem('sm-colorblind-friendly') == 'true';


                $scope.skins = [
                    {name: "smart-style-0",
                        logo: "styles/img/logo.png",
                        class: "btn btn-block btn-xs txt-color-white margin-right-5",
                        style: "background-color:#4E463F;",
                        label: "Smart Default"},

                    {name: "smart-style-1",
                        logo: "styles/img/logo-white.png",
                        class: "btn btn-block btn-xs txt-color-white",
                        style: "background:#3A4558;",
                        label: "Dark Elegance"},

                    {name: "smart-style-2",
                        logo: "styles/img/logo-blue.png",
                        class: "btn btn-xs btn-block txt-color-darken margin-top-5",
                        style: "background:#fff;",
                        label: "Ultra Light"},

                    {name: "smart-style-3",
                        logo: "styles/img/logo-pale.png",
                        class: "btn btn-xs btn-block txt-color-white margin-top-5",
                        style: "background:#f78c40",
                        label: "Google Skin"},

                    {name: "smart-style-4",
                        logo: "styles/img/logo-pale.png",
                        class: "btn btn-xs btn-block txt-color-white margin-top-5",
                        style: "background: #bbc0cf; border: 1px solid #59779E; color: #17273D !important;",
                        label: "PixelSmash"},

                    {name: "smart-style-5",
                        logo: "styles/img/logo-pale.png",
                        class: "btn btn-xs btn-block txt-color-white margin-top-5",
                        style: "background: rgba(153, 179, 204, 0.2); border: 1px solid rgba(121, 161, 221, 0.8); color: #17273D !important;",
                        label: "Glass"}
                ];

                $scope.smartSkin = localStorage.getItem('sm-skin') || "smart-style-0";


                $scope.setSkin = function (skin) {
                    $scope.smartSkin = skin.name;
                    $root.removeClass(_.pluck($scope.skins, 'name').join(' '));
                    $root.addClass(skin.name);
                    localStorage.setItem('sm-skin', skin.name);
                    $("#logo img").attr('src', skin.logo);
                };


                if($scope.smartSkin != "smart-style-0"){
                    $scope.setSkin(_.find($scope.skins, {name: $scope.smartSkin}))
                }


                $scope.factoryReset = function () {
                    $.SmartMessageBox({
                        title: "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
                        content: "Would you like to RESET all your saved widgets and clear LocalStorage?1",
                        buttons: '[No][Yes]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed == "Yes" && localStorage) {
                            localStorage.clear();
                            location.reload()
                        }
                    });
                }
            }
        }
    });
});
