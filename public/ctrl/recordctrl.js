(() => {
    'use strict';

    const app = angular.module('plunker', ['ui.bootstrap']);
    const eyes = [
        {content: '075 IS blog'},
        {content: '新サ共通'},
        {content: 'ランチ'},
        {content: '422 research'},
        {content: '823 IM recipe'},
        {content: '1025 kobo ebook'},
        {content: '1039 IS cats paws'},
    ];

    app.constant('eyes', eyes);
    app.controller('RecordCtrl', ['$scope', '$http', 'eyes', function RecordCtrl($scope, $http, eyeOptions) {
        $scope.records = [];
        $scope.day = undefined;
        $scope.eyes = eyeOptions;

        const differenceClock = (startTime, endTime) => {
            if (!startTime || !endTime) {
                return 0;
            }

            const [startHour, startMinute] = startTime.split(':').map(Number);
            const [endHour, endMinute] = endTime.split(':').map(Number);
            const differenceInMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);

            if (!differenceInMinutes) {
                return 0;
            }

            return Math.round((differenceInMinutes / 60) * 100) / 100;
        };

        const currentTime = () => {
            const now = new Date();
            return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        };

        $scope.initRecord = (records) => {
            $scope.records = records.length > 0
                ? records
                : [{from: '', to: '', duration: 0, activity: '', code: ''}];
        };

        $scope.updateForm = (index) => {
            if (index === $scope.records.length - 1) {
                $scope.records[index].to = currentTime();
                return;
            }

            $scope.records[index + 1].from = currentTime();
        };

        $scope.insertRecord = (index) => {
            const isLastRecord = index === $scope.records.length - 1;
            const nextRecord = isLastRecord ? {from: $scope.records[index].to} : {};
            $scope.records.splice(index + 1, 0, nextRecord);
        };

        $scope.deleteRecord = (index) => {
            $scope.records.splice(index, 1);
        };

        $scope.calculateTo = (index) => {
            if (index === $scope.records.length - 1) {
                return undefined;
            }

            const nextStartTime = $scope.records[index + 1].from;
            $scope.records[index].to = nextStartTime;
            return nextStartTime;
        };

        $scope.calculateDuration = (index) => {
            const record = $scope.records[index];
            const endTime = index === $scope.records.length - 1
                ? record.to
                : $scope.records[index + 1].from;
            const duration = differenceClock(record.from, endTime);

            record.duration = duration;
            return duration;
        };

        $scope.saveRecord = () => {
            const records = $scope.records.map((record) => ({
                ...record,
                day: $scope.day,
            }));

            $http.post('/', records).then(
                () => {
                    alert('success');
                },
                (error) => {
                    console.error('Failed to save records:', error);
                },
            );
        };
    }]);
})();
