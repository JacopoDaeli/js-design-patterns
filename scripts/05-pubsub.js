// 05 - PubSub Pattern

// Whilst the Observer pattern is useful to be aware of, quite often
// in the JavaScript world, we'll find it commonly implemented using
// a variation known as the Publish/Subscribe pattern. Whilst very
// similar, there are differences between these patterns worth noting.

// The Observer pattern requires that the observer (or object) wishing to
// receive topic notifications must subscribe this interest to the object
// firing the event (the subject).

// The Publish/Subscribe pattern however uses a topic/event channel which
// sits between the objects wishing to receive notifications (subscribers)
// and the object firing the event (the publisher). This event system allows
// code to define application specific events which can pass custom arguments
// containing values needed by the subscriber. The idea here is to avoid
// dependencies between the subscriber and publisher.

class PubSub {
  constructor () {
    this._topics = {}
    this._subUid = -1
  }

  publish (topic, args) {
    if (!this._topics[topic]) {
      return false
    }

    const subscribers = this._topics[topic]
    const len = subscribers.length

    let i = -1
    while (++i < len) {
      subscribers[i].func(topic, args)
    }

    return true
  }

  subscribe (topic, func) {
    if (!this._topics[topic]) {
      this._topics[topic] = []
    }
    const token = (++this._subUid).toString()
    this._topics[topic].push({token, func})
    return token
  }

  unsubscribe (token) {
    for (let m in this._topics) {
      if (this._topics[m]) {
        const nSubscribers = this._topics[m].length
        for (let i = 0; i < nSubscribers; i++) {
          if (this._topics[m][i].token === token) {
            if (this._topics[m].length > 1) {
              this._topics[m].splice(i, 1)
            } else {
              delete this._topics[m]
            }
            return true
          }
        }
      }
    }
    return false
  }
}

// Usage:

// Create a pubsub object
const pubsub = new PubSub()

// Render a preview of new messages
const sub1 = pubsub.subscribe('some topic', (topic, data) => {
  console.log(`New message received on topic ${topic}: ${data}`)
})

// Here's another subscriber using the same data to perform
// a different task.
const sub2 = pubsub.subscribe('some topic', (topic, data) => {
  console.log('This is subscriber 2 speaking...')
})

pubsub.publish('some topic', 'HELLO WORLD')

// Unsubscribe our subscribers from receiving any
// new topic notifications as follows:
pubsub.unsubscribe(sub1)
pubsub.unsubscribe(sub2)

pubsub.publish('some topic', 'HELLO WORLD 2')
pubsub.publish('some topic 2', 'whatever')
