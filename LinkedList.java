public void traverseForward() 
{ 
    Node current = head; 
    while (current != null) { 
        System.out.print(current.data + " "); 
        current = current.next; 
    } 
} 
// Traversing from tail to the head 
public void traverseBackward() 
{ 
    Node current = tail; 
    while (current != null) { 
        System.out.print(current.data + " "); 
        current = current.prev; 
    } 
} 
