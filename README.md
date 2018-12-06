
## Running this project locally

### Use yarn
Under the project root directory

* Firstly run `yarn install`
* Then run `yarn start`

The project will start on port 8080.

### Use docker
Under the project root directory

* Firstly run `make build` (need sudo permission)
* Then run `make serve` (need sudo permission)

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
Users are more likely to read 

### `history-cache`
#### Assumptions
Caching works because most streams of accesses exhibit two properties: terporal locality and spatial locality:
* Temporal locality says that if an item has been accessed lately, it is likely to be accessed again
soon.
* Spatial locality says that if an item has been accessed lately, then other items near it (related to it
in some way) are also likely to be accessed again soon.


Based on these two properties of caching, I made a assumption that **the most recently accessed pages are more likely to be accessed again**. It is because that the most recently accessed pages not only have been accessed recently (Temporal locality), but also are close to the current page (Spatial locality).

#### Caching algorithm
Based on the above assumption, my cache saves eight most recently accessed page. 

Once the user triggers the pageChange action, the data of the current page will be put into the cache when it doesn't have it. In addition, the algorithm will try to read the data of the next page from cache first.

Once the size of the cache is higher than the max cache size, the algorithm will remove the lest recently accessed page data.

#### Fetching algorithm
Fetching only one page (12 items in this case) at a time, and only fetch the data that is not in the cache.

### Common algorithm used by both implementations

