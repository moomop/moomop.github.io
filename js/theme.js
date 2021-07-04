
function get_gallery_classes () {
    var id_classes = new Set();
    var gallery_image_elements = document.getElementsByClassName('gallery-image');
    for (var gallery_image_element of gallery_image_elements) {
        for (var c of gallery_image_element.classList) {
            if (c.startsWith('gallery-id-')) {
                id_classes.add(c);
            }
        }
    } 
    return id_classes; 
}

function setup_gallery(id) {
    var gallery_image_elements = document.getElementsByClassName(id);
    const imgs = [];
    const pswp_items = [];
    image_id = 0;
    for (var gallery_image_element of gallery_image_elements){
      img = {
                src: gallery_image_element.getAttribute('data-thumbnail_src'),
                payload: {
                    gallery_id: id,
                    image_id: image_id
                }
            };
      imgs.push(img);

      pswp_item = {
        src: gallery_image_element.getAttribute('data-image_src'),
        w:   gallery_image_element.getAttribute('data-image_width'),
        h:   gallery_image_element.getAttribute('data-image_height'),
        title: gallery_image_element.getAttribute('data-caption')
      }
      pswp_items.push(pswp_item);

      image_id++;
    }

    var gallery_div = document.createElement("div")
    gallery_div.classList.add("gallery_div")
    gallery_image_elements[0].parentElement.insertBefore(gallery_div, gallery_image_elements[0])

    var imgOnClick = function(e, imgConfig) {
        console.log('img clicked!', e, imgConfig)
        var options = {
            index: imgConfig.payload.image_id,
            shareEl: false,
        };
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, pswp_items, options);
        gallery.init();
    }

    var panelHTMLSetter = function(imgConfig) {
        var htmlString = ''
        if (imgConfig && imgConfig.payload && imgConfig.payload.title) {
          htmlString += '<div class="photo-block__panel__title">'+ imgConfig.payload.title +'</div>'
        }
        return htmlString
      }

    const box = new PhotoGridBox(gallery_div, imgs, imgOnClick, panelHTMLSetter);
    box.setShowUnCompleteRow(false);

    var pswpElement = document.querySelectorAll('.pswp')[0];
}

function setHeights() {
    var archive_months = document.getElementsByClassName('archive-month');
    for (var archive_month of archive_months){
        archive_month.removeAttribute("aria-hidden");
        let heightOfContent = archive_month.getBoundingClientRect().height;
        archive_month.style.setProperty("--containerHeight", `${heightOfContent}px`);
        //archive_month.setAttribute("aria-hidden", "true");
    }
}

function setup_archive() {
   

    setHeights();


    archive_years = document.getElementsByClassName('archive-year')
    for (var i = 0; i < archive_years.length; i++){
        var archive_months = archive_years[i].getElementsByClassName('archive-month');
        for(var archive_month of archive_months){
          if (archive_years[i].classList.contains('hidden')) {
             archive_month.classList.toggle('hidden');
          }
        }        
    }





    for (var year_button of document.getElementsByClassName('archive-year-header')){   
      year_button.addEventListener("click", function (event) {
        var archive_year = this.closest('.archive-year');
        var archive_months = archive_year.getElementsByClassName('archive-month');
        for(var archive_month of archive_months){
            archive_month.style.transition='all 0.5s';
            archive_month.classList.toggle('hidden')
        };
        
        archive_year.classList.toggle("hidden");
 


      });
    };
    
   
}



const themeInit = () => {
    var hamburger = document.getElementById('header-hamburger');
    var menu = document.getElementById('menu');
    //element.style.backgroundColor = 'blue';
    hamburger.addEventListener("click", function() {
        this.classList.toggle("is-active");
        menu.classList.toggle("is-active");
      }, false);
    var gallery_classes = get_gallery_classes()
    for (var g of gallery_classes) {
        setup_gallery(g); 
    }
    setup_archive()
};


if (document.readyState !== 'loading') {
    themeInit();
} else {
    document.addEventListener('DOMContentLoaded', themeInit);
}