restocks = [("Rice", 17), ("Beans", 8), ("Yam", 9), ("Rice", 10)]
def find_duplicate_item(restocks):
    item_count = {}
    item_quantities = {}
    duplicate = {}
    for item_name, quantity in restocks:
        item_count[item_name] = item_count.get(item_name, 0) + 1
        item_quantities[item_name] = item_quantities.get(item_name, 0) + quantity
    for item_name in item_count:
        if item_count[item_name] > 1:
            duplicate[item_name] = item_quantities[item_name]
    return duplicate
print(find_duplicate_item(restocks))