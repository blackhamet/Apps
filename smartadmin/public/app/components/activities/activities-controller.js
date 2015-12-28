define(['app'], function(app){
    "use strict";

	    return app.controller("ActivitiesCtrl", ActivitiesCtrl);

			function ActivitiesCtrl($scope, $log, activityService){

				$scope.activeTab = 'default';
				$scope.currentActivityItems = [];
				$scope.template_url = "app/components/activities/tabs/tab-" + $scope.activeTab + ".html";
				// Getting different type of activites
				activityService.get(function(data){

					$scope.activities = data.activities;
					
				});


				$scope.isActive = function(tab){
					return $scope.activeTab === tab;
				};

				$scope.setTab = function(activityType){
					$scope.activeTab = activityType;
					$scope.template_url = "app/components/activities/tabs/tab-" +activityType + ".html";

					activityService.getbytype(activityType, function(data) {

						$scope.currentActivityItems = data.data;

					});

				};

			}

});