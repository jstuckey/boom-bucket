(function() {
  angular
    .module('BoomBucket')
    .controller('HitController', HitController);

  HitController.$inject = ['$scope'];

  function HitController($scope) {
    this.hits = 0;

    this.hitButtonClicked = function(number) {
      this.hits = this.hits * 10 + number;
    };

    this.clearButtonClicked = function() {
      this.hits = 0;
    };

    this.bucketButtonClicked = function(multiplier) {
      $scope.$emit('AddPoints', this.hits * multiplier);
      this.hits = 0;
    };

    $scope.$on('OutOccured', function() {
      this.hits = 0;
    }.bind(this));
  }
})();
