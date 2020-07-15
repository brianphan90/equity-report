const faker = require( 'faker' );

const genAttendanceChart = ( options, genArray ) => {
	const { range, ...otherOptions } = options;

	const data = {
		absences : genArray( 0, faker.random.number( { min : 1, max : 15 } ) ).map( () => ( {
			type : Math.random() >= 0.5 ? 'fullAbsence' : 'partialAbsence',
			date : faker.date.between( range.start, range.end ).toISOString(),
		} ) ),
	};

	data.totalInstruction = ( ( 200 - data.absences.length ) / 200 ) * 100;
	data.full             = data.absences.filter( a => a.type === 'fullAbsence' ).length;
	data.partial          = data.absences.filter( a => a.type === 'partialAbsence' ).length;

	return {
		...otherOptions,
		type : 'attendance-chart',
		data,
	};
};

const genCertificatedAttendance = ( options, genArray ) => {
	const { range } = options;
	const formattedRange = Object.keys( range ).reduce( ( obj, key ) => {
		const added = {};
		added[key]  = range[key].toISOString();

		return {
			...obj,
			...added,
		};
	}, {} );

	return {
		range : formattedRange,
		data  : genArray( 0, 22 ).map( () => genAttendanceChart( {
			label : '3-3.A.MJ',
			range,
		}, genArray ) )
	};
};

module.exports = ( { genArray } ) => {

	const data = {
		'legend' : {
			'fullAbsence' : {
				'shape' : 'triangle',
				'label' : 'Full Day Absence (non-PD/non-Jury Duty)',
			},
			'partialAbsence' : {
				'shape' : 'circle',
				'label' : 'Partial Day Absence (non-PD/non-Jury Dury)',
			},
			'totalInstruction' : {
				'label' : 'Total Instructional Minutes Delivered (in percent)',
				'shape' : 'square',
				'color' : '#D0BA49',
				'style' : 'striped',
			},
			'full' : {
				'title' : 'Full',
				'label' : 'Total number of full day absences.',
			},
			'partial' : {
				'title' : 'Partial',
				'label' : 'Total number of partial day absences.',
			},
			'teacherCode' : {
				'title' : '#.A.AB',
				'label' : 'Grade Level. Teacher’s Last Name Initial. Teacher’s first two letters of First Name',
			},
		},
		'chart' : genCertificatedAttendance( {
			range : {
				start : new Date( 'July 1, 2018' ),
				end   : new Date( 'June 30, 2019' ),
			}
		}, genArray )
	};

	return data;
};
