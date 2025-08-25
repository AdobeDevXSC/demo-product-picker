/*
* <license header>
*/

/**
 * This is a sample action showcasing how to access an external API
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */


const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.info(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = ['productUrl']
    const requiredHeaders = []
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }
    // extract the user Bearer token from the Authorization header
    const token = getBearerToken(params)

    const { productUrl } = params;
    // replace this with the api you want to access
    const apiEndpoint = productUrl; //'https://main--demo-boilerplate--lamontacrook.hlx.page/misc/products.json?sheets=tory-burch'

    // fetch content from external api endpoint
    const res = await fetch(apiEndpoint)
    if (!res.ok) {
      throw new Error('request to ' + apiEndpoint + ' failed with status code ' + res.status)
    }
    const content = await res.json()

    let { columns, data } = content;

    columns = columns.map((col, index) => {
      let obj = {};
      if (col.indexOf('{') !== -1) {
        const o = col.substring(col.indexOf('{')+1, col.indexOf('}'));
        col = col.substring(0, col.indexOf('{')).trim();
        obj[o.split(':')[0]] = o.split(':')[1];
      }
    
      return {
        name: col,
        id: col.toLowerCase().replace(/\s+/g, '-'),
        width: obj.width || undefined
      }
    });

    data = data.map((item) => {
      const o = {};
      Object.keys(item).forEach((key) => {
        if(key.indexOf('{') !== -1) 
          o[key.substring(0, key.indexOf('{')).trim().toLocaleLowerCase()] = item[key];
        else
          o[key.toLowerCase().replace(/\s+/g, '-')] = item[key];
      })
      return o;
    });

    const response = {
      statusCode: 200,
      body: {columns, data}
    }

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main
