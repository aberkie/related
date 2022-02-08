/**
 * Related plugin for Craft CMS
 *
 * Related JS
 *
 * @author    reganlawton
 * @copyright Copyright (c) 2019 reganlawton
 * @link      https://github.com/reganlawton
 * @package   Related
 * @since     1.0.0
 */
var id = $("input[name='entryId'],input[name='sourceId'],input[name='categoryId'],input[name='userId']").val() ?? '';
var sectionId = $("input[name='sectionId']").val() || '';
var categoryId = $("input[name='groupId']").val() || '';
var userId = $("input[name='userId']").val() || '';

// Add Settings element for User page which it's missing
if (!$("#settings").length) {
  $("#details").prepend(
    '<div id="settings" class="meta">' +
    '</div>'
  );
}

if (id != null) {
  // Remove previous list in sidebar to fix bug in CraftCMS v3.4
  $('#related-widget').remove();
  
  // Set up sidebar widget and set to loading
  $("#settings").append(
    '<div id="related-widget" class="field" style="margin-top: 50px">' +
      '<div class="heading">' +
        '<label>Relations</label>' +
      '</div>' +
      '<div class="input ltr">' +
        '<p>Loading...</p>' +
      '</div>' +
    '</div>'
  );

  $.ajax({
    type: "GET",
    url: "/actions/related/default?id=" + id + "&sectionId=" + sectionId + "&userId=" + userId + "&categoryId=" + categoryId,
    async: true
  }).done(function (res) {
    if (res) {
      $('#related-modal').remove();
      $('body').append(res.view);

      $modal = new Garnish.Modal($('#related-modal'), {
        autoShow: false,
        visible: false,
        resizable: true,
      });

      // Add link and count to widget
      $("#related-widget .input").html(
        '<a target="_blank" href="#">View (' + res.count + ')</a>'
      );

      $('#related-widget a').click(function(e) {
        e.preventDefault();
        $modal.show();

        $('#related-modal .footer .buttons .btn').click(function(e) {
          e.preventDefault();
          $modal.hide();
        });
      });
    }
  }).fail(function (res) {
  // Dispaly error message
  $("#related-widget .input").html(
    '<p>There was an error fetching relations.</p>'
  );
  });
}

