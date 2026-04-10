// ─── WordPress REST API Utility ──────────────────────────────────────────────
// Fetches posts from a headless WordPress instance via WP REST API.
// Falls back to MOCK_POSTS when PUBLIC_WP_API_URL is not configured,
// ensuring the site works fully offline and during development.

export interface WPAuthor {
  name: string;
  avatar_urls?: Record<string, string>;
}

export interface WPFeaturedMedia {
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: WPAuthor[];
    'wp:featuredmedia'?: WPFeaturedMedia[];
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

// ─── Mock Posts ──────────────────────────────────────────────────────────────
// Used as fallback when no WordPress endpoint is configured.
const MOCK_POSTS: WPPost[] = [
  {
    id: 1,
    slug: 'the-strategic-imperative-of-energy-transition',
    date: '2024-09-15T08:00:00',
    modified: '2024-09-15T08:00:00',
    title: { rendered: 'The Strategic Imperative of Energy Transition' },
    excerpt: {
      rendered:
        '<p>Energy utilities operating across Central and Eastern Europe face a convergence of regulatory pressure, aging infrastructure, and an accelerating mandate to decarbonize. The leaders who navigate this era successfully will be those who treat transformation not as a compliance exercise but as a genuine competitive advantage.</p>',
    },
    content: {
      rendered: `<p>Energy utilities operating across Central and Eastern Europe face a convergence of regulatory pressure, aging infrastructure, and an accelerating mandate to decarbonize. The leaders who navigate this era successfully will be those who treat transformation not as a compliance exercise but as a genuine competitive advantage.</p>
<h2>Rethinking the Utility Business Model</h2>
<p>For decades the utility business model rewarded predictability above all else. Capital-intensive grids, regulated returns, and stable demand curves created an industry accustomed to decade-long planning horizons. That era is over. Distributed generation, prosumer proliferation, and the electrification of heat and transport are simultaneously compressing margins and multiplying decision points.</p>
<h2>The Organizational Dimension</h2>
<p>Technical infrastructure is only one dimension of the transition challenge. The more neglected dimension is organizational. Utilities that have built cultures around operational excellence — doing known things reliably — must now build cultures capable of sensing and responding to novelty. This is not a technology problem; it is a leadership problem.</p>
<blockquote><p>"The measure of intelligence is the ability to change." — Albert Einstein</p></blockquote>
<h2>Practical First Steps</h2>
<p>Begin with a candid assessment of your organization's transformation readiness: strategy clarity, leadership alignment, capability gaps, and change capacity. From that baseline, sequence your investments. Not every initiative deserves immediate attention; the value lies in identifying the critical path — the sequence of moves that opens options others must close.</p>`,
    },
    categories: [1],
    tags: [1, 2],
    _embedded: {
      author: [{ name: 'Ferenc Csulak' }],
      'wp:term': [
        [{ id: 1, name: 'Energy Strategy', slug: 'energy-strategy' }],
        [
          { id: 1, name: 'Leadership', slug: 'leadership' },
          { id: 2, name: 'Transformation', slug: 'transformation' },
        ],
      ],
    },
  },
  {
    id: 2,
    slug: 'esg-beyond-compliance-a-value-creation-lens',
    date: '2024-10-22T08:00:00',
    modified: '2024-10-22T08:00:00',
    title: { rendered: 'ESG Beyond Compliance: A Value Creation Lens' },
    excerpt: {
      rendered:
        '<p>Most energy executives encounter ESG first through the lens of regulatory obligation — reporting frameworks, emissions inventories, disclosure requirements. But organizations that limit their ESG engagement to compliance are leaving significant value on the table. The strategic case for ESG is ultimately a case for resilience and long-term enterprise value.</p>',
    },
    content: {
      rendered: `<p>Most energy executives encounter ESG first through the lens of regulatory obligation — reporting frameworks, emissions inventories, disclosure requirements. But organizations that limit their ESG engagement to compliance are leaving significant value on the table.</p>
<h2>The Three Horizons of ESG Maturity</h2>
<p>Horizon one is compliance: meeting the minimum requirements of CSRD, TCFD, and sector-specific obligations. Horizon two is optimization: using ESG data to reduce operational costs, lower insurance premiums, and improve access to green financing. Horizon three — where the most sophisticated organizations are operating — treats ESG as a strategic lens that reshapes product portfolio decisions, partnership strategies, and talent propositions.</p>
<h2>The Safety–ESG Connection</h2>
<p>In the energy sector, safety performance is arguably the most material governance indicator. A single serious incident can erase years of carefully cultivated stakeholder trust. Leaders who build safety cultures do not do so because regulators demand it; they do so because they understand that an organization that cannot protect its own people cannot protect its customers' supply security or its shareholders' capital.</p>`,
    },
    categories: [2],
    tags: [3],
    _embedded: {
      author: [{ name: 'Ferenc Csulak' }],
      'wp:term': [
        [{ id: 2, name: 'ESG', slug: 'esg' }],
        [{ id: 3, name: 'Governance', slug: 'governance' }],
      ],
    },
  },
  {
    id: 3,
    slug: 'multigenerational-teams-the-underestimated-asset',
    date: '2024-11-30T08:00:00',
    modified: '2024-11-30T08:00:00',
    title: { rendered: 'Multigenerational Teams: The Underestimated Asset' },
    excerpt: {
      rendered:
        '<p>The energy sector workforce spans four generations simultaneously. Baby Boomers who built the analogue grid are now mentoring Gen Z engineers who have never known a world without smartphones. This generational breadth is routinely framed as a management challenge. I want to argue the opposite: it is one of the most underutilised strategic assets in the industry.</p>',
    },
    content: {
      rendered: `<p>The energy sector workforce spans four generations simultaneously. Baby Boomers who built the analogue grid are now mentoring Gen Z engineers who have never known a world without smartphones. This generational breadth is routinely framed as a management challenge. I want to argue the opposite: it is one of the most underutilised strategic assets in the industry.</p>
<h2>What Each Generation Brings</h2>
<p>Experienced professionals carry contextual knowledge that simply cannot be documented — they remember why certain decisions were made, what alternatives were considered, and what failed. Early-career professionals bring native fluency in digital tooling, comfort with ambiguity, and an instinct for collaboration that transcends organisational boundaries.</p>
<h2>Designing for Knowledge Flow</h2>
<p>The organisations that capture this value are not those that run 'reverse mentoring' programmes as a HR initiative. They are those that design work so that knowledge naturally flows between generations. Cross-functional project teams with deliberate generational mixing, structured retrospectives that surface tacit knowledge, and promotion criteria that reward teaching as highly as individual technical contribution.</p>`,
    },
    categories: [3],
    tags: [4, 5],
    _embedded: {
      author: [{ name: 'Ferenc Csulak' }],
      'wp:term': [
        [{ id: 3, name: 'Leadership', slug: 'leadership' }],
        [
          { id: 4, name: 'People', slug: 'people' },
          { id: 5, name: 'Culture', slug: 'culture' },
        ],
      ],
    },
  },
  {
    id: 4,
    slug: 'grid-resilience-lessons-from-the-field',
    date: '2025-01-18T08:00:00',
    modified: '2025-01-18T08:00:00',
    title: { rendered: 'Grid Resilience: Lessons from the Field' },
    excerpt: {
      rendered:
        '<p>Two decades of operational leadership across distribution network operators in Romania and Hungary have given me a front-row seat to the tensions between short-cycle reliability imperatives and long-cycle infrastructure investment. The most resilient grids I have worked with share a set of organisational characteristics that are instructive beyond the energy sector.</p>',
    },
    content: {
      rendered: `<p>Two decades of operational leadership across distribution network operators in Romania and Hungary have given me a front-row seat to the tensions between short-cycle reliability imperatives and long-cycle infrastructure investment. The most resilient grids I have worked with share a set of organisational characteristics that are instructive beyond the energy sector.</p>
<h2>Resilience Is Not Redundancy</h2>
<p>The naive engineering answer to resilience is redundancy: duplicate everything critical. This approach is expensive, often impractical at scale, and misses the deeper lesson. True resilience is not about having more assets; it is about having organisations that can sense disruption early, reconfigure rapidly, and absorb variance without cascading failure.</p>
<h2>Operational Excellence as a Foundation</h2>
<p>There is a mistaken belief in some transformation circles that operational excellence and strategic agility are in tension — that organisations must choose between running the current business reliably and building the future business. My experience is the opposite. Organisations with genuine operational discipline — where everyone understands their role, handoffs are clean, and deviations from standard trigger immediate investigation — are the same organisations that execute strategic change most reliably.</p>`,
    },
    categories: [1],
    tags: [1, 6],
    _embedded: {
      author: [{ name: 'Ferenc Csulak' }],
      'wp:term': [
        [{ id: 1, name: 'Energy Strategy', slug: 'energy-strategy' }],
        [
          { id: 1, name: 'Operations', slug: 'operations' },
          { id: 6, name: 'Infrastructure', slug: 'infrastructure' },
        ],
      ],
    },
  },
];

// ─── Fetcher ──────────────────────────────────────────────────────────────────

const WP_BASE = import.meta.env.PUBLIC_WP_API_URL?.replace(/\/$/, '');

export async function getPosts(perPage = 100): Promise<WPPost[]> {
  if (!WP_BASE) return MOCK_POSTS;

  try {
    const res = await fetch(
      `${WP_BASE}/wp-json/wp/v2/posts?_embed&per_page=${perPage}&status=publish`,
      { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) throw new Error(`WP API ${res.status}`);
    const posts: WPPost[] = await res.json();
    return posts.length > 0 ? posts : MOCK_POSTS;
  } catch (err) {
    console.warn('[wordpress.ts] Falling back to mock posts:', err);
    return MOCK_POSTS;
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!WP_BASE) {
    return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
  }

  try {
    const res = await fetch(
      `${WP_BASE}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`,
      { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) throw new Error(`WP API ${res.status}`);
    const posts: WPPost[] = await res.json();
    if (posts.length > 0) return posts[0];
    return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
  } catch (err) {
    console.warn('[wordpress.ts] Falling back to mock post:', err);
    return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name ?? 'Ferenc Csulak';
}

export function getFeaturedImage(post: WPPost): WPFeaturedMedia | null {
  return post._embedded?.['wp:featuredmedia']?.[0] ?? null;
}

export function getCategories(post: WPPost): string[] {
  return (post._embedded?.['wp:term']?.[0] ?? []).map((t) => t.name);
}

export function formatDate(dateStr: string, locale = 'en-GB'): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}
