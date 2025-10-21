<template>
  <div>
    <!-- Single selection mode -->
    <v-select
      v-if="!props.multiple"
      :model-value="displayValue"
      :items="countries"
      :placeholder="'Select a country'"
      :label="props.label"
      :required="props.required"
      item-value="value"
      item-text="text"
      @update:model-value="onChange">
      <template v-if="props.description" #append-outer>
        <v-icon name="help_outline" :tooltip-text="props.description" />
      </template>
    </v-select>

    <!-- Multiple selection mode with draggable chips -->
    <div v-else>
      <v-select
        :model-value="[]"
        :items="availableCountries"
        :placeholder="'Add countries'"
        :label="props.label"
        :required="props.required"
        item-value="value"
        item-text="text"
        @update:model-value="addCountry">
        <template v-if="props.description" #append-outer>
          <v-icon name="help_outline" :tooltip-text="props.description" />
        </template>
      </v-select>

      <!-- Draggable chips container -->
      <div v-if="selectedCountries.length > 0" class="chips-container mt-2">
        <div
          v-for="(country, index) in selectedCountries"
          :key="country.value"
          :draggable="true"
          class="draggable-chip"
          @dragstart="onDragStart($event, index)"
          @dragover="onDragOver($event)"
          @drop="onDrop($event, index)"
          @dragend="onDragEnd">
          <v-chip>
            {{ country.text }}
            <button
              type="button"
              class="close-btn"
              aria-label="Remove"
              @click="removeCountry(index)">
              ×
            </button>
          </v-chip>
        </div>
      </div>
    </div>

    <h3 class="mt-2">{{ props.description }}</h3>
    <v-input
      :model-value="descriptionText"
      :placeholder="'Enter description'"
      @update:model-value="onTextChange" />
  </div>
</template>

<script setup lang="ts">
  import { countries as countriesList, getEmojiFlag, type TCountryCode } from 'countries-list';
  import { computed, ref, watchEffect } from 'vue';

  const props = defineProps<{
    value: string | object | null;
    label?: string;
    description?: string;
    required?: boolean;
    multiple?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'input', value: object): void;
  }>();

  const descriptionText = ref('');
  const draggedIndex = ref<number | null>(null);

  const countries = ref(
    Object.entries(countriesList).map(([code, country]) => ({
      text: `${getEmojiFlag(code as TCountryCode)} ${country.name}`,
      value: code
    }))
  );

  const selectedCountries = computed(() => {
    const parsed = parseStoredValue(props.value);
    return parsed.countryCodes.map((code: string) => {
      const country = countries.value.find(c => c.value === code);
      return country || { text: code, value: code };
    });
  });

  const availableCountries = computed(() => {
    const parsed = parseStoredValue(props.value);
    return countries.value.filter(country => !parsed.countryCodes.includes(country.value));
  });

  const parseStoredValue = (value: string | object | null) => {
    if (!value) return { countryCodes: [], description: '' };

    // If value is already an object, use it directly
    if (typeof value === 'object') {
      const obj = value as any;
      return {
        countryCodes: Array.isArray(obj.countryCodes) ? obj.countryCodes
          : (obj.countryCode ? [obj.countryCode] : []),
        description: obj.description || ''
      };
    }

    // If value is a string, try to parse it
    try {
      const parsed = JSON.parse(value);
      return {
        countryCodes: Array.isArray(parsed.countryCodes) ? parsed.countryCodes
          : (parsed.countryCode ? [parsed.countryCode] : []),
        description: parsed.description || ''
      };
    } catch {
      // Handle legacy single country format
      return { countryCodes: value ? [value] : [], description: '' };
    }
  };

  const displayValue = computed(() => {
    const parsed = parseStoredValue(props.value);
    const codes = parsed.countryCodes.map((code: string) => {
      const selectedCountry = countries.value.find(country => country.value === code);
      return selectedCountry?.value || code;
    });

    // Return single value for single mode, array for multiple mode
    return props.multiple ? codes : (codes.length > 0 ? codes[0] : null);
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

  const onChange = (newValues: string | string[] | null) => {
    // Handle both single and multiple selection modes
    const values = Array.isArray(newValues) ? newValues : (newValues ? [newValues] : []);

    const data = {
      countryCodes: values,
      defaultLocale: values.length > 0 ? values[0].toLowerCase() : '',
      description: descriptionText.value
    };
    emit('input', data);
  };

  const addCountry = (countryCode: string) => {
    const parsed = parseStoredValue(props.value);
    if (!parsed.countryCodes.includes(countryCode)) {
      const newCodes = [...parsed.countryCodes, countryCode];
      const data = {
        countryCodes: newCodes,
        defaultLocale: newCodes.length > 0 ? newCodes[0].toLowerCase() : '',
        description: descriptionText.value
      };
      emit('input', data);
    }
  };

  const removeCountry = (index: number) => {
    const parsed = parseStoredValue(props.value);
    const newCodes = parsed.countryCodes.filter((_, i) => i !== index);
    const data = {
      countryCodes: newCodes,
      defaultLocale: newCodes.length > 0 ? newCodes[0].toLowerCase() : '',
      description: descriptionText.value
    };
    emit('input', data);
  };

  const onDragStart = (event: DragEvent, index: number) => {
    draggedIndex.value = index;
    event.dataTransfer?.setData('text/plain', index.toString());
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: DragEvent, dropIndex: number) => {
    event.preventDefault();
    const dragIndex = draggedIndex.value;

    if (dragIndex !== null && dragIndex !== dropIndex) {
      const parsed = parseStoredValue(props.value);
      const newCodes = [...parsed.countryCodes];
      const draggedItem = newCodes.splice(dragIndex, 1)[0];
      newCodes.splice(dropIndex, 0, draggedItem);

      const data = {
        countryCodes: newCodes,
        defaultLocale: newCodes.length > 0 ? newCodes[0].toLowerCase() : '',
        description: descriptionText.value
      };
      emit('input', data);
    }
  };

  const onDragEnd = () => {
    draggedIndex.value = null;
  };

  const onTextChange = (newText: string) => {
    descriptionText.value = newText;
    const parsedValue = parseStoredValue(props.value);
    if (parsedValue.countryCodes.length > 0) {
      onChange(parsedValue.countryCodes);
    }
  };
</script>

<style scoped>
  .mt-2 {
    margin-top: 4px;
  }

  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .draggable-chip {
    cursor: grab;
    transition: opacity 0.2s ease;
  }

  .draggable-chip:hover {
    opacity: 0.8;
  }

  .draggable-chip:active {
    cursor: grabbing;
  }

  .draggable-chip.dragging {
    opacity: 0.5;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-left: 4px;
    padding: 0 2px;
    color: #666;
  }

  .close-btn:hover {
    color: #333;
  }
</style>
