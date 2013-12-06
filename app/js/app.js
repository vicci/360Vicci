'use strict';

/* App Module */
.config(function($httpProvider){
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
