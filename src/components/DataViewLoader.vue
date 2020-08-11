<script>
export default {
	name : 'data-view-loader',

	data : () => ( {
		state        : 'loading',
		errorMessage : '',

		data : null,
	} ),

	computed : {
		filters() {
			return this.$store.state.filters;
		},
		siteId() {
			return this.$store.state.selected.school;
		},
		year() {
			return this.$store.state.selected.year;
		},
		subgroup() { // TODO implement subgroup logic. Probably should be in store.
			return 'ALL';
		},
		fetchParams() {
			const { siteId, year, subgroup } = this;

			return {
				siteId,
				year,
				subgroup
			};

		},
	},

	created() {
		this.load();
	},

	watch : {
		fetchParams : {
			deep : true,
			handler( fetchParams ) {

				const { siteId, year, subgroup } = this;

				if ( siteId === '' || year === '' || subgroup === '' ) {
					return;
				}

				this.load();
			}
		}
	},

	methods : {
		load() {
			this.state = 'loading';

			this.fetch( this.filters, this.siteId, this.year, this.subgroup )
				.then( ( data ) => {
					this.data  = data;
					this.state = 'loaded';
				} )
				.catch( ( error ) => {
					console.log( error );

					this.state        = 'failed';
					this.errorMessage = error.message || 'An unknown error has occurred';
				} );
		}
	}
};
</script>
