/**
 * Module with methods to get gov resources pages and endpoints url.
 */

'use strict'

const wrapper = require('./wrapper')

/**
 * @param {Crawler} crawlerInstance Instance of crawler module.
 * @param {String} baseUrl Base gov url to crawle pages.
 * @returns {Object}
 */
const Crawler = (crawlerInstance, baseUrl) => ({
  /**
   * Get the page of resource. The resource page contains
   * details of resource like description, json url and aditional
   * informations.
   *
   * @async
   * @param {String} resource Resource name.
   * @returns {Promise<String>} Prome with resrouce page url.
   */
  async getResourcePage (resource) {
    const uri = this.mountDatasetUrl(resource)
    const res = await wrapper.fishUri(uri)
    // anchor with href that goes to the resource page.
    const href = res.$('span[data-format="geojson"]').parent().attr('href')
    const resourcePageUrl = this.mountResourcePageUrl(href)

    return resourcePageUrl
  },

  /**
   * Access the given resource page url and find the url
   * of the json endpoint.
   *
   * @async
   * @param {String} resourceUrl Url of resource page.
   * @returns {Promise<String>} JSON enpoint url.
   */
  async getResourceEndpoint (resourceUrl) {
    const res = await wrapper.fishUri(resourceUrl)
    const endpoint = res.$('.muted.ellipsis > a').attr('href')

    return endpoint
  },

  /**
   * Mount and returns the url of resource page by href of the anchor.
   *
   * @param {String} href Href attribute of the anchor that goes to the page.
   * @returns {String}
   */
  mountResourcePageUrl: href => `${baseUrl}${href}`,

  /**
   * Mount and returns the url of dataset resource.
   *
   * @param {String} name Name of resource.
   * @returns {String}
   */
  mountDatasetUrl: name => `${baseUrl}/dataset/${name}`
})

module.exports = Crawler
