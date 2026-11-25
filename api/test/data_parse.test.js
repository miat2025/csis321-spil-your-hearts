const csv_parse = require("../helpers/data_parse.js")

describe('data_parse class tester', () => {
    describe('given a 1d array header', () => {
        let o = new csv_parse(null, null);

        test('with correct header data', () => {
            let header = ["id", "ele"];

            expect(o.headerVerification(header)).toBe(true);
        });
        
        test('with header data of length one', () => {
            let header = ["id"];
            expect(o.headerVerification(header)).toBe(true);
        });
    });
});

describe('given a 2d array data', () => {
    let o = new csv_parse(null, null);

    test('with correct data', () => {
        let data = [["id", "ele"], ["1", "2"]];

        expect(o.dataVerification(data)).toBe(true);
    });

    test('with incorrect data', () => {
        let data = [["id", "ele"], ["1"]];

        expect(o.dataVerification(data)).toBe(false);
    });
});
