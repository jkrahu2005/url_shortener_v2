let isRefreshing = false;

let failedQueue = [];

export function processQueue(error = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
}

export function addToQueue() {
  return new Promise((resolve, reject) => {
    failedQueue.push({
      resolve,
      reject,
    });
  });
}

export function getRefreshing() {
  return isRefreshing;
}

export function setRefreshing(value) {
  isRefreshing = value;
}