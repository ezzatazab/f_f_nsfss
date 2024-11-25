import frappe


@frappe.whitelist()
def get_customer_items(doctype, txt, searchfield, start, page_len, filters):
    customer = filters.get("customer")
    search_text = f"%{txt}%"
    
    return frappe.db.sql("""
        SELECT cu.parent, cu.ref_code, i.item_name
        FROM `tabItem Customer Detail` cu
        JOIN `tabItem` i ON i.name = cu.parent
        WHERE cu.customer_name = %s
        AND (cu.parent LIKE %s OR cu.ref_code LIKE %s OR i.item_name LIKE %s)
    """, (customer, search_text, search_text, search_text))