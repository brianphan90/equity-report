<template lang="pug">
.BySubGroupChart
    .Chart
        TopStackedBoxPlotChart(
			:chartData='this.topChartData'
			:legend='this.legend'
        )
        BottomStackedBoxPlotChart(
			:chartData='this.bottomChartData'
			:legend='this.legend'
        )
</template>

<script>
import TopStackedBoxPlotChart from '@/components/charts/GLR/components/TopStackedBoxPlotChart';
import BottomStackedBoxPlotChart from '@/components/charts/GLR/components/BottomStackedBoxPlotChart';

export default {
	name : 'GLRBySubGroupChart',

	components : {
		TopStackedBoxPlotChart,
		BottomStackedBoxPlotChart
	},

	props : {
		chartData : {
			type : Object,
		},
		legend : {
			type : Object,
		}
	},

	computed : {
		topChartData() {
			const dataArray = this.chartData.glr.map( ( item, index ) => {
				const newItem = {
					data : {
						ready     : item.data.ready,
						exceeding : item.data.exceeding
					},
					label            : item.label,
					currentYearValue : this.chartData.metOrExceeding.currentYear[index].value,
					// uncomment when past data is available
					// pastYearValue    : this.chartData.metOrExceeding.priorYear[index].value
				};
				return newItem;
			} );

			return dataArray;
		},
		bottomChartData() {
			const dataArray = this.chartData.glr.map( ( item, index ) => {
				const newItem = {
					data : {
						farBelow : item.data.farBelow,
						below    : item.data.below,
						close    : item.data.close
					},
					label            : item.label,
					currentYearValue : this.chartData.metOrExceeding.currentYear[index].value,
					// uncomment when past data is available
					// pastYearValue    : this.chartData.metOrExceeding.priorYear[index].value
				};
				return newItem;
			} );

			return dataArray;
		}
	},

	data : () => ( {

	} ),


	methods : {
	}

};
</script>

<style lang="scss">

</style>
