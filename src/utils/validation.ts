// Luhn algorithm for credit card validation
export const validateCreditCard = (cardNumber: string): boolean => {
  // Remove spaces and non-digits
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');
  
  if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
    return false;
  }
  
  let sum = 0;
  let isEven = false;
  
  // Process digits from right to left
  for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedCardNumber.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (basic)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Postal code validation
export const validatePostalCode = (postalCode: string, country: string = 'IN'): boolean => {
  const patterns = {
    'IN': /^[1-9][0-9]{5}$/, // Indian PIN code
    'US': /^[0-9]{5}(-[0-9]{4})?$/, // US ZIP code
    'UK': /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i, // UK postcode
    'CA': /^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/i, // Canadian postal code
  };
  
  const pattern = patterns[country as keyof typeof patterns];
  return pattern ? pattern.test(postalCode.trim()) : true; // Default to true for unknown countries
};

// Password strength validation
export const validatePassword = (password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Password must be at least 8 characters long');
  }
  
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one lowercase letter');
  }
  
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one uppercase letter');
  }
  
  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one number');
  }
  
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one special character');
  }
  
  return {
    isValid: score >= 3,
    score,
    feedback
  };
};

// Name validation
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
};

// Required field validation
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Form validation helper
export const validateForm = (
  formData: { [key: string]: any },
  rules: { [key: string]: (value: any) => boolean | string }
): { isValid: boolean; errors: { [key: string]: string } } => {
  const errors: { [key: string]: string } = {};
  
  Object.keys(rules).forEach(field => {
    const result = rules[field](formData[field]);
    if (typeof result === 'string') {
      errors[field] = result;
    } else if (!result) {
      errors[field] = `Invalid ${field}`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};