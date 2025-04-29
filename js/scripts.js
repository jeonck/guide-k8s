/**
 * 다크 모드/라이트 모드 토글 함수
 */
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const button = document.querySelector('.theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        button.textContent = '라이트 모드 전환';
        localStorage.setItem('theme', 'dark');
    } else {
        button.textContent = '다크 모드 전환';
        localStorage.setItem('theme', 'light');
    }
}

/**
 * 저장된 테마 설정을 적용하는 함수
 */
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const button = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        button.textContent = '라이트 모드 전환';
    } else {
        document.body.classList.remove('dark-mode');
        button.textContent = '다크 모드 전환';
    }
}

/**
 * 애니메이션 효과 적용
 */
function animateSections() {
    const sections = document.querySelectorAll('.section');
    
    // 초기에 모든 섹션을 숨김
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // 순차적으로 나타나게 함
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300 * index);
    });
}

/**
 * 스크롤 이벤트 처리
 */
function handleScroll() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // 섹션이 화면에 등장할 때 애니메이션 효과 적용
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

/**
 * 스무스 스크롤 기능
 */
function enableSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 저장된 테마 적용
    applyTheme();
    
    // 애니메이션 효과 적용
    animateSections();
    
    // 스무스 스크롤 활성화
    enableSmoothScroll();
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
});