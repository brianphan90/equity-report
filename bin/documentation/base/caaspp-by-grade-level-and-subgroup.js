const faker = require( 'faker' );

const genOverUnderChart = arr => arr.map( ( label ) => {
	const metOrExceededCurrentYear = faker.random.number( {
		min : 50,
		max : 100,
	} );

	const metOrExceededLastYear = faker.random.number( {
		min : metOrExceededCurrentYear * 0.9,
		max : Math.min( 100, metOrExceededCurrentYear * 1.1 ),
	} );

	const d = {
		label,
		positive : {
			currentYear : metOrExceededCurrentYear,
			priorYear   : metOrExceededLastYear,
		},
		negative : {
			currentYear : 100 - metOrExceededCurrentYear,
			priorYear   : 100 - metOrExceededLastYear,
		}
	};

	return d;
} );

const genChart = ( title, genArray, subGroups ) => {

	const data = {
		title,
		byGradeLevel : {
			type : 'overUnderChart', // https://www.figma.com/file/SzfHAC8rsQ8DW4BuazY6eD/Equity-Report-Charts?node-id=1%3A6991
			data : genOverUnderChart( genArray( 3, 11 ) ),
		},
		bySubgroup : {
			type : 'overUnderChart', // https://www.figma.com/file/SzfHAC8rsQ8DW4BuazY6eD/Equity-Report-Charts?node-id=1%3A6991
			data : genOverUnderChart( Object.keys( subGroups ).map( key => subGroups[key].label ) )
		},
	};

	data.metOrExceeded = {
		type : 'pyramidOverUnderChart', // https://www.figma.com/file/SzfHAC8rsQ8DW4BuazY6eD/Equity-Report-Charts?node-id=1%3A6991
		data : genArray( 2016, 2019 ).map( ( label, i ) => {
			if ( i < 2 ) {
				return {
					label,
					positive : 0,
					negative : 0,
				};
			}

			const prop = ( label === 2018 ? 'priorYear' : 'currentYear' );

			return {
				label,
				positive : data.byGradeLevel.data.reduce( ( sum, item ) => sum + ( item.positive[prop] ), 0 ) / data.byGradeLevel.data.length,
				negative : data.byGradeLevel.data.reduce( ( sum, item ) => sum + ( item.negative[prop] ), 0 ) / data.byGradeLevel.data.length,
			};
		} )
	};

	return data;
};

module.exports = ( { subGroups, genArray } ) => {
	const data = {
		'legend' : {
			'overUnderChart' : {
				'positive' : {
					'currentYear' : {
						'color' : '#557176',
					},
					'priorYear' : {
						'color' : '#94AEB4',
					}
				},
				'negative' : {
					'currentYear' : {
						'color' : '#BE8674',
					},
					'priorYear' : {
						'color' : '#D7B6AA'
					}
				}
			},
			'pyramidOverUnderChart' : { // https://www.figma.com/file/SzfHAC8rsQ8DW4BuazY6eD/Equity-Report-Charts?node-id=1%3A6991
				'positive' : {
					'color' : '#557176',
					'label' : 'Met or Exceeded',
				},
				'negative' : {
					'color' : '#BE8674',
					'label' : 'Not Met or Nearly Met',
				}
			}
		},
		'charts' : [
			genChart( 'ELA', genArray, subGroups ),
			genChart( 'Mathematics', genArray, subGroups, ),
		]
	};

	return data;
};
