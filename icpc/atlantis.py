# 5 <--- number of gold stores
# 5 10 <--- t, h: t = rondtrip in seconds
# 6 15  ^^ h: feet above sea level of store
# 2 7
# 3 3
# 4 11"

"""
Demetrios notices when water levels are rising and collects 
all the accessible gold in Atlantis, and move it to his ship.
Gold stores abandoned when sea level rises.

Knows where all gold in Atlantis is, how long it will take him
to get to the store and back, as well as the altitude at which it 
resides which determines when that store will drown.

What is the maximum number of stores he can visit prior to them
drowning if he optimizes his schedule?

Important: The gold store must remain above water during 
the ENTIRE trip to and from the store.
"""

from typing import List, Dict

IN = "5\n5 8\n5 6\n3 4\n5 13\n6 10"


def parse_input(_input: str) -> Dict[str]:
    data: List[str] = _input.split('\n')
    ret: Dict[str, List[int]] = {
        'roundtrips': [],
        'elevation': []
    }

    for idx, datum in enumerate(data):
        if idx == 0:
            continue
        t, h = datum.split(' ')
        ret['elevation'].append(int(h))
        ret['roundtrips'].append(int(t))

    return ret


def solve(IN):
    data = parse_input(IN)
    sea_level = 0

    while True:
        sea_level += 1
        data['elevation'] = list(
            filter(lambda n: n > sea_level, data['elevation'])
        )

        for i, e in enumerate(data['elevation']):
            print(
                f'Gold house #{i}\nFeet above sea level: {e}, Sea Level: {sea_level}')

        # dev only. Delete in final version.
        if sea_level == 10:
            break
    
    return 0
