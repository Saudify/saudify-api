'use strict'

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
    return new Promise((resolve, reject) => {
      crawlerInstance.queue({
        uri: this.mountDatasetUrl(resource),
        callback: (err, res, done) => {
          if (err) {
            reject(err)
          } else {
            const { $ } = res
            // anchor with href that goes to the resource page.
            const href = $('span[data-format="geojson"]').parent().attr('href')
            const resourcePageUrl = this.mountResourcePageUrl(href)

            resolve(resourcePageUrl)
          }

          done()
        }
      })
    })
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
