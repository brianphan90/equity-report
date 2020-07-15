const faker = require( 'faker' );

const groups = [
	{
		label     : 'Topic',
		questions : [
			'School Safety',
			'School Belonging',
			'School Engagement',
			'School Climate',
		]
	},
	{
		label     : 'Student Questions',
		questions : [
			'How excited are you about going to your classes?',
			'How often do you get so focused on activities in your classes that you lose track of time?',
			'How often are people disrespectful to others at your school?',
			'Overall, how much do you feel like you belong at your school?',
			'How often do your teachers seem excited to be teaching your classes?',
			'How connected do you feel to the adults at your school?',
		]
	},
	{
		label     : 'Parent Questions',
		questions : [
			'How well do administrators at your child’s school create a school environment that helps children learn?',
			'Overall, how much respect do you think the teachers at your child’s school have for the children?',
			'Overall, how unsafe does your child feel at school?',
			'How motivating are the classroom lessons at your child’s school?',
			'The office staff at my child’s school is always professional and respectful of my time.',
		]
	},
	{
		title     : 'Teacher Survey Results',
		label     : 'Teacher Questions',
		questions : [
			'Teachers in this school believe that every student can learn.',
			'I feel that my school is consistent with student disciplinary issues.',
		]
	}
];

const genSurveyResults = grps => grps.map( ( { questions, ...otherOptions } ) => ( {
	...otherOptions,
	postChar : '%',
	data     : questions.map( question => ( {
		question,
		value : faker.random.number( {
			min : 20,
			max : 75
		} ),
	} ) ),
} ) );

module.exports = () => ( {
	'legend' : {
		'percentFavorable' : {
			title : 'Percent Favorable:',
			label : 'The total percentage of respondants that selected a favorable choice.',
		},
	},
	'data' : genSurveyResults( groups )
} );
