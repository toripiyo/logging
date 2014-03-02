function HistoryCtrl($scope, $http) {

    $scope.init = [
        {from:'09:34', to:'10:25', activity:'blog server construction', code:75},
        {from:'10:25', to:'11:34', activity:'profile ssl certificate update', code:422},
        {from:'11:34', to:'13:34', activity:'rest', code:823},
        {from:'13:34', to:'15:34', activity:'dns switching', code:55},
        {from:'15:34', to:'17:58', activity:'consult with app about switching', code:1015}
    ]

    $scope.eyes = [
        {content:'075 IS blog'},
        {content:'422 research'},
        {content:'823 IM recipe'},
        {content:'1025 kobo ebook'},
        {content:'1039 IS cats paws'}
    ];


    $scope.records = [];

    $scope.from = [];
    $scope.to = [];
    $scope.duration = [];
    $scope.activity = [];

    for (i=0; i < $scope.init.length; i++){
        $scope.from.push($scope.init[i].from);
        if (i < $scope.init.length -1){
            $scope.to.push($scope.init[i+1].from);
        } else {
            $scope.to.push($scope.init[i].from);            
        }
        $scope.duration.push(calculate_duration($scope.from[i],$scope.to[i]));
        $scope.activity.push($scope.init[i].activity);
    }

    $scope.updateForm = function (index) {
        $scope.init[index].from = new Date().getHours()+":"+ new Date().getMinutes();
        $scope.from[index] = $scope.init[index].from;
        if (index-1 >= 0) {
            $scope.init[index-1].to = new Date().getHours()+":"+ new Date().getMinutes();
            $scope.to[index-1] = $scope.init[index-1].to;
        }
    };

    $scope.updateTimespan = function (current, activity) {
    	$scope.current = current;
        $scope.activity = activity;
    }

    $scope.addRecord = function (index){
        update_init();

        // $scope.init.push({from:'', to:'', activity:'', code:''});
        $scope.init.splice(index + 1,0,{from:'', to:'', activity:'', code:''});

        $scope.from = [];
        $scope.to = [];
        $scope.activity = [];

        for (i=0; i < $scope.init.length; i++){
            $scope.from.push($scope.init[i].from);
            $scope.to.push($scope.init[i].to);
            $scope.activity.push($scope.init[i].activity);
        }        
    }

    $scope.insertRecord = function (index){
        $scope.records.splice(index + 1,0,{});
    }

    $scope.deleteRecord = function (index){
        $scope.records.splice(index,1);
    }

    
    $scope.removeRecord = function (index){
        update_init();


        $scope.init.splice(index,1);

        $scope.from = [];
        $scope.to = [];
        $scope.activity = [];

        for (i=0; i < $scope.init.length; i++){
            $scope.from.push($scope.init[i].from);
            $scope.to.push($scope.init[i].to);
            $scope.activity.push($scope.init[i].activity);
        }  
    }

    function update_init(){

        for (i=0; i < $scope.init.length; i++){
            $scope.init[i] = {from:$scope.from[i], to:$scope.to[i], activity:$scope.activity[i], code:75};
        }

    }

    function calculate_duration(s_time, e_time){
        s = s_time.split(":");
        e = e_time.split(":");
        // alert(s[0]);
        // alert(s[1]);
        // alert(e[0]);
        // alert(e[1]);
        
        time = (Number(e[0])*60)+ +Number(e[1]) - (Number(s[0])*60) - Number(s[1]);
        return time/60;
    }

}
