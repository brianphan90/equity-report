<template lang="pug">
#app(:class='mode')
	router-view
</template>

<script>
export default {
	name : 'app',

	computed : {

		mode() {
			return this.$store.state.user.mode;
		},

	},
};
</script>

<style lang="scss">
@import '@/assets/scss/DEFAULT.scss';

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
