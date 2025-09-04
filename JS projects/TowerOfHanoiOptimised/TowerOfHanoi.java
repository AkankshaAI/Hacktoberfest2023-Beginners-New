/*Tower of Hanoi without recursion or stack */

import java.util.*;
import java.lang.*;
import java.io.*;

class Priyanshu {

    public static String generateString(int x) {
        String s = "";
        for(int i = 1; i <= x; i++) {
            if(i == 1) s += "1";
            else {
                String t = s;
                s += "" + i;
                s += t;
            }
        }
        return s;
    }
    
    public static void doIt(int n) {
        String s = generateString(n);

        String[] poso = new String[3];
        String[] pose = new String[3];
        int[] index = new int[n+1];

        for(int i = 1, count = 1; i <= n; i += 2, count++) {
            index[i] = 0;
        }
 
        if(n%2 != 0) {
            poso[0] = "A"; poso[1] = "C"; poso[2] = "B";
            pose[0] = "A"; pose[1] = "B"; pose[2] = "C";
        } else {
            poso[0] = "A"; poso[1] = "B"; poso[2] = "C";
            pose[0] = "A"; pose[1] = "C"; pose[2] = "B";
        }

        for(int i = 0; i < s.length(); i++) {
            int c = Integer.parseInt(""+s.charAt(i));
            if(c%2 != 0) {
                System.out.println("Move plate " + c + " from " + poso[index[c]%3] + " to " + poso[(index[c]+1)%3]);
                index[c]++;
            } else {
                System.out.println("Move plate " + c + " from " + pose[index[c]%3] + " to " + pose[(index[c]+1)%3]);
                index[c]++;
            }

        }
        
    }
    
    public static void main (String[] args) {
        doIt(4);
    }
}    
