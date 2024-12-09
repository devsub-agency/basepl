import { z } from "zod";
import { registryIndexSchema } from "./schema";

const filterComponentsResultSchema = z.object({
  found: z.array(registryIndexSchema.element),
  notFound: z.array(z.string()),
});

type FilterComponentsResult = z.infer<typeof filterComponentsResultSchema>;

export const filterRequestedComponents = (
  registry: z.infer<typeof registryIndexSchema>,
  requestedComponents: string[],
): FilterComponentsResult => {
  const result = filterComponentsResultSchema.parse({
    found: [],
    notFound: [],
  });

  requestedComponents.forEach((requested) => {
    const component = registry.find(
      (item) => item.name.toLowerCase() === requested.toLowerCase(),
    );

    if (component) {
      result.found.push(component);
    } else {
      result.notFound.push(requested);
    }
  });

  return result;
};
