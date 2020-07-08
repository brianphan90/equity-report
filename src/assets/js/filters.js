export default [
	{
		name   : 'Demographics',
		groups : [
			{
				name      : 'Grade Level',
				key       : 'gradeLevels',
				valueType : 'array',

				default : {
					name   : 'All',
					value  : 'All',
					class  : 'two',
					active : true,
				},

				filters : [
					{
						name   : 'TK',
						value  : 'gradeTK',
						active : false
					},
					{
						name   : 'K',
						value  : 'gradeK',
						active : false
					},
					{
						name   : '1',
						value  : 'grade1',
						active : false
					},
					{
						name   : '2',
						value  : 'grade2',
						active : false
					},
					{
						name   : '3',
						value  : 'grade3',
						active : false
					},
					{
						name   : '4',
						value  : 'grade4',
						active : false
					},
					{
						name   : '5',
						value  : 'grade5',
						active : false
					},
					{
						name   : '6',
						value  : 'grade6',
						active : false
					},
					{
						name   : '7',
						value  : 'grade7',
						active : false
					},
					{
						name   : '8',
						value  : 'grade8',
						active : false
					},
					{
						name   : '9',
						value  : 'grade9',
						active : false
					},
					{
						name   : '10',
						value  : 'grade10',
						active : false
					},
					{
						name   : '11',
						value  : 'grade11',
						active : false
					},
					{
						name   : '12',
						value  : 'grade12',
						active : false
					}
				]
			},
			{
				name      : 'Gender',
				key       : 'gender',
				valueType : 'string',

				default : {
					name   : 'Both',
					value  : 'Both',
					class  : 'flex',
					active : true
				},
				filters : [
					{
						name   : 'Male',
						value  : 'male',
						class  : 'flex',
						active : false
					},
					{
						name   : 'Female',
						value  : 'female',
						class  : 'flex',
						active : false
					}
				]
			},
			{
				name      : 'Race',
				key       : 'race',
				valueType : 'array',

				default : {
					name   : 'All',
					value  : 'All',
					class  : 'flex',
					active : true
				},
				filters : [
					{
						name   : 'Hispanic',
						value  : 'hispanic',
						class  : 'flex',
						active : false
					},
					{
						name   : 'White',
						value  : 'white',
						class  : 'flex',
						active : false
					},
					{
						name   : 'Black/AA',
						value  : 'black',
						class  : 'flex',
						active : false
					},
					{
						name   : 'Asian',
						value  : 'asian',
						class  : 'flex',
						active : false
					},
					{
						name   : 'Filipino',
						value  : 'filipino',
						class  : 'flex',
						active : false
					},
					{
						name   : 'A. Indian',
						value  : 'amIndian',
						class  : 'flex',
						active : false
					},
					{
						name   : 'P. Islander',
						value  : 'pacIslander',
						class  : 'flex',
						active : false
					},
					{
						name   : '2 or More',
						value  : 'twoOrMore',
						class  : 'flex',
						active : false
					},
					{
						name   : 'UNS',
						value  : 'declined',
						class  : 'flex',
						active : false
					}
				]
			}
		]
	},
	{
		name   : 'Programs',
		groups : [
			{
				name      : 'Language Fluency',
				key       : 'languageFluency',
				valueType : 'array',

				default : {
					name   : 'All',
					value  : 'All',
					class  : 'flex',
					active : true
				},
				filters : [
					{
						name   : 'EO',
						value  : 'englishOnly',
						class  : 'flex',
						active : false
					},
					{
						name   : 'IFEP',
						value  : 'IFEP',
						class  : 'flex',
						active : false
					},
					{
						name   : 'EL',
						value  : 'englishLearner',
						class  : 'flex',
						active : false
					},
					{
						name   : 'LTEL',
						value  : 'LTEL',
						class  : 'flex',
						active : false
					},
					{
						name   : 'RFEP',
						value  : 'RFEP',
						class  : 'flex',
						active : false
					},
					{
						name   : 'TBD',
						value  : 'toBeDecided',
						class  : 'flex',
						active : false
					}
				]
			},
			{
				name      : 'Socioeconomically Disadvantaged (SED)',
				key       : 'lowIncome',
				valueType : 'string',

				default : {
					name   : 'Both',
					value  : 'Both',
					class  : 'flex',
					active : true
				},
				filters : [
					{
						name   : 'Non-SED',
						value  : 'nonLowIncome',
						class  : 'flex',
						active : false
					},
					{
						name   : 'SED',
						value  : 'lowIncome',
						class  : 'flex',
						active : false
					}
				]
			},
			{
				name      : 'Foster Youth (FY)',
				key       : 'foster',
				valueType : 'string',

				default : {
					name   : 'Both',
					value  : 'Both',
					class  : 'flex',
					active : true
				},
				filters : [
					{
						name   : 'Non-FY',
						value  : 'nonFoster',
						class  : 'flex',
						active : false
					},
					{
						name   : 'FY',
						value  : 'foster',
						class  : 'flex',
						active : false
					}
				]
			},
			{
				name      : 'Homeless (HL)',
				key   		  : 'homeless',
				valueType : 'string',

				default : {
					name   : 'Both',
					value  : 'Both',
					class  : 'flex',
					active : true
				},
				filters : [
					{
						name   : 'Non-HL',
						value  : 'nonHomeless',
						class  : 'flex',
						active : false
					},
					{
						name   : 'HL',
						value  : 'homeless',
						class  : 'flex',
						active : false
					}
				]
			},
			{
				name      : 'Migrant (MIG)',
				key       : 'migrant',
				valueType : 'string',

				default : {
					name   : 'Both',
					value  : 'Both',
					class  : 'flex',
					active : true
				},
				filters : [
					{
						name   : 'Non-MIG',
						value  : 'nonMigrant',
						class  : 'flex',
						active : false
					},
					{
						name   : 'MIG',
						value  : 'migrant',
						class  : 'flex',
						active : false
					}
				]
			}
		]
	},
	{
		name   : 'Special Education',
		groups : [
			{
				name      : 'Students with Disabilities (SWD)',
				key       : 'disabilities',
				valueType : 'string',

				default : {
					name   : 'Both',
					value  : 'Both',
					class  : 'flex',
					active : true
				},
				filters : [
					{
						name   : 'Non-SWD',
						value  : 'nonSped',
						class  : 'flex',
						active : false
					},
					{
						name   : 'SWD',
						value  : 'sped',
						class  : 'flex',
						active : false
					}
				]
			},
			{
				name      : '504 Accomodations',
				key       : 'accommodations',
				valueType : 'string',

				default : {
					name   : 'Both',
					value  : 'Both',
					class  : 'flex',
					active : true
				},
				filters : [
					{
						name   : 'Non-504',
						value  : 'nonAccomodations',
						class  : 'flex',
						active : false
					},
					{
						name   : '504',
						value  : 'accomodations',
						class  : 'flex',
						active : false
					}
				]
			}
		]
	}
];
