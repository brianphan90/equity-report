<template lang='pug'>
.elpac-indicator
	.row
		label.dynamic-mode-text Scores
		p.value.dynamic-mode-text {{ data['lvl3+4'] }}
	.row.divider
	.row
		label.dynamic-mode-text Scores
		p.value.dynamic-mode-text {{ data.scores }}
</template>

<script>
export default {
	name : 'elpac-indicator',

	props : {
		data : {
			type     : Object,
			required : true,
		},
	},
};
</script>

<style lang='scss'>
.elpac-indicator {
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
