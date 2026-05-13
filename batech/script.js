// Hardcoded data to avoid CORS issues when opening files directly via file://
const HISTORY_DATA = [
    { date: "2024.08", event: "ISO 9001 인증" },
    { date: "2017.12", event: "강원도지사 표창" },
    { date: "2013.02", event: "비에이텍(주) 상호변경" },
    { date: "2010.11.01", event: "(주)강원유체 설립" }
];

const PRODUCT_DATA = [
    { id: 1, name: "편흡입볼류트펌프", manual: "../docs/편흡입볼류트펌프 유지관리지침서.pdf" },
    { id: 2, name: "수중펌프", manual: "../docs/수중펌프 유지관리지침서.pdf" },
    { id: 3, name: "정량펌프", manual: "../docs/정량펌프 유지관리지침서.pdf" },
    { id: 4, name: "슬러지펌프", manual: "../docs/슬러지펌프 유지관리지침서.pdf" },
    { id: 5, name: "일축나사식 모노펌프", manual: "../docs/일축나사식 모노펌프 유지관리지침서.pdf" },
    { id: 6, name: "부스터펌프", manual: "../docs/부스터펌프 유지관리지침서.pdf" }
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
                ${product.manual ? `<a href="${product.manual}" target="_blank" class="btn-manual">유지관리지침서 PDF 보기</a>` : ''}
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Tab UI Logic (intro.html)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Add active class to corresponding pane
                const targetId = btn.getAttribute('data-target');
                const targetPane = document.querySelector(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

});
