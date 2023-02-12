from typing import List

class Monkey:
    def __init__(self, i: List[str], test, t, f, fn: List[str]):
        self.items = [int(n.strip(',')) for n in i]
        self.test = int(test)
        self.t_idx = int(t)
        self.f_idx = int(f)
        self.func = fn

    def inspect(self):
        if len(self.items) > 0:
            worry = self.items.pop(0)
            a, b = [self.func[0], self.func[2]]
            if a == 'old':
                a = worry
            else:
                a = int(a)
            if b == 'old':
                b = worry
            else:
                b = int(b)
            if self.func[1] == '*':
                return a * b
            return a + b

    def print_m(self):
        print(
            f'\nitems: {self.items}\ntest: {self.test}\ntrue: {self.t_idx}\nfalse: {self.f_idx}\nnew = {self.func}'
        )


def parse(file_name):
    monkeys: List[Monkey] = []
    with open(file_name) as file:
        notes = file.read().split('\n\n')
        for note in notes:
            lines: List[str] = note.split('\n')[1:]
            # extract values
            items = lines[0].split(':')[1].strip().split(' ')
            fn = lines[1].split(' ')[-3:]
            test = lines[2].split(' ')[-1:][0]
            tm = lines[3].split(' ')[-1:][0]
            fm = lines[4].split(' ')[-1:][0]
            # instantiate monkey and add to end of list
            m = Monkey(items, test, tm, fm, fn)
            monkeys.append(m)
    return monkeys


m_list = parse('./data/test.txt')

def round():
    pass

for m in m_list:
    m.print_m()

if __name__ == "__main__":
    round()
