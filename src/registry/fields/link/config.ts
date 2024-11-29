import { Field } from 'payload'
import {label} from "@/registry/fields/label/config";

//TODO: 18n and target languages in initial config -> add to all fields

const variants: Field = {
    name: 'variant',
    type: 'select',
    options: [
        {
            label: 'Internal',
            value: 'internal',
        },
        {
            label: 'External',
            value: 'external',
        },
    ],
}

const internal: Field = {
    name: 'internal',
    type: 'group',
    admin: {
        condition: (_, siblingData) => siblingData.variant === 'internal',
    },
    fields: [
        {
            name: 'variant',
            label: {
                en: 'Variant',
                de: 'Variante',
            },
            type: 'select',
            options: [
                { label: 'Text Only - Anker', value: 'textOnlyAnker' },
                { label: 'Text Only - Page', value: 'textOnlyPage' },
                { label: 'CTA - Anker', value: 'ctaAnker' },
                { label: 'CTA - Page', value: 'ctaPage' },
            ],
        },
        label,
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            required: true,
            localized: true,
        },
    ],
}

const external: Field = {
    name: 'external',
    type: 'group',
    admin: {
        condition: (_, siblingData) => siblingData.variant === 'external',
    },
    fields: [
        {
            name: 'variant',
            label: {
                en: 'Variant',
                de: 'Variante',
            },
            type: 'select',
            options: [
                { label: 'New Tab', value: 'newTab' },
                { label: 'Same Tab', value: 'sameTab' },
                { label: 'E-Mail', value: 'email' },
            ],
        },
        label,
        {
            name: 'url',
            label: 'URL',
            type: 'text',
            required: true,
        },
    ],
}

export const link: Field = {
    name: 'link',
    label: 'Link',
    interfaceName: 'CMSLinkType',
    type: 'group',
    fields: [
        {
            name: 'light',
            type: 'checkbox',
            label: {
                en: 'Check if the list should be light',
                de: 'Markieren Sie, wenn die Liste hell sein soll',
            },
            defaultValue: false,
        },
        {
            name: 'large',
            type: 'checkbox',
            label: {
                en: 'Check if the link should be large',
                de: 'Markieren Sie, wenn die Linl groß sein soll',
            },
        },
        variants,
        internal,
        external,
    ],
}