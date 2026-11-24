const csv_parse = require("../helpers/data_parse.js")
const fs = require('fs')

describe('csv_parser', () => {
    describe('csv_parse()', () => {
        it('should output an array of data', () => {
        let input = "csv/speaker.csv"

        let output = [
        [ 'first_name', 'last_name', 'is_gfu', 'email' ],
        [ 'Robin', 'Baker', 'TRUE', 'president@georgefox.edu' ],
        [ 'Debrianna', 'Debolt', 'TRUE', 'ddebolt@georgefox.edu' ],
        [ 'Cyndi', 'Murillo', 'TRUE', 'cmurillo@georgefox.edu' ],
        [ 'Rusty', 'St.Cyr', 'TRUE', 'rstcyr@georgefox.edu' ],
        [ 'Jesse', 'Peterson', 'TRUE', 'jpeterson@georgefox.edu' ],
        [ 'Carlos', 'Fernandez', 'TRUE', 'fernandezc@georgefox.edu' ],
        [ 'Crystal', 'McGowen', 'TRUE', 'cmcgowen@georgefox.edu' ],
        [ 'Karla', 'Chan Mendez', 'TRUE', 'kchanmendez@georgefox.edu' ],
        [ 'Rebecca', 'DeYoung', 'FALSE', 'rebecca.deyoung@calvin.edu' ],
        [ 'Tommy', 'Nixon', 'FALSE', '' ],
        [ 'Victoria', 'Cole', 'TRUE', 'vcole@georgefox.edu' ],
        [ 'Naseen', 'Khalili', 'FALSE', '' ],
        [ 'Atalia', 'Fisher', 'TRUE', 'afisher23@georgefox.edu' ],
        [ 'Nizhonii', 'Taylor', 'TRUE', 'taylorn25@georgefox.edu' ],
        [ 'Sarah', 'Kerrigan', 'TRUE', 'skerrigan@georgefox.edu' ],
        [ 'Jamie', 'Johnson', 'TRUE', 'jamiej@georgefox.edu' ],
        [ 'Lane', 'Greenleaf Perez', 'FALSE', '' ],
        [ 'Marianna', 'Fajt-Schrack', 'TRUE', 'mschrack@georgefox.edu' ],
        [ 'Suna', 'Won', 'FALSE', '' ]
        ]
        expect(csv_parse(input)).toEqual(output);
        });

        it('should throw error for non-number inputs', () => {
          expect(() => sum('1', 2)).toThrow('Both arguments must be numbers');
        });
    });
});