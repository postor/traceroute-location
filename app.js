#!/usr/bin/env node
const argv = require('yargs').argv
const Traceroute = require('nodejs-traceroute')
const iplocation = require('iplocation')

const [domain] = argv._

if (!domain) {
  console.log('domain not exist! usage: traceroute-location www.google.com')
  process.exit()
}
try {
  const tracer = new Traceroute()
  tracer
    .on('hop', (hop) => {
      const hopArr = Object.keys(hop).map(x => hop[x])
      iplocation(hop.ip).then((location) => {
        const locationArr = [location.city, location.country]
        console.log(hopArr.concat(locationArr).join("\t"))
      }).catch(() => {
        console.log(hopArr.join("\t"))
      })
    })
  tracer.trace(domain)
} catch (e) {
  console.log('error! make sure you got traceroute/tracert installed, if still not working please check error detail', e)
}