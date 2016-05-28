(function() {
  angular
    .module('app')
    .controller('OutController', OutController);

  OutController.$inject = ['$rootScope'];

  function OutController($rootScope) {
    var vm = this;

    vm.firstOut = false;
    vm.outButtonClicked  = outButtonClicked;
    vm.secondOut = false;

    function outButtonClicked(outNumber) {
      $rootScope.$broadcast('OutOccured');
      if (outNumber === 1) {
        if (firstOutAlreadyRecorded()) {
          vm.firstOut = false;
          vm.secondOut = false;
        } else {
          vm.firstOut = true
          vm.secondOut = false;
        }
      } else if (outNumber === 2) {
        if (noOutsRecorded()) {
          return;
        } else if (secondOutAlreadyRecorded()) {
          vm.firstOut = true;
          vm.secondOut = false;
        } else {
          vm.firstOut = true;
          vm.secondOut = true;
        }
      } else {
        if (secondOutAlreadyRecorded()) {
          resetOuts();
          $rootScope.$broadcast('EndOfInning');
        } else if (noOutsRecorded()) {
          resetOuts();
          $rootScope.$broadcast('GoBackAnInning');
        }
      }
    }

    function resetOuts() {
      vm.firstOut = false;
      vm.secondOut = false;
    }

    function noOutsRecorded() {
      return vm.firstOut === false && vm.secondOut === false
    }

    function firstOutAlreadyRecorded() {
      return vm.firstOut === true;
    }

    function secondOutAlreadyRecorded() {
      return vm.secondOut === true;
    }
  }
})();
