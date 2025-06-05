// 🧑‍💻 Intern (0–1 Years Experience) 
// Given an integer array nums, return the length of the longest strictly increasing subsequence. Come up with an algorithm that runs in O(n log(n)) time complexity

// Example 1:
// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

// Example 2:
// Input: nums = [0,1,0,3,2,3]
// Output: 4

// Example 3:
// Input: nums = [7,7,7,7,7,7,7]
// Output: 1
 
// Constraints:
// •	1 <= nums.length <= 2500
// •	-104 <= nums[i] <= 104


import java.util.*;

public class LongestIncreasing {
    public static int helper(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        int[] dp = new int[n];
        Arrays.fill(dp,1); 
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
        int answer = 0;
        for (int len : dp) answer = Math.max(answer, len);
        return answer;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] str = sc.nextLine().split(" ");
        int n = str.length;
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(str[i]);
        }
        System.out.println(helper(nums));
        sc.close();
    }
}
