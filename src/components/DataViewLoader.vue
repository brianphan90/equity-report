<script>
export default {
	name : 'data-view-loader',

	data : () => ( {
		state        : 'loading',
		errorMessage : '',

		data : null,
	} ),

	created() {
		this.load();
	},

	methods : {
		load() {
			this.state = 'loading';

			this.fetch()
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
