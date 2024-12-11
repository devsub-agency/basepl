import { Field } from 'payload'

export const label = (maxLength = 20): Field => ({
    name: 'label',
    label: 'Label',
    required: true,
    localized: true,
    type: 'text',
    maxLength: maxLength,
})