document.addEventListener('DOMContentLoaded', function() {
    // الحصول على العناصر من الـ DOM
    const links = document.querySelectorAll('.info-link'); // كل الروابط داخل البطاقات
    const mediaGrid = document.getElementById('media-grid'); // حاوية الشبكة الأصلية
    const detailsContainer = document.getElementById('details-container'); // حاوية التفاصيل
    const detailsTitle = document.getElementById('details-title');
    const detailsImage = document.getElementById('details-image');
    const detailsDescription = document.getElementById('details-description');
    const detailsDate = document.getElementById('details-date'); // عنصر التاريخ الجديد
    const detailsLocation = document.getElementById('details-location'); // عنصر الموقع الجديد
    const closeButton = document.getElementById('close-details');

    // التحقق من وجود العناصر قبل إضافة المستمعين
    if (!mediaGrid || !detailsContainer || !closeButton) {
        console.error("خطأ: لم يتم العثور على حاوية الشبكة أو حاوية التفاصيل أو زر الإغلاق.");
        return; // إيقاف التنفيذ إذا كانت العناصر الأساسية مفقودة
    }

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // منع السلوك الافتراضي للرابط

            // الحصول على البيانات من سمات data-* للرابط الذي تم النقر عليه
            const title = this.dataset.title;
            const description = this.dataset.description;
            const imageUrl = this.dataset.image;
            const date = this.dataset.date; // الحصول على التاريخ
            const location = this.dataset.location; // الحصول على الموقع

            // تحديث محتوى حاوية التفاصيل
            detailsTitle.textContent = title || ''; // استخدام قيمة فارغة كاحتياط
            detailsDescription.textContent = description || '';

            // تحديث وعرض التاريخ إذا كان موجوداً
            if (detailsDate) {
              detailsDate.textContent = date ? `التاريخ: ${date}` : '';
            }

            // تحديث وعرض الموقع إذا كان موجوداً
            if (detailsLocation) {
               // نضيف الأيقونة مرة أخرى باستخدام innerHTML إذا أردنا ذلك
               detailsLocation.innerHTML = location ? `<i class="fas fa-map-marker-alt"></i> ${location}` : '';
            }

            // عرض الصورة إذا كان المسار موجوداً
            if (detailsImage) {
                if (imageUrl) {
                    detailsImage.src = imageUrl;
                    detailsImage.style.display = 'block'; // إظهار عنصر الصورة
                    detailsImage.alt = title || 'صورة تفصيلية'; // نص بديل
                } else {
                    detailsImage.style.display = 'none'; // إخفاء عنصر الصورة
                }
            }

            // إخفاء شبكة البطاقات وإظهار حاوية التفاصيل
            mediaGrid.style.display = 'none';
            detailsContainer.style.display = 'block';

             // الانتقال لأعلى الصفحة لعرض التفاصيل بوضوح (اختياري)
             window.scrollTo(0, detailsContainer.offsetTop - 80); // 80 هو تقدير لارتفاع الهيدر

        });
    });

    // إضافة مستمع النقر لزر الإغلاق
    closeButton.addEventListener('click', function() {
        // إخفاء حاوية التفاصيل وإظهار شبكة البطاقات
        detailsContainer.style.display = 'none';
        mediaGrid.style.display = 'grid'; // إعادة العرض كـ grid
    });

    // --- كود للـ Menu Toggle (إذا لم يكن موجوداً لديك بالفعل) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-navigation ul');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.style.display = !isExpanded ? 'block' : 'none'; // أو 'flex' حسب تصميم القائمة
        });
    }
     // --- نهاية كود الـ Menu Toggle ---
});