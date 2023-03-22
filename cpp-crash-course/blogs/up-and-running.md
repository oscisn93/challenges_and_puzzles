# Up and Running

## Programming Exercises.

***

### 1. absolute_value

***

Our first task for the chapter is to create an absolute value function. 

We are provided the following starter file:

```cpp
#include <cstdio>

int absolulte_value(int x) {
    // Your code here
}

int main() {
    int my_num = -10;
    printf("The abhsolute value of %d is %d.\n", my_num, absolute_value(my_num));
}
```

Furthermore we are instructed to to use conditional statements to achieve the absolute value function. 

My solution:

```cpp
int absolulte_value(int x) {
    if (x<0) return -x;
    return x;
}
```

Upon compiling and running the program we get the following output: 
```text 
Absolute value of -10 is 10
```

***

### 2. Testing absolute_value

***

Next we are instructed to test our function against several different values. We can of course hard code a bunch of test numbers or we can just create an array and use a range for loop to print the same msg for each number.

Here is the resulting code:

```cpp
#include <cstdio>

int absolute_value(int x) {
    if (x<0) return -x;
    return x;
}

int main(int argc, char const *argv[]) {
    int my_num[5] = {-10, -9, 0, 1, -1};
    // test absolute_value on multiple values
    for (int n : my_num) {
        printf("Absolute value of %d is %d\n", n,
               absolute_value(n));
    }

    return 0;
}
```

The output is again what we'd expect: 

```text
Absolute value of -10 is 10
Absolute value of -9 is 9
Absolute value of 0 is 0
Absolute value of 1 is 1
Absolute value of -1 is 1
```

***

### 3. sum 

***

Our final programming exercise asks us to write another function called sum that takes in two ints and returns their sum.

That's a trivial function that can be written:

```cpp
int sum(int a, int b) {
    return a + b;
}
```

And adapting our iniial starter file to test this function, we get:

```cpp
#include <cstdio>

int sum(int a, int b) {
    return a + b;
}

int main(int argc, char const *argv[]) {
    int n = -10,
        m = 1;
    // test sum
    printf("Sum of %d and %d is %d\n", n, m, sum(n, m));
    return 0;
}
```

Which gives the expected output:

```text
Sum of -10 and 1 is -9
```
