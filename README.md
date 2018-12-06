# Cards Caching
The goal of the project is to build a cache of items on the front-end to achieve instant pagination.

## Total time taken to build the app
3 days

From Monday evening to Thursday evening.

## Prerequisite
Make sure you have `node` and `npm` installed.

## Supported platforms
Windows, Mac, Linux

## Running this project locally

### Use yarn
Under the project root directory

* Firstly run `yarn install`
* Then run `yarn start`

The project will start on port 8080.

### Use docker
Under the project root directory

* Firstly run `make build` (sudo permission required)
* Then run `make serve` (sudo permission required)

The project will start on port 8080.

## Available scripts

### `yarn lint`

Runs eslint on all the js files

### `yarn test`

Runs jest and enzyme tests.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `yarn build`

Builds the app for production to the `dist` folder.<br>

### `make build`

Builds the docker image

### `make serve`
Runs the docker image


## Cache and data fetching algorithm
Cache and data fetching algorithm are implemented in two differnt ways based on different assumptions.

I named them `forward-cache` and `history-cache`

* `forward-cache` is at `master` branch
* `history-cache` is at `history-cache` branch

### `forward-cache`
#### Assumptions
My assumption for this algorithm is that **Users are more likely to click the next page button, and are less likely to click the back page button**.

#### Caching algorithm

Based on the assumption below, we can easily draw a conslusion that users need more cache for pages in front of the current page (I named it `right-cache` or `forward-cache`) than the cache for pages that are behind of the current page (I named it `left-cache`).

The key thing of this algorithm is that to keep the size of `forward-cache` as big as possible.

Thus, my algorithm keeps the size of `forward-cache` is always bigger than the `threshold` (which in default is 2).

Whenever the algorithm finds out the `forward-cache` size is less or equal than the `threshold`, it will dispatch a action to load more data from the back-end.

In addition, this algorithm tends to load as much data as possible with a single request. Meanwhile, it will also remove same amount of data from the `left-cache`. As for how many pages we should fetch from the back-end within a single time, it will be discussed in the fetching algorithm. 

#### Fetching algorithm
My fetching algorithm tends to load multiple pages at a single time, and it only fetch the pages after the right-most page in the cache. Firstly, we need to find out the max page that we can fetch.

* Calculate the right most page in the cache.
* Calculate the size of the right-cache.
* we at most fetch ```(max-cache-size - size of the right-cache)``` pages, since we also need to keep the existing right-cache.
* we can't read this amount of page right away with a single request, since the back-end only accpets page and perPage parameter. (for example, you can't load only page 2 3 4 5 from the back-end with a single request.)
* so my algorithm runs a for loop (from max_amount to 1), to find out the biggest number that fulfills ```(rightmost page % this number === 0)```.
* this biggest number is the max amount of pages we can fetch.

Find it hard to understand? Don't worry. The next section will show some examples with the diagram.

##### Examples

![Example](https://github.com/mengnans/cards/blob/master/Forward-Caching-Explanation.png)

**Note that:**
* page 12 13 14 15 16 17 19 20 are in the cache
* page 18 is the current page

In this cases:

The right most page in the cahe is 20, and the size of the `forward-cache` is 2.

It will trigger the action to fetch more cache data since 2 <= `threshold`.

It at most fetch ```(8 - 2) = 6``` pages, since we still need these 2 pages in the `forward-cache`.

Then my algorithm runs a for loop (from 6 to 1), to find out the biggest number that fulfills ```(20 % this number === 0)```.

This biggest number is 5, so my algorithm will load 5 more pages (page 21 to page 25), and put them into the cache.

Also it will remove 5 leftmost cache items (page 12 to 16 will be removed).

Ohter examples are:
* right most page in cache = 24, size of the `forward-cache` is 2, it will load 6 pages, from page 25 to page 30.
* right most page in cache = 33, size of the `forward-cache` is 2, it will load 3 pages, from page 34 to page 36.
* right most page in cache = 24, size of the `forward-cache` is 5, it won't load more cache, since the size is bigger than the `threshold`.

### `history-cache`
#### Assumptions
Caching works because most streams of accesses exhibit two properties: terporal locality and spatial locality:
* Temporal locality says that if an item has been accessed lately, it is likely to be accessed again
soon.
* Spatial locality says that if an item has been accessed lately, other items near it (related to it
in some way) are also likely to be accessed again soon.

Based on these two properties of caching, I made a assumption that **The most recently accessed pages are more likely to be accessed again**. It is because that the most recently accessed pages not only have been accessed recently (Temporal locality), but also are close to the current page (Spatial locality).

#### Caching algorithm
Based on the above assumption, my cache saves eight most recently accessed page. 

Once the user triggers the pageChange action, the data of the current page will be put into the cache when it doesn't have it. In addition, the algorithm will try to read the data of the next page from cache first.

Once the size of the cache is higher than the max cache size, the algorithm will remove the lest recently accessed page data.

##### Examples
* In the cache we have pages 1 to 8, and our current page is 9. Once we move forward to the page 10, (page 10 will be fetched from the bac k-end), page 9 will be put into the cache, and page 1 will be deleted from the cache.

* In the cache we have pages 1 to 4, and 6 to 9, and our current page is 5. Once we move backward to page 4, firstly page 5 will be put into the cache, then the data of page 4 will be feched from the cahce.


#### Fetching algorithm
Fetching only one page (12 items in this case) at a time, and only fetch the data that is not in the cache.

## Data strcture
I used a page data object to save the data of each page, and it has following attrbutes:
* page: the number of the page.
* isLoading: whether this data is currently loading from back-end or not.
* isRecentlyReloaded: whether this data has been recently re-loaded or not, this flag is used to let the algorithm only read this data once every 15 seconds.
* attemptTimes: how many times we failed to fetch this data from back-end.
* data: the data for this page got from the back-end.

## Other features
### Offline reconnect feature
Once the fetch request is rejected, it will let the user know we are re-conencting. It will re-load the data once every 15 seconds.
