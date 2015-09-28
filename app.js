
(function() {
  
  'use strict';
  
  angular
    .module('app', [])
    .controller('MainController', MainController);

  MainController.$inject = ['$http', '$scope'];
  function MainController($http, $scope) {
    var vm = this;

	vm.loading = false;
    vm.data = [];
    vm.districts = {};
    vm.dtype = {};
    vm.getData = function() {
	  vm.loading = true;
      //var rst0 = $http.get("https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json");
      //rst0.success(function(data) {
	     // console.log(data);
      //});
      var rst = $http.get("http://tonyq.org/kptaipei/GetDisasterSummary-20150808.php");
      //var rst = $http.get("https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json");
      rst.then(function(response) {
	    var data = response.data;
	    console.log('loading success!');
	    vm.loading = false;
        //console.log(data);
        //vm.data = data['DataSet']['diffgr:diffgram']['NewDataSet']['CASE_SUMMARY'];
        vm.data = data['DataSet']['diffgr:diffgram'][0]['NewDataSet'][0]['CASE_SUMMARY'];
        //console.log(vm.data);
        for (var i=0 ; i<vm.data.length ; i++) {
	      //if (!(vm.data[i].CaseLocationDistrict in vm.districts))
	      //vm.data[i].Decision[0] = vm.data[i].Decision[0].replace(new RegExp('\r?\n','g'), '<br />');
          vm.districts[vm.data[i].CaseLocationDistrict[0]] = vm.data[i].CaseLocationDistrict[0];
          vm.dtype[vm.data[i].PName[0]] = vm.data[i].PName[0];
          //console.log(vm.data[i].CaseComplete);
        }
      },
      function(response) {
	      console.log('loading error!');
		  vm.loading = false;
      });
    };

    vm.test = function() {
	    console.log(vm.selDist);
    }


    vm.getData();
  }

})();
