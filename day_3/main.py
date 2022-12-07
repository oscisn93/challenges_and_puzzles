alphabet = [c for c in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]

with open('input.txt') as input:
    data = input.read().split("\n")
    priorities = []
    for i in range(len(data)):
        if (i+1) % 3 == 0:
            for c in data[i]:
                if c in data[i-1] and c in data[i-2]:
                    print(c)
                    priorities.append(c)
                    break
    sum_p = sum([alphabet.index(c)+1 for c in priorities])
    print(sum_p)

