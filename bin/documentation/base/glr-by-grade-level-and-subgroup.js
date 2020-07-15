const faker = require( 'faker' );

const genChartData = ( arr, glrData ) => {
	const obj = {
		'glr' : arr.map( label => ( {
			label,
			data : glrData(),
		} ) ),
	};

	obj.metOrExceeding = {
		currentYear : obj.glr.map( ( { label, data } ) => ( {
			label,
			value : ( data.ready + data.exceeding ),
		} ) ),
	};

	obj.metOrExceeding.priorYear = obj.metOrExceeding.currentYear.map( ( { label, value } ) => ( {
		label,
		value : faker.random.number( {
			min : value * 0.9,
			max : value * 1.1,
		} ),
	} ) );

	return obj;
};

module.exports = ( { gradeLevels, subGroups, glrData } ) => {
	const data = {
		'totalGlrScore' : 789,
		'charts'        : [
			{
				'legend' : {
					'currentYear' : {
						'label' : 'Current Year',
						'color' : '#5C8484'
					},
					'priorYear' : {
						'label' : 'Prior Year',
						'color' : '#BDD7D5'
					},
					'difference' : {
						'label' : 'Difference',
						'color' : '#000000'
					},
					'solid' : {
						'label' : 'Solid (Current)',
						'color' : '#888888'
					},
					'faded' : {
						'label' : 'Faded (Prior)',
						'color' : '#BDBDBD'
					},
					'exceeding' : {
						'label' : 'Exceeding',
						'color' : '#557176'
					},
					'ready' : {
						'label' : 'Ready',
						'color' : '#64A399'
					},
					'close' : {
						'label' : 'Close',
						'color' : '#D0BA49'
					},
					'below' : {
						'label' : 'Below',
						'color' : '#D8A556'
					},
					'farBelow' : {
						'label' : 'Far Below',
						'color' : '#9B3E3A'
					}
				},
				'data' : genChartData( gradeLevels, glrData ),
			},
			{
				'legend' : {
					'subgroups' : {
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
						'glr' : {
							'exceeding' : {
								'label' : 'Exceeding',
								'color' : '#557176'
							},
							'ready' : {
								'label' : 'Ready',
								'color' : '#64A399'
							},
							'below' : {
								'label' : 'Below',
								'color' : '#D8A556'
							},
							'farBelow' : {
								'label' : 'Far Below',
								'color' : '#9B3E3A'
							}
						}
					}
				},

				'data' : genChartData( Object.keys( subGroups ).map( key => subGroups[key].label ), glrData ),
			}
		]
	};

	return data;
};
