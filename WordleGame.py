import random


word_list = ["apple", "table", "chair", "house", "plant", "grape", "truck"]


secret_word = random.choice(word_list)
attempts = 0


def evaluate_guess(guess, secret_word):
    if guess == secret_word:
        return "Correct! You've guessed the word."
    
    feedback = []
    for i in range(5):
        if guess[i] == secret_word[i]:
            feedback.append(guess[i])
        elif guess[i] in secret_word:
            feedback.append('-')
        else:
            feedback.append(' ')
    
    return ''.join(feedback)


print("Welcome to Wordle! Try to guess the 5-letter word.")
print("You can enter a word or 'exit' to quit the game.")

while True:
    guess = input("Enter your guess: ").lower()

    if guess == 'exit':
        print(f"The secret word was {secret_word}. Thanks for playing!")
        break

    if len(guess) != 5 or not guess.isalpha():
        print("Please enter a valid 5-letter word.")
        continue

    attempts += 1
    result = evaluate_guess(guess, secret_word)
    print(result)

    if result == "Correct! You've guessed the word.":
        print(f"Congratulations! You guessed the word in {attempts} attempts.")
        break
