// @ts-nocheck
import React from "react";

export type IndexFile = {
  path: string,
  type: string,
  component?: any
}

export type RegistryItem = {
  name: string
  type: string
  file: IndexFile,
  registryDependencies: string[]
}

export const Index: Record<string, RegistryItem> = {
  "label": {
    name: "label",
    type: "templates/fields",
    file: {
      path: "templates/fields/label/config.ts",
      type: "template/fields"
    },
    registryDependencies: []
  },
  "link": {
    name: "link",
    type: "templates/fields",
    file: {
      path: "templates/fields/link/config.ts",
      type: "template/fields"
    },
    registryDependencies: ['label']
  },
  "link-default-example": {
    name: "link-default-example",
    type: "template/components",
    file: {
      path: "src/examples/fields/link/default.tsx",
      type: "template/components",
      component: React.lazy(() => import ("@/examples/fields/link/default.tsx"))
    }, registryDependencies: []
  }
}
