# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-01-16

### Changed
- **Documentation**: Updated README.md with comprehensive new features documentation
- **Changelog**: Added detailed changelog for version 1.1.0 features

## [1.1.0] - 2025-01-16

### Added
- **Configurable Selection Mode**: Added "Multiple Selection" toggle in admin panel configuration
- **Drag & Drop Functionality**: Reorder selected countries by dragging chips
- **Enhanced Multiple Selection**: Separate dropdown for adding countries with draggable chips display
- **Custom Close Buttons**: Individual close buttons (×) on each chip for removing countries
- **Visual Feedback**: Grab/grabbing cursor and hover effects during drag operations
- **Order Preservation**: Maintains country selection order in stored data
- **Improved JSON Output**: Clean JSON format without double encoding

### Changed
- **Field Type**: Now supports JSON field type for better data structure
- **Template Structure**: Conditional rendering based on single/multiple selection mode
- **Data Handling**: Enhanced parsing logic to handle both object and string inputs
- **User Experience**: Better visual feedback and interaction patterns

### Fixed
- **JSON Encoding**: Resolved double JSON encoding issue
- **TypeScript Errors**: Fixed property access and type definition issues
- **Delete Functionality**: Improved chip removal with custom close buttons

## [1.0.1] - 2025-08-09

### Added
- Version 1.0.1 release

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of the Directus Country Selector extension
- **Comprehensive Country List**: Includes all countries with ISO codes and names
- **Search Functionality**: Easy search through countries by name
- **Custom Labels**: Configurable field labels and descriptions
- **Required Field Support**: Optional required field validation
- **JSON Storage**: Stores country data in a structured JSON format
- **Description Support**: Additional description field for each country selection
- **Directus UI Integration**: Uses Directus theme variables for consistent styling
- **TypeScript Support**: Full TypeScript support with type definitions

### Features
- Country selection dropdown with 250+ countries
- Search functionality for easy country finding
- Structured JSON data storage with country codes and descriptions
- Configurable field labels and descriptions
- Required field validation support
- Integration with Directus UI components
- Responsive design that works across different screen sizes

### Technical
- TypeScript support with full type definitions
- Vue 3 composition API
- Directus Extensions SDK v9 compatibility
- Modular architecture with clean component structure
- Comprehensive error handling
- Performance optimized with efficient country list management

