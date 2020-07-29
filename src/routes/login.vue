<template lang="pug">
	.login
		.content
			.header
				img.logo(src='img/pmic-logo.svg')
				.text
					h2 Madera Unified
					h1 Equity Report
			.btn(@click='login')
				img(src='img/google.svg')
				p Sign In

</template>

<script>
export default {
	name : 'login',

	data : () => ( {

	} ),

	computed : {
		user() {
			return this.$store.state.user;
		}
	},

	watch : {
		user( user ) {

			// hasnt attempted to login
			if ( user.name === false ) {
				return;
			}

			if ( user ) {
				this.$router.push( '/' );
			}
		}
	},

	methods : {

		login() {

			// call store login
			this.$store.dispatch( 'login' )
				.then( ( user ) => {

					if ( !user ) {
						return;
					}

					this.$router.push( '/' );
				} );
			// route to academics

		}

	}
};
</script>

<style lang="scss">
.login {
	background-color: #00A8FF;
	background-image: url( '/img/background.svg');
	height: 100vh;
	width: 100%;
	position: relative;

	.content {
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate( -50% );
		display: flex;
		flex-direction: column;
		align-items: center;

		.header {
			display: flex;
			align-items: center;
			margin-bottom: 25px;

			.logo {
				margin-right: 20px;
				height: 80px;
			}

			.text {

				h2 {
					text-align: left;
					opacity: 0.8;
					color : white;
					font-size: 24px;
					margin-bottom: 5px;
				}

				h1 {
					text-align: left;
					color : white;
					font-size: 36px;
				}
			}

		}

		.btn {
			cursor: pointer;
			background: white;
			display: flex;
			padding: 10px 15px;
			border-radius: 10px;
			justify-content: center;
			align-items: center;
			flex : 0 0 auto;

			p {
				color :#00A8FF;
				margin-left: 10px;
				font-size: 20px;
			}
		}
	}
}
</style>
