#include <vector>
#include <unordered_map>
#include <iostream>

using namespace std;


vector<int> twoSum(vector<int>& nums, int target) {
  vector<int> ret;
  unordered_map<int, int> hash_map;
  for (int i: nums) {
    if (hash_map.find(target - i) != map.end()) {
      ret.push_back(nums.find(target - i));
      ret.push_back(nums.find(i));
    }
    hash_map.insert(i,i);
  }
  return ret;
}

int main(int argc, char const *argv[])
{
  /* code */
  vector<int> nums = {1,2,3};
  vector<int> vals = twoSum(nums, 5);
  for (int j: vals) {
    cout << j << endl;
  }
  return 0;
}
