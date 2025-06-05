// 🧑‍💻 Intern (0–1 Years Experience) 
// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
// Given a string s, return true if it is a palindrome, or false otherwise.

// Example 1:
// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.

// Example 2:
// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.

// Example 3:
// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.
 
// Constraints:
// •	1 <= s.length <= 2 * 105
// •	s consists only of printable ASCII characters.
// Focus Areas:	
// •	String manipulation
// •	Two-pointer technique
// •	Time complexity analysis


import java.util.*;
public class Palindrome{
    public static boolean check(String str){
        int n = str.length();
        for(int i=0;i<n/2;i++){
            if(str.charAt(i)!=str.charAt(n-i-1)){
                return false;
            }
        }
        return true;
    }
    public static boolean isPalindrome(String phrase){
        if(phrase.length()==0){
            return true;
        }
        StringBuilder result = new StringBuilder();
        int n = phrase.length();
        phrase = phrase.toLowerCase();
        for(int i=0;i<n;i++){
            char ch = phrase.charAt(i);
            if(Character.isLetterOrDigit(ch)){
                result.append(ch);
            }
        }
        return check(result.toString());

    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String phrase = sc.nextLine();
        System.out.println(isPalindrome(phrase));
        sc.close();



    }
}