import { defineInterface } from '@directus/extensions-sdk';

import InterfaceComponent from './interface.vue';

export default defineInterface({
  id: 'country-selector',
  name: 'Country Selector',
  icon: 'flag',
  description: 'Select a country from a dropdown list',
  component: InterfaceComponent,
  types: ['string'],
  group: 'standard',
  options: [
    {
      field: 'label',
      name: 'Field Label',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'full',
        note: 'Label that appears above the country selector'
      }
    },
    {
      field: 'description',
      name: 'Description',
      type: 'string',
      meta: {
        interface: 'input',
        width: 'full',
        note: 'Helper text shown below the field'
      }
    },
    {
      field: 'required',
      name: 'Required',
      type: 'boolean',
      meta: {
        interface: 'boolean',
        width: 'half'
      }
    }
  ],
  recommendedDisplays: ['raw']
});
