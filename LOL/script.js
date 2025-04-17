 document.addEventListener('DOMContentLoaded', function() {
        // الحصول على العناصر من الـ DOM
        const links = document.querySelectorAll('.info-link');
        const mediaGrid = document.getElementById('media-grid');
        const detailsContainer = document.getElementById('details-container');
        const detailsTitle = document.getElementById('details-title');
        const detailsImage = document.getElementById('details-image');
        const detailsDescription = document.getElementById('details-description');
        const detailsDate = document.getElementById('details-date');
        const detailsLocation = document.getElementById('details-location');
        const closeButton = document.getElementById('close-details');

        // التحقق من وجود العناصر الأساسية
        if (!mediaGrid || !detailsContainer || !closeButton || links.length === 0) {
            console.error("خطأ: بعض العناصر الأساسية (media-grid, details-container, close-details, أو info-link) مفقودة في الصفحة.");
            return;
        }

        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();

                // الحصول على البيانات من سمات data-*
                const title = this.dataset.title;
                const description = this.dataset.description;
                const imageUrl = this.dataset.image;
                const date = this.dataset.date;
                const location = this.dataset.location;

                // تحديث محتوى حاوية التفاصيل (مع قيم احتياطية)
                if(detailsTitle) detailsTitle.textContent = title || 'لا يوجد عنوان';
                if(detailsDescription) detailsDescription.textContent = description || 'لا يوجد وصف متوفر.';

                // تحديث التاريخ
                if (detailsDate) {
                  detailsDate.textContent = date ? `التاريخ: ${date}` : '';
                }

                // تحديث الموقع (مع الأيقونة)
                if (detailsLocation) {
                   detailsLocation.innerHTML = location ? `<i class="fas fa-map-marker-alt"></i> ${location}` : '';
                }

                // تحديث وعرض/إخفاء الصورة
                if (detailsImage) {
                    if (imageUrl) {
                        detailsImage.src = imageUrl;
                        detailsImage.alt = title || 'صورة تفصيلية';
                        detailsImage.style.display = 'block';
                    } else {
                        detailsImage.style.display = 'none';
                    }
                }

                // إخفاء الشبكة وإظهار التفاصيل
                mediaGrid.style.display = 'none';
                detailsContainer.style.display = 'block';

                // الانتقال لأعلى منطقة التفاصيل (اختياري)
                 // تأكد من أن detailsContainer مرئي قبل حساب offsetTop
                 if (detailsContainer.offsetParent !== null) {
                     window.scrollTo({ top: detailsContainer.offsetTop - 70, behavior: 'smooth' }); // 70 لترك مسافة أسفل الهيدر
                 }


            });
        });

        // مستمع زر الإغلاق
        closeButton.addEventListener('click', function() {
            detailsContainer.style.display = 'none';
            mediaGrid.style.display = 'grid'; // إعادة الشبكة لوضعها الأصلي
        });

        // --- كود للـ Menu Toggle (للقائمة المتجاوبة) ---
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNavList = document.querySelector('.main-navigation ul'); // استهداف الـ ul مباشرة

        if (menuToggle && mainNavList) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                // تبديل كلاس للتحكم بالعرض عبر CSS أو تغيير الـ display مباشرة
                 mainNavList.classList.toggle('expanded'); // ستحتاج لإضافة CSS لـ .expanded
                // أو: mainNavList.style.display = !isExpanded ? 'flex' : 'none'; // استخدم flex إذا كانت القائمة أفقية
            });
        }
         // --- نهاية كود الـ Menu Toggle ---
    });
