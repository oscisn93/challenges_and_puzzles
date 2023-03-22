use std::io::{self, BufRead, Lines};

pub fn hacker_frank(words: &Vec<&str>) -> u32 {
    let n: usize = words.iter().position(|&x: &&str| x == "and").unwrap();
    let m: u32 = words[n + (1 as usize)].parse().unwrap();
    return (n as u32) + m;
}

fn main() {
    let mut lines: Lines<io::StdinLock> = io::stdin().lock().lines();
    lines.next();

    let mut current: u32 = 0;
    let mut max: u32 = 0;

    for line in lines {
        let current_line: String = line.unwrap();
        let words: Vec<&str> = current_line.split(" ").collect();
        // claire
        if words[words.len() - 1] == "in" {
            let n: u32 = words[0].parse().unwrap();
            current += n;
            // hacker_frank
        } else if words[words.len() - 1] == "out" {
            let n: u32 = words[0].parse().unwrap();
            current -= n;
        } else if words[words.len() - 1] == "departed" {
            if words.len() == 2 {
                current -= 1;
            } else {
                current -= hacker_frank(&words);
            }
        } else if words[words.len() - 1] == "arrived" {
            if words.len() == 2 {
                current += 1;
            } else {
                current += hacker_frank(&words);
            }
        // frankie
        } else if words[words.len() - 1] == "room" {
            if words[words.len() - 3] == "entered" {
                if words.len() == 4 {
                    current += 1;
                } else {
                    current += (words.iter().position(|&x: &&str| x == "and").unwrap() as u32) + 1;
                }
            } else if words[words.len() - 3] == "exited" {
                if words.len() == 4 {
                    current -= 1;
                } else {
                    current -= (words.iter().position(|&x: &&str| x == "and").unwrap() as u32) + 1;
                }
            }
        }
        println!("{}\tcurrent:{}\tmax:{}\n", current_line, current, max);
        if current > max {
            max = current;
        }
    }

    print!("\nMax was {}\n\n", max);
}
