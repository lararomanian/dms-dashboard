import Vue from "vue";

Vue.filter("stripSlug", function (slug) {
  var words = slug.split("-");

  if (words.length > 0) {
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(" ");
  } else return slug;
});
