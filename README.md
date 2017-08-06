img-find
=========================

------------------------------

### An Image Search Abstraction Layer

* [https://img-find.glitch.me/](https://img-find.glitch.me/)

Use this microservice to retrieve image search results in json. The six available parameters for this API are described below.

### How To Use

Append your search query parameters to the end of the API search endpoint `https://img-find.glitch.me/search?`  with all parameters separated by the symbol `&`. The most recent searches can be retreived in json format from the API endpoint `https://img-find.glitch.me/latest`. Latest default is 10 most recent results. The `num` query can be used to return retween 1 and all available results.

**Example Query**

* `https://img-find.glitch.me/search?num=2&q=fancy penguins&size=large`

**Example Output**

```
  [
    {
      "snippet": "Penguin cartoon – penguins at a fancy dress ...",
      "url": "http://www.chrismadden.co.uk/images/cartoons ...",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/ ...",
      "context": "http://www.chrismadden.co.uk/cartoon ..."
    },
    {
      "snippet": "Kracker's Art Suite",
      "url": "http://thestuffinthemargin.files.wordpress ...",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/ ...",
      "context": "http://krackerartsuite.blogspot.com/"
    }
  ]
```

**Example Latest**

* `https://img-find.glitch.me/latest?num=2`

**Example Output**

```
  [
    {
      "term": "99 baloons",
      "when": "2017-08-06T06:05:41.634Z"
    },
    {
      "term": "funny bunnies",
      "when": "2017-08-06T05:59:35.021Z"
    }
  ]
```

### Parameters

|Parameter    |Description             |
|-------------|------------------------|
|q            |Query (string)         |
|num |Number of search results to return per page. Default: 10 Max: 10 (integer)|
|offset       |Page of search results to return. Default: 1 Max: 90 (integer)|
|size|Img size: icon, small, medium, large, xlarge, xxlarge, or huge. (string)|
|type|Img type. Including: bmp, gif, png, jpg, svg, pdf, ... (string)|
|rights|Licensing values include: cc_publicdomain, cc_attribute, cc_sharealike, cc_noncommercial, cc_nonderived & combinations of these. (string)|

### API Explorer Form

You can use the form on the [API landing page](https://img-find.glitch.me/) to explore the API. Searches will return the query url and example output printed in formatted json.

**Project Landing Page**

* [https://img-find.glitch.me/](https://img-find.glitch.me/)

-------------------------

Made by [IMBurbank](https://fogcreek.com/)
-------------------
