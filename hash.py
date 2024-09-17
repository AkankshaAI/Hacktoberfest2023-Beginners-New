def hash_table_search(dictionary, key):
    if key in dictionary:
        return dictionary[key]
    else:
        return None  # Key not found in the dictionary

# Example usage:
my_dict = {'apple': 5, 'banana': 3, 'cherry': 8}
key = 'banana'
result = hash_table_search(my_dict, key)

if result is not None:
    print(f"The value for key '{key}' is {result}.")
else:
    print(f"Key '{key}' not found in the dictionary.")
