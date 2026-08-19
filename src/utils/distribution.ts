export type DistributionAudience = 'internal-admin';

export type KdpAssetMetadata = {
  readonly label: string;
  readonly fileName: string;
  readonly publicPath: string;
  readonly downloadName: string;
  readonly format: 'jpg';
  readonly purpose: 'kindle-ebook-cover' | 'paperback-wrap-cover';
  readonly dimensions: {
    readonly widthPx: number;
    readonly heightPx: number;
    readonly dpi?: number;
    readonly ratio?: string;
  };
  readonly notes: readonly string[];
};

export type MarketplaceMetadata = {
  readonly title: string;
  readonly subtitle: string;
  readonly author: string;
  readonly edition: string;
  readonly language: string;
  readonly territories: 'worldwide';
  readonly formats: readonly ('ebook' | 'paperback')[];
  readonly categories: readonly string[];
  readonly keywords: readonly string[];
  readonly description: string;
};

export type DistributionMetadataConfig = {
  readonly audience: DistributionAudience;
  readonly marketplace: MarketplaceMetadata;
  readonly kdpAssets: readonly KdpAssetMetadata[];
};

/**
 * Private distribution metadata for back-office publishing workflows.
 *
 * Keep this module out of the public curriculum rendering path: it should only be
 * imported from internal admin components, publishing dashboards, or build-time
 * ingestion scripts that need KDP / marketplace metadata.
 */
export const distributionMetadata: DistributionMetadataConfig = {
  audience: 'internal-admin',
  marketplace: {
    title: 'The Hardwire Method',
    subtitle: 'Music Theory for the Streets',
    author: 'RyanrealAF',
    edition: 'Complete eBook Edition',
    language: 'en-US',
    territories: 'worldwide',
    formats: ['ebook', 'paperback'],
    categories: [
      'Music Theory',
      'Music Instruction & Study',
      'Rap, Hip-Hop & Urban Production',
    ],
    keywords: [
      'rap cadence',
      'music theory',
      'urban production',
      'rhythm training',
      'MIDI geometry',
      'subdivision drills',
      'producer textbook',
    ],
    description:
      'A practical curriculum for translating rhythm, cadence, subdivision, and production theory into street-ready creative workflows.',
  },
  kdpAssets: [
    {
      label: 'Kindle eBook Front Cover',
      fileName: 'kdp-kindle-cover.jpg',
      publicPath: '/kdp-kindle-cover.jpg',
      downloadName: 'THE_HARDWIRE_METHOD_KDP_KINDLE_COVER.jpg',
      format: 'jpg',
      purpose: 'kindle-ebook-cover',
      dimensions: {
        widthPx: 2560,
        heightPx: 1600,
        ratio: '1.6:1',
      },
      notes: [
        'High-resolution front cover asset for Kindle store listings.',
        'Use for digital eBook marketplace ingestion only.',
      ],
    },
    {
      label: 'Paperback Full-Wrap Cover',
      fileName: 'kdp-paperback-wrap.jpg',
      publicPath: '/kdp-paperback-wrap.jpg',
      downloadName: 'THE_HARDWIRE_METHOD_KDP_PAPERBACK_WRAP.jpg',
      format: 'jpg',
      purpose: 'paperback-wrap-cover',
      dimensions: {
        widthPx: 3717,
        heightPx: 2775,
        dpi: 300,
      },
      notes: [
        'Full-wrap paperback cover formatted for 6 x 9 inch trim.',
        'Includes front panel, spine, back cover, and barcode clearance zone.',
      ],
    },
  ],
} as const;

export const getKdpAssetByPurpose = (purpose: KdpAssetMetadata['purpose']) =>
  distributionMetadata.kdpAssets.find((asset) => asset.purpose === purpose);
