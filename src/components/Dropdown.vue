<template lang='pug'>
.dropdown(:class='{ error : hasErrors }')
	.error(v-if='hasErrors') {{ errors }}
	.select-wrapper
		p.minimal-label.highlight-text(v-if='options.minimalLabel') {{ options.minimalLabel }}
		select.dynamic-mode-background-secondary(v-model='localValue')
			option(v-for='option in selectOptions' :value='option.value') {{ option.text }}
</template>

<script>
import { HasProperty } from '@/lib/utils';

export default {
	name : 'dropdown',

	props : {
		options : {
			type : [Object]
		},

		value : {
			type : [String, Number],
		},

		fields : {
			type : Object
		},

		errors : {
			type : [Object, String],
		},
	},

	data : () => ( {
		localValue    : '',
		selectOptions : [],
	} ),

	created() {
		this.localValue = this.value;

		// we must either display or
		// retrieve these options
		const { options } = this.options;

		// this is a list. Nothing needs
		// to be done.
		if ( typeof options === 'object' || Array.isArray( options ) ) {
			this.selectOptions = options;
			this.setDefaultValue();

			return;
		}

		// this is a function to either
		// generate programatically (e.g. 1-10)
		// or load from an external source.
		if ( typeof options === 'function' ) {

			// display a loading text in the dropdown
			const loadingOption = {
				text  : 'Loading Options...',
				value : null,
			};


			this.selectOptions = [loadingOption];

			// if a value is immediately
			// generated, this promise will immediately
			// resolve, otherwise it will resolve
			// when the promise fulfills
			Promise.resolve()
				.then( () => options() )
				.then( ( value ) => {

					this.selectOptions = [{
						text  : this.options.selectText || 'Select an Option',
						value : '',
					}].concat( value );

					this.setDefaultValue();
				} );
		}
	},

	computed : {

		hasErrors() {
			return typeof this.errors === 'string' && !!this.errors;
		},

	},

	watch : {

		localValue( val ) { // eslint-disable-line
			this.$emit( 'input', val );
		},

		value( value ) {
			this.localValue = value;
		},

		'options.options' : {
			handler( options ) {
				this.selectOptions = options;
			}
		}

	},

	methods : {

		setDefaultValue() {
			const { defaultValue } = this.options;

			if ( this.localValue ) {
				return;
			}

			if ( !HasProperty( this.options, 'defaultValue' ) ) {
				return;
			}

			if ( typeof defaultValue === 'function' ) {
				// start with promise.resolve because it will
				// support synchronous functions just fine but will
				// also support asynchronous functions
				Promise.resolve()
					.then( () => defaultValue() )
					.then( ( val ) => {

						// if the value we get is an object, set the value
						// and add the object to the beginning of the array
						if ( typeof val === 'object' ) {
							this.localValue = val.value;
							this.selectOptions.unshift( val );

							return;
						}

						// otherwise just set the value
						this.localValue = val;
					} )
					.then( () => {
						// check if the default value exists in the options.
						// if it doesn't, then we're just going to end up with
						// an empty dropdown looking at us which sucks.
						const { localValue : val } = this;

						// find the selected option
						const selectedOption = this.selectOptions.find( a => a.value === val );
						if ( selectedOption === undefined ) {
							// if it doesn't exist, then just set the localValue to an
							// empty string
							this.localValue = '';
						}
					} );

				return;
			}

			this.localValue = defaultValue;
		}

	},
};
</script>

<style lang='scss'>
@import '@/assets/scss/variables.scss';

$red            : #e23434;
$blueGrey       : #50606E;

.dropdown {

	&.minimal {

		.select-wrapper {
			margin: 0;
			padding: 0 10px;
			box-shadow: none;
			min-height: 45px;
		}
	}

	.header {
		font-size: 16px;
		color: $blueGrey;
		margin-left: 25px;
		font-weight: 500;
		text-align: left;

		span {
			display: inline;
			color: $red;
			font-size: 18px;
		}
	}

	.select-wrapper {
		position: relative;
		display: flex;
		align-items: center;

		&::after {
			content: ' ';
			position: absolute;
			height: 8px;
			width: 8px;
			border: 2px solid $color-primary;
			border-top: 0;
			border-right: 0;
			right: 10px;
			top: 50%;
			transform: translate(-50%,-66%) rotate(-45deg);
		}

		.minimal-label {
			position: absolute;
			left: 10px;
			top: 0px;
			text-transform: uppercase;
			color: $color-primary;
			letter-spacing: 2px;
			font-size: 14px;

			+ select {
				transform: translateY(5px);
			}
		}

		select {
			border: 1px solid #0081C2;
			font-size: 14px;
			outline: none;
			width: 100%;
			-webkit-appearance: none;
			padding: 5px 10px;
			border-radius: 30px;
			color : #0081C2;
			background: transparent;
		}
	}
}
</style>
