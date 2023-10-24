def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

number = 5  # Change this to the number for which you want to calculate the factorial
result = factorial(number)
print(f"The factorial of {number} is {result}")
