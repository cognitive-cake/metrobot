"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
class HttpsPromised {
    get(queryUrl) {
        return new Promise((resolve, reject) => {
            https.get(queryUrl, (res) => {
                const error = this.handleHttpError(res);
                if (error) {
                    reject(error.message);
                    // consume response data to free up memory
                    res.resume();
                    return;
                }
                this.handleServerResponse(res, resolve, reject);
            }).on('error', (e) => {
                reject(new Error(`Http connection error: ${e.message}`));
            });
        });
    }
    handleHttpError(response) {
        const { statusCode } = response;
        const contentType = response.headers['content-type'];
        let error;
        if (statusCode !== 200) {
            error = new Error(`Request Failed. \nStatus Code: ${statusCode}`);
        }
        else if (!/^application\/json/.test(contentType)) {
            error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
        }
        return error;
    }
    handleServerResponse(response, resolve, reject) {
        response.setEncoding('utf8');
        let rawData = '';
        response
            .on('data', (chunk) => { rawData += chunk; })
            .on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                resolve(parsedData);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
const httpsPromised = new HttpsPromised();
exports.default = httpsPromised;