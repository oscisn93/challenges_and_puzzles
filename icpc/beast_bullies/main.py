def parse(filename: str):
    with open(filename) as ifile:
        lines = list(map(int, ifile.read().split('\n')))
    return (lines.pop(0), lines.sort(reverse=True))


def beast_bullies(data) -> int:
    count = data[0]
    animal = data[1]
    if data.count == 2:
        return 1

    return 0


def solution(path):
    test_input_1 = parse(path)
    print('remaining animals:',beast_bullies(test_input_1))

solution('input1.txt')
solution('input2.txt')
