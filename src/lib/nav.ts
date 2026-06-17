// Central navigation model — drives the header, footer, and division sub-nav.
// Editing the sitemap here keeps every menu in sync.

export interface NavLink {
  label: string;
  href: string;
  /** interactive = backed by a Worker endpoint + D1 (form/order/registration) */
  interactive?: boolean;
  /** external/embedded tool */
  external?: boolean;
}

export interface Division {
  label: string;
  href: string;
  blurb: string;
  links: NavLink[];
}

export const divisions: Division[] = [
  {
    label: 'Garden Center',
    href: '/garden-center',
    blurb: 'Plants, trees, bulk goods, classes & seasonal events.',
    links: [
      { label: 'Plants & Products', href: '/garden-center/plants-products' },
      { label: 'Plant Library', href: '/garden-center/plant-library', external: true },
      { label: 'Bulk Mulch, Stone & Topsoil', href: '/garden-center/bulk-goods', interactive: true },
      { label: 'Gift Cards', href: '/garden-center/gift-cards', external: true },
      { label: 'Classes', href: '/garden-center/classes' },
      { label: 'Events', href: '/garden-center/events' },
    ],
  },
  {
    label: 'Design & Build',
    href: '/design-build',
    blurb: 'Custom landscape design, patios, pergolas & retaining walls.',
    links: [
      { label: 'Our Process', href: '/design-build/process' },
      { label: 'Services', href: '/design-build/services' },
      { label: 'Portfolio', href: '/design-build/portfolio' },
      { label: 'We Plan, You Plant', href: '/design-build/we-plan-you-plant' },
      { label: 'Request a Consultation', href: '/design-build/consultation', interactive: true },
    ],
  },
  {
    label: 'Professional Services',
    href: '/professional-services',
    blurb: 'Commercial maintenance, snow & ice management.',
    links: [
      { label: 'Commercial Maintenance', href: '/professional-services/commercial-maintenance' },
      { label: 'Snow & Ice Management', href: '/professional-services/snow-ice' },
      { label: 'Service Areas', href: '/professional-services/service-areas' },
      { label: 'Request a Bid', href: '/professional-services/request-bid', interactive: true },
    ],
  },
  {
    label: 'Tree Farm',
    href: '/tree-farm',
    blurb: 'Large-tree inventory, transplanting & B&B stock.',
    links: [
      { label: 'Available Inventory', href: '/tree-farm/inventory' },
      { label: 'Transplanting', href: '/tree-farm/transplanting' },
      { label: 'Request a Quote', href: '/tree-farm/quote', interactive: true },
    ],
  },
];

// Single-slug global pages.
export const globalLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact', interactive: true },
];
