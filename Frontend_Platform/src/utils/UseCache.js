import { useState } from "react";

function useCache() {
	async function getCache(cacheName, url) {
		const cacheStorage = await caches.open(cacheName);
		const cachedResponse = await cacheStorage.match(url);

		if (!cachedResponse || !cachedResponse.ok) {
			return false;
		}

		return await cachedResponse.json();
	}

	function clearCacheData() {
		caches.keys().then((names) => {
			names.forEach((name) => {
				caches.delete(name);
			});
		});
	}

	function putCache(data) {
		caches.open(Object.keys(data)[0]).then((cache) => {
			cache.put("data", new Response(JSON.stringify(data)));
		});
	}

	return { getCache, clearCacheData, putCache };
}

export default useCache;
