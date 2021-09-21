console.log('i m content.js')

function get_img_urls() {
    var ptt = document.querySelector("#pptContainer").children[0];
    const listArray = Array.from(ptt.children);
    var urls = [];
    listArray.forEach((item) => {
        if (item.tagName == 'SECTION') {
            urls.push(item.children[0].src);
        }
    });
    // console.log(urls);
    return urls;
}

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'get_img_urls') {
        var ret = {};
        console.log('blablabla');
        ret['urls'] = get_img_urls();
        console.log('blablabla', ret['urls']);
        ret['filename'] = document.title.replace(' | 國立清華大學 eeclass 數位學習平台', '');
        sendResponse(ret);
    }
});