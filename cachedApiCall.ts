import { clearTimeout } from "node:timers";

interface FetchApiOptions extends Omit<RequestInit, "body"> {
  queryParams?: Record<string, any>;
  timeout?: number;
  body?: any;
  responseType?: "json" | "text" | "blob" | "raw";
}

interface CacheEntry {
  data: any;
  expiration: number;
}

async function fetchApi(
  url: string,
  {
    method = "GET",
    responseType = "json",
    headers = {},
    body = null,
    timeout = 0,
    queryParams = {},
    ...otherOptions
  }: FetchApiOptions = {},
): Promise<any> {
  // Just fetching the queryParams here and adding it in the URL
  if (queryParams && Object.keys(queryParams).length > 0) {
    const params = new URLSearchParams(queryParams);
    url += (url.includes("?") ? "&" : "?") + params.toString();
  }

  //Creating AbortController for timeout support
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  if (timeout > 0) {
    timeoutId = setTimeout(() => controller.abort(), timeout);
  }

  // Handling request body
  let reqBody: BodyInit | null = body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    reqBody = JSON.stringify(body);

    headers = {
      ...headers,
      "Content-Type":
        (headers as Record<string, string>)["Content-Type"] ||
        "application/json",
    };
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
    body: reqBody,
    signal: controller.signal,
    ...otherOptions,
  };

  try {
    const response = await fetch(url, fetchOptions);

    // We need to clear any pending timeouts once we know that the API failed
    if (timeoutId) clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP error! ,${response.status}`);

    switch (responseType) {
      case "json":
        return await response.json();
      case "text":
        return await response.text();
      case "blob":
        return await response.blob();
      default:
        return response;
    }
  } catch (error) {
    // We need to clear any pending timeouts once we know the API failed
    if (timeoutId) clearTimeout(timeoutId);
    console.log("Error occurred", error);
  }
}

const cache = new Map<string, CacheEntry>();
export default function cachedApiCall(responseCacheTime: number) {
  return async function call(url: string, options: FetchApiOptions = {}) {
    const key = JSON.stringify({ url, options });
    const now = Date.now();
    if (cache.has(key)) {
      const entry = cache.get(key);
      if (cache.get(key)!.expiration > now) {
        console.log("Returning cached response", key);
        return entry?.data;
      } else {
        cache.delete(key);
      }
    }

    const data = await fetchApi(url, options);

    cache.set(key, { data, expiration: now + responseCacheTime });

    return data;
  };
}

async function main() {
  const callApi = cachedApiCall(5000); // Cache lifetime of 5000ms (5 seconds)

  try {
    const result1 = await callApi(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "GET",
        timeout: 5000,
        responseType: "json",
      },
    );
    console.log("First call result:", result1);
  } catch (error) {
    console.log("Error occured", error);
  }

  try {
    const result2 = await callApi(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "GET",
        timeout: 5000,
        responseType: "json",
      },
    );

    console.log("From cache", result2);
  } catch (error) {
    console.log("error occured", error);
  }
}

main();
