// Copyright (c) 2024, NSFSS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Update Item-Customer", {
    setup(frm) {
        frm.fields_dict["items"].grid.get_field("item_code").get_query = function (doc) {
            return {
                filters: {
                    "disabled": 0,
                    "has_variants": 0
                }
            }
        }
    },

	refresh(frm) {
        frm.page.clear_indicator();
        frm.disable_save();
        frm.trigger("set_primary_action");
	},

    set_primary_action(frm) {
        frm.add_custom_button(__("Update Items"), () => {
            frm.trigger("update_items");
        });
        frm.change_custom_button_type('Update Items', null, 'primary');
    },

    update_items(frm) {
        frm.call({
            method: "update_items",
            doc: frm.doc,
            freeze: true,
            freeze_message: __("Updating..."),
        }).then(() => {
            frm.reload_doc();
        });
    }
});
