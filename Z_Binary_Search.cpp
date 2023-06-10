# include <bits/stdc++.h>

using namespace std;

int main(){
    int n, q;
    cin >> n >> q;
    int nums[n];
    for (int i = 0; i < n; i++)
    {
        cin >> nums[i];
    }
    sort(nums, nums+n);
    while (q--)
    {
        int target;
        cin >> target;
        int l = 0, r=n-1;
        bool found = false;
        while (l <= r)
        {
           int mid = (l+r)/2;
           if(nums[mid] == target)
           {
             found = true;
             break;
           }

           if(target > nums[mid]){
             l = mid + 1;
           }else{
             r = mid - 1;
           }
        }
           if(found){
             cout << "found" << endl;
           }else{
             cout << "not found" << endl;
           }
        
    }
    
    return 0;
}

