from math import floor


def merge(first, second):
    arr = []
    while len(first) > 0 and len(second) > 0:
        if first[0] < second[0]:
            arr.append(first.pop(0))
        else:
            arr.append(second.pop(0))
    if len(first) > 0:
        arr += first
    else:
        arr += second
    return arr


def merge_sort(arr):
    if len(arr) == 1:
        return arr
    m = floor(len(arr) / 2)
    left = merge_sort(arr[:m])
    right = merge_sort(arr[m:])
    return merge(left, right)


l = [7,5, 3, 6, 2, 4]
print(merge_sort(l))
