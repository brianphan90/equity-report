const faker = require( 'faker' );

// const genOverUnderChart = arr => arr.map( ( label ) => {
// 	const metOrExceededCurrentYear = faker.random.number( {
// 		min : 50,
// 		max : 100,
// 	} );

// 	const metOrExceededLastYear = faker.random.number( {
// 		min : metOrExceededCurrentYear * 0.9,
// 		max : Math.min( 100, metOrExceededCurrentYear * 1.1 ),
// 	} );

// 	const d = {
// 		label,
// 		positive : {
// 			currentYear : metOrExceededCurrentYear,
// 			priorYear   : metOrExceededLastYear,
// 		},
// 		negative : {
// 			currentYear : 100 - metOrExceededCurrentYear,
// 			priorYear   : 100 - metOrExceededLastYear,
// 		}
// 	};

// 	return d;
// } );

// const genChart = ( title, genArray, subGroups ) => {

// 	const data = {
// 		title,
// 		byGradeLevel : {
// 			type : 'overUnderChart', // https://www.figma.com/file/SzfHAC8rsQ8DW4BuazY6eD/Equity-Report-Charts?node-id=1%3A6991
// 			data : genOverUnderChart( genArray( 3, 11 ) ),
// 		},
// 		bySubgroup : {
// 			type : 'overUnderChart', // https://www.figma.com/file/SzfHAC8rsQ8DW4BuazY6eD/Equity-Report-Charts?node-id=1%3A6991
// 			data : genOverUnderChart( Object.keys( subGroups ).map( key => subGroups[key].label ) )
// 		},
// 	};

// 	data.metOrExceeded = {
// 		type : 'pyramidOverUnderChart', // https://www.figma.com/file/SzfHAC8rsQ8DW4BuazY6eD/Equity-Report-Charts?node-id=1%3A6991
// 		data : genArray( 2016, 2019 ).map( ( label, i ) => {
// 			if ( i < 2 ) {
// 				return {
// 					label,
// 					positive : 0,
// 					negative : 0,
// 				};
// 			}

// 			const prop = ( label === 2018 ? 'priorYear' : 'currentYear' );

// 			return {
// 				label,
// 				positive : data.byGradeLevel.data.reduce( ( sum, item ) => sum + ( item.positive[prop] ), 0 ) / data.byGradeLevel.data.length,
// 				negative : data.byGradeLevel.data.reduce( ( sum, item ) => sum + ( item.negative[prop] ), 0 ) / data.byGradeLevel.data.length,
// 			};
// 		} )
// 	};

// 	return data;
// };

const genBarChart = ( options ) => {
	const {
		dataKeys,
		minRandom : min,
		maxRandom : max,
		absoluteMin,
		...otherOptions
	} = options;

	const data = dataKeys.map( label => ( {
		label,
		value : Math.max( absoluteMin || 0, faker.random.number( {
			min,
			max,
		} ) ),
	} ) );

	return {
		...otherOptions,
		type : 'bar-chart',
		data,
	};
};

const genRainbowChart = ( options, randomizeBase ) => {
	const {
		base,
		...otherOptions
	} = options;

	return {
		data : randomizeBase( base ),
		type : 'rainbow-chart',
		...otherOptions,
	};
};

const genOcularChart = options => ( {
	left  : options.charts[0],
	right : options.charts[1],
	type  : 'ocular-chart',
} );

const genOdometerChart = ( options, randomizeBase ) => {
	const {
		innerBase,
		outerBase,
		...otherOptions
	} = options;

	return {
		inner : randomizeBase( innerBase ),
		outer : randomizeBase( outerBase ),
		type  : 'odometer-chart',
		...otherOptions,
	};
};

module.exports = ( { subGroups, gradeLevels, randomizeBase } ) => {
	const data = {
		'legends' : {
			'domainLevels' : {
				'title' : 'Domain Levels',
				'items' : {
					'level3' : {
						'color' : '#93ADB4',
						'label' : 'Level 3 - Well Developed',
					},
					'level2' : {
						'color' : '#747776',
						'label' : 'Level 2 - Somewhat/Moderately',
					},
					'level1' : {
						'color' : '#C8C8C8',
						'label' : 'Level 1 - Basic',
					},
				},
			},
			'elpacLevels' : {
				'title' : 'ELPAC Levels',
				'items' : {
					'level4' : {
						'color' : '#577077',
						'label' : 'Level 4 - Well Developed',
					},
					'level3' : {
						'color' : '#63A49A',
						'label' : 'Level 3 - Moderately Developed',
					},
					'level2' : {
						'color' : '#D8A455',
						'label' : 'Level 2 - Somewhat Developed',
					},
					'level1' : {
						'color' : '#993E39',
						'label' : 'Level 1 - Beginning Stage',
					}
				}
			},
			'odometerChart' : {
				'inner' : {
					'label' : 'Writing',
				},
				'outer' : {
					'label' : 'Reading',
				}
			}
		},
		'charts' : [
			genBarChart( {
				title      : 'By Grade Level',
				subTitle   : '(% of Students at Well or Moderately Developed)',
				color      : '#577077',
				yAxisLabel : 'Well or Moderately Developed (Percent)',
				minRandom  : 0,
				maxRandom  : 100,
				dataKeys   : gradeLevels,
			} ),
			genBarChart( {
				title       : 'By Sub Group',
				subTitle    : '(% of Students at Well or Moderately Developed)',
				color       : '#577077',
				yAxisLabel  : 'Well or Moderately Developed (Percent)',
				minRandom   : -20,
				maxRandom   : 100,
				absoluteMin : 0,
				dataKeys    : Object.keys( subGroups ).map( key => subGroups[key].label ),
			} ),
			genRainbowChart( {
				title  : 'Overall Score',
				legend : 'elpacLevels',
				base   : {
					level1 : '17',
					level2 : '41',
					level3 : '29',
					level4 : '13',
				}
			}, randomizeBase ),
			genOcularChart( {
				charts : [
					genRainbowChart( {
						title  : 'Written Language Score',
						legend : 'elpacLevels',
						base   : {
							level1 : '17',
							level2 : '41',
							level3 : '29',
							level4 : '13',
						}
					}, randomizeBase ),
					genOdometerChart( {
						legend : {
							inner : {
								label : 'Writing',
							},
							outer : {
								label : 'Reading',
							}
						},
						innerBase : {
							level1 : '16',
							level2 : '54',
							level3 : '30',
						},
						outerBase : {
							level1 : '26',
							level2 : '43',
							level3 : '31',
						}
					}, randomizeBase )
				]
			} ),
			genOcularChart( {
				charts : [
					genOdometerChart( {
						legend : {
							inner : {
								label : 'Speaking',
							},
							outer : {
								label : 'Listening',
							}
						},
						innerBase : {
							level1 : '16',
							level2 : '54',
							level3 : '30',
						},
						outerBase : {
							level1 : '26',
							level2 : '43',
							level3 : '31',
						}
					}, randomizeBase ),
					genRainbowChart( {
						title  : 'Oral Language Score',
						legend : 'elpacLevels',
						base   : {
							level1 : '17',
							level2 : '41',
							level3 : '29',
							level4 : '13',
						}
					}, randomizeBase ),
				]
			} ),
		]
	};

	return data;
};
