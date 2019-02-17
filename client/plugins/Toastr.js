require('toastr/build/toastr.min.css');
if (process.client) {
  window.toastr = require('toastr/build/toastr.min.js');
  window.toastr.options = {
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'slideDown',
    hideMethod: 'slideUp'
  };
}
