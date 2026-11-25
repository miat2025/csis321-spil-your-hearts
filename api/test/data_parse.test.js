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

describe('csv_parser', () => {
    describe('csv_parse()', () => {
        it('should output an array of data', () => {
        let input = "csv/speaker.csv"

        let output = [
            [ 'first_name', 'last_name', 'is_gfu', 'email' ],
            [ 'Robin', 'Baker', true, 'president@georgefox.edu' ],
            [ 'Debrianna', 'Debolt', true, 'ddebolt@georgefox.edu' ],
            [ 'Cyndi', 'Murillo', true, 'cmurillo@georgefox.edu' ],
            [ 'Rusty', 'St.Cyr', true, 'rstcyr@georgefox.edu' ],
            [ 'Jesse', 'Peterson', true, 'jpeterson@georgefox.edu' ],
            [ 'Carlos', 'Fernandez', true, 'fernandezc@georgefox.edu' ],
            [ 'Crystal', 'McGowen', true, 'cmcgowen@georgefox.edu' ],
            [ 'Karla', 'Chan Mendez', true, 'kchanmendez@georgefox.edu' ],
            [ 'Rebecca', 'DeYoung', false, 'rebecca.deyoung@calvin.edu' ],
            [ 'Tommy', 'Nixon', false, null ],
            [ 'Victoria', 'Cole', true, 'vcole@georgefox.edu' ],
            [ 'Naseen', 'Khalili', false, null ],
            [ 'Atalia', 'Fisher', true, 'afisher23@georgefox.edu' ],
            [ 'Nizhonii', 'Taylor', true, 'taylorn25@georgefox.edu' ],
            [ 'Sarah', 'Kerrigan', true, 'skerrigan@georgefox.edu' ],
            [ 'Jamie', 'Johnson', true, 'jamiej@georgefox.edu' ],
            [ 'Lane', 'Greenleaf Perez', false, null ],
            [ 'Marianna', 'Fajt-Schrack', true, 'mschrack@georgefox.edu' ],
            [ 'Suna', 'Won', false, null ]
        ]

        expect(csv_parse(input)).toEqual(output);
        });

    });
});

