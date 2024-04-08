> ### Overview
> - This orphan branch is created just to test Next.js `fetch()` function with `POST` or `PUT` method on Vercel deployment.
> - Getting "`RequestContentLengthMismatchError`" error logged at Vercel while hitting the `fetch()`.
> - Still trying to find the root problem. Not figuring out yet.



# About This Repo
- This is a simple Excel-like Next.js app. You can add, modify and delete rows of data in a table.
- Frontend is sending `GET`, `PUT`, `DELETE`, and `PATCH` to load existing data, add new row, delete a row, and modify a cell.
- Backend is made of two `route.js` api model.

> Current branch is an orphan branch that only used to run a `fetch()` to `PUT` (`POST`) a test data to the API.

# Problem Discription

### Works on localhost but not on Vercel
I was working on branch [orphan-hanja](https://github.com/ThisoeCode/IT-vocab-EN_KR_CN_JP/tree/orphan-hanja).
After done building (`npm run build`) and testing on `localhost:3000`, I actually ran and used it on localhost for several days before deploying on Vercel. Everything worked perfectly fine.

_**Then I deployed the branch with Vercel. `GET`, `DELETE`, and `PATCH` worked fine, but not for `PUT`.**_ I got `RequestContentLengthMismatchError` error with a code `UND_ERR_REQ_CONTENT_LENGTH_MISMATCH` in the [error log](#error-log-from-vercel).

I thought the problem might be the `PUT` method, so I changed the fetch and API from `PUT` to `POST` (see [commit `ea9916e`](https://github.com/ThisoeCode/IT-vocab-EN_KR_CN_JP/commit/ea9916ec18525618bb0518eefcdcd1d484f7caff)). The same exact error popped up: `RequestContentLengthMismatchError`.

Here is the full error message trace stack.

### Error-log from Vercel
```markdown
TypeError: fetch failed
    at node:internal/deps/undici/undici:12345:11
    at async globalThis.fetch (/var/task/.next/server/chunks/638.js:1:36419)
    at async s (/var/task/.next/server/app/page.js:18:1991)
    at async /var/task/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:16:406
    at async rm (/var/task/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:15:6342)
    at async rq (/var/task/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:18:1249)
    at async Y (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:25461)
    at async Q.responseCache.get.routeKind (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:1025)
    at async r2.renderToResponseWithComponentsImpl (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:507)
    at async r2.renderPageComponent (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:4784) {
  cause: RequestContentLengthMismatchError: Request body length does not match content-length header
      at AsyncWriter.end (node:internal/deps/undici/undici:9742:19)
      at writeIterable (node:internal/deps/undici/undici:9646:16)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
    code: 'UND_ERR_REQ_CONTENT_LENGTH_MISMATCH'
  }
}
```

### Test guide
1. Pull this branch and [`orphan-hanja`](https://github.com/ThisoeCode/IT-vocab-EN_KR_CN_JP/tree/orphan-hanja) branch;
2. Make sure to have an Atlas database Cluster, then fill out the `.env.FILLME` and rename it to `.env.local`;
3. Run command `npm i`, `npm build`, `npm start`;
4. Push and deploy on Vercel;
5. Getting the error.

- To check out the `PUT`ting result, build and run branch [`orphan-hanja`](https://github.com/ThisoeCode/IT-vocab-EN_KR_CN_JP/tree/orphan-hanja) (or visit [hanja.thisoe.dev](https://hanja.thisoe.dev/) using my Atlas database). There will be a line added at the top that says **TEST FROM \`vercel-put-test\`** with the UUID generated on each success fetch.


### Exclusions

- `PUT` method?
> I also tried `POST` as replacement of `PUT` (see [commit `ea9916e`](https://github.com/ThisoeCode/IT-vocab-EN_KR_CN_JP/commit/ea9916ec18525618bb0518eefcdcd1d484f7caff)).

- `201` status code?
> I tried `200` or leaving out status option (see [commit `5a84503`](https://github.com/ThisoeCode/IT-vocab-EN_KR_CN_JP/commit/5a84503150139586abf5a4a1cd64c9bf16c82033)).