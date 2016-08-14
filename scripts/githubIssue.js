var app = angular.module('myApp', ['angularMoment']);
//this service will be used for getting the data through get method.
app.factory('callApi', ['$http', '$log',
function($http, $log) {

	return {
		call : function(url, config) {
			return $http({
				method : "get",
				url : url,
			}).error(function(){
				console.log("error in fetching data");
			});
			
		}
	}
}])
app.controller('MyCtrl1', ['$scope', 'callApi', function (scope, callApi) {
	scope.init = function(){
    scope.myData = {
        currentIssue: null,
        issueList: [],
        issueListState: 'open',
        issueListSort: 'created',
        issueListDirection: 'desc',
		issueListDuration : 0,
        issueListPage: 1,
		perm: [],
		openIssueCount: 0
    };}

    scope.setIssueList = function () {
		scope.myData.issueList = [];
		var url = "https://api.github.com/repos/" + scope.myData.user + "/"+scope.myData.repo+"/issues?direction="+scope.myData.issueListDirection+"&sort="+scope.myData.issueListSort+"&state="+scope.myData.issueListState;
		var TotalIssues_lessThan24hours = moment().subtract(24, "hours").format('YYYY-MM-DDTHH:MM:SSZ');
		var Total_issues_lessThan7days = moment().subtract(7, "days").format('YYYY-MM-DDTHH:MM:SSZ');
		
		
		switch(scope.myData.issueListDuration) {
		case "1":
			var url =url + '&created:>=' +TotalIssues_lessThan24hours;
			
			break;
		case "2":
			var url =url + '&created:<'+TotalIssues_lessThan24hours+'&created:>='+Total_issues_lessThan7days;
			
		case "3":
			var url =url + '&created:<'+Total_issues_lessThan7days;
			
		} 
		
		
	
		var pageCount = 0;
		var curr_url = url + "&page="+pageCount+"&per_page=100";
		var infoUrl = "https://api.github.com/repos/"+scope.myData.user+"/"+scope.myData.repo;
		callApi.call(curr_url,"").then(function successCallback(response) {
			scope.myData.openIssueCount = response.open_issues_count;
		});
		
		
		
		while(pageCount <= 10){
			if(scope.myData.openIssueCount != 0 && scope.myData.openIssueCount <=scope.myData.issueList.length)
				break;
			
			pageCount += 1;
			curr_url = url + "&page="+pageCount+"&per_page=100";
			callApi.call(curr_url,"").then(function successCallback(response) {
			
			scope.myData.issueList = scope.myData.issueList.concat(response.data);
			scope.myData.perm = scope.myData.issueList;
			
			
			
		}, function errorCallback(response) {
			
		});
		}
		
		
    };
	//it will populate the data according to chosen interval
	scope.setInterval = function(){
	
	var TotalIssues_lessThan24hours = moment().subtract(24, "hours").format('YYYY-MM-DDTHH:MM:SSZ');
		var Total_issues_lessThan7days = moment().subtract(7, "days").format('YYYY-MM-DDTHH:MM:SSZ');
		var data = scope.myData.perm;
		var res = [];
		switch(scope.myData.issueListDuration) {
		case "0":
			res = scope.myData.perm;
		case "1":
			
			for(i = 0;i<data.length;i++){
				if(data[i].created_at >= TotalIssues_lessThan24hours)
					res = res.concat(data[i]);
				
			}
			
			break;
		case "2":
			for(i = 0;i<data.length;i++){
				if(data[i].created_at < TotalIssues_lessThan24hours && data[i].created_at >= Total_issues_lessThan7days)
					res = res.concat(data[i]);
				
			}
			break;
		case "3":
			for(i = 0;i<data.length;i++){
				if(data[i].created_at < Total_issues_lessThan7days)
					res = res.concat(data[i]);
				
			}
			break;
		} 
		
		scope.myData.issueList = res;
	}
	
	

    scope.setSort = function (sort) {
        var oldSort = angular.copy(scope.myData.issueListSort);
        scope.myData.issueListSort = sort;
        if (oldSort == sort) {
            scope.setDirection(scope.myData.issueListDirection == 'desc' ? 'asc' : 'desc');
        } else {
            scope.setDirection('desc');
        }
    };

    scope.setDirection = function (direction) {
        scope.myData.issueListDirection = direction;
        scope.setIssueList();
    };

    scope.sortClass = function (column) {
        return column == scope.myData.issueListSort && 'sort-' + scope.myData.issueListDirection;
    };

    scope.setCurrentIssue = function (number) {
		
		var url = "https://api.github.com/repos/" + scope.myData.user + "/"+scope.myData.repo+"/issues/"+number;
		callApi.call(url,"").then(function successCallback(response) {
			scope.myData.currentIssue = response.data;
			
		}, function errorCallback(response) {
			
		});
        
    };

    scope.showAll = function () {
        scope.myData.currentIssue = null;
    };
	//This function will get the username and repo name from the given url
	scope.getDataFromUrl = function(){
		scope.init();
		var rowUrl = scope.searchText;
		words = rowUrl.split('/') 

 
		if(words[0] == "https:" && words[1] == "" && words[2] == "github.com" && words[3] != "" && words[4] != ""){
   		scope.myData.user = words[3];
		scope.myData.repo = words[4];
		
		scope.setIssueList();		
		}
   	else{
   		 alert("Please enter valid url"); 
		}
 
		

	};
	
   

}]);