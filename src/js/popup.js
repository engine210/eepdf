var Button = document.getElementById('download-btn');
const {jsPDF} = require('jspdf');

var update = function(val) {
    document.getElementById("myBar").value = val;
    requestAnimationFrame(update);
};

function save_imgs_to_pdf(msg) {
	urls = msg.urls; // array of images' url
	filename = msg.filename;
	console.log('onResponse', urls);
	console.log('onResponse', filename);

	// urls is the array of images' url
    var img1 = new Image();
	// when first image is loaded, get it's height and width
    img1.onload = function() {
        var pdf_height = this.height;
        var pdf_width = this.width;

        console.log('Image heigth:', pdf_height);
        console.log('Image width:', pdf_height);

		// create a pdf document, set pdf width and height to image size
        var doc = new jsPDF({
            orientation : 'landscape',
            unit : 'px',
            format : [ pdf_width, pdf_height ]
        });

		// add first image to pdf
        doc.addImage(this, 'JPEG', 0, 0, pdf_width, pdf_height);

		// add rest of images to pdf
        for (var i = 1; i < urls.length; i++) {
            console.log('Processing image', i, '/', urls.length);

            var img = new Image();
            img.src = urls[i];
            doc.addPage();
            doc.addImage(img, 'JPEG', 0, 0, pdf_width, pdf_height);
        }

        doc.save(filename + '.pdf');
    };
	// load first image
    img1.src = urls[0];
}

Button.addEventListener('click', function(ce) {
    console.log('clicked');

	document.getElementById("status").textContent = 'Processing...';
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs) {
		var tab = tabs[0];
        console.log(tab.url, tab.title);
        chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {text : 'get_img_urls'}, function(msg) {
                save_imgs_to_pdf(msg);
				document.getElementById("status").textContent = 'Done';
            });
        });
    });
});
