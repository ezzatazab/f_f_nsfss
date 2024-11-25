frappe.ui.form.on('Sales Invoice', {
    refresh: function (frm) {
        let customer = frm.doc.customer;

        frm.fields_dict['items'].grid.get_field('item_code').get_query = function () {
            return {
                query: "f_f_nsfss.overrides.item.get_customer_items",
                filters: {
                    customer: customer
                }
            };
        };
    },

    customer: function (frm) {
        frm.events.get_customer_balance(frm);
    },

    posting_date: function (frm) {
        frm.events.get_customer_balance(frm);
    },

    get_customer_balance: function(frm) {
        if (frm.doc.customer) {
            frappe.call({
                method: 'erpnext.accounts.utils.get_balance_on',
                args: {
                    date: frm.doc.posting_date,
                    party_type: "Customer",
                    party: frm.doc.customer
                },
                callback: (r) => {
                    frm.set_value("customer_balance", flt(r.message, 2));
                }
            });
        }else{
            frm.set_value("customer_balance", 0);
        }
    }
});