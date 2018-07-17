$(document).ready(function() {
  // GA Scroll Depth plugin
  // jQuery.scrollDepth();

  var category = window.location.pathname;
  parseQueryString();
  var label = location.queryString.ref || document.referrer || 'direct';

  // Google Analytics
  $('a, button').click(function(e) {
    if (this.id) {
      gtag('event', this.id, {
        'event_category' : category,
        'event_label' : label
      });
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
    gtag('event', 'form-modal', {
      'event_category' : category,
      'event_label' : label
    });
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
    gtag('event', 'form-feedback', {
      'event_category' : category,
      'event_label' : label
    });
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
