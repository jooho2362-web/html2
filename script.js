// Hardcoded data to avoid CORS issues when opening files directly via file://
const HISTORY_DATA = [
    { date: "2010.11.01", event: "(주)강원유체 설립" },
    { date: "2013.02", event: "비에이텍(주) 상호변경" },
    { date: "2017.12", event: "강원도지사 표창" },
    { date: "2024.08", event: "ISO 9001 인증" }
];

const PRODUCT_DATA = [
    { id: 1, name: "다단벌류트펌프" },
    { id: 2, name: "수중펌프" },
    { id: 3, name: "정량펌프" },
    { id: 4, name: "심정용펌프" },
    { id: 5, name: "부스터펌프" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const gnb = document.querySelector('.gnb');

    if (hamburger && gnb) {
        hamburger.addEventListener('click', () => {
            gnb.classList.toggle('active');
            
            // Simple hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (gnb.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.gnb a').forEach(link => {
            link.addEventListener('click', () => {
                gnb.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Render History (if container exists on the page)
    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {
        HISTORY_DATA.forEach((item, index) => {
            // Alternate left and right for desktop timeline
            const position = index % 2 === 0 ? 'left' : 'right';
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${position}`;
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <span class="timeline-date">${item.date}</span>
                    <h4 class="timeline-event">${item.event}</h4>
                </div>
            `;
            historyContainer.appendChild(timelineItem);
        });
    }

    // Render Products/Equipment (if container exists on the page)
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        PRODUCT_DATA.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-icon">💧</div>
                <h3 class="product-title">${product.name}</h3>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Kakao Map Initialization
    const mapContainer = document.getElementById('map');
    if (mapContainer && typeof kakao !== 'undefined' && kakao.maps) {
        const mapOption = { 
            center: new kakao.maps.LatLng(37.868224, 127.732782), // Approximate coordinate for Chuncheon Toegye-ro 1
            level: 3 
        };

        const map = new kakao.maps.Map(mapContainer, mapOption); 
        
        // Add Marker
        const markerPosition  = new kakao.maps.LatLng(37.868224, 127.732782); 
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
    }
});
