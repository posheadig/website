document.addEventListener('DOMContentLoaded', () => {
    // Cache frequently used DOM elements
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
  
    let textSize = 16;
    let worksData = {}; // Will hold the contents of works.json
  
    // Categories for sidebar navigation
    const categories = {
      Biography: ['bio', 'cv'],
      Contact: ['contact'],
      'Solo Works': [
        'News Currencies',
        'Bovine Weather Model',
        'Searching for Null',
        'Cyano-Bot',
        'DEM film'
      ],
      Collaborations: ['The Cavalry (short film)', 'Meandering Rio Commons', 'COP26: Into the Oceanic'],
      'Early Works': ['LiDaR ShoreLINE', 'Hydro-Electro-Poetics', 'Archive Photogrammetry'],
      Writing: ['eniwetok', 'culvert blog']
    };
  
    // Create a collapse/expand button for desktop only
    if (window.innerWidth >= 768) {
      const collapseBtn = document.createElement('button');
      collapseBtn.id = 'sidebar-collapse';
      collapseBtn.textContent = '«';  // initial state: sidebar is expanded so show collapse icon
      sidebar.appendChild(collapseBtn);
  
      collapseBtn.addEventListener('click', () => {
        // Toggle the collapsed class on the sidebar
        sidebar.classList.toggle('collapsed');
        // Update the collapse button icon accordingly
        if (sidebar.classList.contains('collapsed')) {
          collapseBtn.textContent = '»';
        } else {
          collapseBtn.textContent = '«';
        }
      });
    }
  
    // Toggle sidebar visibility for mobile (if needed)
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', sidebar.classList.contains('active'));
    });
  
    // Populate the sidebar with navigation links.
    // If a work has a "year" in worksData, append it to the link text.
    function populateSidebar() {
      const fragment = document.createDocumentFragment();
  
      Object.entries(categories).forEach(([category, links]) => {
        if (!['Biography', 'Contact'].includes(category)) {
          const header = document.createElement('h3');
          header.textContent = category;
          fragment.appendChild(header);
        }
        const list = document.createElement('ul');
        links.forEach((link) => {
          const listItem = document.createElement('li');
          const anchor = document.createElement('a');
  
          // For Biography and Contact, use the info route; otherwise, use the work route.
          if (['Biography', 'Contact'].includes(category)) {
            anchor.href = `#/info?work=${encodeURIComponent(link)}`;
          } else {
            anchor.href = `#/work?work=${encodeURIComponent(link)}`;
          }
  
          // Build the display text and append year if available.
          let displayText = link.replace('.html', '').replace(/-/g, ' ');
          if (worksData[link] && worksData[link].year) {
            displayText += ` (${worksData[link].year})`;
          }
          // Split text and year if available
          if (worksData[link] && worksData[link].year) {
            const titleText = link.replace('.html', '').replace(/-/g, ' ');
            anchor.innerHTML = `${titleText} <span class="sidebar-year">(${worksData[link].year})</span>`;
          } else {
            anchor.textContent = link.replace('.html', '').replace(/-/g, ' ');
          }
  
          // On mobile, clicking a link will close the sidebar.
          anchor.addEventListener('click', () => {
            if (window.innerWidth < 768) {
              sidebar.classList.remove('active');
            }
          });
  
          listItem.appendChild(anchor);
          list.appendChild(listItem);
        });
        fragment.appendChild(list);
      });
  
      sidebar.appendChild(fragment);
    }
  
    // Update active sidebar links based on the current hash
    function updateActiveSidebarLinks() {
      const links = document.querySelectorAll('#sidebar a');
      links.forEach((link) => {
        if (link.getAttribute('href') === window.location.hash) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  
    // Functions to load different "pages"
    function loadHomepage() {
      content.innerHTML = '';
      // Example: display featured work (adjust as needed)
      populateMainContent('Bovine Weather Model', 'bovine');
    }
  
    // Load work details – reuse worksData if already fetched
    function loadWorkDetail() {
      if (Object.keys(worksData).length === 0) {
        fetch('works.json')
          .then(response => response.json())
          .then(data => {
            worksData = data;
            renderWorkDetail();
          })
          .catch(error => {
            console.error('Error loading works:', error);
            content.innerHTML = '<p>Error loading work details.</p>';
          });
      } else {
        renderWorkDetail();
      }
    }
  
    // Render work details using worksData
    function renderWorkDetail() {
      const params = new URLSearchParams(window.location.hash.split('?')[1]);
      const workId = params.get('work');
      const workDetail = worksData[workId];
  
      content.innerHTML = '';
      if (workDetail) {
        document.title = workDetail.title;
        const titleEl = document.createElement('h3');
        titleEl.textContent = workDetail.title;
  
        // If a year exists, add it as a span next to the title.
        if (workDetail.year) {
          const yearEl = document.createElement('span');
          yearEl.classList.add('year');
          yearEl.textContent = ` (${workDetail.year})`;
          titleEl.appendChild(yearEl);
        }
        content.appendChild(titleEl);
  
        // Display the first image immediately after the title.
        if (workDetail.images[0]) {
          const firstImgObj = workDetail.images[0];
          const imgContainer = document.createElement('div');
          imgContainer.classList.add('image-container');
  
          const img = document.createElement('img');
          img.src = firstImgObj.src;
          img.alt = workDetail.title;
          img.loading = 'lazy';
          if (firstImgObj.width) img.style.width = firstImgObj.width;
          if (firstImgObj.height) img.style.height = firstImgObj.height;
          imgContainer.appendChild(img);
  
          if (firstImgObj.footnote) {
            const footnote = document.createElement('p');
            footnote.classList.add('footnote');
            footnote.innerHTML = firstImgObj.footnote;
            imgContainer.appendChild(footnote);
          }
          content.appendChild(imgContainer);
        }
  
        // Append the description next.
        const description = document.createElement('p');
        description.innerHTML = workDetail.description;
        content.appendChild(description);
  
        // Append any additional images after the description.
        for (let i = 1; i < workDetail.images.length; i++) {
          const imgObj = workDetail.images[i];
          const imgContainer = document.createElement('div');
          imgContainer.classList.add('image-container');
  
          const img = document.createElement('img');
          img.src = imgObj.src;
          img.alt = workDetail.title;
          img.loading = 'lazy';
          if (imgObj.width) img.style.width = imgObj.width;
          if (imgObj.height) img.style.height = imgObj.height;
          imgContainer.appendChild(img);
  
          if (imgObj.footnote) {
            const footnote = document.createElement('p');
            footnote.classList.add('footnote');
            footnote.innerHTML = imgObj.footnote;
            imgContainer.appendChild(footnote);
          }
          content.appendChild(imgContainer);
        }
      } else {
        content.innerHTML = '<p>Work not found.</p>';
      }
      updateActiveSidebarLinks();
    }
  
    function renderCV() {
      content.innerHTML = '<h3>Curriculum Vitae</h3><p>Loading...</p>';
  
      fetch('./assets/cv.json')
        .then(res => res.json())
        .then(cv => {
          let cvHTML = `<h3>${cv.name} – Curriculum Vitae</h3>`;
          cvHTML += `<div class="cv-container">`;
  
          // Helper function: if item.festivals exists, use it; otherwise use item.description.
          const getExtraInfo = item =>
            item.festivals
              ? `<div class="cv-item-festivals">${item.festivals}</div>`
              : item.description
              ? `<div class="cv-item-desc">${item.description}</div>`
              : '';
  
          const section = (sectionTitle, items) => {
            if (!items || !items.length) return '';
            let sectionHTML = `<section class="cv-section">
            <p class="cv-heading">${sectionTitle}</p>
            <ul class="cv-list">`;          
            items.forEach(item => {
              const mainTitle = item.title || item.degree || item.role || '';
              const roleText = item.role && item.title ? `<div class="cv-item-sub">${item.role}</div>` : '';
              const dateText = item.years || item.year || '';
              const institutionText = item.institution || item.organization || item.publisher || '';
              const locationText = item.location ? ', ' + item.location : '';
              const extraInfo = getExtraInfo(item);
  
              sectionHTML += `<li class="cv-item">
                <div class="cv-item-title">
                  ${mainTitle} ${dateText ? `<span class="cv-item-date">${dateText}</span>` : ''}
                </div>
                ${roleText}
                ${(institutionText || locationText) ? `<div class="cv-item-sub">${institutionText}${locationText}</div>` : ''}
                ${extraInfo}
              </li>`;
            });
            sectionHTML += `</ul></section>`;
            return sectionHTML;
          };
  
          cvHTML += section('Education', cv.education);
          cvHTML += section('Awards', cv.awards);
          cvHTML += section('Professional Experience', cv.professional_experience);
          cvHTML += section('Collaborations', cv.collaborations);
          cvHTML += section('Teaching/Workshops', cv.teaching);
          cvHTML += section('Solo Work Exhibitions', cv.exhibitions);
          cvHTML += section('Publications', cv.publications);
          cvHTML += section('Residencies', cv.residencies);
  
          cvHTML += '</div>';
          content.innerHTML = cvHTML;
        })
        .catch(err => {
          content.innerHTML = '<p>Error loading CV.</p>';
          console.error('CV load error:', err);
        });
    }
  
    // For pages like Biography or Contact; reuse the same work detail layout.
    function loadInfo() {
      const params = new URLSearchParams(window.location.hash.split('?')[1]);
      const workId = params.get('work');
  
      if (workId === 'cv') {
        renderCV(); // custom rendering
      } else {
        loadWorkDetail(); // fallback to standard rendering
      }
    }
  
    // Populate homepage content (e.g., a featured work)
    function populateMainContent(title, workId) {
      const imageUrl = `./assets/${workId}/2.png`;
      const workLink = document.createElement('a');
      workLink.href = `#/work?work=${encodeURIComponent(title)}`;
  
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.alt = title;
      imageElement.classList.add('img');
      imageElement.loading = 'lazy';
  
      workLink.appendChild(imageElement);
      content.appendChild(workLink);
    }
  
    // Simple hash-based router
    function router() {
      const hash = window.location.hash;
      if (!hash || hash === '#/' || hash === '') {
        loadHomepage();
      } else if (hash.startsWith('#/work')) {
        loadWorkDetail();
      } else if (hash.startsWith('#/info')) {
        loadInfo();
      } else {
        loadHomepage();
      }
      // For mobile, auto-close the sidebar when navigating
      if (window.innerWidth < 768) {
        sidebar.classList.remove('active');
      }
    }
  
    // Text size controls
    const adjustTextSize = (delta) => {
      textSize += delta;
      document.body.style.fontSize = `${textSize}px`;
    };
  
    increaseFontBtn.addEventListener('click', () => adjustTextSize(2));
    decreaseFontBtn.addEventListener('click', () => adjustTextSize(-2));
  
    // Fetch works.json, then initialize sidebar and router.
    fetch('works.json')
      .then(response => response.json())
      .then(data => {
        worksData = data;
        populateSidebar();
        router();
        window.addEventListener('hashchange', () => {
          router();
          updateActiveSidebarLinks();
        });
      })
      .catch(error => {
        console.error('Error fetching works.json:', error);
        populateSidebar();
        router();
      });
  });
  
  // Reveal email on demand (for info pages)
  function revealEmail() {
    const encodedEmail = 'cGNvc2hlYTJAZ21haWwuY29t';
    const decodedEmail = atob(encodedEmail);
    document.getElementById('email').innerHTML = `Email: <a href="mailto:${decodedEmail}">${decodedEmail}</a>`;
  }
  