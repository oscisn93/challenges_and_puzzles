use std::fs::read_to_string;

fn main() {
    let lines = read_to_string("./../data/input.txt").unwrap();
    let mut overlaps = 0;
    for line in lines.split("\n") {
        let pair: Vec<&str> = line.split(",").collect();
        let first: Vec<u32> = pair[0].split("-").map(|num| num.parse().unwrap()).collect();
        let second: Vec<u32> = pair[1].split("-").map(|num| num.parse().unwrap()).collect();
        if first[0] >= second[0] && first[1] <= second[1]
            || first[0] <= second[0] && first[1] >= second[1]
        {
            overlaps += 1;
        }
    }
    println!("Number of overlapping sets: {}", overlaps)
}
