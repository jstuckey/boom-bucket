(function() {
  angular.module('BoomBucket').controller('OutController', ['$scope', function($scope) {
    this.firstOut = false;
    this.secondOut = false;

    this.outButtonClicked = function(outNumber) {
      if (outNumber === 1) {
        if (this.firstOutAlreadyRecorded()) {
          this.firstOut = false;
          this.secondOut = false;
        } else {
          this.firstOut = true
          this.secondOut = false;
        }
      } else if (outNumber === 2) {
        if (this.noOutsRecorded()) {
          return;
        } else if (this.secondOutAlreadyRecorded()) {
          this.firstOut = true;
          this.secondOut = false;
        } else {
          this.firstOut = true;
          this.secondOut = true;
        }
      } else {
        if (this.secondOutAlreadyRecorded()) {
          this.resetOuts();
          $scope.$emit('EndOfInning');
        } else if (this.noOutsRecorded()) {
          this.resetOuts();
          $scope.$emit('GoBackAnInning');
        }
      }
    };

    this.resetOuts = function() {
      this.firstOut = false;
      this.secondOut = false;
    };

    this.noOutsRecorded = function() {
      return this.firstOut === false && this.secondOut === false
    };

    this.firstOutAlreadyRecorded = function() {
      return this.firstOut === true;
    };

    this.secondOutAlreadyRecorded = function() {
      return this.secondOut === true;
    };
  }]);
})();
