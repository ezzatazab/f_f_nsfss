# Copyright (c) 2024, NSFSS and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document


class UpdateItemCustomer(Document):
	@frappe.whitelist()
	def update_items(self):
		self._validate_mandatory()

		try:
			updated = False
			update_msg = ""
			for i in self.get("items"):
				if frappe.db.exists("Item Customer Detail", {"parent": i.item_code, "customer_name": self.customer}):
					msg = _(f"Item: {i.item_name} already updated for customer: {self.customer}")
					frappe.msgprint(msg, alert=True, indicator="red")
					continue

				item = frappe.get_doc("Item", i.item_code)
				item.append(
					"customer_items",
					{
						"customer_name": self.customer,
						"customer_group": self.customer_group,
						"ref_code": i.item_code
					}
				)
				item.save()
				updated = True

			if updated:
				update_msg = _("Items updated successfully.")
			else:
				update_msg = _("Nothing to update.")

			frappe.msgprint(update_msg)
			
		except Exception as e:
			frappe.get_doc({
                "doctype": "Error Log",
                "error": e
            }).insert(ignore_permissions=True)