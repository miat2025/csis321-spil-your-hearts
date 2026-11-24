const DataUploadList = require("../helpers/DataUpload.js")


describe('DataUpload class tester', () => {
    describe('given a 1d array header', () => {
        let o = new DataUploadList['series'](null, null);

        test('with correct header data', () => {
            let header = ["id", "ele"];

            expect(o.headerVerification(header)).toBe(true);
        });

        test('with header data of length one', () => {
            let header = [];
            
            expect(o.headerVerification(header)).toThrow('Header array is empty!');
        });
    });
});