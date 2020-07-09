import env from '@/assets/js/env';

const path = ( a, queryOptions = null, apiUrl = env.API_URL ) => {
	const query = ( () => {
		if ( !queryOptions ) {
			return '';
		}

		const queryKeys   = Object.keys( queryOptions );
		const queryString = queryKeys
			.map( key => `${key}=${encodeURIComponent( queryOptions[key] )}` )
			.join( '&' );

		return `?${queryString}`;
	} )();

	return `${env.API_PROTOCOL}://${apiUrl}/${a}${query}`;
};

const defaultHeaders = () => new Headers( {
	'Access-Control-Allow-Credentials' : true,
	'Content-Type'                     : 'application/json',
} );

/**
 * a courier function which will run
 * it's first paramater as a callback
 * with a Google AuthToken added in
 * at the beginning of the paramaters
 * list
 *
 * @param method (function) the method to be called after a token is generated
 */
const authenticate = method => ( ...args ) => { // eslint-disable-line
	const authObject = {
		defaultHeaders : new Headers( {
			'Content-Type' : 'application/json',
			'Cookie'       : document.cookie,
		} ),
	};
	const allArgs = [authObject].concat( args );

	return method( ...allArgs );
};

// simply uses a try/catch block to
// ensure standard behaviors on
// fetch
const fetchPromise = ( route, options ) => new Promise( ( resolve, reject ) => {
	// add credentials to request
	// options.credentials = 'include'; // eslint-disable-line

	try {
		fetch( route, options )
			.then( async ( res ) => {
				const body = await res.json();

				if ( res.status == 500 ) { // eslint-disable-line
					reject( body );
					return;
				}

				if ( res.status == 400 || res.status == 403 ) { // eslint-disable-line
					reject( body );

					return;
				}

				// unofficial, but 451 in this case
				// means reload the page. in IIS 451
				// is implemented as 451 Redirect which
				// is why I chose it.
				if ( res.status === 451 ) {
					window.location.reload();

					return;
				}

				resolve( body, res );
			} )
			.catch( e => reject( e ) );
	}
	catch ( e ) {
		reject( e );
	}
} );

export const GetYears = () => fetchPromise( path( 'years' ), {
	method  : 'GET',
	headers : defaultHeaders(),
} );

export const GetSchools = () => fetchPromise( path( 'schools' ), {
	method  : 'GET',
	headers : defaultHeaders(),
} );

export const GetReport = () => new Promise( ( resolve ) => {
	const sampleReport = {
		'populationCount' : {
			'value' : 756,
			'label' : '2018-2019 Census Day Student Population Count'
		},
		'graphs' : [
			{
				'title' : 'By Grade Level',
				'data'  : [
					{
						'label' : 'Grade K',
						'value' : 128,
					},
					{
						'label' : 'Grade 1',
						'value' : 102,
					},
					{
						'label' : 'Grade 2',
						'value' : 120,
					},
					{
						'label' : 'Grade 3',
						'value' : 124,
					},
					{
						'label' : 'Grade 4',
						'value' : 137,
					},
					{
						'label' : 'Grade 5',
						'value' : 130,
					},
					{
						'label' : 'Grade 6',
						'value' : 108,
					},
					{
						'label' : 'Grade 7',
						'value' : 0,
					}
				]
			},
			{
				'title' : 'By Subgroup',
				'data'  : [
					{
						'label' : 'Socio-Economically Disadvantage',
						'value' : 608,
					},
					{
						'label' : 'English Learner',
						'value' : 385,
					},
					{
						'label' : 'Foster Youth',
						'value' : 275,
					},
					{
						'label' : 'Homeless',
						'value' : 64,
					},
					{
						'label' : 'Students with Disabilities',
						'value' : 93,
					},
					{
						'label' : 'Hispanic',
						'value' : 611,
					},
					{
						'label' : 'White',
						'value' : 304,
					},
					{
						'label' : 'Black',
						'value' : 152,
					}
				]
			}
		]
	};

	resolve( sampleReport );
} );

export const GetGlrByClassroom = filters => fetchPromise( path( 'data/2019-2020/student/glr-by-classroom', { filters } ), {
	method  : 'GET',
	headers : defaultHeaders(),
} );
