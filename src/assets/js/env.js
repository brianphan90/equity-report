const requiredKeys = ['API_URL', 'API_PROTOCOL', 'NODE_ENV'];

const missingKeys = requiredKeys
	.map( a => `VUE_APP_${a}` )
	.filter( key => !process.env[key] )
	.reduce( ( str, item, i, arr ) => {
		if ( !str ) {
			return item;
		}

		const isEnd     = i === arr.length - 1;
		const delimiter = isEnd ? ', and ' : ', ';

		return `${str}${delimiter}${item}`;
	}, '' );

if ( missingKeys.length ) {
	throw new Error( `Your .env file is missing the following values: ${missingKeys}` );
}

export default requiredKeys.reduce( ( obj, key ) => {
	const added = {};
	added[key]  = process.env[`VUE_APP_${key}`];

	return {
		...obj,
		...added,
	};
}, {} );
