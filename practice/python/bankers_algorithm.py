import numpy as np


# number of processes
n = 3
# number of resource types
m = 4
# bankers algorithm ds
total = np.array([6, 5, 7, 6])
available = np.array([3, 1, 1, 2])
allocated = np.array([
  [1, 2, 2, 1],
  [1, 0, 3, 3],
  [1, 2, 1, 0]
])
max = np.array([
  [3, 3, 2, 2],
  [1, 2, 3, 4],
  [1, 3, 5, 0]
])

# if request was not denied determine if it would result in a safe state
def is_safe(available: np.ndarray) -> bool:
  need: np.ndarray = max - allocated
  for i in range(n):
    temp :np.ndarray = available - need[i]
    if -1 in temp:
      return False
    available = temp
    for j in range(m):
      available[j] += max[i][j]
    print(available)
  return True

is_safe(available)

def req_approved(request: np.ndarray, need: np.ndarray) -> bool:
  for i in range(len(request)):
    if request[i] > need[i]:
      return False
  return True


