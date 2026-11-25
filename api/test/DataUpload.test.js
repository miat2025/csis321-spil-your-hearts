const DataUploadList = require("../helpers/DataUpload.js")


describe('DataUpload class tester', () => {
    describe('given table name and file', () => {
        

        test('with correct table name', () => {
            let o = new DataUploadList['series']("series", "people.csv");

            expect(o.file).toEqual("series")
        });

        test('with correct file name', () => {
            let o = new DataUploadList['series']("series", "people.csv");

            expect(o.file).toEqual("people.csv")
        });
    });


    describe('given a 1d array header', () => {
        let o = new DataUploadList['series'](null, null);

        test('with correct header data', () => {
            let header = ["id", "ele"];

            expect(o.headerVerification(header)).toBe(true);
        });

        test('with header data of length one', () => {
            let header = [];

            expect(o.headerVerification(header)).toBe(false);
        });
    });
});