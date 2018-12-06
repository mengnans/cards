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
My assumption for this algorithm is that **Users are more likely to click next page button, and are less likely to click the back page button**.

#### Caching algorithm

Based on the assumption below, we can easily draw a conslusion that users need more cache for pages in front of the current page than the cache for pages (I named it `right-cache` or `forward-cache`) that are behind of the current page (I named it `left-cache`).

The key thing of this algorithm is that to keep the size of `forward-cache` as big as possible.

Thus, my algorithm keeps the size of `forward-cache` is always bigger than the `threshold` (which in default is 2).

Whenever the algorithm finds out the `forward-cache` size is less or equal than the `threshold`, it will dispatch a action to load more data from the back-end.

In addition, this algorithm tends to load as much data as possible with a single request. As for how many pages we fetch from the back-end within a single time, it will be discussed in the fetching algorithm.

#### Fetching algorithm
My fetching algorithm tends to load multiple pages at the same time, and it only fetch the pages after the right-most page in the cache. Firstly, we need to find out the max page that we can fetch.

* Calculate the right most page in the cache.
* Calculate the size of the right-cache.
* we at most fetch (max-cache-size - size of the right-cache) pages, since we also need to keep the right-cache.
* we can't read this amount of page right away, since the back-end only accpets page and perPage parameter.
* so my algorithm runs a for loop (from max_amount to 1), to find out the biggest number that fulfills (rightmost page % this number === 0).
* this biggest number is the max amount of pages we can fetch.

##### Examples
The right most page in the cahe is 14, and the size of the `forward-cache` is 2.

It will trigger the action to fetch more cache data since 2 <= `threshold`.

It at most fetch (8 - 2) = 6 pages, since we still need this 2 pages in the `forward-cache`.

Then my algorithm runs a for loop (from 6 to 1), to find out the biggest number that fulfills (14 % this number === 0).

This biggest number is 2, so my algorithm will load 2 more pages (page 15 and page 16), and put them into the cache.

If you find hard to understandg the above calculation, please have a look at the following examples to get some insights.

Ohter examples are:
* right most page = 24, size of the `forward-cache` is 2, it will load 6 pages, from page 25 to page 30.
* right most page = 33, size of the `forward-cache` is 1, it will load 3 pages, from page 34 to page 36.
* right most page = 24, size of the `forward-cache` is 5, it won't load more cache, since the size is bigger than the `threshold`.


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

### Common algorithm used by both implementations

