const number = 42;

try {
    number = 99;
} catch (err) {
    console.log(err);
    // TypeError: Assignment to constant variable.
}

console.log(number);
// expected output: 42