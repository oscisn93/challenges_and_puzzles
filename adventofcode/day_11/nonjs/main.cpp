#include <fstream>
#include <iostream>
#include <queue>
#include <sstream>
#include <string.h>

using namespace std;
const string TEST_INPUT = "test.txt";
const string INPUT = "input.txt";

typedef struct Monkey {
  queue<ulong> items;
  int true_monkey;
  ulong inspection;
  int false_monkey;
  ulong test;
};

const vector<Monkey *> monkeys;

// struct Monkey *parse(vector<string> &monkey) {
//   // struct Monkey *m = malloc(sizeof(Monkey*));
//   // memset(m, 0, sizeof(struct Monkey*));
// }

void read_file(string name) {
  ifstream f(name.c_str());
  string line;
  while (getline(f, line)) {
    /*
      code
    */
  }
}
