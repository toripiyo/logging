function RecordCtrl($scope, $http) {

    $scope.records = [];

    for(i=0; i < $scope.records.length; i++){
        $scope.records[i].to = calculate_duration($scope.records[i].from, $scope.records[i+1].from);
    }

    $scope.updateForm = function (index) {
        $scope.records[index].from = new Date().getHours()+":"+ new Date().getMinutes();
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


    $scope.calculateDuration = function (index){

        differenceClock = function(s_time, e_time){

            if(!(s_time) || !(e_time)) {
                return "--:--";
            }

            s = s_time.split(":");
            e = e_time.split(":");
            
            time = (Number(e[0])*60)+ +Number(e[1]) - (Number(s[0])*60) - Number(s[1]);

            if(!(time)) {
                return "--:--";
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
                console.log("success"); // Getting Success Response in Callback
            }).
            error(function(response) {
                console.log("error"); // Getting Error Response in Callback
            });

    };  

    $scope.calculateRecord = function(){

    }


}
