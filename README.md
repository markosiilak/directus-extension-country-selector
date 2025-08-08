# Country Selector Extension

A Directus interface extension that provides a comprehensive country selection dropdown with support for country codes, names, and descriptions.

## Features

- **Comprehensive Country List**: Includes all countries with ISO codes and names
- **Search Functionality**: Easy search through countries by name
- **Custom Labels**: Configurable field labels and descriptions
- **Required Field Support**: Optional required field validation
- **JSON Storage**: Stores country data in a structured JSON format
- **Description Support**: Additional description field for each country selection
- **Directus UI Integration**: Uses Directus theme variables for consistent styling
- **TypeScript Support**: Full TypeScript support with type definitions

## Installation

### From NPM (Recommended)

```bash
npm install directus-extension-country-selector
```

### Manual Installation

1. Download or clone this repository
2. Install dependencies with `npm install`
3. Build the extension with `npm run build`
4. Move the built extension to your Directus extensions folder

## Configuration

The interface has the following configuration options:

### Field Label
Customize the label that appears above the country selector field.

### Description
Add helper text that appears below the field to guide users.

### Required
Mark the field as required for validation purposes.

## Usage

1. **Field Setup**:
   - Create a field with type `string`
   - Select "Country Selector" as the interface
   - Configure the field label, description, and required status

2. **Data Storage**:
   The extension stores data in the following JSON format:
   ```json
   {
     "countryCode": "US",
     "defaultLocale": "us",
     "description": "United States of America"
   }
   ```

3. **Display Options**:
   - **Raw**: Shows the JSON data as stored
   - **Formatted**: Shows the country name in a readable format

## Example Configuration

```javascript
// Interface configuration
{
  label: "Select Country",
  description: "Choose the country for this record",
  required: true
}
```

## Data Format

### Input Format
The extension accepts various input formats:

- **JSON Object**: `{"countryCode": "US", "defaultLocale": "us", "description": "United States"}`
- **Country Code**: `"US"`
- **Country Name**: `"United States"`

### Output Format
The extension always outputs data in this structured format:

```json
{
  "countryCode": "US",
  "defaultLocale": "us", 
  "description": "United States of America"
}
```

## Country Data

The extension uses the `countries-list` package which provides:

- **250+ Countries**: Complete list of world countries
- **ISO Codes**: Standard ISO 3166-1 alpha-2 country codes
- **Country Names**: Official country names in English
- **Consistent Format**: Standardized data structure

### Example Countries
- 🇺🇸 United States (US)
- 🇬🇧 United Kingdom (GB)
- 🇩🇪 Germany (DE)
- 🇫🇷 France (FR)
- 🇯🇵 Japan (JP)
- 🇨🇦 Canada (CA)
- 🇦🇺 Australia (AU)

## Integration Examples

### Basic Usage
```javascript
// Simple country selection
const countryData = {
  countryCode: "US",
  defaultLocale: "us",
  description: "United States of America"
};
```

### With Validation
```javascript
// Required field validation
if (!countryData.countryCode) {
  throw new Error("Country is required");
}
```

### Display Integration
```javascript
// Display the country name
const countryName = countriesList[countryData.countryCode]?.name || countryData.countryCode;
```

## Customization

### Styling
The extension uses Directus theme variables for consistent styling:

```css
.country-selector {
  color: var(--theme-foreground);
  font-size: var(--theme-font-size-base);
}

.country-dropdown {
  background: var(--theme-background-subdued);
  border: var(--theme-border-width) solid var(--theme-border-color);
}
```

### Custom Country List
You can extend the country list by modifying the component:

```javascript
// Add custom countries
const customCountries = [
  { text: "Custom Country", value: "CC" },
  ...countries.value
];
```

## Compatibility

- Directus 10.x and later
- Field types: string
- Node.js >= 16.0.0

## Development

### Project Setup

The project requires `@directus/extensions-sdk` to be installed as a development dependency:

```bash
npm install --save-dev @directus/extensions-sdk
```

### Build Commands

```bash
# Build for production
npm run build

# Build for development (watch mode)
npm run dev

# Prepare for publishing
npm run prepublishOnly
```

### Project Structure

```
src/
├── interface.vue        # Main interface component
└── index.ts            # Extension entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

