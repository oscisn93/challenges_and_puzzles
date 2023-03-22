#include <cstdio>

int absolute_value(int x) {
    if (x<0) return -x;
    return x;
}

int sum(int a, int b) {
    return a + b;
}

int main(int argc, char const *argv[])
{
    int my_num[5] = {-10, -9, 0, 1, -1};
    int n = my_num[0],
        m = my_num[3];
    // test absolute_value on multiple values
    for (int n : my_num)
    {
        printf("Absolute value of %d is %d\n", n,
               absolute_value(n));
    }
    // test sum
    printf("Sum of %d and %d is %d\n", n, m, sum(n, m));
    return 0;
}
