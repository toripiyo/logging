(() => {
    'use strict';

    angular.module('plunker').controller('EyesCtrl', ['$scope', 'eyes', function EyesCtrl($scope, eyeOptions) {
        $scope.records = [];
        $scope.eyes = eyeOptions;
    }]);
})();
