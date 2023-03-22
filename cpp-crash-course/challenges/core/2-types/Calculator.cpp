#include <iostream>

using namespace std;

enum class Operation {
    Add,
    Subtract,
    Multiply,
    Divide
};

typedef struct Calculator {
    Calculator(Operation o) {
        operation = o;
    }
    int calculate(int a, int b) {
        switch (operation) {
        case Operation::Add:
            return a + b;
        case Operation::Subtract:
            return a - b;
        case Operation::Multiply:
            return a * b;
        default:
            return a / b;
        }
    }

private:
    Operation operation;
} Calculator;

int main() {
    Calculator ca{Operation::Add};
    cout << "4 plus 5 equals " << ca.calculate(4, 5) << "\n";
    Calculator cm(Operation::Multiply);
    cout << "4 times 5 equals " << cm.calculate(4, 5) << "\n";
    Calculator cs(Operation::Subtract);
    cout << "20 minus 5 equals " << cs.calculate(20, 5) << "\n";
    Calculator cd(Operation::Divide);
    cout << "20 divide 5 equals " << cd.calculate(20, 5) << "\n";
}
