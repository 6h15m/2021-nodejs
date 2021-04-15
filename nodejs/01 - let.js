function varTest() {
    var v = 1;
    if (true) {
        var v = 2;      // 상위 블록과 같은 변수
        console.log(v); //2
    }
    console.log(v);     //2
}

function letTest() {
    let l = 1;
    if (true) {
        let l = 2;      // 상위 블록과 다른 변수
        console.log(l); // 2
    }
    console.log(l);     // 1
}

varTest();
letTest();