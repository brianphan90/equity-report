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
		}
	},

	created() {
		this.load();
	},

	methods : {
		load() {
			this.state = 'loading';

			this.fetch( this.filters, this.siteId, this.year )
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
