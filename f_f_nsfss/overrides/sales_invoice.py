# import frappe
from erpnext.accounts.utils import get_balance_on


def get_customer_balance_after(doc, method):
    doc.customer_balance_after = get_balance_on(party_type="Customer", party=doc.customer)