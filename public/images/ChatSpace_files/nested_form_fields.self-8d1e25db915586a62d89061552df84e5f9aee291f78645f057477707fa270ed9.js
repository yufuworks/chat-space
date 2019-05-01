(function() {
  window.nested_form_fields || (window.nested_form_fields = {});

  nested_form_fields.bind_nested_forms_links = function() {
    $('body').off("click", '.add_nested_fields_link');
    $('body').on('click', '.add_nested_fields_link', function(event, additional_data) {
      var $child_templates, $link, $parsed_template, $template, added_index, association_path, index_placeholder, object_class, target, template_html;
      $link = $(this);
      object_class = $link.data('object-class');
      association_path = $link.data('association-path');
      added_index = $(".nested_" + association_path).length;
      $.event.trigger("fields_adding.nested_form_fields", {
        object_class: object_class,
        added_index: added_index,
        association_path: association_path,
        additional_data: additional_data
      });
      if ($link.data('scope')) {
        $template = $(($link.data('scope')) + " #" + association_path + "_template");
      } else {
        $template = $("#" + association_path + "_template");
      }
      target = $link.data('insert-into');
      template_html = $template.html();
      index_placeholder = "__" + association_path + "_index__";
      template_html = template_html.replace(new RegExp(index_placeholder, "g"), added_index);
      template_html = template_html.replace(new RegExp("__nested_field_for_replace_with_index__", "g"), added_index);
      $parsed_template = $(template_html);
      $child_templates = $parsed_template.closestChild('.form_template');
      $child_templates.each(function() {
        var $child;
        $child = $(this);
        return $child.replaceWith($("<script id='" + ($child.attr('id')) + "' type='text/html' />").html($child.html()));
      });
      if (target != null) {
        $('#' + target).append($parsed_template);
      } else {
        $template.before($parsed_template);
      }
      $parsed_template.trigger("fields_added.nested_form_fields", {
        object_class: object_class,
        added_index: added_index,
        association_path: association_path,
        event: event,
        additional_data: additional_data
      });
      return false;
    });
    $('body').off("click", '.remove_nested_fields_link');
    return $('body').on('click', '.remove_nested_fields_link', function() {
      var $link, $nested_fields_container, delete_association_field_name, delete_field, object_class, removed_index;
      $link = $(this);
      if (!$.rails.allowAction($link)) {
        return false;
      }
      object_class = $link.data('object-class');
      delete_association_field_name = $link.data('delete-association-field-name');
      removed_index = parseInt(delete_association_field_name.match('(\\d+\\]\\[_destroy])')[0].match('\\d+')[0]);
      $.event.trigger("fields_removing.nested_form_fields", {
        object_class: object_class,
        delete_association_field_name: delete_association_field_name,
        removed_index: removed_index
      });
      $nested_fields_container = $link.parents(".nested_fields").first();
      delete_field = $nested_fields_container.find("input[type='hidden'][name='" + delete_association_field_name + "']");
      if (delete_field.length > 0) {
        delete_field.val('1');
      } else {
        $nested_fields_container.before("<input type='hidden' name='" + delete_association_field_name + "' value='1' />");
      }
      $nested_fields_container.hide();
      $nested_fields_container.find('input[required]:hidden, select[required]:hidden, textarea[required]:hidden').removeAttr('required');
      $nested_fields_container.trigger("fields_removed.nested_form_fields", {
        object_class: object_class,
        delete_association_field_name: delete_association_field_name,
        removed_index: removed_index
      });
      return false;
    });
  };

  $(document).on("page:change turbolinks:load", function() {
    return nested_form_fields.bind_nested_forms_links();
  });

  jQuery(function() {
    return nested_form_fields.bind_nested_forms_links();
  });

  $.fn.closestChild = function(selector) {
    var $children, $results;
    $children = void 0;
    $results = void 0;
    $children = this.children();
    if ($children.length === 0) {
      return $();
    }
    $results = $children.filter(selector);
    if ($results.length > 0) {
      return $results;
    } else {
      return $children.closestChild(selector);
    }
  };

}).call(this);
