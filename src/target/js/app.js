(function () {
    'use strict';

    var mvpizer = angular.module('mvpizer', ['duScroll','firebase']);

    mvpizer
        .controller('AppCtrl', function ($scope, cssInjector, $document, $firebaseObject) {



          /*  $scope.config = {

                "title": "CLIffhanger",
                "header": {
                    "img" : "img/header2.jpg",
                    "title": "Your Favorite Source of Free Bootstrap Themes",
                    "body": "Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!",
                    "button": {
                        text: "Find Out More", link: "first"
                    }
                },
                "sections": [
                    {
                        "id": "first",
                        "type": "about",
                        "menu_item": "About",
                        "title": "We've got what you need!",
                        "body": "Start Bootstrap has everything you need to get your new website up and running in no time! All of the templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings attached!",
                        "button": {
                            text: "Get Started!", link: ""
                        }
                    },
                    {
                        "id": "second",
                        "type": "services",
                        "title": "At Your Service",
                        "services": [
                            {
                                "title": "Sturdy Templates",
                                "body": "Our templates are updated regularly so they don't break.",
                                "icon": "fa-diamond"
                            },
                            {
                                "title": "Ready to Ship",
                                "body": "You can use this theme as is, or you can make changes!",
                                "icon": "fa-paper-plane"
                            },
                            {
                                "title": "Up to Date",
                                "body": "We update dependencies to keep things fresh.",
                                "icon": "fa-newspaper-o"
                            },
                            {
                                "title": "Made with Love",
                                "body": "You have to make your websites with love these days!",
                                "icon": "fa-heart"
                            },

                        ],
                        "menu_item": "Services"
                    },
                    {"id": "third", "type" : "aside", "title" : "Free Download at Start Bootstrap!", "button": {
                        text: "Download Now!", link: "#"
                    }},
                    {"id" : "forth", "type" : "contact", "menu_item" : "Contact", "title" : "Let's Get In Touch!", "body" : "Ready to start your next project with us? That's great! Give us a call or send us an email and we will get back to you as soon as possible!", "phone" : "123-456-6789", "mail" : "feedback@startbootstrap.com"   }
                ]


            };*/




                var cliffhanger = new Firebase("https://mvpizer.firebaseio.com/Freschissimi");


            var syncObject = $firebaseObject(cliffhanger);


            // to take an action after the data loads, use the $loaded() promise
            syncObject.$loaded().then(function() {
                syncObject.$bindTo($scope, "config");
                $scope.config = syncObject;
                $scope.headerStyle = {
                    "position": "relative",
                    "width": "100%",
                    "-webkit-background-size": "cover",
                    "-moz-background-size": "cover",
                    "background-size": "cover",
                    "-o-background-size": "cover",
                    "background-position": "center",
                    "background-image": "url('"+$scope.config.header.img+"')",
                    "text-align": "center",
                    "color": "white"
                };

                cssInjector.add("css/creative."+$scope.config.theme+".css");




                $scope.sometext = "Ciao!"
            });





        })
        .provider('cssInjector', ['$interpolateProvider', function ($interpolateProvider) {
            var singlePageMode = false;

            function CssInjector($compile, $rootScope, $rootElement) {
                // Variables
                var head = angular.element(document.getElementsByTagName('head')[0]),
                    scope;

                // Capture the event `locationChangeStart` when the url change. If singlePageMode===TRUE, call the function `removeAll`
                $rootScope.$on('$locationChangeStart', function () {
                    if (singlePageMode === true)
                        removeAll();
                });

                // Always called by the functions `addStylesheet` and `removeAll` to initialize the variable `scope`
                var _initScope = function () {
                    if (scope === undefined) {
                        scope = $rootElement.scope();
                    }
                };

                // Used to add a CSS files in the head tag of the page
                var addStylesheet = function (href) {
                    _initScope();

                    if (scope.injectedStylesheets === undefined) {
                        scope.injectedStylesheets = [];
                        head.append($compile("<link data-ng-repeat='stylesheet in injectedStylesheets' data-ng-href='" + $interpolateProvider.startSymbol() + "stylesheet.href" + $interpolateProvider.endSymbol() + "' rel='stylesheet' />")(scope)); // Found here : http://stackoverflow.com/a/11913182/1662766
                    }
                    else {
                        for (var i in scope.injectedStylesheets) {
                            if (scope.injectedStylesheets[i].href == href) // An url can't be added more than once. I use a loop FOR, not the function indexOf to make the code IE < 9 compatible
                                return;
                        }
                    }

                    scope.injectedStylesheets.push({href: href});
                };

                var remove = function (href) {
                    _initScope();

                    if (scope.injectedStylesheets) {
                        for (var i = 0; i < scope.injectedStylesheets.length; i++) {
                            if (scope.injectedStylesheets[i].href === href) {
                                scope.injectedStylesheets.splice(i, 1);
                                return;
                            }
                        }
                    }
                };

                // Used to remove all of the CSS files added with the function `addStylesheet`
                var removeAll = function () {
                    _initScope();

                    if (scope.injectedStylesheets !== undefined)
                        scope.injectedStylesheets = []; // Make it empty
                };

                return {
                    add: addStylesheet,
                    remove: remove,
                    removeAll: removeAll
                };
            }

            this.$get = ['$compile', '$rootScope', '$rootElement', function ($compile, $rootScope, $rootElement) {
                return new CssInjector($compile, $rootScope, $rootElement);
            }];

            this.setSinglePageMode = function (mode) {
                singlePageMode = mode;
                return this;
            }
        }]);
    ;


})();

