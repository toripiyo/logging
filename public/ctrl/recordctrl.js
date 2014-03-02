function RecordCtrl($scope, $http) {

    $scope.records = [];

    for(i=0; i < $scope.records.length; i++){
        $scope.records[i].to = calculate_duration($scope.records[i].from, $scope.records[i+1].from);
    }

    $scope.updateForm = function (index) {
        $scope.records[index].from = new Date().getHours()+":"+ new Date().getMinutes();
    };

    $scope.insertRecord = function (index){
        $scope.records.splice(index + 1,0,{});
    }

    $scope.deleteRecord = function (index){
        $scope.records.splice(index,1);
    }

    $scope.calculateDuration = function(s_time, e_time){

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

    $scope.saveRecord = function(data){
        data.forEach(
            
        )
    }

}
