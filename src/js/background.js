import '../img/icon-128.png'
import '../img/icon-34.png'

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([ {
            conditions : [ new chrome.declarativeContent.PageStateMatcher({
                pageUrl : {hostEquals : 'eeclass.nthu.edu.tw'},
            }) ],
            actions : [ new chrome.declarativeContent.ShowPageAction() ]
        } ]);
    });
});