const faker           = require( 'faker' );
const fs              = require( 'fs' );
const path            = require( 'path' );
const stringifyObject = require( 'stringify-object' );

const gradeLevels = ( () => {
	const levels = ['K'];

	for ( let i = 1; i < 13; i += 1 ) {
		levels.push( i.toString() );
	}

	return levels;
} )();

const selectRandomlyFromArray = ( arr ) => {
	const randomIndex = Math.floor( Math.random() * arr.length );
	const randomItem = arr.splice( randomIndex, 1 )[0];

	return randomItem;
};

const randomizeBase = ( base ) => {
	const keys = Object.keys( base );
	const randomSubtractions = keys.map( ( key ) => {
		const baseVal = base[key];
		const maxSubtraction = baseVal * 0.2;

		const subtraction = parseFloat( ( Math.random() * maxSubtraction ).toFixed( 2 ), 10 );

		base[key] -= subtraction; // eslint-disable-line

		return subtraction;
	} );

	keys.forEach( ( key ) => {
		const addition = selectRandomlyFromArray( randomSubtractions );

		base[key] += addition; // eslint-disable-line
	} );

	return base;
};

const glrData = () => randomizeBase( {
	'exceeding' : 30,
	'ready'     : 9,
	'close'     : 35,
	'below'     : 12,
	'farBelow'  : 14
} );

const genArray = ( min, max ) => {
	const arr = [];
	for ( let i = min; i <= max; i += 1 ) {
		arr.push( i );
	}

	return arr;
};

const subGroups = {
	'sed' : {
		'label' : 'SED',
		'value' : 'Socio-economically'
	},
	'el' : {
		'label' : 'EL',
		'value' : 'English-Learner'
	},
	'fy' : {
		'label' : 'FY',
		'value' : 'Foster Youth'
	},
	'hl' : {
		'label' : 'HL',
		'value' : 'Homeless'
	},
	'swd' : {
		'label' : 'SWD',
		'value' : 'Students with disabilities'
	},
	'hi' : {
		'label' : 'HL',
		'value' : 'Hispanic'
	},
	'wh' : {
		'label' : 'WH',
		'value' : 'White'
	},
	'bl' : {
		'label' : 'BL',
		'value' : 'Black'
	},
	'as' : {
		'label' : 'AS',
		'value' : 'Asian'
	},
	'fi' : {
		'label' : 'FI',
		'value' : 'Filipino'
	},
};

fs.readdir( path.resolve( __dirname, './documentation/base' ), ( err, contents ) => {
	if ( err ) {
		throw err;
	}

	contents.reduce( ( promise, content ) => promise.then( () => new Promise( ( resolve, reject ) => {
		// const base      = path.resolve( './documenation/base/', content );
		const fileName  = content.split( '.' )[0];
		const full      = path.resolve( __dirname, './documentation/full/', `${fileName}.json` );
		const genMethod = require( `./documentation/base/${content}` );                   // eslint-disable-line

		const data = genMethod( {
			gradeLevels,
			subGroups,
			faker,
			glrData,
			genArray,
			randomizeBase,
		} );

		const formatted = stringifyObject( data, { singleQuotes : false } ).replace( /\t([a-zA-Z0-9]+):/g, '\t"$1":' );

		fs.writeFile( full, formatted, ( e ) => {
			if ( e ) {
				console.log( e );
				reject( e );

				return;
			}

			resolve( true );
		} );

	} ) ), Promise.resolve() );
} );
