// menu driven program on circular queue.
#include <iostream>
#include <cstdlib>
using namespace std;
#define M 5
class circularqueue
{
private:
    int rear = -1;
    int front = -1;
    int a[M];

public:
    void enqueue(int item);
    void dequeue();
    void display();
};
void circularqueue::enqueue(int item)
{
    if (((rear + 1) % M) == front)
    {
        cout << "overflow!" << endl;
    }
    else if (front == -1 && rear == -1)
    {
        front = rear = 0;
        a[rear] = item;
    }
    else
    {
        rear = (rear + 1) % M;
        a[rear] = item;
    }
}
void circularqueue::dequeue()
{
    if (front == -1 && rear == -1)
    {
        cout << "underflow!" << endl;
    }
    else if (front == rear)
    {
        front = -1;
        rear = -1;
    }
    else
    {
        front = ((front + 1) % M);
    }
}
void circularqueue::display()
{
    
    if (front == -1 && rear == -1)
    {
        cout << "no element is present!" << endl;
    }
    else{
        int i=front;
         while (i != rear)
        {
            cout << a[i] << " ";
            i = (i + 1) % M;
        }
        cout << a[i] << " "; 
    }
}

int main()
{
    circularqueue r;
    int n, item;
    cout << "operations on circularqueue:" << endl;
    cout << "0 for EXIT"
         << " "
         << "1.insert"
         << " "
         << "2.delete"
         << " "
         << "3.display" << endl;
    while (1)
    {
        cout << "enter your choice"
             << "=";
        cin >> n;
        switch (n)
        {
        case 1:
            cout << "enter the item to be inserted"
                 << "=";
            cin >> item;
            r.enqueue(item);
            break;
        case 2:
            r.dequeue();
            break;
        case 3:
            r.display();
            break;
        default:
            exit(1);
        }
    }
    return 0;
}
