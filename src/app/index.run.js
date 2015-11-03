(function() {
  'use strict';

  angular
    .module('mvpizerAdmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
