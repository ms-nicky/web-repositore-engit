__path = process.cwd();

require('../settings.js');
var express = require('express');
var axios = require('axios');
var fetch = require('node-fetch');
var request = require('request');
var fs = require('fs');
var router = express.Router();
var creator = global.creator
const {
    limitAdd,
    isLimit,
    cekKey,
    checkLimit
} = require('../MongoDB/function');

const scr = require('@bochilteam/scraper')
const {
    color,
    bgcolor
} = require(__path + '/lib/color.js');
const {
    fetchJson
} = require(__path + '/lib/fetcher.js')
const options = require(__path + '/lib/options.js');
const {
    getBuffer
} = require(__path + '/lib/functions.js');
const oxy = require(__path + '/lib/oxy.js');
const {
  ttdl: tiktokDL,
  igdl: instagramDL,
  fbdown: facebookDL,
  twitter: twitterDL,
  youtube: youtubeDL,
  aio: autoDL,
  mediafire: mediafireDL,
  capcut: capcutDL,
  gdrive: gdriveDL,
  pinterest: pinterestDL
} = require("btch-downloader");
const { googleImage } = require('@bochilteam/scraper-images');
const gis = require('g-i-s');
const RequestCounter = require('../MongoDB/requestModel');





router.get('/stats', async (req, res) => {
  try {
    let counter = await RequestCounter.findOne();
    res.json({ total: counter ? counter.total : 0 });
  } catch (e) {
    res.json({ total: 0 });
  }
});

