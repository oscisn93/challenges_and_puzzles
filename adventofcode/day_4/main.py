test = 'data/test.txt'
input = 'data/input.txt'

duplicates = 0

with open(input) as data:
    lines = data.read().split('\n')
    for line in lines:
        pair_one, pair_two = line.split(',')
        pair_one = pair_one.split('-')
        pair_two = pair_two.split('-')
        for n in range(int(pair_one[0]), int(pair_one[1])+1):
            if n in range(int(pair_two[0]), int(pair_two[1])+1):
                duplicates+=1
                break
            
print(duplicates)

# contained = 0

# with open(input) as data:
#     lines = data.read().split('\n')
#     for line in lines:
#         pair = line.split(',')
#         bounds_one= pair[0].split('-')
#         bounds_one = [int(i) for i in bounds_one]
#         bounds_two = pair[1].split('-')
#         bounds_two = [int(i) for i in bounds_two]
#         if bounds_one[0] >= bounds_two[0] and bounds_one[1] <= bounds_two[1] or bounds_one[0] <= bounds_two[0] and bounds_one[1] >= bounds_two[1]:
#             contained += 1
# print(contained)
