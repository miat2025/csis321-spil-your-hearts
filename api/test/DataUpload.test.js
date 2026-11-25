const DataUploadList = require("../helpers/DataUpload.js")

// normal
describe('DataUpload class tester', () => {
    // constructor
    describe('given table name and file', () => {
        
        test('with correct table name', () => {
            let o = new DataUploadList['series']("series", "people.csv");

            expect(o.table_name).toEqual("series")
        });

        test('with correct file name', () => {
            let o = new DataUploadList['series']("series", "people.csv");

            expect(o.file).toEqual("people.csv")
        });
    });

    // header verification
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

    describe('given a 2d array of data', () => {

        test('with correct inputData', async () => {

            let o = new DataUploadList['series'](null, null);
            let input = [[ 'name' ],[ 'Sermon On The Mount' ],[ 'Cornertone Collab' ],[ 'Holy Spirit' ],[ 'Worship' ],[ 'Christmas' ],[ 'Multiplication Adjacent Chapel' ]]

            let insert_query = "INSERT into null (name) VALUES ($1),($2),($3),($4),($5),($6) "
            let insert_data = ['Sermon On The Mount','Cornertone Collab','Holy Spirit','Worship','Christmas','Multiplication Adjacent Chapel']
            let t = await o.parse_data(input);
            expect(t).toEqual({insert_query, insert_data})

        });
    });
});

// people
describe('DataUploadPeople class tester', () => {
    // constructor
    describe('given table name and file', () => {
        

        test('with correct table name', () => {
            let o = new DataUploadList['series']("series", "people.csv");

            expect(o.table_name).toEqual("series")
        });

        test('with correct file name', () => {
            let o = new DataUploadList['series']("series", "people.csv");

            expect(o.file).toEqual("people.csv")
        });
    });

    // header verification
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

    describe('given a 2d array of data', () => {

        test('with correct inputData', async () => {

            let o = new DataUploadList['people'](null, null);
            let input = [
                [ 'first_name', 'last_name', 'is_gfu', 'email' ],[ 'Robin', 'Baker', true, 'president@georgefox.edu' ],[ 'Debrianna', 'Debolt', true, 'ddebolt@georgefox.edu' ],[ 'Cyndi', 'Murillo', true, 'cmurillo@georgefox.edu' ],[ 'Rusty', 'St.Cyr', true, 'rstcyr@georgefox.edu' ],[ 'Jesse', 'Peterson', true, 'jpeterson@georgefox.edu' ],[ 'Carlos', 'Fernandez', true, 'fernandezc@georgefox.edu' ]
            ]

            let insert_query = "INSERT into null (first_name,last_name,is_gfu,email) VALUES ($1,$2,$3,$4),($5,$6,$7,$8),($9,$10,$11,$12),($13,$14,$15,$16),($17,$18,$19,$20),($21,$22,$23,$24) ON CONFLICT (last_name,first_name) DO UPDATE SET is_gfu = EXCLUDED.is_gfu,email = EXCLUDED.email"
            let insert_data = [
                'Robin','Baker',true,'president@georgefox.edu',
                'Debrianna','Debolt',true,'ddebolt@georgefox.edu',
                'Cyndi','Murillo',true,'cmurillo@georgefox.edu',
                'Rusty','St.Cyr',true,'rstcyr@georgefox.edu',
                'Jesse','Peterson',true,'jpeterson@georgefox.edu',
                'Carlos','Fernandez',true,'fernandezc@georgefox.edu'
            ]
            let t = await o.parse_data(input);
            expect(t).toEqual({insert_query, insert_data})

        });
    });

    describe('given a 2d array of data', () => {

        test('with missing column', async () => {

            let o = new DataUploadList['people'](null, null);
            let input = [[ 'last_name', 'is_gfu', 'email' ],[ 'Baker', true, 'president@georgefox.edu' ],[ 'Debolt', true, 'ddebolt@georgefox.edu' ],[ 'Murillo', true, 'cmurillo@georgefox.edu' ],[ 'St.Cyr', true, 'rstcyr@georgefox.edu' ],[ 'Peterson', true, 'jpeterson@georgefox.edu' ],[ 'Fernandez', true, 'fernandezc@georgefox.edu' ]]
            await expect(o.parse_data(input)).rejects.toThrow("invalid columns from file");

        });
    });
});