router.get('/cekapikey', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    // Cari user berdasarkan apikey
    const user = await require('../MongoDB/schema').User.findOne({ apikey });
    if (!user) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    res.send({
        status: 200,
        apikey: apikey,
        limit: user.limit,
        role: user.role,
        username: user.username
    });
})
// Upload Post 
// cecan
router.get('/cecan/china', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    var data = ["https://i.postimg.cc/QdncScPQ/1.jpg", "https://i.postimg.cc/zv1CK5Q4/10.jpg", "https://i.postimg.cc/4x3zzW84/11.jpg", "https://i.postimg.cc/pXCfhwJ1/12.jpg", "https://i.postimg.cc/brHQRWcr/13.jpg", "https://i.postimg.cc/zX8wfzKg/14.jpg", "https://i.postimg.cc/QM91zHGR/15.jpg", "https://i.postimg.cc/43DVRsXn/16.jpg", "https://i.postimg.cc/nrkDmmBQ/17.jpg", "https://i.postimg.cc/CLhDgvpC/18.jpg", "https://i.postimg.cc/fT8dTxMG/19.jpg", "https://i.postimg.cc/RFwfMy0d/2.jpg", "https://i.postimg.cc/nrZmM2jJ/20.jpg", "https://i.postimg.cc/dVDy7L1L/21.jpg", "https://i.postimg.cc/kMF8z0zX/22.jpg", "https://i.postimg.cc/VkTbXmr4/23.jpg", "https://i.postimg.cc/3wv0BV2h/24.jpg", "https://i.postimg.cc/V6PrHgFC/25.jpg", "https://i.postimg.cc/MT0MkBsr/26.jpg", "https://i.postimg.cc/RhM3v0yC/27.jpg", "https://i.postimg.cc/D0BS0T3r/28.jpg", "https://i.postimg.cc/VsRrDj0J/29.jpg", "https://i.postimg.cc/TY3ySpnC/3.jpg", "https://i.postimg.cc/NfCywB4Y/30.jpg", "https://i.postimg.cc/3RZRfTRs/31.jpg", "https://i.postimg.cc/HnZLH9b3/4.jpg", "https://i.postimg.cc/rFsmj7LH/5.jpg", "https://i.postimg.cc/4N03Swfx/6.jpg", "https://i.postimg.cc/66YqdtFR/7.jpg", "https://i.postimg.cc/rwtpXWsC/8.jpg", "https://i.postimg.cc/wB8j6vsK/9.jpg"]
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitAdd(apikey);
})
router.get('/cecan/vietnam', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    var data = ["https://i.postimg.cc/QdncScPQ/1.jpg", "https://i.postimg.cc/zv1CK5Q4/10.jpg", "https://i.postimg.cc/4x3zzW84/11.jpg", "https://i.postimg.cc/pXCfhwJ1/12.jpg", "https://i.postimg.cc/brHQRWcr/13.jpg", "https://i.postimg.cc/zX8wfzKg/14.jpg", "https://i.postimg.cc/QM91zHGR/15.jpg", "https://i.postimg.cc/43DVRsXn/16.jpg", "https://i.postimg.cc/nrkDmmBQ/17.jpg", "https://i.postimg.cc/CLhDgvpC/18.jpg", "https://i.postimg.cc/fT8dTxMG/19.jpg", "https://i.postimg.cc/RFwfMy0d/2.jpg", "https://i.postimg.cc/nrZmM2jJ/20.jpg", "https://i.postimg.cc/dVDy7L1L/21.jpg", "https://i.postimg.cc/kMF8z0zX/22.jpg", "https://i.postimg.cc/VkTbXmr4/23.jpg", "https://i.postimg.cc/3wv0BV2h/24.jpg", "https://i.postimg.cc/V6PrHgFC/25.jpg", "https://i.postimg.cc/MT0MkBsr/26.jpg", "https://i.postimg.cc/RhM3v0yC/27.jpg", "https://i.postimg.cc/D0BS0T3r/28.jpg", "https://i.postimg.cc/VsRrDj0J/29.jpg", "https://i.postimg.cc/TY3ySpnC/3.jpg", "https://i.postimg.cc/NfCywB4Y/30.jpg", "https://i.postimg.cc/3RZRfTRs/31.jpg", "https://i.postimg.cc/HnZLH9b3/4.jpg", "https://i.postimg.cc/rFsmj7LH/5.jpg", "https://i.postimg.cc/4N03Swfx/6.jpg", "https://i.postimg.cc/66YqdtFR/7.jpg", "https://i.postimg.cc/rwtpXWsC/8.jpg", "https://i.postimg.cc/wB8j6vsK/9.jpg"]
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitAdd(apikey);
})
router.get('/cecan/thailand', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    var data = ["https://i.postimg.cc/PJtYFxrk/1.jpg", "https://i.postimg.cc/445zHzB4/10.jpg", "https://i.postimg.cc/RFTnfB1p/11.jpg", "https://i.postimg.cc/RZ3fY29q/12.jpg", "https://i.postimg.cc/jd3PZtpG/13.jpg", "https://i.postimg.cc/65qG7F8z/14.jpg", "https://i.postimg.cc/T3WL0mqD/15.jpg", "https://i.postimg.cc/6q54fmYW/16.jpg", "https://i.postimg.cc/rmgKs9cv/17.jpg", "https://i.postimg.cc/j2Ld50M7/18.jpg", "https://i.postimg.cc/YC12jxzb/19.jpg", "https://i.postimg.cc/MHMqw0G0/2.jpg", "https://i.postimg.cc/63Hpt5fK/20.jpg", "https://i.postimg.cc/zBLGDYtR/21.jpg", "https://i.postimg.cc/jdnSYTwV/3.jpg", "https://i.postimg.cc/HWykfH8q/4.jpg", "https://i.postimg.cc/fycZkzxk/5.jpg", "https://i.postimg.cc/MK0KpDDt/6.jpg", "https://i.postimg.cc/5NJbTzVz/7.jpg", "https://i.postimg.cc/QtWjGkCQ/8.jpg", "https://i.postimg.cc/C5TSFBnW/9.jpg"]
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitAdd(apikey);
})
router.get('/cecan/indonesia', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    var data = ["https://i.postimg.cc/sgYy39Yy/1.jpg", "https://i.postimg.cc/k5wmbJYp/10.jpg", "https://i.postimg.cc/XJJ0KRT7/11.jpg", "https://i.postimg.cc/PfCCT9Pj/12.jpg", "https://i.postimg.cc/GpbRt8KD/13.jpg", "https://i.postimg.cc/gkRr6hVt/14.jpg", "https://i.postimg.cc/rsRX3SVB/15.jpg", "https://i.postimg.cc/52S0sMkw/16.jpg", "https://i.postimg.cc/tTY4RnR5/17.jpg", "https://i.postimg.cc/4d7XRCw2/18.jpg", "https://i.postimg.cc/k55nwRSm/19.jpg", "https://i.postimg.cc/QCcsVp2p/2.jpg", "https://i.postimg.cc/zGz5XH0g/20.jpg", "https://i.postimg.cc/y8LKJ6br/21.jpg", "https://i.postimg.cc/WbjcXJRH/22.jpg", "https://i.postimg.cc/m2wfq2B2/23.jpg", "https://i.postimg.cc/MGghRnbt/24.jpg", "https://i.postimg.cc/1t6bKyvS/25.jpg", "https://i.postimg.cc/fyNp21P9/26.jpg", "https://i.postimg.cc/J05g9Pwd/27.jpg", "https://i.postimg.cc/m2TKQfCx/28.jpg", "https://i.postimg.cc/MKtN5Pmn/29.jpg", "https://i.postimg.cc/PxGRJBTR/3.jpg", "https://i.postimg.cc/cHQ5nXJ4/30.jpg", "https://i.postimg.cc/bY9BYCMm/31.jpg", "https://i.postimg.cc/QdH4bXMz/32.jpg", "https://i.postimg.cc/Rhgd78x9/33.jpg", "https://i.postimg.cc/sD2wjV52/34.jpg", "https://i.postimg.cc/pXV1mQMR/35.jpg", "https://i.postimg.cc/sfmTCBQ8/36.jpg", "https://i.postimg.cc/ZRcxmgR3/37.jpg", "https://i.postimg.cc/mkgNgwzn/38.jpg", "https://i.postimg.cc/pXyJNsth/4.jpg", "https://i.postimg.cc/13q0X4Xy/5.jpg", "https://i.postimg.cc/DZBLHXjP/7.jpg", "https://i.postimg.cc/RhYfVzz3/8.jpg", "https://i.postimg.cc/TYZmzG9F/9.jpg"]
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitAdd(apikey);
})
router.get('/cecan/korea', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    var data = ["https://i.postimg.cc/K87Z4CkB/p-19620motq1.jpg", "https://i.postimg.cc/wvgR7hjT/p-19623vybj1.jpg", "https://i.postimg.cc/QtJ5bfyT/p-19623z95r1.jpg", "https://i.postimg.cc/XJbddRQW/p-19624y1on1.jpg", "https://i.postimg.cc/dVG0rLX7/p-19625anrs1.jpg", "https://i.postimg.cc/9fWc91ZS/p-19625lzea1.jpg", "https://i.postimg.cc/SKWzSZqv/p-19626rftx1.jpg", "https://i.postimg.cc/hPjxLbbX/p-196298pkr1.jpg", "https://i.postimg.cc/hvGJ0cmk/p-1962alh5c1.jpg", "https://i.postimg.cc/ZqcKsXJ4/p-1962asjl31.jpg", "https://i.postimg.cc/pX6jqhqq/p-1962enqpe1.jpg", "https://i.postimg.cc/T1SPqmfb/p-1962gl6nf1.jpg", "https://i.postimg.cc/mZVC16Mx/p-1962koqm41.jpg", "https://i.postimg.cc/d3zqTYjm/p-1962pvq221.jpg", "https://i.postimg.cc/3xQ883R3/p-1962spcdo1.jpg", "https://i.postimg.cc/BbZFw2rw/p-1962u3qhb1.jpg", "https://i.postimg.cc/nVwMJ8BL/p-1962umwai1.jpg", "https://i.postimg.cc/76hDs6Bn/p-1962y8lij1.jpg", "https://i.postimg.cc/ydp6s9JG/p-1962yt9ph1.jpg"]
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitAdd(apikey);
})
router.get('/cecan/japan', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    var data = ["https://i.postimg.cc/RCcjLvF6/p-196252lk91.jpg", "https://i.postimg.cc/7hMdHncM/p-19625eppj1.jpg", "https://i.postimg.cc/CLpwwvZD/p-19629cg431.jpg", "https://i.postimg.cc/pVwLpWSm/p-19629eev81.jpg", "https://i.postimg.cc/ydxwTRD7/p-1962cau3w1.jpg", "https://i.postimg.cc/D0LFqGN8/p-1962ck87p1.jpg", "https://i.postimg.cc/76zjcknR/p-1962fyik51.jpg", "https://i.postimg.cc/bYtzcXvp/p-1962i85aq1.jpg", "https://i.postimg.cc/nLWtgTbX/p-1962nvj4g1.jpg", "https://i.postimg.cc/rFGMsSWH/p-1962o5sp41.jpg", "https://i.postimg.cc/wTgnWnyW/p-1962p9nlk1.jpg", "https://i.postimg.cc/T1XBv4k3/p-1962q7ura1.jpg", "https://i.postimg.cc/nz6pj20y/p-1962qiubc1.jpg", "https://i.postimg.cc/13CxVMzv/p-1962tt38s1.jpg", "https://i.postimg.cc/ZYBqbBwk/p-1962ufc7p1.jpg", "https://i.postimg.cc/52x1C6S2/p-1962vn5rc1.jpg", "https://i.postimg.cc/GpHWFY8d/p-1962vpyp71.jpg", "https://i.postimg.cc/tTc8vg6W/p-1962w2hyp1.jpg"]
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitAdd(apikey);
})
router.get('/cecan/malaysia', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    var data = ["https://i.postimg.cc/L8BFTfV1/p-1962mt0wq1.jpg", "https://i.postimg.cc/SKgF0h3Q/p-1962p3bmk1.jpg", "https://i.postimg.cc/25tYbYwc/p-1962pac7k1.jpg", "https://i.postimg.cc/fRXRhJfz/p-1962qpsvb1.jpg", "https://i.postimg.cc/Yq7Hmb6H/p-1962rcc7k1.jpg", "https://i.postimg.cc/G3QDZSh7/p-1962v04461.jpg", "https://i.postimg.cc/6QttJzQc/p-1962va89q1.jpg", "https://i.postimg.cc/t4HHWDFb/p-1962y8nl71.jpg", "https://i.postimg.cc/02VB2fZZ/p-1962y8oif1.jpg", "https://i.postimg.cc/CMqh8R9j/p-1962yyuuh1.jpg", "https://i.postimg.cc/Hn7f77xj/p-19622gld51.jpg", "https://i.postimg.cc/Hnpyrb39/p-196240q3o1.jpg", "https://i.postimg.cc/wMGj9Nrv/p-19624pvv61.jpg", "https://i.postimg.cc/hPXGpCJ7/p-19625n89w1.jpg", "https://i.postimg.cc/TwQPHFqn/p-19627bm3c1.jpg", "https://i.postimg.cc/zG08NKR1/p-1962c7n2o1.jpg", "https://i.postimg.cc/j2XkfQTx/p-1962caiz61.jpg", "https://i.postimg.cc/59TJNf06/p-1962csdwa1.jpg", "https://i.postimg.cc/6pwptBjC/p-1962d0xml1.jpg", "https://i.postimg.cc/PqyhtZpj/p-1962d4cuh1.jpg", "https://i.postimg.cc/DZYTGTPp/p-1962grit21.jpg", "https://i.postimg.cc/T1LXq4kd/p-1962zgkj21.jpg"]
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitAdd(apikey);
})

