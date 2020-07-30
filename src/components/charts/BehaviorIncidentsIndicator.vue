<template lang='pug'>
.behavior-change-indicator
	.row.divider
	.row
		label.dynamic-mode-text Incidents
		p.value.dynamic-mode-text {{ data.incidents }}
</template>

<script>
export default {
	name : 'behavior-change-indicator',

	props : {
		data : {
			type     : Object,
			required : true,
		},
	},
};
</script>

<style lang='scss'>
.behavior-change-indicator {

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&.divider {
			position: relative;
			margin: 5px 0;

			&::before {
				content: ' ';
				position: absolute;
				width: 100%;
				border-top: 2px dashed $color-neutral-medium;
				height: 0px;
			}
		}

		p.value {
			font-weight: 600;
		}
	}
}
</style>
