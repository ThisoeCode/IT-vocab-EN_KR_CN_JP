> ### Brief Overview
> - This orphan branch is created just to test Next.js `fetch()` function with `{method: "PUT"}` on Vercel deployment.
> - Getting "`RequestContentLengthMismatchError`" error while hitting the PUT fetch function.
> - Still trying to find the root problem. Not figuring out yet.

> ### My knowledge status _(and TODOs)_
> - Not thoroughly understanding differences between every HTTP request. _**Have to learn more about `PUT` request.**_


# Problem Discription
### About this repo
- This is a simple MS-Excel-like Next.js app. You can add, modify and delete rows of data in a table.
- Frontend is sending `GET`, `PUT`, `DELETE`, and `PATCH` to load existing data, add new row, delete a row, and modify a cell.
- Backend is made of two `route.js` api model.

### Works on localhost but not on Vercel
I was working on branch [orphan-hanja](https://github.com/ThisoeCode/IT-vocab-EN_KR_CN_JP/tree/orphan-hanja).
After done building (`npm run build`) and testing on `localhost:3000`. I actually used it running on localhost for several days before I think of deploying it on Vercel, everything worked perfectly fine.

Then, I deployed the branch with Vercel. `GET`, `DELETE`, and `PATCH` worked fine, but not for `PUT`.

### Vercel log info
Adding a row (using fetch)


To see the result of `PUT`ting, use branch [`orphan-hanja`](https://github.com/ThisoeCode/IT-vocab-EN_KR_CN_JP/tree/orphan-hanja) (at [hanja.thisoe.dev](https://hanja.thisoe.dev/)).