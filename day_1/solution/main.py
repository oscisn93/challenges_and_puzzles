import csv

calorie_data = []
with open('../data/input.txt') as data:
    csv_reader = csv.reader(data, delimiter='\n')
    index = 0
    elf_data = []
    for row in csv_reader:
        if not row:
            index+=1
            calorie_data.append(sum(elf_data))
            elf_data = []
        else:
            elf_data.append(int(row[0]))
print(sum(sorted(calorie_data)[-3:]))