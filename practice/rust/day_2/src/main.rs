use std::io;
use substring::Substring;

fn main() {
    // buffer strings
    let mut pattern = String::new();
    let mut text = String::new();
    // read and handle errors
    let stdin = io::stdin();
    stdin.read_line(&mut pattern).expect("msg");
    stdin.read_line(&mut text).expect("msg");
    // trim newline from pattern and use &str for substring comparison
    let p = pattern.trim();
    let n = p.len();
    // create a count variable for the substing search
    let mut count = 0;
    for i in 0..text.len() {
        let s = text.substring(i, i + n);
        println!("{}: {}", s, p);
        if p.eq(s) {
            count += 1;
        }
    }
    // create an &str from the count(i32)
    let count_str = count.to_string();
    let c = count_str.as_str();
    // new substring size and count reset
    let m = c.len();
    count = 0;
    // search for the second pattern
    for i in 0..text.len() {
        let s = text.substring(i, i + m);
        println!("{}: {}", s, p);
        if c.eq(s) {
            count += 1;
        }
    }
    println!("\nLooking for {} in {}\n", count, text);
}
