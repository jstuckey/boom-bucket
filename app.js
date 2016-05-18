(function() {
  angular.module('BoomBucket', ['LocalStorageModule']);

  angular.module('BoomBucket').config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('boom');
  });

})();
