import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/*
===========================================
UTILITY FUNCTIONS
===========================================

PURPOSE: This file contains helper functions used throughout your application.
The main function here is `cn()` which is essential for shadcn/ui components.

WHAT THIS FILE DOES:
- Provides the `cn()` function for conditional and mergeable CSS classes
- Can contain other utility functions for your app
- Centralizes common logic that's used across components

HOW TO USE:
- Import `cn` in components: import { cn } from "@/lib/utils"
- Use it to combine classes: cn("base-class", condition && "conditional-class")
- Add other utility functions here as your app grows

DOS:
✅ Use cn() for all conditional className logic
✅ Add type-safe utility functions here
✅ Keep functions pure (no side effects)
✅ Add JSDoc comments for complex functions
✅ Export functions that might be reused

DON'TS:
❌ Don't modify the cn() function (it's perfect as-is)
❌ Don't add component-specific logic here
❌ Don't add functions with side effects
❌ Don't forget to export new utility functions
❌ Don't add heavy dependencies here
*/

/**
 * Combines CSS classes with intelligent merging and deduplication
 *
 * This function is the backbone of shadcn/ui's styling system. It:
 * - Combines multiple class strings
 * - Handles conditional classes
 * - Resolves Tailwind class conflicts (e.g., "p-4 p-6" becomes "p-6")
 * - Removes duplicate classes
 *
 * @param inputs - Any number of class values (strings, conditionals, arrays)
 * @returns A clean, merged class string
 *
 * @example
 * cn("px-4 py-2", "bg-blue-500", isActive && "bg-blue-700")
 * // Returns: "px-4 py-2 bg-blue-700" (if isActive is true)
 *
 * @example
 * cn("p-4", "p-6") // Returns: "p-6" (conflict resolved)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*
EXAMPLE UTILITY FUNCTIONS YOU CAN ADD:

/**
 * Formats a number as currency
 * @param amount - The number to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

/**
 * Truncates text to a specified length
 * @param text - The text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

/**
 * Generates a random ID string
 * @param length - Length of the ID (default: 8)
 * @returns Random alphanumeric string
 */
export function generateId(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
}

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array)
 * @param value - Value to check
 * @returns True if empty
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true
  if (typeof value === "string") return value.trim() === ""
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === "object") return Object.keys(value).length === 0
  return false
}

/*
USAGE EXAMPLES FOR cn():

1. BASIC COMBINATION:
cn("px-4 py-2", "bg-blue-500", "text-white")
// Returns: "px-4 py-2 bg-blue-500 text-white"

2. CONDITIONAL CLASSES:
cn("base-class", isActive && "active-class", isDisabled && "disabled-class")
// Only includes classes when conditions are true

3. RESOLVING CONFLICTS:
cn("p-4", "p-6") // Returns: "p-6" (later class wins)
cn("text-sm", "text-lg") // Returns: "text-lg"

4. COMPLEX CONDITIONS:
cn(
  "button-base",
  {
    "bg-blue-500": variant === "primary",
    "bg-gray-500": variant === "secondary",
    "opacity-50": disabled,
  },
  className // Allow external className override
)

5. IN COMPONENTS:
<div className={cn(
  "flex items-center gap-2",
  size === "sm" && "text-sm",
  size === "lg" && "text-lg",
  className
)}>
*/
