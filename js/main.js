// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-122468537-1');

$(document).ready(function() {
  // GA Scroll Depth plugin
  jQuery.scrollDepth();

  parseQueryString();
  var category = location.queryString.ref || document.referrer || 'direct';
  var label = window.location.pathname;

  // Google Analytics
  $('a, button').click(function(e) {
    if (this.id) {
      ga('send', 'event', category, this.id, label);
    }
  });

  // CTA and Modal
  $('.btn-cta').click(function(e) {
    setTimeout(function() {
      $('#modal').modal('show');
    }, 900);
  });
  $('#modal').on('shown.bs.modal', function(e) {
    $('#form-input').focus();
  });

  // Modal Form
  $('.form-modal').submit(function(e) {
    var form = $(this)[0];
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    ga('send', 'event', category, 'form-modal', label);
    setTimeout(function() {
      $('#modal').modal('hide');
      $('#modal-confirm').modal('show');
    }, 500);
  });

  // Feeback Form
  $('.form-feedback').submit(function(e) {
    var form = $(this)[0];
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    ga('send', 'event', category, 'from-feedback', label);
    setTimeout(function() {
      $('#modal-confirm').modal('show');
    }, 500);
  });
});

function parseQueryString() {
  location.queryString = {};
  location.search.substr(1).split("&").forEach(function(pair) {
    if (pair === "")
      return;
    var parts = pair.split("=");
    location.queryString[parts[0]] = parts[1] && decodeURIComponent(parts[1].replace(/\+/g, " "));
  });
}
