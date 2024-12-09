import { RegistryItem } from "./schema";

export const resolveRegistryDependencies = async (
  items: RegistryItem[],
  registryIndex: RegistryItem[],
): Promise<RegistryItem[]> => {
  const resolved = new Set<string>(); // Track processed items
  const result: RegistryItem[] = []; // Store final list

  const resolveDependencies = (item: RegistryItem) => {
    if (resolved.has(item.name)) {
      return;
    }
    resolved.add(item.name);
    if (item.registryDependencies?.length) {
      item.registryDependencies.forEach((depName) => {
        const dependency = registryIndex.find((reg) => reg.name === depName);
        if (dependency) {
          resolveDependencies(dependency);
        }
      });
    }
    result.push(item);
  };
  items.forEach((item) => resolveDependencies(item));
  return result;
};
