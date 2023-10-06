# LANGUAGE: Python
# AUTHOR: ISHAN AHMAD
# GITHUB: https://github.com/ishan-nahid

# This program is in python!


def display_happiness_quote():
    print("Happiness is not something ready-made. It comes from your own actions. And you have earned it.")

def display_not_sad_quote():
    print("Every day may not be good, but there's something good in every day.")

print("Press 'q' to exit the program.")
while True:
    user_input = input("Are you happy or sad? (Type 'happy' or 'sad' or 'q' for termination): ")

        
    if user_input.lower() == "q":
        break

    if user_input.lower() == "happy":
        display_happiness_quote()
    elif user_input.lower() == "sad":
        display_not_sad_quote()
    print()

print("Program is exiting.")
