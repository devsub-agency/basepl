// @ts-nocheck
import React from "react";

export type IndexFile = {
  path: string,
  component?: any
}

export type RegistryItem = {
  name: string
  file: IndexFile,
  registryDependencies: string[]
}

export const Index: Record<string, RegistryItem> = {
  
}