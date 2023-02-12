/*
    Leetcode Challenge: 1D Sum Array
    Given an array nums.
    We define a running sum of an array as
        runningSum[i] = sum(nums[0]-nums[i]).
    Return the running sum of nums.

*/
#include <vector>

using namespace std;

class Solution {
public:
  vector<int> runningSum(vector<int> &nums) {
    const int length = nums.size();
    vector<int> sums;
    int sum;
    for (int i = 0; i < length; i++) {
      sums.push_back(sum += nums[i]);
    }
    return sums;
  }
};
