const faker = require( 'faker' );

const genDoubleBarChart = ( options ) => {
	const {
		dataKeys,
		minRandom : min,
		maxRandom : max,
		absoluteMin,
		valueKeys,
		...otherOptions
	} = options;

	const data = dataKeys.map( label => ( {
		label,
		value : valueKeys.reduce( ( obj, key ) => {
			const added = {};
			added[key] = Math.max( absoluteMin || 0, faker.random.number( {
				min,
				max,
			} ) );

			return {
				...obj,
				...added,
			};
		}, {} )
	} ) );

	return {
		...otherOptions,
		type : 'double-bar-chart',
		data,
	};
};

module.exports = ( { subGroups, gradeLevels } ) => {
	const byGradeLevel = genDoubleBarChart( {
		title       : 'By Grade Level',
		minRandom   : 0,
		maxRandom   : 35,
		absoluteMin : 0,
		dataKeys    : gradeLevels,
		valueKeys   : ['currentYear', 'priorYear']
	} );

	const data = {
		'legend' : {
			'currentYear' : {
				'label' : 'Current Year',
				'color' : '#9E5A46',
			},
			'priorYear' : {
				'label' : 'Prior Year',
				'color' : '#9E5A46',
				'style' : 'striped',
			}
		},
		'charts' : {
			byGradeLevel,
			'bySubGroup' : genDoubleBarChart( {
				title       : 'By Grade Level',
				minRandom   : -20,
				maxRandom   : 35,
				absoluteMin : 0,
				dataKeys    : Object.keys( subGroups ).map( key => subGroups[key].label ),
				valueKeys   : ['currentYear', 'priorYear']
			} ),
			'overAll' : {
				'type'  : 'emphasis-bar-chart',
				'title' : 'Overall Number of Behavior Incidents',
				'data'  : {
					'currentYear' : byGradeLevel.data.reduce( ( sum, item ) => ( sum + item.value.currentYear ), 0 ),
					'priorYear'   : byGradeLevel.data.reduce( ( sum, item ) => ( sum + item.value.priorYear ), 0 ),
				}
			},
		}
	};

	return data;
};
