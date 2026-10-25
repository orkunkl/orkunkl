/**
 * The facts that appear on more than one surface.
 *
 * The bio used to be written out separately on the Home page, the About page and
 * both llms endpoints. Editing one and forgetting the rest produced no error —
 * just a site that quietly disagreed with itself, which is exactly what happened
 * when the Spanda sentence was removed and the README was missed.
 *
 * Anything that appears in more than one place belongs here, so a change has
 * exactly one home and divergence is not possible.
 */

export const site = {
  name: 'Orkun Külçe',
  tagline: 'a builder, mover, and thinkerer',

  /**
   * The lead paragraph, one entry per line. Home and About join them with a
   * line break; the llms endpoints emit one blockquote line each. Add or
   * remove a line here and every surface follows.
   */
  lead: [
    "I'm a blockchain technologist and metamodern mystic. Most of my work has been in " +
      'the Cosmos ecosystem — smart contracts in Rust, including StreamSwap on Osmosis, ' +
      'and developer relations for CosmWasm.',
    'I serve a solarpunk future.',
    "I'm interested in regeneration and refi.",
  ],

  practice: 'I practice yoga, flow arts and movement.',
} as const;
