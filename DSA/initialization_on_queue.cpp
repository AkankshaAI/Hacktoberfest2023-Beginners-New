//menu driven program for queue.
#include <iostream>
#include <cstdlib>
using namespace std;
#define M 5
class corequeue
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
void corequeue::enqueue(int item)
{
    if (rear == M - 1)
    {
        cout << "overflow!" << endl;
    }
    else if (front==-1&&rear==-1)
    {
        front = rear = 0;
        a[rear] = item;
    }
    else
    {
        rear++;
        a[rear]=item;
    }
}
void corequeue::dequeue()
{
    if (front == -1&& rear ==-1)
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
        front++;
    }
}
void corequeue::display()
{
    int i;
     for (i = front; i <= rear; i++)
        {
            cout << a[i] << " " ;
        }
        cout<<endl;
    
}

int main()
{
    corequeue r;
    int n, item;
    cout << "operations on queue:" << endl;
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
