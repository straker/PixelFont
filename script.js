(function () {
    // 3 bit bitmask of each letter row. Each row is reversed as bit shifting 0
    // will give you the last bit. E.g. 011>>0 = 1, 011>>1 = 1, 011>>2 = 0
    //
    // _■■  = 6
    // ■__  = 1
    // _■_  = 2
    // __■  = 4
    // ■■_  = 3
    let letters = [
        '',      // space
        22202,   // !
        55,      // "
        57575,   // #
        63632,   // $
        54215,   // %
        25256,   // &
        22,      // '
        21112,   // (
        12221,   // )
        '0525',  // *
        '0272',  // +
        '00021', // ,
        '007',   // -
        '00002', // .
        44211,   // /
        75557,   // 0
        22222,   // 1
        74717,   // 2
        74647,   // 3
        55744,   // 4
        71747,   // 5
        71757,   // 6
        74444,   // 7
        75757,   // 8
        75747,   // 9
        '0202',  // :
        '02021', // ;
        42124,   // <
        '0707',  // =
        12421,   // >
        74202,   // ?
        25516,   // @
        25575,   // A
        35753,   // B
        71117,   // C
        35553,   // D
        71717,   // E
        71311,   // F
        61556,   // G
        55755,   // H
        72227,   // I
        74457,   // J
        55355,   // K
        11117,   // L
        57555,   // M
        35555,   // N
        75557,   // 0
        75711,   // P
        25576,   // Q
        35535,   // R
        61243,   // S
        72222,   // T
        55557,   // U
        55552,   // V
        55575,   // W
        55255,   // X
        55222,   // Y
        74217,   // Z
        31113,   // [
        11244,   // \
        64446,   // ]
        25,      // ^
        '00007', // _
        12,      // `
        '06556', // a
        13553,   // b
        '07117', // c
        46556,   // d
        '06536', // e
        25131,   // f
        '06743', // g
        11355,   // h
        20222,   // i
        20223,   // j
        15355,   // k
        22224,   // l
        '05755', // m
        '03555', // n
        '07557', // o
        '07571', // p
        '07574', // q
        '05311', // r
        '06343', // s
        27226,   // t
        '05557', // u
        '05552', // v
        '05575', // w
        '05255', // x
        '05642', // y
        '07637', // z
        62126,   // {
        22222,   // |
        32423,   // }
        '036'    // ~
    ];

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var input = document.getElementById('input');

    input.addEventListener('change', function() {
        var size = 1000 / (input.value.length * 4.8);
        size -= size % 4;
        draw(input.value, Math.min(24, size));
    });

    function draw(string, size) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        string.split('').forEach((char, pos) => {

            // byte saving technique to draw each row/column of the bitmask
            // @see https://keithclark.co.uk/articles/js1k-2015-defender/#drawing-sprites
            for (
                l = 19;           // start drawing on row 4, so `l / 4 | 0` needs to gives us 4 four times
                x = l & 3,        // get the last two bits which will give us the column
                y = l / 4 | 0,    // get the row
                l >= 0;
                l--
            )
                // convert the number into a string, get the yth character
                // and then convert it back into a number so we can bit shift
                // it by the current column and bitwise and it with 1 to see
                // if the column should be drawn
                //
                // E.G.
                // letter S = 61243
                // x = 2
                // y = 4
                // S[y] = 3 (011)
                // 3 >> x = 0
                // 0 & 1 = 0 so we don't draw
                ( +(''+letters[char.charCodeAt(0) - 32])[y] ) >> x & 1 &&
                    context.fillRect(x * size + pos * size * 4, y * size, size, size);
        });
    }

    draw('Pixel Font', 24);

})();
