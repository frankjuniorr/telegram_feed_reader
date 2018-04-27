'use strict';
var request = require("request")

let url = 'https://medium.com/@frankjunior/latest?format=json&limit=1000';
var options = {
  url: url,
  json: true
}

const feed_array = new Array();

request(options, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    var json = body;
    var remove_header = "])}while(1);</x>"
    json = json.substring(remove_header.length)

    json = JSON.parse(json);
    get_post(json)

  }
})

function get_post(json) {
  var posts_number = json.payload.streamItems.length - 1;
  var json_posts_ids_array = json.payload.streamItems;
  var posts_ids = []


  // salvando todos os index num array
  for (var i = 1; i <= posts_number; i++) {
    var id = json_posts_ids_array[i].postPreview.postId
    posts_ids.push(id)
  }

  // esse loop imprime todos os titles
  var posts = json.payload.references.Post

  for (var ids in posts_ids) {
    var index = posts_ids[ids]

    var feed_title = posts[index].title
    var feed_url = posts[index].uniqueSlug
    feed_url = "https://medium.com/a-ponte/" + feed_url

    var feed_image = posts[index].virtuals.previewImage.imageId
    feed_image = `cdn-images-1.medium.com/max/500/${feed_image}`

    var feed_subtitle = posts[index].virtuals.subtitle

    feed_array.push({
      title: feed_title,
      url: feed_url,
      image: feed_image,
      subtitle: feed_subtitle
    })

  }

}

module.exports = {
  feedArray: feed_array
};
