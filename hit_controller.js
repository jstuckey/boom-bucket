(function() {
  angular
    .module('app')
    .controller('HitController', HitController);

  HitController.$inject = ['$scope'];

  function HitController($scope) {
    var vm = this;

    vm.bucketButtonClicked = bucketButtonClicked;
    vm.clearButtonClicked = clearButtonClicked;
    vm.hitButtonClicked = hitButtonClicked;
    vm.hits = 0;

    function bucketButtonClicked(multiplier) {
      $scope.$emit('AddPoints', vm.hits * multiplier);
      vm.hits = 0;
    }

    function clearButtonClicked() {
      vm.hits = 0;
    }

    function hitButtonClicked(number) {
      vm.hits = vm.hits * 10 + number;
    }

    $scope.$on('OutOccured', function() {
      vm.hits = 0;
    });
  }
})();
