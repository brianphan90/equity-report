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

export const GetSpcByGradeLevelAndSubgroup =  filters => fetchPromise( path( 'data/school/spc-by-grade-level-and-subgroup', { filters } ), {
	method  : 'GET',
	headers : defaultHeaders(),
} );

export const GetGlrByClassroom = filters => fetchPromise( path( 'data/teacher/glr-by-classroom', { filters } ), {
	method  : 'GET',
	headers : defaultHeaders(),
} );

export const GetGlrOverview = filters => fetchPromise( path( 'data/school/glr-overview', { filters } ), {
	method  : 'GET',
	headers : defaultHeaders(),
} );


export const GetCaasppByClassroom = filters => fetchPromise( path( 'data/teacher/caaspp-by-classroom', { filters } ), {
	method  : 'GET',
	headers : defaultHeaders(),
} );

export const GetElpacByClassroom = filters => fetchPromise( path( 'data/teacher/elpac-by-classroom', { filters } ), {
	method  : 'GET',
	headers : defaultHeaders(),
} );

export const GetBehaviorIncidentsDisaggregated = ( filters, siteId, year ) => fetchPromise( path( 'data/teacher/behavior-incidents-disaggregated', { filters, siteId, year } ), {
	method  : 'GET',
	headers : defaultHeaders(),
} );
