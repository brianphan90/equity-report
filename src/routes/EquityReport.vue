<template lang="pug">
	.equity-report
		.top
			p {{ title }} Equity Report
		router-view
</template>

<script>
export default {
	name : 'equity-report',

	data : () => ( {
		title : ''
	} ),

	created() {
		const { path } = this.$route;
		const reportType = path.split( '/' ).pop();

		const reportTitles = {
			academics : 'Academic Performance',
			climate   : 'Climate and Engagement'
		};

		this.title = reportTitles[reportType];
	}

};
</script>

<style lang="scss">
	.equity-report {
		background-color : #383838;
		color : white;
		width : 100%;
		height: 100%;
		padding : 0px 15px;

		.top {
			padding: 12px 9px;
		}
	}
</style>
