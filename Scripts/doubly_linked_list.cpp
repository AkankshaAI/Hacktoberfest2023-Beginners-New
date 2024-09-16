#include <iostream>
#include <bits/stdc++.h>

using namespace std;

class Node{
    public:
        int value;
        Node* next;
        Node* prev;

        Node(int value){
        this->value = value;
        this->next = nullptr;
        this->prev = nullptr;
        }
};

class doublylinkedlist{
    private:
        Node* head;
        Node* tail;
        int length;
    
    public: 
        doublylinkedlist(int value){
            Node* newNode = new Node(value);
            head = newNode;
            tail = newNode;
            length = 1;
        }

        ~doublylinkedlist(){
            Node* temp= head;
            while(head != nullptr){
                head = head -> next;
                delete temp;
                temp = head;
            }
        }

        void printList() {
            Node* temp = head;
            if (temp == nullptr) {
                cout << "empty" << endl;
                return;
            }
            while (temp->next != nullptr) {
                cout << temp->value << " <-> ";
                temp = temp->next;
            }
            cout << temp->value << endl;
        }

        void prepend (int value){
        Node* newNode = new Node(value);
        if (head != nullptr){
        newNode->next= head;
        head->prev = newNode;
        head = newNode;
        } 
        else{
        head=newNode;
        tail=newNode;
        }
    length++;
}

    void deletefirst(){
        if(head != nullptr){
            Node* temp = head;
            head = head->next;
            head->prev = nullptr;
            delete temp;
        }else{
            return;
        }
        }

    Node* get(int index){
        if(index<0 || index>=length) return nullptr;
        Node* temp = head;
        if(index<length/2){
            for(int i=0; i<index; i++){
                temp=temp->next;
            }
        }else{
            temp = tail;
            for(int i=length-1; i>index; i--){
                temp=temp->prev;
            }
        }
        return temp;
    }

    bool insert(int index, int value){
        if(index<0 || index>=length) return false;
        if(index==0){
            prepend(value);
            return true;
        }
        if(index==length-1){
            append(value);
            return true;
        }else{
            Node* before = get(index-1);
            Node* after = before->next;
            Node* temp=new Node(value);
            temp->next=after;
            temp->prev=before;
            before->next=temp;
            after->prev=temp;
            return true;
        }
        length++;
    }

    void reverse(){
        Node* temp=head;
        head=tail;
        tail=temp;

        Node* after=temp->next;
        Node* before=nullptr;
        for(int i=0; i<length;i++){
            after=temp->next;
            temp->next=before;
            before=temp;
            temp=after;
        }
    }

    void deletenode(int index){
        Node* temp=get(index);
        temp->prev->next=temp->next;
        temp->next->prev=temp->prev;
        delete temp;
        length--;
    }
};

int main(){
    doublylinkedlist* mydll = new doublylinkedlist(10);
    mydll -> deletefirst();
    mydll -> printList();
}