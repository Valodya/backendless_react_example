const ACTIVE_ITEMS_LIMIT = 1

const chr8 = () => Math.random().toString(16).slice(-8)

const AlertsManager = {

  handler: null,

  allItems   : [],
  activeItems: [],

  add({ message, timeout }) {
    const item = {
      _id    : `${chr8()}-${chr8()}`,
      timeout: timeout || 5 * 1000,
      message,
    }

    this.update([...this.allItems, item])

    return item
  },

  remove(alertId) {
    this.update(this.allItems.filter(item => item._id !== alertId))
  },

  update(allItems) {
    this.allItems = allItems
    this.activeItems = allItems.slice(0, ACTIVE_ITEMS_LIMIT)

    if (this.handler) {
      this.handler(this.activeItems)
    }
  },

  subscribe(handler) {
    this.handler = handler
    this.handler(this.activeItems)
  },

}

export default AlertsManager
