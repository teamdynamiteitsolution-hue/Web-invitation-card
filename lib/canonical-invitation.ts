import { getTemplateById, TEMPLATE_DEFINITIONS, TemplateDefinition } from "./template-definitions";

export interface CanonicalInvitationResult {
  template: any;
  animation: any;
  eventData: Record<string, any>;
  typographyStyles: Record<string, string>;
  layoutPresetId: string;
  music: {
    url: string;
    name?: string;
    loop?: boolean;
    volume?: number;
    enabled?: boolean;
  } | null;
  isScroll: boolean;
  experienceType: string;
}

export function resolveCanonicalInvitation(rawInput: any): CanonicalInvitationResult {
  if (!rawInput) {
    return {
      template: {
        id: "default_tmpl",
        slug: "classic-editorial",
        name: "Royal Digital Invitation",
        experienceType: "dynamic_card",
        compositionId: "classic_editorial",
        previewImageUrl: "",
        assetManifest: { cardAsset: "", decorations: [] }
      },
      animation: null,
      eventData: {},
      typographyStyles: {},
      layoutPresetId: "classic_editorial",
      music: null,
      isScroll: false,
      experienceType: "dynamic_card"
    };
  }

  // 1. Parse eventData safely
  let eventData: Record<string, any> = {};
  if (typeof rawInput.eventData === "string") {
    try {
      eventData = JSON.parse(rawInput.eventData);
    } catch {
      eventData = {};
    }
  } else if (rawInput.eventData && typeof rawInput.eventData === "object") {
    eventData = { ...rawInput.eventData };
  } else if (rawInput.contentData && typeof rawInput.contentData === "object") {
    eventData = { ...rawInput.contentData };
  }

  // 2. Identify the target template definition
  const rawTemplate = rawInput.template || {};
  const templateSlugOrId =
    eventData.templateSlug ||
    eventData.templateDefinitionId ||
    eventData.selectedScrollTheme ||
    rawTemplate.slug ||
    rawTemplate.id ||
    rawInput.selectedTemplateId ||
    rawInput.templateId;

  const matchedDef = getTemplateById(templateSlugOrId) ||
    (rawTemplate.slug ? getTemplateById(rawTemplate.slug) : null);

  // 3. Parse assetManifest safely
  let assetManifest: any = {};
  if (rawTemplate.assetManifest) {
    if (typeof rawTemplate.assetManifest === "string") {
      try {
        assetManifest = JSON.parse(rawTemplate.assetManifest);
      } catch {
        assetManifest = {};
      }
    } else {
      assetManifest = rawTemplate.assetManifest;
    }
  }

  // 4. Resolve Card Asset & Composition
  const resolvedCardAsset =
    (assetManifest?.cardAsset && assetManifest.cardAsset !== "" && !assetManifest.cardAsset.includes("placeholder"))
      ? assetManifest.cardAsset
      : (matchedDef?.previewImageUrl || rawTemplate.previewImageUrl || "");

  const resolvedCompositionId =
    eventData.layoutPresetId ||
    matchedDef?.compositionId ||
    (rawTemplate as any)?.compositionId ||
    "classic_editorial";

  const resolvedExpType = (
    matchedDef?.experienceType ||
    rawTemplate.experienceType ||
    "dynamic_card"
  ).toLowerCase();

  const isScroll =
    resolvedExpType === "scroll" ||
    resolvedExpType === "scroll_story" ||
    (matchedDef?.slug || "").includes("scroll") ||
    (rawTemplate.slug || "").includes("scroll");

  // 5. Extract Music Config
  const music =
    assetManifest?.music ||
    (matchedDef as any)?.music ||
    eventData?.music ||
    null;

  // 6. Assemble Canonical Template
  const canonicalTemplate = {
    ...rawTemplate,
    ...(matchedDef || {}),
    id: rawTemplate.id || matchedDef?.id || "default_tmpl",
    slug: matchedDef?.slug || rawTemplate.slug || "classic-editorial",
    name: matchedDef?.name || rawTemplate.name || "Royal Digital Invitation",
    experienceType: isScroll ? "SCROLL" : (rawTemplate.experienceType || matchedDef?.experienceType || "dynamic_card"),
    compositionId: resolvedCompositionId,
    previewImageUrl: matchedDef?.previewImageUrl || rawTemplate.previewImageUrl || resolvedCardAsset,
    assetManifest: {
      ...assetManifest,
      cardAsset: resolvedCardAsset,
      music: music
    }
  };

  const typographyStyles =
    eventData.typographyStyles ||
    rawInput.typographyStyles ||
    {};

  const rawAnimation = rawInput.animation || null;
  const animKey = (
    rawAnimation?.pluginKey ||
    rawAnimation?.slug ||
    rawAnimation?.interactionType ||
    rawAnimation?.id ||
    ""
  ).toLowerCase();

  let resolvedCardExpType = "dynamic_card";
  if (animKey.includes("curtain")) {
    resolvedCardExpType = "curtain";
  } else if (animKey.includes("scratch") || animKey.includes("haldi")) {
    resolvedCardExpType = "multi_scratch";
  } else if (animKey.includes("envelope") || animKey.includes("wax") || animKey.includes("seal")) {
    if (rawAnimation?.videoUrl || rawAnimation?.interactionType === "video" || rawAnimation?.pluginKey === "video") {
      resolvedCardExpType = "dynamic_card";
    } else {
      resolvedCardExpType = "envelope";
    }
  } else if (rawAnimation?.videoUrl || rawAnimation?.interactionType === "video" || rawAnimation?.pluginKey === "video") {
    resolvedCardExpType = "dynamic_card";
  } else if (matchedDef?.experienceType && matchedDef.experienceType !== "SCROLL" && matchedDef.experienceType !== "scroll") {
    resolvedCardExpType = matchedDef.experienceType.toLowerCase();
  }

  return {
    template: canonicalTemplate,
    animation: rawAnimation,
    eventData,
    typographyStyles,
    layoutPresetId: resolvedCompositionId,
    music: music?.enabled !== false && music?.url ? music : null,
    isScroll,
    experienceType: isScroll ? "scroll" : resolvedCardExpType
  };
}
