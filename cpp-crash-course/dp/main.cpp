#include <iostream>

using namespace std;

unsigned long long fibonacci(int n){
    unsigned long long memo[n + 1];
    int i;

    memo[0] = 0;
    memo[1] = 1;
    for (i = 2; i <= n; i++)
        memo[i] = memo[i - 1] + memo[i - 2];

    return memo[n];
};

int main(int argc, char *argv[]){
    unsigned long long x = 10000000;
    unsigned long long y = fibonacci(x);
    cout << "fibonacci(" << x << ") = " << y << endl;
    return 0;
}