//downloader
router.get('/download/facebook', async (req, res, next) => {
    var apikey = req.query.apikey;
    var url = req.query.url;
    if (!apikey) return res.json(loghandler.noapikey);
    if (!url) return res.json({
        status: false,
        creator,
        message: "masukan parameter url"
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    try {
        const result = await facebookDL(url);
        if (!result.status) {
            return res.json({
                status: false,
                creator,
                result: {
                    developer: result.developer || '@prm2.0',
                    status: result.status,
                    message: result.message || 'Permintaan API gagal',
                    note: result.note || 'Silakan periksa dokumentasi di https://www.npmjs.com/package/btch-downloader'
                }
            });
        }
        res.json({
            status: true,
            creator,
            url_video: result.video || null
        });
        await limitAdd(apikey);
    } catch (err) {
        console.error('Facebook Downloader Error:', err);
        res.status(500).json({
            status: false,
            message: "Gagal download dari Facebook (btch-downloader error)",
            error: err.message || err
        });
    }
})
router.get('/download/instagram', async (req, res, next) => {
    var apikey = req.query.apikey
    var url = req.query.url
    if (!apikey) return res.json(loghandler.noapikey)
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter username"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });

    let iglu = await scr.instagramdl(url).catch(async _ => await scr.instagramdlv2(url)).catch(async _ => await scr.instagramdlv3(url)).catch(async _ => await scr.instagramdlv4(url))
    var result = iglu;
    res.json({
            result
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/download/pinterest', async (req, res, next) => {
    var apikey = req.query.apikey
    var url = req.query.q
    if (!apikey) return res.json(loghandler.noapikey)
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter q"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    scr.pinterest(url)
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
// Tiktok Apikey
router.get('/download/tiktok', async (req, res) => {
  try {
    const apikey = req.query.apikey;
    const url = req.query.url;
    if (!apikey) return res.json(loghandler.noapikey);
    if (!url) return res.json({ status: false, creator, message: "masukan parameter url" });

    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: false,
      message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
      result: "error"
    });

    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
      status: false,
      message: 'your limit has been exhausted, reset every 12 PM'
    });

    try {
      const result = await tiktokDL(url);

      if (!result.status) {
        return res.json({
          status: false,
          creator,
          result: {
            developer: result.developer || '@prm2.0',
            status: result.status,
            message: result.message || 'Permintaan API gagal',
            note: result.note || 'Silakan periksa dokumentasi di https://www.npmjs.com/package/btch-downloader'
          }
        });
      }

      // Deteksi apakah video atau slide
      let responseData = {
        title: result.title || '',
        description: result.description || '',
        url_audio: result.audio || result.music || null
      };

      if (result.slides && result.slides.length > 0) {
        // Slide
        responseData.type = "slide";
        responseData.slides = result.slides;
      } else {
        // Video
        responseData.type = "video";
        responseData.video_nowm = result.video_nowm || result.video || null;
      }

      res.json({
        status: true,
        creator,
        result: responseData
      });

      await limitAdd(apikey);

    } catch (err) {
      console.error('TikTok Downloader Error:', err);
      res.status(500).json({
        status: false,
        message: "Gagal download dari TikTok (btch-downloader error)",
        error: err.message || err
      });
    }

  } catch (e) {
    console.error(e);
    res.status(500).json(loghandler.error);
  }
});
router.get('/download/ytmp3', async (req, res) => {
    try {
        const apikey = req.query.apikey;
        let url = req.query.url;

        if (!apikey) return res.json(loghandler.noapikey);
        if (!url) return res.json({ status: false, creator, message: "masukan parameter url" });

        const check = await cekKey(apikey);
        if (!check) return res.status(403).json({
            status: false,
            message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`
        });

        const limit = await isLimit(apikey);
        if (limit) return res.status(403).json({
            status: false,
            message: 'your limit has been exhausted, reset every 12 PM'
        });

        // Gunakan btch-downloader
        const result = await youtubeDL(url, { type: "audio" }); // type "audio" untuk mp3

        if (!result.status) {
            return res.json({
                status: false,
                creator,
                result: {
                    developer: result.developer || '@prm2.0',
                    status: result.status,
                    message: result.message || 'Permintaan API gagal',
                    note: result.note || 'Silakan periksa dokumentasi di https://www.npmjs.com/package/btch-downloader'
                }
            });
        }

        await limitAdd(apikey);

        // Response standar
        res.json({
            status: true,
            code: 200,
            creator,
            data: {
                title: result.title || '',
                description: result.description || '',
                url: result.audio || result.music || null
            }
        });

    } catch (e) {
        console.error(e);
        res.status(500).json(loghandler.error);
    }
});

router.get('/download/ytmp4', async (req, res, next) => {
    var apikey = req.query.apikey
    var url = req.query.url
    if (!apikey) return res.json(loghandler.noapikey)
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    const {
        id,
        thumbnail,
        video: _video,
        title
    } = await scr.youtubedlv2(url)
    try {
        for (let i in _video) {
            video = _video[i]
            let kin = await video.download()
            res.json({
                id: id,
                thumbnail: thumbnail,
                title: title,
                size: video.fileSize,
                download: kin
            })
        }
    } catch {
        console.log(e);
        res.json(loghandler.error)
    }
    limitAdd(apikey);
});
router.get('/download/mediafire', async (req, res) => {
    try {
        const apikey = req.query.apikey;
        let url = req.query.url;

        if (!apikey) return res.json(loghandler.noapikey);
        if (!url) return res.json({ status: false, creator, message: "masukan parameter url" });

        const check = await cekKey(apikey);
        if (!check) return res.status(403).json({ status: false, message: `apikey ${apikey} not found` });

        const limit = await isLimit(apikey);
        if (limit) return res.status(403).json({ status: false, message: 'your limit has been exhausted' });

        const result = await mediafireDL(url);

        if (!result.status) {
            return res.json({
                status: false,
                creator,
                result: {
                    developer: result.developer || '@prm2.0',
                    status: result.status,
                    message: result.message || 'Permintaan API gagal',
                    note: result.note || 'Silakan periksa dokumentasi btch-downloader'
                }
            });
        }

        await limitAdd(apikey);

        res.json({
            status: true,
            code: 200,
            data: {
                title: result.title || '',
                size: result.size || '',
                url: result.download || result.url || result.file || null
            }
        });

    } catch (e) {
        console.error('MediaFire Downloader Error:', e);
        res.status(500).json(loghandler.error);
    }
});


// news
router.get('/news/cnn', async (req, res, next) => {
    var apikey = req.query.apikey
    var url = req.query.type
    if (!apikey) return res.json(loghandler.noapikey)
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter type"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/cnn-news`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/news/cnbc', async (req, res, next) => {
    var apikey = req.query.apikey
    var url = req.query.type
    if (!apikey) return res.json(loghandler.noapikey)
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter type"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/cnbc-news`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/news/republika', async (req, res, next) => {
    var apikey = req.query.apikey
    var url = req.query.type
    if (!apikey) return res.json(loghandler.noapikey)
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter type"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/republika-news`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/news/tempo', async (req, res, next) => {
    var apikey = req.query.apikey
    var url = req.query.type
    if (!apikey) return res.json(loghandler.noapikey)
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter type"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/tempo-news/${url}`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                author: creator,
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/news/antara', async (req, res, next) => {
    var apikey = req.query.apikey
    var url = req.query.type
    if (!apikey) return res.json(loghandler.noapikey)
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter type"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/antara-news/${url}`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                author: creator,
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/news/kumparan', async (req, res, next) => {
    var apikey = req.query.apikey
    var url = req.query.type
    if (!apikey) return res.json(loghandler.noapikey)
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter type"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://news-api-zhirrr.vercel.app/v1/kumparan-news`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                author: creator,
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})

//photooxy
router.get('/photooxy/flaming', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.text
    if (!apikey) return res.json(loghandler.noapikey)
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter text"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    oxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text])
        .then((data) => {
            res.set({
                'Content-Type': 'image/png'
            })
            res.send(data)
        })
        .catch((err) => {
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/photooxy/shadow-sky', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.text
    if (!apikey) return res.json(loghandler.noapikey)
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter text"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    oxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text])
        .then((data) => {
            res.set({
                'Content-Type': 'image/png'
            })
            res.send(data)
        })
        .catch((err) => {
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/photooxy/metallic', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.text
    if (!apikey) return res.json(loghandler.noapikey)
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter text"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    oxy("https://photooxy.com/other-design/create-metallic-text-glow-online-188.html", [text])
        .then((data) => {
            res.set({
                'Content-Type': 'image/png'
            })
            res.send(data)
        })
        .catch((err) => {
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/photooxy/naruto', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.text
    if (!apikey) return res.json(loghandler.noapikey)
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter text"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    oxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text])
        .then((data) => {
            res.set({
                'Content-Type': 'image/png'
            })
            res.send(data)
        })
        .catch((err) => {
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/photooxy/pubg-mobile', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.text
    var text2 = req.query.text2
    if (!apikey) return res.json(loghandler.noapikey)
    if (!text || !text2) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter text & text2"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    oxy("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text, text2])
        .then((data) => {
            res.set({
                'Content-Type': 'image/png'
            })
            res.send(data)
        })
        .catch((err) => {
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})

// search api
router.get('/search/google-image', async (req, res) => {
    try {
        const apikey = req.query.apikey;
        const text = req.query.query;

        if (!apikey) return res.json(loghandler.noapikey);
        if (!text) return res.json({
            status: false,
            creator,
            message: "masukan parameter query"
        });

        const check = await cekKey(apikey);
        if (!check) return res.status(403).json({
            status: false,
            message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`
        });

        const limit = await isLimit(apikey);
        if (limit) return res.status(403).json({
            status: false,
            message: 'your limit has been exhausted, reset every 12 PM'
        });

        // 🔥 pakai g-i-s (bisa jalan)
        gis(text, async (error, results) => {
            if (error) {
                console.error("Google Image Error:", error);
                return res.status(500).json({
                    status: false,
                    message: "Gagal mengambil data dari Google Image",
                    error: error.message || error
                });
            }

            if (!results || results.length === 0) {
                return res.json({
                    status: false,
                    message: "Tidak ada gambar ditemukan"
                });
            }

            await limitAdd(apikey);

            res.json({
                status: true,
                code: 200,
                data: results.map(r => ({
                    url: r.url,
                    width: r.width,
                    height: r.height,
                    thumbnail: r.thumbUrl || null
                }))
            });
        });

    } catch (e) {
        console.error("Google Image Error:", e);
        res.status(500).json({
            status: false,
            message: "Terjadi kesalahan pada server",
            error: e.message || e
        });
    }
});
const { AnimeWallpaper } = require("anime-wallpaper");
const wallpaperClient = new AnimeWallpaper();

router.get('/search/wallpaper', async (req, res) => {
  try {
    const apikey = req.query.apikey;

    if (!apikey) return res.json(loghandler.noapikey);

    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
      status: 403,
      message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
      result: "error"
    });

    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
      status: 403,
      message: 'your limit has been exhausted, reset every 12 PM'
    });

    // 🔗 ambil random wallpaper
    const wallpapers = await wallpaperClient.random({ resolution: "1920x1080" });
    if (!wallpapers || wallpapers.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Wallpaper tidak ditemukan"
      });
    }

    const selected = wallpapers[0];
    const imageUrl = selected.image || selected.url;

    // 📥 ambil file gambar dari url
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // 🖼️ kirim balik langsung sebagai image
    res.set("Content-Type", "image/jpeg");
    res.send(response.data);

    // 📉 kurangi limit
    await limitAdd(apikey);

  } catch (e) {
    console.error(e);
    res.status(500).json(loghandler.error);
  }
});
router.get('/search/pinterest', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.query
    if (!apikey) return res.json(loghandler.noapikey)
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter query"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    scr.pinterest(text)
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})

//nsfw
router.get('/nsfw/ass', async (req, res, next) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/nsfw/ass.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database ass.' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database ass tidak valid.' });
        }
    });
})
router.get('/nsfw/ahegao', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({

        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/ahegao.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            var result = data[Math.floor(Math.random() * data.length)];
            var requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
        })
    limitAdd(apikey);
})
router.get('/nsfw/bdsm', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/bdsm.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            var result = data[Math.floor(Math.random() * data.length)];
            var requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
        })
    limitAdd(apikey);
})
router.get('/nsfw/blowjob', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/blowjob.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            var result = data[Math.floor(Math.random() * data.length)];
            var requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
        })
    limitAdd(apikey);
})
router.get('/nsfw/cuckold', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/danzzcoding/data-danzzapi.xyz/main/nsfw/cuckold.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            var result = data[Math.floor(Math.random() * data.length)];
            var requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
        })
    limitAdd(apikey);
})
// random image
router.get('/random/cosplay', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/image/cosplay.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database cosplay' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database cosplay tidak valid.' });
        }
    })
})
router.get('/random/kucing', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/image/cat.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database kucing' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database kucing tidak valid.' });
        }
    })
})
router.get('/random/ryujin', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/image/ryujin.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database sponsbob' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database sponsbob tidak valid.' });
        }
    })
})
router.get('/stiker/meme-wa', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/random-stiker/meme.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database meme' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database meme tidak valid.' });
        }
    })
})
router.get('/stiker/sponsbob', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/random-stiker/sponsbob-meme.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database ryujin' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database ryujin tidak valid.' });
        }
    })
})
router.get('/random/pubg', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/image/pubg.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database pubg' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database pubg tidak valid.' });
        }
    })
})
router.get('/random/profile', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/image/profile.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database profile' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database profile tidak valid.' });
        }
    })
})
router.get('/random/wallml', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/image/wallml.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database wallml' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database waml tidak valid.' });
        }
    })
})
router.get('/random/car', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/image/car.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database car' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database mobil tidak valid.' });
        }
    })
})
//anime
router.get('/anime/waifu', async (req, res, next) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/waifu.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database waifu.' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database waifu tidak valid.' });
        }
    });
})
router.get('/anime/loli', async (req, res, next) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/loli.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database waifu.' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database waifu tidak valid.' });
        }
    })
})
router.get('/anime/neko', async (req, res, next) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/neko.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database waifu.' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database waifu tidak valid.' });
        }
    })
})
router.get('/anime/husbu', async (req, res, next) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/husbu.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database waifu.' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database waifu tidak valid.' });
        }
    })
})
router.get('/anime/shota', async (req, res, next) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/shota.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database waifu.' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database waifu tidak valid.' });
        }
    })
})
router.get('/anime/anime', async (req, res, next) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/anime.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database anime.' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database anime tidak valid.' });
        }
    })
})
router.get('/anime/wallpaper-anime', async (req, res, next) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/wallpaper.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database waifu.' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database waifu tidak valid.' });
        }
    })
})
router.get('/anime/elaina', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/elaina.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database Elaina' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database Elaina tidak valid.' });
        }
    })
})
router.get('/anime/ba', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/blue-archive.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database Blue Archive' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database Blue Archive tidak valid.' });
        }
    })
})
router.get('/anime/pp-anime', async (req, res, next
) => {
    var apikey = req.query.apikey;
    if (!apikey) {
        // Jika belum ada apikey, suruh login dulu
        return res.status(401).json({
            status: 401,
            message: `Silakan login terlebih dahulu untuk mendapatkan apikey!`,
            login_url: `https://${req.hostname}/users/login`
        });
    }
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar dulu! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'Limit anda sudah habis, reset setiap jam 12 siang.'
    });
    fs.readFile(__path + '/database/anime/pp-anime.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Gagal membaca database pp anime' });
        }
        try {
            const waifus = JSON.parse(data);
            const result = waifus[Math.floor(Math.random() * waifus.length)];
            const requestSettings = {
                url: result.url,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            });
            limitAdd(apikey);
        } catch (e) {
            return res.status(500).json({ status: false, message: 'Database pp anime tidak valid.' });
        }
    })
})
// islamic
router.get('/islam/tahlil', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/dataTahlil.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/wirid', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/dataWirid.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                               result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/ayatkursi', async (req, res, next) => {
    var apikey = req.query.apikey

    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/dataAyatKursi.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/doaharian', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/dataDoaHarian.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/bacaanshalat', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/dataBacaanShalat.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/niatshalat', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/dataNiatShalat.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/kisahnabi', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/dataKisahNabi.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/asmaulhusna', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/dataAsmaulHusna.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/niatsubuh', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/NiatShubuh.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/niatzuhur', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/NiatDzuhur.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/niatmagrib', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/NiatMaghrib.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/niatisya', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/main/data/NiatIsya.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/islam/niatashar', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://raw.githubusercontent.com/zeeoneofficial/My-SQL-Results/master/data/NiatAshar.json`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})

//game
router.get('/game/tebakgambar', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.page
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    scr.tebakgambar()
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})

// other
router.get('/other/github-stalk', async (req, res) => {
    try {
        const apikey = req.query.apikey;
        const username = req.query.username;

        // Cek apikey
        if (!apikey) return res.json(loghandler.noapikey);
        if (!username) return res.json({
            status: false,
            creator,
            message: "masukan parameter username"
        });

        // Cek validasi key
        const check = await cekKey(apikey);
        if (!check) return res.status(403).json({
            status: false,
            message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`
        });

        // Cek limit
        const limit = await isLimit(apikey);
        if (limit) return res.status(403).json({
            status: false,
            message: 'your limit has been exhausted, reset every 12 PM'
        });

        // Panggil langsung GitHub API resmi
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            return res.status(response.status).json({
                status: false,
                message: `GitHub API error: ${response.statusText}`
            });
        }
        const data = await response.json();

        // Tambah limit
        await limitAdd(apikey);

        // Format response standar
        res.json({
            status: true,
            creator,
            result: {
                username: data.login,
                nickname: data.name || null,
                bio: data.bio || null,
                id: data.id,
                nodeId: data.node_id,
                profile_pic: data.avatar_url,
                url: data.html_url,
                type: data.type,
                admin: data.site_admin,
                company: data.company || null,
                blog: data.blog || "",
                location: data.location || null,
                email: data.email || null,
                public_repo: data.public_repos,
                public_gists: data.public_gists,
                followers: data.followers,
                following: data.following,
                created_at: data.created_at,
                updated_at: data.updated_at
            }
        });

    } catch (e) {
        console.error('GitHub Stalk Error:', e);
        res.status(500).json(loghandler.error);
    }
});
router.get('/other/hilih', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.kata
    if (!apikey) return res.json(loghandler.noapikey)
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter kata"
    })
    fetch(encodeURI(`https://hilih-api-zhirrr.vercel.app/api/hilih?kata=${text}`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/other/kodepos', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.kota
    if (!apikey) return res.json(loghandler.noapikey)
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter kota"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://kodepos-api-zhirrr.vercel.app/?q=${text}`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/other/covid-world', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.kata
    if (!apikey) return res.json(loghandler.noapikey)
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter kata"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://covid19-api-zhirrr.vercel.app/api/world`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})
router.get('/other/kbbi', async (req, res, next) => {
    var apikey = req.query.apikey
    var text = req.query.kata
    if (!apikey) return res.json(loghandler.noapikey)
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "masukan parameter kata"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first! https://${req.hostname}/users/signup`,
        result: "error"
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({
        status: 403,
        message: 'your limit has been exhausted, reset every 12 PM'
    });
    fetch(encodeURI(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${text}`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    limitAdd(apikey);
})

module.exports = router