/* eslint-disable no-console */
'use strict';
const redis = require('redis');
const redisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

redis.debug_mode = false;
async function getFromRedis(client, key) {
  return new Promise((resolve, reject) => {
    client.get(key, (e, data) => {
      if (e) {
        reject(e);
      }
      resolve(data);
    });
  });
}

async function saveToRedis(client, key, data, expiryInSeconds) {
  return new Promise((resolve, reject) => {
    if (expiryInSeconds) {
      client.setex(key, expiryInSeconds, data, function (e) {
        if (e) reject(e);
        resolve('Saved');
      });
    } else {
      client.set(key, data, function (e) {
        if (e) reject(e);
        resolve('Saved');
      });
    }
  });
}

const setKeyValue = async (key, payload, expiryInSeconds=172800) => {
  const client = redis.createClient(redisOptions);
  try {
    console.info('Connected to Redis Server');
    const body =
      typeof payload === 'object' ? JSON.stringify(payload) : payload;
    console.info('Saving data for [', key, ']');
    await saveToRedis(client, key, body, expiryInSeconds);
  } catch (error) {
    console.log('Error: ', error);
  } finally {
    client.quit();
  }
};

const getKeyValue = async (key) => {
  const client = redis.createClient(redisOptions);
  try {
    console.info('Connected to Redis Server');
    console.log('getting id from redis', key);
    const data = await getFromRedis(client, key);
    try {
      return JSON.parse(data);
    } catch (err) {
      return data;
    }
  } catch (error) {
    console.log('Error', error);
  } finally {
    client.quit();
  }
};

module.exports = {
  setKeyValue,
  getKeyValue,
};
