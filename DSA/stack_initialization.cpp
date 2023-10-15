//menu driven program for stack.
#include <iostream>
using namespace std;
#define N 10
int stack[N];
class corestack
{
private:
    int top = -1;//initialization of top

public:
    void push(int item)
    {
        if (top == N - 1)
        {
            cout << "Overflow";
        }
        else
        {
            top++;
            stack[top] = item;
        }
    }

    void pop()
    {

        if (top == -1)
        {
            cout << "underflow";
        }
        else
        {
            top--;
        }
    }

    void display()
    {
        for (int i = top; i >= 0; i--)
        {
            cout << stack[i] << " ";
        }
    }

    void peek()
    {
        int v;
        if (top >= 0)
        {
            v = stack[top];
            cout << v;
        }
        else
        {
            cout << "no value has been entered!";
        }
    }
};

int main()
{
    corestack q;
    int n;
    int item;
    cout << "0 for EXIT"
         <<" "
         << "1.push"
         << " "
         << "2.pop"
         << " "
         << "3.peek"
         << " "
         << "4.display" << endl;
    do
    {
        cout << "enter your choice = ";
        cin >> n;
        switch (n)
        {
        case 1:
            cout << "enter the element to be stored:";
            cin >> item;
            q.push(item);
            break;
        case 2:
            q.pop();
            break;
        case 3:
            q.peek();
            break;
        case 4:
            q.display();
            break;
        }
    } while (n != 0);
    return 0;
}