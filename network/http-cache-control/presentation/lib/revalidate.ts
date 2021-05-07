export function revalidate(req: any, res: any) {
    res.headers.set('etag', etagFn(req.body));
    const reqHeaders = {
        'if-modified-since': req.headers.get('if-modified-since'),
        'if-none-match': req.headers.get('if-none-match')
    };
    const resHeaders = {
        'last-modified': res.headers.get('last-modified'),
        'etag': res.headers.get('etag')
    };
    if (isFresh(reqHeaders, resHeaders)) {
      res.status = 304;
      res.body = '';
    }
}

function isFresh(reqHeaders: any, resHeaders: any) {
  const CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/
  // fields
  const modifiedSince = reqHeaders['if-modified-since']
  const noneMatch = reqHeaders['if-none-match']

  // unconditional request
  if (!modifiedSince && !noneMatch) {
    return false
  }

  // Always return stale when Cache-Control: no-cache
  // to support end-to-end reload requests
  // https://tools.ietf.org/html/rfc2616#section-14.9.4
  const cacheControl = reqHeaders['cache-control']
  if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)) {
    return false
  }

  // if-none-match
  if (noneMatch && noneMatch !== '*') {
    const etag = resHeaders['etag']

    if (!etag && etag !== noneMatch) {
      return false
    }
  }

  // if-modified-since
  if (modifiedSince) {
    const lastModified = resHeaders['last-modified']
    const modifiedStale = !lastModified || !(parseHttpDate(lastModified) <= parseHttpDate(modifiedSince))

    if (modifiedStale) {
      return false
    }
  }

  return true
}

function parseHttpDate (date: any) {
  const timestamp = date && Date.parse(date)

  // istanbul ignore next: guard against date.js Date.parse patching
  return typeof timestamp === 'number'
      ? timestamp
      : NaN
}

function etagFn(body: any) {
  // TODO
  return `W/'rQYfuZO00e3jjS2qbbzpow'`
}
