// Listener for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save Bookmark
function saveBookmark(e){
    // Get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteURL').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
        }

        //Test if bookmarks is null
        if(localStorage.getItem('bookmarks') === null){
            // Init array
            let bookmarks = [];
            // Add yo array
            bookmarks.push(bookmark);
            // Set to localStorage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }else {
            // Get bookmarks from localStorage
            let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            // Add bookmark to array
            bookmarks.push(bookmark);
            // Re-set back to localStorage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }

        // Clear form
        doccument.getElementById('myForm').reset();

        //Re-fetch bookmarks
        fetchBookmarks();

        
        
    // Prevent form from submitting
    e.preventDefault();
}

function deleteBookmark(url){
    //Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop throught bookmarks
    for(let i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();

};

// Fetch bookmarks
function fetchBookmarks() {
    //Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get input id
    let bookmarksResults = document.getElementById('bookmarksResults');

    //buil output
    bookmarksResults.innerHTML = '';
    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += `
            <div class="card bg-light mb-3 pb-0">
                <h4 class="ml-3">${name} 
                    <a onclick="deleteBookmark(\'${url}\')" class="btn btn-danger float-right ml-2">Delete</a>
                    <a class="btn btn-secondary float-right" target="_blanck" href="${url}">Visit</a>
                </h4>
            </div>    
        `;
        
    }
    
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valir URL');
        return false;
    }

    return true;
}