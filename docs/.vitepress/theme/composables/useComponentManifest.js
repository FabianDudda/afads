import { data as manifest } from "../../custom-elements.data.mjs";

export function useComponentManifest(tag) {
  const component = manifest.modules
    .flatMap((m) => m.declarations ?? [])
    .find((d) => d.tagName === tag);

  const fields =
    component?.members.filter((m) => m.kind === "field" && !m.static && m.description) ?? [];

  return { component, fields };
}
