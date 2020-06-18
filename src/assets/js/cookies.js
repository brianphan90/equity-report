export const GetCookie = ( key ) => {
	const regex  = new RegExp( `(?:^|; )${encodeURIComponent( key )}=([^;]*)` );
	const result = regex.exec( document.cookie );

	return result ? result[1] : null;
};

export const SetCookie = ( key, val, inputOptions = {} ) => {

	const defaults = {
		path    : '/',
		domain  : window.location.hostname,
		expires : ( ( 1000 * 60 ) * 60 ) * ( 24 * 365 ),
	};

	const defaultKeys = Object.keys( defaults );
	const options     = defaultKeys.reduce( ( obj, prop ) => {

		obj[prop] = HasProperty( inputOptions, prop ) ? inputOptions[prop] : defaults[prop]; // eslint-disable-line

		return obj;

	}, {} );

	const now     = Date.now();
	const expires = now + options.expires;

	const cookie = `${key}=${val}; expires=${new Date( expires ).toUTCString()}; domain=${options.domain}; path=${options.path}`;

	document.cookie = cookie;

	return cookie;

};
