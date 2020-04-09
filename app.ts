#!/usr/bin/env node

import path from 'path'
import bodyParser from 'body-parser'
import { NextFunction, Request, Response } from "express"
import MockRepository from "./src/Mock/MockRepository"
import {Mock, print} from "./src/Mock/Mock";
const express = require('express')

const app = express()

const options = {
    debug: process.env.DEBUG || false,
    port: process.env.MOCKABLE_PORT || 3001,
    prefix: process.env.MOCKABLE_PREFIX || '/_mock',
}

app.use(bodyParser.json())

const repository = new MockRepository()

app.post(path.join(options.prefix, '/start'), (req: Request, res: Response) => {
    if(options.debug) {
        console.log('Start mocking server-side http requests...')
    }
    res.send('OK')
})

app.post(path.join(options.prefix, '/stop'), (req: Request, res: Response) => {
    if (options.debug) {
        if (repository.all().length > 0) {
            console.error('Stop mocking... There are stille active mocks: %j', repository.all().map((mock: Mock) => print(mock)))
        } else {
            console.info('Stop mocking... All mocks have been called. Good job!')
        }
    }
    repository.clear()
    res.send('Ok')
})

app.post(path.join(options.prefix, '/mocks'), (req: Request, res: Response) => {
    const mock = req.body
    if (options.debug) {
        console.log(`Mocking: ${print(mock)}`)
    }
    repository.add(mock)
    res.send('OK')
})

app.all('/*', (req: Request, res: Response) => {
    const mock = repository.pull(req.method, req.url)
    if(mock) {
        if (options.debug) {
            console.log('Mock Matching:', print(mock))
        }
        res.status(mock.status).json(mock.response)
    } else {
        if (options.debug) {
            console.log('No mock matching for:', req.method, req.url)
        }
        res.status(500).json({
            error: 'No mock found for this url'
        })
    }
})

app.listen(options.port, () => console.log(`Example app listening at http://localhost:${options.port}`))