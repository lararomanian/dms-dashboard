import Vue from "vue";

Vue.filter('stripHTML', function (value, stop) {
    const div = document.createElement('div')
    div.innerHTML = value
    const text = div.textContent || div.innerText || ''
    if (text.length > stop) {
        return text.substring(0, stop) + '...'
    }
    return text
});
