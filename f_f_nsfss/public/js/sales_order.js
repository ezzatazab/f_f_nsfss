frappe.ui.form.on('Sales Order', {
    refresh: function(frm) {
        let customer = frm.doc.customer;

        frm.fields_dict['items'].grid.get_field('item_code').get_query = function() {
            return {
                query: "f_f_nsfss.overrides.item.get_customer_items",
                filters: {
                    customer: customer
                }
            };
        };
    }
});