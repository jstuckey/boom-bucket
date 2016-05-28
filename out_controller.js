(function() {
  angular
    .module('BoomBucket')
    .controller('OutController', OutController);

  OutController.$inject = ['$rootScope'];

  function OutController($rootScope) {
    this.firstOut = false;
    this.secondOut = false;

    this.outButtonClicked = function(outNumber) {
      $rootScope.$broadcast('OutOccured');
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
          $rootScope.$broadcast('EndOfInning');
        } else if (this.noOutsRecorded()) {
          this.resetOuts();
          $rootScope.$broadcast('GoBackAnInning');
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
  }
})();
