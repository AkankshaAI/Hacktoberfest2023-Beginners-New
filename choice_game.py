#python simple choice game
import random as rd
while(True):
    a= int(input("Enter a Number between 1 and 10:"))
    b = rd.randint(1,10)
    if a == b :
        print("You are correct")
        break
    else:
        print("Try again!!")
        choice = input("Do you want to continue: type yes or no: ")
        if choice == "yes":
            continue
        else:
            break
