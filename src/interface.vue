<template>
  <div>
    <h3>{{ props.label }}</h3>
    <v-select
      :model-value="displayValue"
      :items="countries"
      :placeholder="$t('Select a country')"
      :label="props.label"
      :required="props.required"
      item-value="value"
      item-text="text"
      @update:model-value="onChange">
      <template v-if="props.description" #append-outer>
        <v-icon name="help_outline" :tooltip-text="props.description" />
      </template>
    </v-select>

    <h3>{{ props.description }}</h3>
    <v-input
      :model-value="descriptionText"
      :placeholder="$t('Enter description')"
      @update:model-value="onTextChange" />
  </div>
</template>

<script setup lang="ts">
  import { countries as countriesList } from 'countries-list';
  import { computed, ref, watchEffect } from 'vue';

  const props = defineProps<{
    value: string | null;
    label?: string;
    description?: string;
    required?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'input', value: string): void;
  }>();

  const descriptionText = ref('');

  const countries = ref(
    Object.entries(countriesList).map(([code, country]) => ({
      text: country.name,
      value: code
    }))
  );
  const parseStoredValue = (value: string | null) => {
    if (!value) return { countryCode: null, description: '' };
    try {
      const parsed = JSON.parse(value);
      return {
        countryCode: parsed.countryCode,
        description: parsed.description
      };
    } catch {
      return { countryCode: value, description: '' };
    }
  };

  const displayValue = computed(() => {
    const parsed = parseStoredValue(props.value);
    const selectedCountry = countries.value.find(country => country.value === parsed.countryCode);
    return selectedCountry?.text || parsed.countryCode;
  });

  // Set the description text outside of the computed property
  const updateDescriptionText = () => {
    const parsed = parseStoredValue(props.value);
    descriptionText.value = parsed.description;
  };

  // Call updateDescriptionText when the component is mounted or when props.value changes
  watchEffect(() => {
    updateDescriptionText();
  });

  const onChange = (newValue: string) => {
    const data = {
      countryCode: newValue,
      defaultLocale: newValue ? newValue.toLowerCase() : '',
      description: descriptionText.value
    };
    const formattedValue = JSON.stringify(data).replace(/\\/g, '');
    emit('input', formattedValue);
  };

  const onTextChange = (newText: string) => {
    descriptionText.value = newText;
    const parsedValue = parseStoredValue(props.value);
    if (parsedValue.countryCode) {
      onChange(parsedValue.countryCode);
    }
  };
</script>
