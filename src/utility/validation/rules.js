/**
 * src/utility/validation/rules.js
 * Pulls in a bunch of default rules for vee-validate. It also sets the message
 * to match the default Elixir Ecto error messages. This makes it transparent to
 * the user if the error happened client side or server side.
 */

import {
  between as defaultBetween,
  confirmed as defaultConfirmed,
  digits as defaultDigits,
  email as defaultEmail,
  integer as defaultInteger,
  length as defaultLength,
  max as defaultMax,
  min as defaultMin,
  regex as defaultRegex,
  required as defaultRequired
} from 'vee-validate/dist/rules'

export const between = {
  ...defaultBetween,
  message: 'must be between {min} and {max}'
}

export const confirmed = {
  ...defaultConfirmed,
  message: 'confirmation does not match'
}

export const digits = {
  ...defaultDigits,
  message: 'must be numeric and exactly contain {length} digits'
}

export const email = {
  ...defaultEmail,
  message: 'must be a valid email'
}

export const integer = {
  ...defaultInteger,
  message: 'must be an integer'
}

export const length = {
  ...defaultLength,
  message: 'must be {length} characters long'
}

export const max = {
  ...defaultMax,
  message: 'may not be greater than {length} characters'
}

export const min = {
  ...defaultMin,
  message: 'must be at least {length} characters'
}

export const regex = {
  ...defaultRegex,
  message: 'format is invalid'
}

export const required = {
  ...defaultRequired,
  message: 'can\'t be blank'
}
