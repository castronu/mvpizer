(function () {
    'use strict';

    angular
        .module('mvpizerAdmin')
        .controller('ProjectController', ProjectController);

    /** @ngInject */
    function ProjectController($timeout, $scope, $stateParams, $firebaseObject, $filter) {
        var projectName = $stateParams.projectName;
        console.log(projectName);

        $scope.config = {};

        $scope.showTheme = function () {
            var selected = $filter('filter')($scope.themes, {value: $scope.config.theme});
            return ($scope.config.theme && selected.length) ? selected[0].text : 'Not set';
        };

        $scope.themes = [
            {value: 'blue', text: 'blue'},
            {value: 'red', text: 'red'},
            {value: 'orange', text: 'orange'},
            {value: 'green', text: 'green'}
        ];

        $scope.newAbout = function () {
            var aboutSection = {
                "type": "about",
                "menu_item": "",
                "title": "",
                "body": "",
                "button": {
                    text: "", link: ""
                }
            }
            $scope.config.sections.push(aboutSection);
        };

        var projectRef = new Firebase("https://mvpizer.firebaseio.com/").child(projectName);

        var syncObject = $firebaseObject(projectRef);

        syncObject.$loaded().then(function () {
                syncObject.$bindTo($scope, "config");
                $scope.config = syncObject;
                console.log($scope.config);

                if (!$scope.config.title) {
                    //First load...
                    console.log("first load...")
                    $scope.config.title = "Insert title";
                    $scope.config.sections = [];


                    $scope.config.sections.push({"type": "about", "menu_item": "First section"});
                    $scope.config.sections.push({
                        "type": "services",
                        "menu_item": "Services",
                        "title" : "Services",
                        "services": [
                            {"title": "First"}, {"title": "Second"}, {"title": "Third"}, {"title": "Forth"}
                        ]
                    });
                    $scope.config.sections.push({"type": "aside", "title" : "aside"});
                    $scope.config.sections.push({"type": "contact", "title":"contact"});
                }
            }
        ).
            catch(function (error) {
                console.log(error);
            });

    }
})
();
