import csv

total = 0
win = {
    'A': 'B',
    'B': 'C',
    'C': 'A'
}

outcomes = {
    'X': 0,
    'Y': 3,
    'Z': 6
}

with open('data.txt') as data:
    csv_reader = csv.reader(data, delimiter='\n')
    for row in csv_reader:
        score = 0
        outcome = row[0][2]
        hand = row[0][0]
        if hand == 'A':
            if outcome == 'X':
                score += 3
            elif outcome == 'Y':
                score += 1
            else:
                score += 2
        elif hand == 'B':
            if outcome == 'X':
                score += 1
            elif outcome == 'Y':
                score += 2
            else:
                score += 3
        else:
            if outcome == 'X':
                score += 2
            elif outcome == 'Y':
                score += 3
            else:
                score += 1
        score += outcomes[outcome]
        total += score
print(total)

# part 1 solution
# total = 0

# response_scores = {
#     'X': 1,
#     'Y': 2,
#     'Z': 3
# }

# matching = {
#     'X': 'A',
#     'Y': 'B',
#     'Z': 'C'
# }

# with open('data.txt') as data:
#     csv_reader = csv.reader(data, delimiter='\n')
#     for row in csv_reader:
#         score = 0
#         response = row[0][2]
#         hand = row[0][0]
#         score+=response_scores[response]
#         if hand == matching[response]:
#             score += 3
#         elif hand == 'A' and response == 'Y':
#                 score += 6
#         elif hand == 'B' and response == 'Z':
#             score += 6
#         elif hand == 'C' and response == 'X':
#             score += 6
#         total +=score
# print(total)
