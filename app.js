#!/usr/bin/env node
const argv = require('yargs').argv
const Traceroute = require('nodejs-traceroute')
const iplocation = require('iplocation')

const [domain] = argv._

if (!domain) {
  throw 'domain not exist! usage: traceroute-location www.google.com'
}

const tracer = new Traceroute()
tracer
  .on('hop', (hop) => {
    iplocation(hop.ip).then((location) => {
      const hopArr = Object.keys(hop).map(x => hop[x])
      const locationArr = [location.city, location.country]
      console.log(hopArr.concat(locationArr).join("\t"))
    })
  })
tracer.trace(domain)