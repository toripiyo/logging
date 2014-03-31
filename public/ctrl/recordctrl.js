angular.module('plunker', ['ui.bootstrap']);
function RecordCtrl($scope, $http) {

    $scope.records = [];
    $scope.day;
    $scope.test = undefined;
    $scope.eyes = [
        {content:'075 IS blog'},
        {content:'新サ共通'},
        {content:'ランチ'},
        {content:'422 research'},
        {content:'823 IM recipe'},
        {content:'1025 kobo ebook'},
        {content:'1039 IS cats paws'}
    ];

    // for(i=0; i < $scope.records.length; i++){
    //     $scope.records[i].to = calculate_duration($scope.records[i].from, $scope.records[i+1].from);
    // }

    $scope.initRecord = function(records) {

        $scope.records = records;

        if ($scope.records.length == 0) {
        // if (true) {
            $scope.records[0] = {from:'', to:'', duration:0, activity:'', code:''};
        }

    }

    $scope.updateForm = function (index) {
        if (index == ($scope.records.length - 1)){
            $scope.records[index].to = new Date().getHours()+":"+ ("0"+new Date().getMinutes()).slice(-2);
        } else {
            $scope.records[index+1].from = new Date().getHours()+":"+ ("0"+new Date().getMinutes()).slice(-2);
        }
    };

    $scope.insertRecord = function (index){

        if (index == ($scope.records.length -1)) {
            var tmp = $scope.records[index].to;
            $scope.records.splice(index + 1,0,{});
            $scope.records[$scope.records.length -1].from = tmp;
        }else{
            $scope.records.splice(index + 1,0,{});
        }

    }

    $scope.deleteRecord = function (index){
        $scope.records.splice(index,1);
    }

    $scope.calculateTo = function (index) {
        if (index != ($scope.records.length - 1)){
            $scope.records[index].to = $scope.records[index+1].from;
            return $scope.records[index].to;
        }
    }

    $scope.calculateDuration = function (index){

        differenceClock = function(s_time, e_time){

            if(!(s_time) || !(e_time)) {
                return "0";
            }

            s = s_time.split(":");
            e = e_time.split(":");
            
            time = (Number(e[0])*60)+ +Number(e[1]) - (Number(s[0])*60) - Number(s[1]);

            if(!(time)) {
                return "0";
            }

            return Math.round(time/60*100)/100;
        }

        var duration;

        if (index == ($scope.records.length -1)) {
            duration = differenceClock($scope.records[index].from, $scope.records[index].to);
            $scope.records[index].duration = duration;
            return duration;
        }else{
            duration = differenceClock($scope.records[index].from, $scope.records[index+1].from);
            $scope.records[index].duration = duration;
            return duration;
        }       

    }

    $scope.saveRecord = function(){

        var method = 'POST';
        var url = 'http://localhost:3000/';

        // add day field
        for(i=0; i<$scope.records.length; i++){
            $scope.records[i].day = $scope.day;
        }


        console.log($scope.records);

        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
                method: method,
                url: url,
                data: JSON.stringify($scope.records),
                headers: {'Content-Type': 'application/json'},
                // http://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express?rq=1
                // cache: true
            }).
            success(function(response) {
                alert('success');
                console.log("success"); // Getting Success Response in Callback
            }).
            error(function(response) {
                console.log("error"); // Getting Error Response in Callback
            });

    };

    $scope.calculateRecord = function(){

    }


}
