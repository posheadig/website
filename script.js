document.addEventListener('DOMContentLoaded', function() {
    let textSize = 16; 
    let isDynamicText = false; 
    const categories = {
        "Biography": ["bio"],
        "Contact": ["contact"],
        "Works": ["News Currencies =","Bovine Weather Model", "Searching for Null", "Meandering Rio Commons", "Cyano-Bot", "DEM film"],
        "Early Works": ["LiDaR ShoreLINE", "Hydro-Electro-Poetics", "Archive Photogrammetry"],
        "Writing": ["eniwetok", "culvert blog"],
        "Collaborations": ["COP26: Into the Oceanic"]
    };

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content') || document.getElementById('work-detail-content');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    populateSidebar();

    const isWorkDetailPage = window.location.href.includes('work-detail.html');
    const isInfoPage = window.location.href.includes('info.html');
    if (isWorkDetailPage || isInfoPage) {
        loadWorkDetail();
    } else {
        populateMainContent("Bovine Weather Model", "bovine");
    }

    function populateSidebar() {
        Object.entries(categories).forEach(([category, links]) => {
            const list = document.createElement('ul');

            links.forEach((link) => {
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                if (category === "Works" || category === "Early Works" || category === "Writing" || category === "Collaborations") {
                    anchor.href = `work-detail.html?work=${link}`;
                } else if (category === "Biography" || category === "Contact") {
                    anchor.href = `info.html?work=${link}`;
                } else {
                    anchor.href = ''; 
                }                
                anchor.textContent = link.replace('.html', '').replace(/-/g, ' ');
                const linkFirstWord = link.split(" ")[0];
                const urlFirstWord = window.location.href.split(" ")[0];

                if (urlFirstWord.includes(linkFirstWord)) {
                    anchor.classList.add('active'); // Add active class
                }
                listItem.appendChild(anchor);
                list.appendChild(listItem);
            });

            if (!["Biography", "Contact"].includes(category)) {
                const header = document.createElement('h3');
                header.textContent = category;
                sidebar.appendChild(header);
            }

            sidebar.appendChild(list);
        });
    }

    function populateMainContent(title, workId) {
        const imageUrl = `./assets/${workId}/2.png`;
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = title;
        imageElement.classList.add('img');
        const workLink = document.createElement('a');
        workLink.href = `work-detail.html?work=${title}`;
        workLink.appendChild(imageElement);
        const linkText = document.createElement('span');

        workLink.appendChild(linkText);
        content.appendChild(workLink);
    }
function loadWorkDetail() {
    fetch('works.json')
        .then(response => response.json())
        .then(works => {
            const urlParams = new URLSearchParams(window.location.search);
            const workId = urlParams.get('work');
            const workDetail = works[workId];

            if (workDetail) {
                document.title = `${workDetail.title}`;
                const title = document.createElement('h3');
                title.textContent = workDetail.title;
                content.appendChild(title);

                // Display the first image after the title
                const firstImage = workDetail.images[0];
                if (firstImage) {
                    const imgContainer1 = document.createElement('div');
                    imgContainer1.classList.add('image-container');

                    const img1 = document.createElement('img');
                    img1.src = firstImage.src;
                    img1.alt = workDetail.title;
                    if (firstImage.width) {
                        img1.style.width = firstImage.width;
                    }
                    if (firstImage.height) {
                        img1.style.height = firstImage.height;
                    }
                    imgContainer1.appendChild(img1);
                    
                    if (firstImage.footnote) {
                        const footnote = document.createElement('p');
                        footnote.classList.add('footnote');
                        footnote.innerHTML = firstImage.footnote;
                        imgContainer1.appendChild(footnote);
                    }
                    content.appendChild(imgContainer1);
                }

                const description = document.createElement('p');
                description.innerHTML = workDetail.description;
                content.appendChild(description);


                const secondImage = workDetail.images[1];
                if (secondImage) {
                    const imgContainer2 = document.createElement('div');
                    imgContainer2.classList.add('image-container');

                    const img2 = document.createElement('img');
                    img2.src = secondImage.src;
                    img2.alt = workDetail.title;
                    if (secondImage.width) {
                        img2.style.width = secondImage.width;
                    }
                    if (secondImage.height) {
                        img2.style.height = secondImage.height;
                    }
                    imgContainer2.appendChild(img2);

                    if (secondImage.footnote) {
                        const footnote = document.createElement('p');
                        footnote.classList.add('footnote');
                        footnote.innerHTML = secondImage.footnote;
                        imgContainer2.appendChild(footnote);
                    }
                    content.appendChild(imgContainer2);
                }
            } else {
                console.error('Work not found');
            }
        })
        .catch(error => console.error('Error loading works:', error));
}

    

        // Function to increase text size
        function increaseTextSize() {
            textSize += 2; // increase by 2 pixels
            document.body.style.fontSize = `${textSize}px`;
        }
    
        // Function to decrease text size
        function decreaseTextSize() {
            textSize -= 2; // decrease by 2 pixels
            document.body.style.fontSize = `${textSize}px`;
        }
    
        // Function to toggle dynamic text resizing
        function toggleDynamicText() {
            isDynamicText = !isDynamicText;
            if (isDynamicText) {
                window.addEventListener('resize', adjustTextSize);
            } else {
                window.removeEventListener('resize', adjustTextSize);
            }
        }
        // Function to adjust text size dynamically on window resize
        function adjustTextSize() {
            // calculate font size based on window width or height
            const newSize = Math.min(window.innerWidth, window.innerHeight) / 50; 
            document.body.style.fontSize = `${newSize}px`;
        }
    
        // Attach event listeners
        document.getElementById('increase-font').addEventListener('click', increaseTextSize);
        document.getElementById('decrease-font').addEventListener('click', decreaseTextSize);
    
});

function revealEmail() {
    let encodedEmail = 'cGNvc2hlYTJAZ21haWwuY29t'; 
    let decodedEmail = atob(encodedEmail);
    document.getElementById('email').innerHTML = 'Email: <a href="mailto:' + decodedEmail + '">' + decodedEmail + '</a>';
}

