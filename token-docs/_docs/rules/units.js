module.exports = {
  // Unit conversion rules
  conversion: {
    // Base units for each type
    baseUnits: {
      spacing: 'px',
      fontSize: 'px',
      lineHeight: '',
      borderRadius: 'px',
      borderWidth: 'px',
      opacity: '%',
      duration: 'ms'
    },

    // Conversion factors
    factors: {
      px: {
        rem: 0.0625, // 1px = 0.0625rem (assuming 16px base)
        em: 0.0625   // 1px = 0.0625em (assuming 16px base)
      },
      rem: {
        px: 16,      // 1rem = 16px
        em: 1        // 1rem = 1em
      },
      em: {
        px: 16,      // 1em = 16px
        rem: 1       // 1em = 1rem
      }
    },

    // Convert value between units
    convert: function(value, fromUnit, toUnit) {
      // Extract number
      const match = value.match(/^(\d+(?:\.\d+)?)(\w*)$/);
      if (!match) return value;

      const [_, num, unit] = match;
      const currentUnit = unit || fromUnit;

      // If units are the same, return original
      if (currentUnit === toUnit) return value;

      // If converting to base unit
      if (!toUnit) {
        return this.toBaseUnit(num, currentUnit);
      }

      // If converting from base unit
      if (!currentUnit) {
        return this.fromBaseUnit(num, toUnit);
      }

      // Convert between units
      const factor = this.factors[currentUnit]?.[toUnit];
      if (!factor) return value;

      const result = num * factor;
      return `${result}${toUnit}`;
    },

    // Convert to base unit
    toBaseUnit: function(value, unit) {
      const factor = this.factors[unit]?.px;
      if (!factor) return value;
      return value * factor;
    },

    // Convert from base unit
    fromBaseUnit: function(value, unit) {
      const factor = this.factors.px?.[unit];
      if (!factor) return value;
      return value * factor;
    }
  },

  // Unit validation rules
  validation: {
    // Valid units for each type
    validUnits: {
      spacing: ['px', 'rem', 'em'],
      fontSize: ['px', 'rem', 'em'],
      lineHeight: [''],
      borderRadius: ['px', 'rem', 'em'],
      borderWidth: ['px'],
      opacity: ['%'],
      duration: ['ms']
    },

    // Validate unit for type
    validateUnit: function(value, type) {
      const match = value.match(/^(\d+(?:\.\d+)?)(\w*)$/);
      if (!match) return false;

      const [_, num, unit] = match;
      const validUnits = this.validUnits[type] || [];

      // If no unit specified, check if type allows unitless
      if (!unit) {
        return validUnits.includes('');
      }

      return validUnits.includes(unit);
    }
  },

  // Unit normalization
  normalize: {
    // Normalize value to preferred unit
    normalizeValue: function(value, type, preferredUnit = null) {
      const match = value.match(/^(\d+(?:\.\d+)?)(\w*)$/);
      if (!match) return value;

      const [_, num, unit] = match;
      const targetUnit = preferredUnit || this.conversion.baseUnits[type];

      return this.conversion.convert(value, unit, targetUnit);
    },

    // Normalize all values in a token set
    normalizeSet: function(tokens, preferredUnits = {}) {
      const result = { ...tokens };

      for (const [name, token] of Object.entries(tokens)) {
        if (typeof token.$value === 'string') {
          const preferredUnit = preferredUnits[token.$type];
          result[name] = {
            ...token,
            $value: this.normalizeValue(token.$value, token.$type, preferredUnit)
          };
        }
      }

      return result;
    }
  },

  // Unit formatting
  format: {
    // Format value with unit
    formatValue: function(value, unit) {
      if (!unit) return value.toString();
      return `${value}${unit}`;
    },

    // Format value with appropriate precision
    formatPrecision: function(value, precision = 2) {
      return Number(value.toFixed(precision));
    }
  }
}; 