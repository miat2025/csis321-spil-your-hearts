const csv_parse = require("../helpers/data_parse.js")
const fs = require('fs')

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