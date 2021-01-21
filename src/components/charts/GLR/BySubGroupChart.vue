<template lang="pug">
	.BySubGroupChart
		.legend
			Legend(
				:legend='this.chartLegend'

			)
		.TopChart
			TopStackedBoxPlotChart(
				:chartData='this.topChartData'
				:legend='this.legend'
			)
		.BottomChart
			BottomStackedBoxPlotChart(
				:chartData='this.bottomChartData'
				:legend='this.legend'
			)
</template>

<script>
import TopStackedBoxPlotChart from '@/components/charts/GLR/components/TopStackedBoxPlotChart';
import BottomStackedBoxPlotChart from '@/components/charts/GLR/components/BottomStackedBoxPlotChart';

import Legend from '@/components/charts/GLR/components/Legend';

export default {
	name : 'GLRBySubGroupChart',

	components : {
		TopStackedBoxPlotChart,
		BottomStackedBoxPlotChart,
		Legend
	},

	props : {
		chartData : {
			type : Object,
		},
		legend : {
			type : Object,
		},
		chartLegend : {
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
.BySubGroupChart {
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 16px;
	text-align: center;
	.legend {

		padding-bottom: 50px;
	}
	.BottomChart{
		padding-bottom: 20px;
	}
}
</style>
