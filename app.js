
(function() {
  
  'use strict';
  
  angular
    .module('app', [])
    .controller('MainController', MainController);

  MainController.$inject = ['$http', '$scope'];
  function MainController($http, $scope) {
    var vm = this;
    
    vm.data = [];
    vm.getData = function() {
      var rst = $http.get("https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json");
      rst.success(function(data) {
        console.log("rrrrrr");
        vm.data = data['DataSet']['diffgr:diffgram'][0]['NewDataSet'][0]['CASE_SUMMARY'];
        console.log(vm.data);
        for (var i=0 ; i<vm.data.length ; i++) {
          console.log(vm.data[i].CaseComplete);
        }
      });
    };


    vm.getData();
  }

})();
