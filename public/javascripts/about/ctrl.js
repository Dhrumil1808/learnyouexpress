angular
  .module('ListApp')
  .controller('aboutCtrl', [function() {
    this.works = 'About.  Yatta!'

    return this;
  }])
