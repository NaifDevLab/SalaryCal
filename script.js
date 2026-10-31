tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Tajawal', 'sans-serif'],
                    },
                    colors: {
                        military: {
                            50: '#ecfdf5',
                            100: '#d1fae5',
                            500: '#10b981',
                            600: '#059669',
                            700: '#047857',
                            800: '#065f46',
                            900: '#064e3b',
                            950: '#022c22',
                        },
                        gold: {
                            400: '#fbbf24',
                            500: '#f59e0b',
                            600: '#d97706',
                        }
                    }
                }
            }
        }

// عملة المبالغ (ريال)
        const SAR_ICON = `<span class="text-[0.85em] font-bold mr-1">ريال</span>`;
        const SAR_TEXT_SYMBOL = 'ريال';

        const RANKS_DATA = [
            { name: 'جندي', increment: 130, transport: 500, salaries: [3220, 3350, 3480, 3610, 3740, 3870, 4000, 4130, 4260, 4390, 4520, 4650, 4780, 4910, 5040], tech: [150, 250, 300, 400, 630, 750, 880, 1000, 1200, 1400] },
            { name: 'جندي أول', increment: 145, transport: 500, salaries: [3395, 3540, 3685, 3830, 3975, 4120, 4265, 4410, 4555, 4700, 4845, 4990, 5135, 5280, 5425], tech: [190, 290, 350, 450, 680, 800, 930, 1050, 1250, 1450] },
            { name: 'عريف', increment: 175, transport: 500, salaries: [3765, 3940, 4115, 4290, 4465, 4640, 4815, 4990, 5165, 5340, 5515, 5690, 5865, 6040, 6215], tech: [230, 330, 400, 500, 730, 850, 980, 1100, 1300, 1500] },
            { name: 'وكيل رقيب', increment: 210, transport: 500, salaries: [4455, 4665, 4875, 5080, 5295, 5505, 5715, 5925, 6135, 6345, 6555, 6765, 6975, 7185, 7395], tech: [270, 370, 450, 550, 780, 900, 1030, 1150, 1350, 1550] },
            { name: 'رقيب', increment: 250, transport: 500, salaries: [5260, 5510, 5760, 6010, 6260, 6510, 6760, 7010, 7260, 7510, 7760, 8010, 8260, 8510, 8760], tech: [310, 410, 500, 600, 830, 950, 1080, 1200, 1400, 1600] },
            { name: 'رقيب أول', increment: 300, transport: 700, salaries: [6180, 6480, 6780, 7080, 7380, 7680, 7980, 8280, 8580, 8880, 9180, 9480, 9780, 10080, 10380], tech: [350, 450, 550, 650, 880, 1000, 1130, 1250, 1450, 1650] },
            { name: 'رئيس رقباء', increment: 360, transport: 700, salaries: [7215, 7575, 7935, 8295, 8655, 9015, 9375, 9735, 10095, 10455, 10815, 11175, 11535, 11895, 12255], tech: [390, 490, 600, 700, 930, 1050, 1180, 1300, 1500, 1700] }
        ];

        const STUDY_REWARDS = { 'ابتدائية': 200, 'متوسطة': 250, 'ثانوية': 300 };
        const HIJRI_MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
        const GREG_MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        const WEEKDAYS_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

        // بناء قوائم الأشهر الهجرية القديمة مع الميلادية مطابقة لملف الإكسل:
        // القائمة الأولى (الفترة من - العمود H): من 1420-1 إلى 2021-1
        // القائمة الثانية (الفترة إلى - العمود J): من 1429-12 إلى 2030-12
        // وتعرض بالتنسيق المطلوب: الشهر-السنة (بحيث تكون السنة على اليسار)
        const MONTHS_LIST_FROM = [];
        const MONTHS_LIST_TO = [];
        (function buildExactMonthsLists() {
            let idx = 1;
            for (let y = 1420; y <= 1441; y++) {
                const maxM = (y === 1441) ? 3 : 12;
                for (let m = 1; m <= maxM; m++) {
                    const item = {
                        key: `${y}-${m}`,
                        displayKey: `${String(m).padStart(2, '0')}-${y}`,
                        type: 'هجري',
                        fromIdx: idx,
                        toIdx: idx + 1
                    };
                    MONTHS_LIST_FROM.push(item);
                    if (y > 1429 || (y === 1429 && m >= 12)) {
                        MONTHS_LIST_TO.push(item);
                    }
                    idx++;
                }
            }
            for (let y = 2019; y <= 2030; y++) {
                const startM = (y === 2019) ? 12 : 1;
                for (let m = startM; m <= 12; m++) {
                    const item = {
                        key: `${y}-${m}`,
                        displayKey: `${String(m).padStart(2, '0')}-${y}`,
                        type: 'ميلادي',
                        fromIdx: idx,
                        toIdx: idx + 1
                    };
                    if (y < 2021 || (y === 2021 && m <= 1)) {
                        MONTHS_LIST_FROM.push(item);
                    }
                    MONTHS_LIST_TO.push(item);
                    idx++;
                }
            }
        })();

        let currentPayrollMode = 'date'; // 'date' | 'days' | 'promo'
        let promoInputMethod = 'fromOld'; // 'fromOld' | 'fromNew'
        let salaryTableMode = 'basic';

        let selectedItemsState = {
            diffSalary: true, diffSecurity: true, terrorism: true, danger: true,
            computer: true, remoteBorder: true, fieldDaily: true, transport: true,
            subsistence: true, subsistenceExtra: true, study: true, techAllowance: true,
            remoteArea: true, dedInsurance: true
        };

        let art13SelectedState = {
            salary: true,
            security: true,
            transport: true,
            study: true
        };
        let art13MergeEnabled = false;
        let lastArt13Values = { salary: 0, security: 0, transport: 0, study: 0 };

        let lastCalculatedItems = [];
        let lastFixedDaysCount = 30;
        let inspectedRankIdx = 0;
        let inspectedDegree = 1;
        let activePayrollDateInput = null;
        let payrollCalendarType = 'hijri';
        let payrollCalendarYear = 0;
        let payrollCalendarMonth = 0;

        function toWesternDigits(str) {
            return String(str ?? '')
                .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
                .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
        }

        function toIndianDigits(str) {
            return String(str ?? '').replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
        }

        function parseNum(val, fallback = 0) {
            const clean = toWesternDigits(val).replace(/[^0-9.-]/g, '');
            const n = parseFloat(clean);
            return isNaN(n) ? fallback : n;
        }

        function formatMoney(num, compact = false) {
            if (isNaN(num)) return '٠.٠٠';
            const isInt = Math.abs(num - Math.round(num)) < 0.001;
            const formatted = (compact && isInt)
                ? Math.round(num).toLocaleString('en-US')
                : Number(num).toLocaleString('en-US', { minimumFractionDigits: isInt && compact ? 0 : 2, maximumFractionDigits: 2 });
            return toIndianDigits(formatted);
        }

        function formatWithSAR(num, compact = false) {
            return `${formatMoney(num, compact)} ${SAR_ICON}`;
        }

        function hijriToGregorian(hy, hm, hd) {
            try {
                const estJD = Math.floor((11 * hy + 3) / 30) + 354 * hy + 30 * hm - Math.floor((hm - 1) / 2) + hd + 1948440 - 386;
                const l = estJD + 68569;
                const n = Math.floor((4 * l) / 146097);
                const l1 = l - Math.floor((146097 * n + 3) / 4);
                const i = Math.floor((4000 * (l1 + 1)) / 1461001);
                const l2 = l1 - Math.floor((1461 * i) / 4) + 31;
                const j = Math.floor((80 * l2) / 2447);
                const gd = l2 - Math.floor((2447 * j) / 80);
                const l3 = Math.floor(j / 11);
                const gm = j + 2 - 12 * l3;
                const gy = 100 * (n - 49) + i + l3;
                const baseDate = new Date(Date.UTC(gy, gm - 1, gd));

                for (let offset = -3; offset <= 3; offset++) {
                    const testDate = new Date(baseDate.getTime() + offset * 86400000);
                    const parts = getHijriPartsFromGreg(testDate);
                    if (parts.hy === hy && parts.hm === hm && parts.hd === hd) {
                        return testDate;
                    }
                }
                return baseDate;
            } catch (e) {
                const approxJD = Math.floor((11 * hy + 3) / 30) + 354 * hy + 30 * hm - Math.floor((hm - 1) / 2) + hd + 1948440 - 386;
                const l = approxJD + 68569;
                const n = Math.floor((4 * l) / 146097);
                const l1 = l - Math.floor((146097 * n + 3) / 4);
                const i = Math.floor((4000 * (l1 + 1)) / 1461001);
                const l2 = l1 - Math.floor((1461 * i) / 4) + 31;
                const j = Math.floor((80 * l2) / 2447);
                const gd = l2 - Math.floor((2447 * j) / 80);
                const l3 = Math.floor(j / 11);
                const gm = j + 2 - 12 * l3;
                const gy = 100 * (n - 49) + i + l3;
                return new Date(Date.UTC(gy, gm - 1, gd));
            }
        }

        function getHijriPartsFromGreg(dateObj) {
            try {
                const fmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' });
                const parts = fmt.formatToParts(dateObj);
                let hy = 0, hm = 0, hd = 0;
                for (const p of parts) {
                    if (p.type === 'year') hy = parseInt(p.value, 10);
                    if (p.type === 'month') hm = parseInt(p.value, 10);
                    if (p.type === 'day') hd = parseInt(p.value, 10);
                }
                if (hy > 1300) return { hy, hm, hd };
            } catch (e) {}
            const gy = dateObj.getUTCFullYear(), gm = dateObj.getUTCMonth() + 1, gd = dateObj.getUTCDate();
            let jd = 367 * gy - Math.floor((7 * (gy + 5001 + Math.floor((gm - 9) / 7))) / 4) + Math.floor((275 * gm) / 9) + gd + 1729777;
            const l = jd - 1948440 + 10632;
            const n = Math.floor((l - 1) / 10631);
            const l1 = l - 10631 * n + 354;
            const j = (Math.floor((10985 - l1) / 5316)) * (Math.floor((50 * l1) / 17719)) + (Math.floor(l1 / 5670)) * (Math.floor((43 * l1) / 15238));
            const l2 = l1 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
            const calcHm = Math.floor((24 * l2) / 709);
            const calcHd = l2 - Math.floor((709 * calcHm) / 24);
            const calcHy = 30 * n + j - 30;
            return { hy: calcHy, hm: calcHm, hd: calcHd };
        }

        function getTodayHijriDate() {
            const now = new Date();
            const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
            const hijri = getHijriPartsFromGreg(today);
            const formatted = toIndianDigits(
                `${String(hijri.hd).padStart(2, '0')}-${String(hijri.hm).padStart(2, '0')}-${hijri.hy}`
            );
            return { ...hijri, formatted };
        }

        // تحليل التاريخ المدخل (يدعم يوم-شهر-سنة من اليمين لليسار، أو سنة-شهر-يوم، أو 8 أرقام متواصلة)
        // ويعيد دائماً التنسيق يبدأ باليوم ثم الشهر ثم السنة (DD-MM-YYYY)
        function parseFlexibleDate(rawStr) {
            if (!rawStr) return null;
            const clean = toWesternDigits(rawStr).trim();
            let y, m, d;
            if (/^\d{8}$/.test(clean)) {
                const first4 = parseInt(clean.substring(0, 4), 10);
                const last4 = parseInt(clean.substring(4, 8), 10);
                if (first4 >= 1300 && first4 <= 2150) {
                    y = first4;
                    m = parseInt(clean.substring(4, 6), 10);
                    d = parseInt(clean.substring(6, 8), 10);
                } else if (last4 >= 1300 && last4 <= 2150) {
                    d = parseInt(clean.substring(0, 2), 10);
                    m = parseInt(clean.substring(2, 4), 10);
                    y = last4;
                } else {
                    return null;
                }
            } else {
                const parts = clean.split(/[-/.\\\s]+/);
                if (parts.length !== 3) return null;
                const p0 = parseInt(parts[0], 10);
                const p1 = parseInt(parts[1], 10);
                const p2 = parseInt(parts[2], 10);
                if (p0 >= 1300 && p0 <= 2150) {
                    y = p0; m = p1; d = p2;
                } else if (p2 >= 1300 && p2 <= 2150) {
                    d = p0; m = p1; y = p2;
                } else {
                    return null;
                }
            }
            if (isNaN(y) || isNaN(m) || isNaN(d) || m < 1 || m > 12 || d < 1 || d > 31) return null;
            let gregDate, hijriParts;
            const isHijriInput = (y >= 1300 && y <= 1600);
            if (isHijriInput) {
                gregDate = hijriToGregorian(y, m, d);
                hijriParts = { hy: y, hm: m, hd: d };
            } else {
                gregDate = new Date(Date.UTC(y, m - 1, d));
                hijriParts = getHijriPartsFromGreg(gregDate);
            }
            const gy = gregDate.getUTCFullYear(), gm = gregDate.getUTCMonth() + 1, gd = gregDate.getUTCDate();
            const pad = n => String(n).padStart(2, '0');

            // التنسيق المعتمد: يبدأ من اليمين باليوم ثم الشهر ثم السنة (DD-MM-YYYY)
            const gregFormatted = toIndianDigits(`${pad(gd)}-${pad(gm)}-${gy}`);
            const hijriFormatted = toIndianDigits(`${pad(hijriParts.hd)}-${pad(hijriParts.hm)}-${hijriParts.hy}`);
            const weekday = WEEKDAYS_AR[gregDate.getUTCDay()];

            // إذا كان التاريخ المدخل هجرياً تظهر الملاحظة بالميلادي، والعكس إذا كان ميلادياً تظهر بالهجري
            const oppositeFormatted = isHijriInput ? gregFormatted : hijriFormatted;
            const oppositeNote = `${weekday} الموافق ${oppositeFormatted}`;

            return {
                gregDate, gy, gm, gd,
                hy: hijriParts.hy, hm: hijriParts.hm, hd: hijriParts.hd,
                isHijriInput,
                gregFormatted,
                hijriFormatted,
                inputFormatted: isHijriInput ? hijriFormatted : gregFormatted,
                oppositeFormatted,
                oppositeNote,
                weekday
            };
        }

        function calculateDaysBetween(d1, d2) {
            let start = d1, end = d2;
            if (d1.gregDate.getTime() > d2.gregDate.getTime()) { start = d2; end = d1; }
            const actualDays = Math.round((end.gregDate.getTime() - start.gregDate.getTime()) / 86400000) + 1;
            const yDiff = end.gy - start.gy, mDiff = end.gm - start.gm;
            const totalMonths = yDiff * 12 + mDiff;
            const sDay = Math.min(start.gd, 30), eDay = Math.min(end.gd, 30);
            let febBonus = 0;
            if (end.gm === 2) {
                const isLeap = (end.gy % 4 === 0 && end.gy % 100 !== 0) || (end.gy % 400 === 0);
                if (!isLeap && end.gd === 28) febBonus = 2;
                else if (isLeap && end.gd === 29) febBonus = 1;
            }
            const fixedDays = (totalMonths * 30) + (eDay - sDay) + 1 + febBonus;
            const degreeCount = yDiff + 1;
            const daysStartYear = Math.max(0, (12 - start.gm) * 30 + (30 - sDay) + 1);
            const daysEndYear = (end.gm - 1) * 30 + eDay + febBonus;
            return { fixedDays: Math.max(1, fixedDays), actualDays: Math.max(1, actualDays), degreeCount, daysStartYear, daysEndYear, yDiff };
        }

        function setPayrollMode(mode) {
            currentPayrollMode = mode;
            const btnDate = document.getElementById('modeBtnDate');
            const btnDays = document.getElementById('modeBtnDays');
            const btnPromo = document.getElementById('modeBtnPromo');
            const panelDate = document.getElementById('payrollDateInputs');
            const panelDays = document.getElementById('payrollDaysInputs');
            const panelPromo = document.getElementById('payrollPromoInputs');
            const standardGrid = document.getElementById('standardRankGrid');
            const sideCards = document.getElementById('payrollSideCards');
            const itemsCard = document.getElementById('payrollItemsCard');

            const inactiveClass = "py-2.5 px-2 sm:px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition";
            btnDate.className = inactiveClass;
            btnDays.className = inactiveClass;
            btnPromo.className = inactiveClass;

            panelDate.classList.add('hidden');
            panelDays.classList.add('hidden');
            panelPromo.classList.add('hidden');

            if (mode === 'date') {
                btnDate.className = "py-2.5 px-2 sm:px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 bg-emerald-700 text-white shadow transition";
                panelDate.classList.remove('hidden');
                standardGrid.classList.remove('hidden');
                sideCards.classList.remove('hidden');
                itemsCard.className = "lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden";
                document.getElementById('mainCardTitle').textContent = 'بيانات الفرد والمسير (بالتاريخ)';
                document.getElementById('itemsListHeaderTitle').textContent = 'تفاصيل الفروقات والبدلات والعلاوات';
            } else if (mode === 'days') {
                btnDays.className = "py-2.5 px-2 sm:px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 bg-amber-500 text-slate-950 shadow transition";
                panelDays.classList.remove('hidden');
                standardGrid.classList.remove('hidden');
                sideCards.classList.remove('hidden');
                itemsCard.className = "lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden";
                document.getElementById('mainCardTitle').textContent = 'بيانات الفرد والمسير (بعدد الأيام)';
                document.getElementById('itemsListHeaderTitle').textContent = 'تفاصيل الفروقات والبدلات والعلاوات';
            } else if (mode === 'promo') {
                btnPromo.className = "py-2.5 px-2 sm:px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 bg-teal-700 text-white shadow transition";
                panelPromo.classList.remove('hidden');
                standardGrid.classList.add('hidden');
                sideCards.classList.add('hidden');
                itemsCard.className = "lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden";
                document.getElementById('mainCardTitle').textContent = 'بيانات حاسبة فرق الترقية';
                document.getElementById('itemsListHeaderTitle').textContent = 'فروقات الترقية المستحقة (البنود المتغيرة بالترقية فقط)';
            }
            calculatePayroll();
        }

        // منطق تحديد الرتبة والدرجة في حاسبة الترقية
        function setPromoInputMethod(method) {
            promoInputMethod = method;
            const btnOld = document.getElementById('promoDirBtnFromOld');
            const btnNew = document.getElementById('promoDirBtnFromNew');
            const oldBox = document.getElementById('promoOldBox');
            const newBox = document.getElementById('promoNewBox');
            const oldBadge = document.getElementById('promoOldBadge');
            const newBadge = document.getElementById('promoNewBadge');

            if (method === 'fromOld') {
                btnOld.className = "py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 bg-emerald-700 text-white shadow transition";
                btnNew.className = "py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition";
                oldBox.className = "bg-white dark:bg-slate-900 p-3.5 rounded-xl border-2 border-emerald-500 space-y-2.5";
                newBox.className = "bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5";
                oldBadge.textContent = "إدخال يدوي";
                oldBadge.className = "text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold";
                newBadge.textContent = "تلقائي (أول مربوط أعلى)";
                newBadge.className = "text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold";
                syncPromotionRanks('old');
            } else {
                btnNew.className = "py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 bg-emerald-700 text-white shadow transition";
                btnOld.className = "py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition";
                newBox.className = "bg-white dark:bg-slate-900 p-3.5 rounded-xl border-2 border-emerald-500 space-y-2.5";
                oldBox.className = "bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5";
                newBadge.textContent = "إدخال يدوي";
                newBadge.className = "text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold";
                oldBadge.textContent = "تلقائي (أقرب مربوط أقل)";
                oldBadge.className = "text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold";
                syncPromotionRanks('new');
            }
            calculatePayroll();
        }

        function onPromoRankChange(changedSide) {
            if (promoInputMethod === 'fromOld' && changedSide === 'old') {
                syncPromotionRanks('old');
            } else if (promoInputMethod === 'fromNew' && changedSide === 'new') {
                syncPromotionRanks('new');
            }
            calculatePayroll();
        }

        function syncPromotionRanks(sourceSide) {
            const oldRankEl = document.getElementById('promoOldRank');
            const oldDegEl = document.getElementById('promoOldDegree');
            const newRankEl = document.getElementById('promoNewRank');
            const newDegEl = document.getElementById('promoNewDegree');

            if (sourceSide === 'old') {
                const oldR = Math.min(parseInt(oldRankEl.value, 10) || 0, RANKS_DATA.length - 2);
                oldRankEl.value = String(oldR);
                const oldD = parseInt(oldDegEl.value, 10) || 1;
                const oldSal = RANKS_DATA[oldR].salaries[oldD - 1];

                const newR = oldR + 1;
                newRankEl.value = String(newR);

                // البحث عن أول درجة في الرتبة الجديدة راتبها الأساسي أعلى من الراتب الأساسي السابق
                let foundDeg = 15;
                for (let d = 1; d <= 15; d++) {
                    if (RANKS_DATA[newR].salaries[d - 1] > oldSal) {
                        foundDeg = d;
                        break;
                    }
                }
                newDegEl.value = String(foundDeg);
            } else {
                const newR = Math.max(parseInt(newRankEl.value, 10) || 1, 1);
                newRankEl.value = String(newR);
                const newD = parseInt(newDegEl.value, 10) || 1;
                const newSal = RANKS_DATA[newR].salaries[newD - 1];

                const oldR = newR - 1;
                oldRankEl.value = String(oldR);

                // البحث عن أقرب درجة في الرتبة السابقة راتبها الأساسي أقل من الراتب الأساسي الجديد
                let foundDeg = 1;
                for (let d = 15; d >= 1; d--) {
                    if (RANKS_DATA[oldR].salaries[d - 1] < newSal) {
                        foundDeg = d;
                        break;
                    }
                }
                oldDegEl.value = String(foundDeg);
            }
        }

        function onPromoDateInput() {
            const dStart = parseFlexibleDate(document.getElementById('promoDateStart').value);
            const dEnd = parseFlexibleDate(document.getElementById('promoDateEnd').value);
            if (dStart) document.getElementById('promoDateStartInfo').textContent = dStart.oppositeNote;
            if (dEnd) document.getElementById('promoDateEndInfo').textContent = dEnd.oppositeNote;
            if (dStart && dEnd) {
                const diff = calculateDaysBetween(dStart, dEnd);
                document.getElementById('promoFixedDays').value = toIndianDigits(diff.fixedDays);
            }
            calculatePayroll();
        }

        function syncDaysInput(source) {
            if (source === 'fixed') {
                document.getElementById('pInputActualDays').value = document.getElementById('pInputFixedDays').value;
            }
            calculatePayroll();
        }

        function setQuickDays(d) {
            const val = toIndianDigits(d);
            document.getElementById('pInputFixedDays').value = val;
            document.getElementById('pInputActualDays').value = val;
            calculatePayroll();
        }

        function calcOldMonthsTool() {
            const sKey = document.getElementById('oldMonthStart').value;
            const eKey = document.getElementById('oldMonthEnd').value;
            const sObj = MONTHS_LIST_FROM.find(m => m.key === sKey);
            const eObj = MONTHS_LIST_TO.find(m => m.key === eKey);
            if (!sObj || !eObj) return;

            const startIdx = sObj.fromIdx;
            const endIdx = eObj.toIdx;
            const monthsDiff = endIdx - startIdx;
            const totalDays = monthsDiff * 30;

            document.getElementById('oldMonthStartIdx').textContent = toIndianDigits(startIdx);
            document.getElementById('oldMonthEndIdx').textContent = toIndianDigits(endIdx);
            document.getElementById('oldMonthsCount').textContent = toIndianDigits(monthsDiff);
            document.getElementById('oldMonthsDays').textContent = toIndianDigits(Math.max(0, totalDays));
        }

        function applyOldMonthsDays() {
            const sKey = document.getElementById('oldMonthStart').value;
            const eKey = document.getElementById('oldMonthEnd').value;
            const sObj = MONTHS_LIST_FROM.find(m => m.key === sKey);
            const eObj = MONTHS_LIST_TO.find(m => m.key === eKey);
            if (!sObj || !eObj) return;
            const monthsDiff = Math.max(1, eObj.toIdx - sObj.fromIdx);
            const days = monthsDiff * 30;
            setQuickDays(days);
        }

        function resetPayrollInputs() {
            document.getElementById('pRank').selectedIndex = 0;
            ['pDegree', 'pTech', 'pRemote', 'pStudy', 'promoOldRank', 'promoOldDegree',
                'promoNewRank', 'promoNewDegree', 'promoTech', 'promoRemote',
                'oldMonthStart', 'oldMonthEnd'].forEach(id => {
                    document.getElementById(id).selectedIndex = 0;
                });
            document.getElementById('pStudy').value = 'ثانوية';
            const today = getTodayHijriDate().formatted;
            document.getElementById('pDateStart').value = today;
            document.getElementById('pDateEnd').value = today;
            document.getElementById('pInputFixedDays').value = "١";
            document.getElementById('pInputActualDays').value = "١";
            document.getElementById('promoDateStart').value = today;
            document.getElementById('promoDateEnd').value = today;
            document.getElementById('promoFixedDays').value = "١٠";
            calculatePayroll();
        }

        function openPayrollDatePicker(inputId) {
            const parsedDate = parseFlexibleDate(document.getElementById(inputId).value);
            const today = getTodayHijriDate();
            activePayrollDateInput = inputId;
            payrollCalendarType = parsedDate ? (parsedDate.isHijriInput ? 'hijri' : 'gregorian') : 'hijri';
            payrollCalendarYear = parsedDate
                ? (payrollCalendarType === 'hijri' ? parsedDate.hy : parsedDate.gy)
                : today.hy;
            payrollCalendarMonth = parsedDate
                ? (payrollCalendarType === 'hijri' ? parsedDate.hm : parsedDate.gm)
                : today.hm;
            renderPayrollCalendar();
            document.getElementById('payrollDatePickerModal').classList.remove('hidden');
        }

        function closePayrollDatePicker() {
            document.getElementById('payrollDatePickerModal').classList.add('hidden');
            activePayrollDateInput = null;
        }

        function setPayrollCalendarType(type) {
            if (type === payrollCalendarType) return;

            const currentDate = payrollCalendarType === 'hijri'
                ? hijriToGregorian(payrollCalendarYear, payrollCalendarMonth, 15)
                : new Date(Date.UTC(payrollCalendarYear, payrollCalendarMonth - 1, 15));
            payrollCalendarType = type;
            if (type === 'hijri') {
                const hijri = getHijriPartsFromGreg(currentDate);
                payrollCalendarYear = hijri.hy;
                payrollCalendarMonth = hijri.hm;
            } else {
                payrollCalendarYear = currentDate.getUTCFullYear();
                payrollCalendarMonth = currentDate.getUTCMonth() + 1;
            }
            renderPayrollCalendar();
        }

        function shiftPayrollCalendarMonth(amount) {
            payrollCalendarMonth += amount;
            if (payrollCalendarMonth < 1) {
                payrollCalendarMonth = 12;
                payrollCalendarYear--;
            } else if (payrollCalendarMonth > 12) {
                payrollCalendarMonth = 1;
                payrollCalendarYear++;
            }
            renderPayrollCalendar();
        }

        function renderPayrollCalendar() {
            const isHijri = payrollCalendarType === 'hijri';
            const monthNames = isHijri ? HIJRI_MONTHS : GREG_MONTHS;
            const firstDate = isHijri
                ? hijriToGregorian(payrollCalendarYear, payrollCalendarMonth, 1)
                : new Date(Date.UTC(payrollCalendarYear, payrollCalendarMonth - 1, 1));
            const nextMonthDate = isHijri
                ? hijriToGregorian(
                    payrollCalendarMonth === 12 ? payrollCalendarYear + 1 : payrollCalendarYear,
                    payrollCalendarMonth === 12 ? 1 : payrollCalendarMonth + 1,
                    1
                )
                : new Date(Date.UTC(payrollCalendarYear, payrollCalendarMonth, 1));
            const daysInMonth = Math.round((nextMonthDate - firstDate) / 86400000);
            const weekdayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
            const selectedDate = activePayrollDateInput
                ? parseFlexibleDate(document.getElementById(activePayrollDateInput).value)
                : null;

            document.getElementById('payrollCalendarMonthTitle').textContent =
                `${monthNames[payrollCalendarMonth - 1]} ${toIndianDigits(payrollCalendarYear)}`;
            ['hijri', 'gregorian'].forEach(type => {
                const button = document.getElementById(`payrollCalendar${type === 'hijri' ? 'Hijri' : 'Gregorian'}`);
                const isSelected = type === payrollCalendarType;
                button.className = isSelected
                    ? 'py-2 rounded-lg text-sm font-extrabold bg-emerald-700 text-white shadow'
                    : 'py-2 rounded-lg text-sm font-extrabold text-slate-600 dark:text-slate-300';
                button.setAttribute('aria-pressed', String(isSelected));
            });

            let html = weekdayNames.map(day =>
                `<div class="py-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">${day}</div>`
            ).join('');
            for (let blank = 0; blank < firstDate.getUTCDay(); blank++) {
                html += '<div aria-hidden="true"></div>';
            }
            for (let day = 1; day <= daysInMonth; day++) {
                const date = isHijri
                    ? hijriToGregorian(payrollCalendarYear, payrollCalendarMonth, day)
                    : new Date(Date.UTC(payrollCalendarYear, payrollCalendarMonth - 1, day));
                const isSelected = selectedDate
                    && selectedDate.gy === date.getUTCFullYear()
                    && selectedDate.gm === date.getUTCMonth() + 1
                    && selectedDate.gd === date.getUTCDate();
                html += `<button type="button" onclick="window.selectPayrollCalendarDate(${payrollCalendarYear},${payrollCalendarMonth},${day})" aria-label="${toIndianDigits(day)} ${monthNames[payrollCalendarMonth - 1]} ${toIndianDigits(payrollCalendarYear)}" class="h-9 rounded-lg text-sm font-bold transition ${isSelected ? 'bg-emerald-700 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-slate-700'}">${toIndianDigits(day)}</button>`;
            }
            document.getElementById('payrollCalendarGrid').innerHTML = html;
        }

        function selectPayrollCalendarDate(year, month, day) {
            if (!activePayrollDateInput) return;
            document.getElementById(activePayrollDateInput).value = toIndianDigits(
                `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`
            );
            calculatePayroll();
            closePayrollDatePicker();
        }

        function toggleArt13Item(key) {
            if (key !== 'security') return;
            art13SelectedState[key] = !art13SelectedState[key];
            renderArt13Section();
            if (art13MergeEnabled) renderPayrollItemsList();
        }

        function toggleArt13Merge() {
            art13MergeEnabled = !art13MergeEnabled;
            const button = document.getElementById('art13MergeButton');
            button.setAttribute('aria-pressed', String(art13MergeEnabled));
            button.textContent = art13MergeEnabled
                ? 'إلغاء دمج مادة (١٣) من تفاصيل المسير'
                : 'دمج مادة (١٣) مع تفاصيل المسير';
            button.className = art13MergeEnabled
                ? 'w-full py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-extrabold shadow hover:bg-emerald-600 transition'
                : 'w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-extrabold hover:bg-emerald-100 dark:hover:bg-slate-700 transition';
            renderPayrollItemsList();
        }

        function renderArt13Section() {
            let total = 0;
            ['salary', 'security', 'transport', 'study'].forEach(k => {
                const isSelected = !!art13SelectedState[k];
                if (isSelected) total += (lastArt13Values[k] || 0);
                const box = document.getElementById('art13Box-' + k);
                const chk = document.getElementById('art13Check-' + k);
                if (box && chk) {
                    box.className = isSelected
                        ? "p-2.5 rounded-xl border border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-slate-800 cursor-pointer transition flex flex-col justify-between"
                        : "p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 opacity-55 cursor-pointer transition flex flex-col justify-between";
                    chk.className = isSelected
                        ? "w-4 h-4 rounded bg-amber-500 text-slate-950 flex items-center justify-center text-[10px]"
                        : "w-4 h-4 rounded border border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px] text-transparent";
                }
            });
            document.getElementById('art13Salary').innerHTML = formatWithSAR(lastArt13Values.salary);
            document.getElementById('art13Security').innerHTML = formatWithSAR(lastArt13Values.security);
            document.getElementById('art13Transport').innerHTML = formatWithSAR(lastArt13Values.transport);
            document.getElementById('art13Study').innerHTML = formatWithSAR(lastArt13Values.study);
            document.getElementById('art13Total').innerHTML = formatWithSAR(total);
        }

        function calculatePayroll() {
            document.getElementById('customNetCurrency').innerHTML = SAR_ICON;

            // إذا كان الوضع الحالي هو حاسبة فرق الترقية
            if (currentPayrollMode === 'promo') {
                calculatePromotionPayroll();
                return;
            }

            const rankIdx = parseInt(document.getElementById('pRank').value, 10) || 0;
            const degree = parseInt(document.getElementById('pDegree').value, 10) || 1;
            const techCat = parseInt(document.getElementById('pTech').value, 10) || 1;
            const remotePct = parseFloat(document.getElementById('pRemote').value) || 6;
            const studyLevel = document.getElementById('pStudy').value;

            const rankObj = RANKS_DATA[rankIdx];
            const currentSalary = rankObj.salaries[degree - 1];
            const firstDegreeSalary = rankObj.salaries[0];

            let fixedDays = 30, actualDays = 30, multiStepSalaryTotal = null;

            if (currentPayrollMode === 'date') {
                const dStart = parseFlexibleDate(document.getElementById('pDateStart').value);
                const dEnd = parseFlexibleDate(document.getElementById('pDateEnd').value);
                if (dStart) document.getElementById('pDateStartInfo').textContent = dStart.oppositeNote;
                if (dEnd) document.getElementById('pDateEndInfo').textContent = dEnd.oppositeNote;

                if (dStart && dEnd) {
                    const diff = calculateDaysBetween(dStart, dEnd);
                    fixedDays = diff.fixedDays; actualDays = diff.actualDays;
                    document.getElementById('dispFixedDays').textContent = toIndianDigits(fixedDays);
                    document.getElementById('dispActualDays').textContent = toIndianDigits(actualDays);
                    document.getElementById('dispDegreeCount').textContent = toIndianDigits(diff.degreeCount);
                    document.getElementById('dispDegreeStatus').textContent = diff.degreeCount > 3 ? 'أكثر من ٣ درجات' : 'ضمن ٣ درجات';

                    const startDeg = degree - diff.yDiff;
                    const midDeg = (startDeg === degree || startDeg === degree - 1) ? 0 : (degree - 1);
                    const midDays = midDeg === 0 ? 0 : 360;

                    document.getElementById('progDegStart').textContent = toIndianDigits(startDeg);
                    document.getElementById('progDaysStart').textContent = toIndianDigits(diff.daysStartYear);
                    document.getElementById('progDegMid').textContent = toIndianDigits(midDeg);
                    document.getElementById('progDaysMid').textContent = toIndianDigits(midDays);
                    document.getElementById('progDegEnd').textContent = toIndianDigits(degree);
                    document.getElementById('progDaysEnd').textContent = toIndianDigits(diff.daysEndYear);

                    if (startDeg >= 1 && diff.degreeCount > 1 && diff.degreeCount <= 3) {
                        const sSalDaily = (rankObj.salaries[startDeg - 1] || currentSalary) / 30;
                        const mSalDaily = midDeg >= 1 ? (rankObj.salaries[midDeg - 1] / 30) : 0;
                        const eSalDaily = currentSalary / 30;
                        multiStepSalaryTotal = (sSalDaily * diff.daysStartYear) + (mSalDaily * midDays) + (eSalDaily * diff.daysEndYear);
                    }
                }
            } else {
                fixedDays = Math.max(1, Math.round(parseNum(document.getElementById('pInputFixedDays').value, 1)));
                actualDays = Math.max(1, Math.round(parseNum(document.getElementById('pInputActualDays').value, 1)));
            }

            lastFixedDaysCount = fixedDays;

            const dailySalary = currentSalary / 30;
            const totalSalary = (multiStepSalaryTotal !== null) ? multiStepSalaryTotal : (dailySalary * fixedDays);
            const dailySecurity = (currentSalary * 0.25) / 30, totalSecurity = totalSalary * 0.25;
            const dailyTerrorism = (firstDegreeSalary * 0.25) / 30, totalTerrorism = dailyTerrorism * fixedDays;
            const dailyDanger = 600 / 30, totalDanger = dailyDanger * fixedDays;
            const dailyComputer = (firstDegreeSalary * 0.15) / 30, totalComputer = dailyComputer * fixedDays;
            const dailyRemoteBorder = (firstDegreeSalary * 0.35) / 30, totalRemoteBorder = dailyRemoteBorder * fixedDays;
            const dailyField = 15, totalField = dailyField * actualDays;
            const dailyTransport = rankObj.transport / 30, totalTransport = dailyTransport * fixedDays;
            const dailySubsistence = 500 / 30, totalSubsistence = dailySubsistence * fixedDays;
            const dailySubsistenceExtra = 500 / 30, totalSubsistenceExtra = dailySubsistenceExtra * fixedDays;
            const studyMonthly = STUDY_REWARDS[studyLevel] || 200, dailyStudy = studyMonthly / 30, totalStudy = dailyStudy * fixedDays;
            const techMonthly = rankObj.tech[techCat - 1] || 150, dailyTech = techMonthly / 30, totalTech = dailyTech * fixedDays;
            const remoteMonthly = firstDegreeSalary * (remotePct / 100), dailyRemoteArea = remoteMonthly / 30, totalRemoteArea = dailyRemoteArea * fixedDays;
            const totalInsurance = -(totalSalary * 0.09);

            lastCalculatedItems = [
                { key: 'diffSalary', label: 'فرق راتب', sub: `${rankObj.name} - الدرجة ${toIndianDigits(degree)}`, daily: dailySalary, total: totalSalary, badge: 'أساسي' },
                { key: 'diffSecurity', label: 'فرق علاوة الأمن (٢٥٪)', sub: '٢٥٪ من الأساسي', daily: dailySecurity, total: totalSecurity, badge: '٢٥٪' },
                { key: 'terrorism', label: 'علاوة الإرهاب (٢٥٪)', sub: '٢٥٪ من أول مربوط', daily: dailyTerrorism, total: totalTerrorism, badge: '٢٥٪' },
                { key: 'danger', label: 'علاوة خطر', sub: `٦٠٠ ${SAR_TEXT_SYMBOL} شهرياً`, daily: dailyDanger, total: totalDanger, badge: 'ثابت' },
                { key: 'computer', label: 'علاوة حاسب (١٥٪)', sub: '١٥٪ من أول مربوط', daily: dailyComputer, total: totalComputer, badge: '١٥٪' },
                { key: 'remoteBorder', label: 'حدود نائية (٣٥٪)', sub: '٣٥٪ من أول مربوط', daily: dailyRemoteBorder, total: totalRemoteBorder, badge: '٣٥٪' },
                { key: 'fieldDaily', label: 'يومية ميدان', sub: `${toIndianDigits(actualDays)} يوم فعلي`, daily: dailyField, total: totalField, badge: 'فعلي' },
                { key: 'transport', label: 'بدل نقل', sub: `${toIndianDigits(rankObj.transport)} ${SAR_TEXT_SYMBOL}`, daily: dailyTransport, total: totalTransport, badge: 'نقل' },
                { key: 'subsistence', label: 'إعاشة', sub: `٥٠٠ ${SAR_TEXT_SYMBOL}`, daily: dailySubsistence, total: totalSubsistence, badge: 'إعاشة' },
                { key: 'subsistenceExtra', label: 'إعاشة إضافية', sub: `٥٠٠ ${SAR_TEXT_SYMBOL}`, daily: dailySubsistenceExtra, total: totalSubsistenceExtra, badge: 'إضافية' },
                { key: 'study', label: `مكافأة دراسية (${studyLevel})`, sub: `${toIndianDigits(studyMonthly)} ${SAR_TEXT_SYMBOL}`, daily: dailyStudy, total: totalStudy, badge: 'شهادة' },
                { key: 'techAllowance', label: `علاوة فنية (${toIndianDigits(techCat)})`, sub: `${toIndianDigits(techMonthly)} ${SAR_TEXT_SYMBOL}`, daily: dailyTech, total: totalTech, badge: 'فنية' },
                { key: 'remoteArea', label: `مناطق نائية (${toIndianDigits(remotePct)}٪)`, sub: `${formatMoney(remoteMonthly)} ${SAR_TEXT_SYMBOL}`, daily: dailyRemoteArea, total: totalRemoteArea, badge: `${toIndianDigits(remotePct)}٪` },
                { key: 'dedInsurance', label: 'التأمينات الاجتماعية (-٩٪)', sub: '٩٪ من الأساسي', daily: -(dailySalary * 0.09), total: totalInsurance, badge: 'حسم', isNegative: true }
            ];

            document.getElementById('dedInsurance').innerHTML = formatWithSAR(totalInsurance);
            document.getElementById('dedScholarship').innerHTML = formatWithSAR(totalTerrorism + totalRemoteBorder);
            document.getElementById('dedExcellence').innerHTML = formatWithSAR(totalComputer + totalStudy);
            document.getElementById('dedSecondment').innerHTML = formatWithSAR(totalSubsistence + totalField);

            lastArt13Values = {
                salary: totalSalary / 2,
                security: totalSecurity / 2,
                transport: totalTransport / 2,
                study: totalStudy / 2
            };
            renderArt13Section();
            renderPayrollItemsList();
        }

        // حساب فروقات الترقية فقط (البنود المتغيرة بالترقية دون البنود الثابتة)
        function calculatePromotionPayroll() {
            const oldR = parseInt(document.getElementById('promoOldRank').value, 10) || 0;
            const oldD = parseInt(document.getElementById('promoOldDegree').value, 10) || 1;
            const newR = parseInt(document.getElementById('promoNewRank').value, 10) || 1;
            const newD = parseInt(document.getElementById('promoNewDegree').value, 10) || 1;
            const techCat = parseInt(document.getElementById('promoTech').value, 10) || 1;
            const remotePct = parseFloat(document.getElementById('promoRemote').value) || 8;

            const dStart = parseFlexibleDate(document.getElementById('promoDateStart').value);
            const dEnd = parseFlexibleDate(document.getElementById('promoDateEnd').value);
            if (dStart) document.getElementById('promoDateStartInfo').textContent = dStart.oppositeNote;
            if (dEnd) document.getElementById('promoDateEndInfo').textContent = dEnd.oppositeNote;

            const days = Math.max(1, Math.round(parseNum(document.getElementById('promoFixedDays').value, 10)));
            lastFixedDaysCount = days;

            const oldRankObj = RANKS_DATA[oldR];
            const newRankObj = RANKS_DATA[newR];

            const oldBasic = oldRankObj.salaries[oldD - 1];
            const newBasic = newRankObj.salaries[newD - 1];
            const oldFirst = oldRankObj.salaries[0];
            const newFirst = newRankObj.salaries[0];

            document.getElementById('promoOldBasicDisp').innerHTML = formatWithSAR(oldBasic);
            document.getElementById('promoNewBasicDisp').innerHTML = formatWithSAR(newBasic);

            // الفروقات الشهرية واليومية (الجديد - السابق)
            const diffBasicMonthly = newBasic - oldBasic;
            const diffBasicDaily = diffBasicMonthly / 30;
            const diffBasicTotal = diffBasicDaily * days;

            const diffSecMonthly = (newBasic * 0.25) - (oldBasic * 0.25);
            const diffSecDaily = diffSecMonthly / 30;
            const diffSecTotal = diffSecDaily * days;

            const diffTerrMonthly = (newFirst * 0.25) - (oldFirst * 0.25);
            const diffTerrDaily = diffTerrMonthly / 30;
            const diffTerrTotal = diffTerrDaily * days;

            const diffCompMonthly = (newFirst * 0.15) - (oldFirst * 0.15);
            const diffCompDaily = diffCompMonthly / 30;
            const diffCompTotal = diffCompDaily * days;

            const diffBorderMonthly = (newFirst * 0.35) - (oldFirst * 0.35);
            const diffBorderDaily = diffBorderMonthly / 30;
            const diffBorderTotal = diffBorderDaily * days;

            const diffRemoteMonthly = (newFirst * (remotePct / 100)) - (oldFirst * (remotePct / 100));
            const diffRemoteDaily = diffRemoteMonthly / 30;
            const diffRemoteTotal = diffRemoteDaily * days;

            const oldTech = oldRankObj.tech[techCat - 1] || 0;
            const newTech = newRankObj.tech[techCat - 1] || 0;
            const diffTechMonthly = newTech - oldTech;
            const diffTechDaily = diffTechMonthly / 30;
            const diffTechTotal = diffTechDaily * days;

            const diffTransMonthly = newRankObj.transport - oldRankObj.transport;
            const diffTransDaily = diffTransMonthly / 30;
            const diffTransTotal = diffTransDaily * days;

            const diffInsMonthly = -(diffBasicMonthly * 0.09);
            const diffInsDaily = diffInsMonthly / 30;
            const diffInsTotal = diffInsDaily * days;

            // البنود المتغيرة بالترقية فقط (استبعاد الإعاشة، الإعاشة الإضافية، الميدان، والخطر)
            lastCalculatedItems = [
                { key: 'diffSalary', label: 'فرق الراتب الأساسي للترقية', sub: `من ${oldRankObj.name} (${toIndianDigits(oldD)}) إلى ${newRankObj.name} (${toIndianDigits(newD)}) | الفرق الشهري: ${formatMoney(diffBasicMonthly)}`, daily: diffBasicDaily, total: diffBasicTotal, badge: 'أساسي' },
                { key: 'diffSecurity', label: 'فرق علاوة الأمن (٢٥٪)', sub: `الفرق الشهري: ${formatMoney(diffSecMonthly)}`, daily: diffSecDaily, total: diffSecTotal, badge: '٢٥٪' },
                { key: 'terrorism', label: 'فرق علاوة الإرهاب (٢٥٪)', sub: `الفرق الشهري (أول مربوط): ${formatMoney(diffTerrMonthly)}`, daily: diffTerrDaily, total: diffTerrTotal, badge: '٢٥٪' },
                { key: 'computer', label: 'فرق علاوة الحاسب (١٥٪)', sub: `الفرق الشهري (أول مربوط): ${formatMoney(diffCompMonthly)}`, daily: diffCompDaily, total: diffCompTotal, badge: '١٥٪' },
                { key: 'remoteBorder', label: 'فرق حدود نائية (٣٥٪)', sub: `الفرق الشهري (أول مربوط): ${formatMoney(diffBorderMonthly)}`, daily: diffBorderDaily, total: diffBorderTotal, badge: '٣٥٪' },
                { key: 'remoteArea', label: `فرق مناطق نائية (${toIndianDigits(remotePct)}٪)`, sub: `الفرق الشهري (أول مربوط): ${formatMoney(diffRemoteMonthly)}`, daily: diffRemoteDaily, total: diffRemoteTotal, badge: `${toIndianDigits(remotePct)}٪` },
                { key: 'techAllowance', label: `فرق العلاوة الفنية (فئة ${toIndianDigits(techCat)})`, sub: `من ${toIndianDigits(oldTech)} إلى ${toIndianDigits(newTech)} (الفرق الشهري: ${formatMoney(diffTechMonthly)})`, daily: diffTechDaily, total: diffTechTotal, badge: 'فنية' },
                { key: 'transport', label: 'فرق بدل النقل', sub: `من ${toIndianDigits(oldRankObj.transport)} إلى ${toIndianDigits(newRankObj.transport)} (الفرق الشهري: ${formatMoney(diffTransMonthly)})`, daily: diffTransDaily, total: diffTransTotal, badge: 'نقل' },
                { key: 'dedInsurance', label: 'فرق حسم التأمينات الاجتماعية (-٩٪)', sub: `٩٪ من فرق الراتب الأساسي`, daily: diffInsDaily, total: diffInsTotal, badge: 'حسم', isNegative: true }
            ];

            renderPayrollItemsList();
            document.getElementById('dedInsurance').innerHTML = formatWithSAR(diffInsTotal);
        }

        function getPayrollItemsForDisplay() {
            if (!art13MergeEnabled || currentPayrollMode === 'promo') return lastCalculatedItems;

            const itemKeysByArt13 = {
                diffSalary: 'salary',
                diffSecurity: 'security',
                transport: 'transport',
                study: 'study'
            };

            return lastCalculatedItems.map(item => {
                const art13Key = itemKeysByArt13[item.key];
                if (!art13Key || !art13SelectedState[art13Key]) return item;

                const total = lastArt13Values[art13Key];
                return {
                    ...item,
                    sub: `${item.sub} | مادة (١٣) - النصف`,
                    badge: 'مادة ١٣',
                    total,
                    daily: total / lastFixedDaysCount
                };
            });
        }

        function renderPayrollItemsList() {
            const container = document.getElementById('payrollItemsList');
            let html = '', netSum = 0;
            getPayrollItemsForDisplay().forEach(item => {
                const checked = !!selectedItemsState[item.key];
                if (checked) netSum += item.total;
                const rowBg = checked ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/60 dark:bg-slate-900/40 opacity-60';
                const valColor = item.isNegative ? 'text-red-600' : 'text-emerald-700 dark:text-emerald-400';
                html += `
                <div onclick="window.togglePayrollItem('${item.key}')" class="${rowBg} px-4 py-3 flex items-center justify-between gap-2 cursor-pointer hover:bg-emerald-50/40 transition">
                    <div class="flex items-center gap-3">
                        <div class="w-5 h-5 rounded-md flex items-center justify-center border ${checked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'}">
                            ${checked ? '<i class="fa-solid fa-check text-xs"></i>' : ''}
                        </div>
                        <div>
                            <div class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                                <span>${item.label}</span>
                                <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">${item.badge}</span>
                            </div>
                            <div class="text-[11px] text-slate-400">${item.sub}</div>
                        </div>
                    </div>
                    <div class="text-left">
                        <div class="font-black text-sm sm:text-base ${valColor} font-mono">${formatWithSAR(item.total)}</div>
                        <div class="text-[11px] text-slate-400 font-mono">اليومية: ${formatWithSAR(item.daily)}</div>
                    </div>
                </div>`;
            });
            container.innerHTML = html;
            document.getElementById('customNetTotal').textContent = formatMoney(netSum);
        }

        function togglePayrollItem(key) { selectedItemsState[key] = !selectedItemsState[key]; renderPayrollItemsList(); }
        function toggleAllItems(selectAll) { Object.keys(selectedItemsState).forEach(k => selectedItemsState[k] = selectAll); renderPayrollItemsList(); }

        function copyPayrollReport() {
            let net = 0;
            let lines = ['📋 *تقرير حاسبة المسيرات*'];

            if (currentPayrollMode === 'date') {
                const d1 = parseFlexibleDate(document.getElementById('pDateStart').value);
                const d2 = parseFlexibleDate(document.getElementById('pDateEnd').value);
                const fStr = d1 ? d1.inputFormatted : document.getElementById('pDateStart').value;
                const tStr = d2 ? d2.inputFormatted : document.getElementById('pDateEnd').value;
                lines.push(`📅 الفترة من: ${fStr} إلى: ${tStr}`);
                lines.push(`🔢 عدد الأيام الثابتة: ${toIndianDigits(lastFixedDaysCount)} يوم`);
            } else if (currentPayrollMode === 'days') {
                lines.push(`🔢 عدد الأيام الثابتة: ${toIndianDigits(lastFixedDaysCount)} يوم`);
            } else if (currentPayrollMode === 'promo') {
                const d1 = parseFlexibleDate(document.getElementById('promoDateStart').value);
                const d2 = parseFlexibleDate(document.getElementById('promoDateEnd').value);
                const fStr = d1 ? d1.inputFormatted : document.getElementById('promoDateStart').value;
                const tStr = d2 ? d2.inputFormatted : document.getElementById('promoDateEnd').value;
                lines.push(`⬆️ *فرق ترقية*`);
                lines.push(`📅 الفترة من: ${fStr} إلى: ${tStr}`);
                lines.push(`🔢 عدد الأيام الثابتة: ${toIndianDigits(lastFixedDaysCount)} يوم`);
            }

            lines.push('─────────────────');
            getPayrollItemsForDisplay().forEach(item => {
                if (selectedItemsState[item.key]) {
                    net += item.total;
                    const source = item.badge === 'مادة ١٣' ? ' (مادة ١٣ - النصف)' : '';
                    lines.push(`• ${item.label}${source}: ${formatMoney(item.total)} ${SAR_TEXT_SYMBOL}`);
                }
            });
            lines.push('─────────────────');
            lines.push(`💰 *صافي العلاوات والبدلات المحددة:* ${formatMoney(net)} ${SAR_TEXT_SYMBOL}`);

            const ta = document.createElement('textarea');
            ta.value = lines.join('\n');
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch(e){}
            document.body.removeChild(ta);
            const t = document.getElementById('toast');
            t.classList.remove('hidden');
            setTimeout(() => t.classList.add('hidden'), 2000);
        }

        // Date Converter & Calc
        function populateConvMonthsDropdown(calType, selectedMonth) {
            const monthNames = calType === 'greg' ? GREG_MONTHS : HIJRI_MONTHS;
            const mEl = document.getElementById('convMonth');
            const currentM = selectedMonth || parseInt(mEl.value, 10) || 1;
            let mOpts = '';
            for (let i = 1; i <= 12; i++) {
                mOpts += `<option value="${i}" ${i === currentM ? 'selected' : ''}>${toIndianDigits(i)} - ${monthNames[i - 1]}</option>`;
            }
            mEl.innerHTML = mOpts;
        }

        function onConvCalTypeChange() {
            const calType = document.getElementById('convCalType').value;
            const parsed = parseFlexibleDate(document.getElementById('convInput').value);
            if (parsed) {
                if (calType === 'greg') {
                    populateConvMonthsDropdown('greg', parsed.gm);
                    document.getElementById('convDay').value = String(parsed.gd);
                    document.getElementById('convYear').value = toIndianDigits(parsed.gy);
                    document.getElementById('convInput').value = parsed.gregFormatted;
                } else {
                    populateConvMonthsDropdown('hijri', parsed.hm);
                    document.getElementById('convDay').value = String(parsed.hd);
                    document.getElementById('convYear').value = toIndianDigits(parsed.hy);
                    document.getElementById('convInput').value = parsed.hijriFormatted;
                }
            } else {
                populateConvMonthsDropdown(calType, 1);
                document.getElementById('convYear').value = toIndianDigits(calType === 'greg' ? 2026 : 1447);
                syncFromDropdowns();
            }
            runSingleDateConvert(true);
        }

        function runSingleDateConvert(skipDropdownSync = false) {
            const parsed = parseFlexibleDate(document.getElementById('convInput').value);
            if (!parsed) return;
            document.getElementById('convResWeekday').textContent = parsed.weekday;
            document.getElementById('convResHijri').textContent = parsed.hijriFormatted;
            document.getElementById('convResGreg').textContent = parsed.gregFormatted;
            document.getElementById('convInputSubNote').textContent = parsed.oppositeNote;

            if (!skipDropdownSync) {
                const calType = parsed.isHijriInput ? 'hijri' : 'greg';
                document.getElementById('convCalType').value = calType;
                if (calType === 'greg') {
                    populateConvMonthsDropdown('greg', parsed.gm);
                    document.getElementById('convDay').value = String(parsed.gd);
                    document.getElementById('convYear').value = toIndianDigits(parsed.gy);
                } else {
                    populateConvMonthsDropdown('hijri', parsed.hm);
                    document.getElementById('convDay').value = String(parsed.hd);
                    document.getElementById('convYear').value = toIndianDigits(parsed.hy);
                }
            }
        }

        function syncFromDropdowns() {
            const calType = document.getElementById('convCalType').value;
            const d = document.getElementById('convDay').value;
            const m = document.getElementById('convMonth').value;
            const defaultYear = calType === 'greg' ? 2026 : 1441;
            const y = Math.round(parseNum(document.getElementById('convYear').value, defaultYear));
            document.getElementById('convInput').value = toIndianDigits(`${String(d).padStart(2,'0')}-${String(m).padStart(2,'0')}-${y}`);
            runSingleDateConvert(true);
        }

        function setTodayInConverter() {
            const now = new Date();
            document.getElementById('convInput').value = toIndianDigits(`${String(now.getDate()).padStart(2,'0')}-${String(now.getMonth()+1).padStart(2,'0')}-${now.getFullYear()}`);
            runSingleDateConvert();
        }

        function calcDateDifferenceTab() {
            const d1 = parseFlexibleDate(document.getElementById('diffDate1').value);
            const d2 = parseFlexibleDate(document.getElementById('diffDate2').value);
            if (d1) document.getElementById('diffDate1Sub').textContent = d1.oppositeNote;
            if (d2) document.getElementById('diffDate2Sub').textContent = d2.oppositeNote;
            if (d1 && d2) {
                const res = calculateDaysBetween(d1, d2);
                document.getElementById('diffResFixed').textContent = toIndianDigits(res.fixedDays);
                document.getElementById('diffResActual').textContent = toIndianDigits(res.actualDays);
            }
        }

        function transferDatesToPayroll() {
            document.getElementById('pDateStart').value = document.getElementById('diffDate1').value;
            document.getElementById('pDateEnd').value = document.getElementById('diffDate2').value;
            setPayrollMode('date'); switchTab('tab-payroll'); calculatePayroll();
        }

        // Remote Areas % Tab
        function setRemotePct(pct) {
            document.getElementById('remoteCustomPercent').value = toIndianDigits(pct);
            calculateRemoteTab();
        }

        function updateRemotePctButtons(pct) {
            document.querySelectorAll('[data-remote-pct]').forEach(button => {
                const isSelected = Number(button.dataset.remotePct) === pct;
                const isSpecialRate = Number(button.dataset.remotePct) >= 25;
                button.setAttribute('aria-pressed', String(isSelected));
                button.className = isSelected
                    ? 'px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-600 text-white transition'
                    : `px-3 py-1.5 rounded-xl text-xs font-extrabold ${isSpecialRate ? 'bg-amber-100 text-amber-800 hover:bg-amber-500' : 'bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white'} transition`;
            });
        }

        function calculateRemoteTab() {
            const pct = parseNum(document.getElementById('remoteCustomPercent').value, 0);
            const days = Math.max(1, Math.round(parseNum(document.getElementById('remoteCustomDays').value, 30)));
            updateRemotePctButtons(pct);
            document.getElementById('remoteHeaderPct').textContent = `${toIndianDigits(pct)}٪`;
            
            let html = '';
            RANKS_DATA.forEach((rank, idx) => {
                const firstDegreeBasic = rank.salaries[0];
                const monthlyAllowance = firstDegreeBasic * (pct / 100);
                const dailyAllowance = monthlyAllowance / 30;
                const totalForDays = dailyAllowance * days;

                html += `
                <tr class="hover:bg-emerald-50/50 transition">
                    <td class="py-3 px-4 font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-black">${toIndianDigits(idx + 1)}</span>
                        <span>${rank.name}</span>
                    </td>
                    <td class="py-3 px-4 text-center font-bold font-mono text-slate-700 dark:text-slate-300">${formatWithSAR(firstDegreeBasic, true)}</td>
                    <td class="py-3 px-4 text-center"><span class="font-black text-base text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-xl">${formatWithSAR(monthlyAllowance)}</span></td>
                    <td class="py-3 px-4 text-center font-bold font-mono text-slate-600 dark:text-slate-400">${formatWithSAR(dailyAllowance)}</td>
                    <td class="py-3 px-4 text-center font-black font-mono text-amber-600">${formatWithSAR(totalForDays)}</td>
                </tr>`;
            });
            document.getElementById('remoteRanksTableBody').innerHTML = html;
        }

        // Tables Tab
        function setSalaryTableMode(mode) {
            salaryTableMode = mode;
            ['basic', 'sec25'].forEach(m => {
                const btn = document.getElementById('stBtn-' + m);
                if(btn) btn.className = (m === mode) ? "px-3 py-1.5 rounded-lg bg-emerald-700 text-white shadow" : "px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300";
            });
            renderSalaryTable();
        }

        function renderSalaryTable() {
            let html = '';
            RANKS_DATA.forEach((rank, rIdx) => {
                let incVal = salaryTableMode === 'sec25' ? (rank.increment * 0.25) : rank.increment;
                html += `<tr><td class="py-3 px-3 text-right font-extrabold sticky-col bg-white dark:bg-slate-900">${rank.name}</td><td class="py-3 px-2 font-black text-amber-600 bg-amber-50 font-mono">${formatWithSAR(incVal, true)}</td>`;
                rank.salaries.forEach((sal, dIdx) => {
                    let val = salaryTableMode === 'sec25' ? (sal * 0.25) : sal;
                    html += `<td onclick="window.inspectRankDegree(${rIdx}, ${dIdx + 1})" class="py-3 px-2.5 font-mono font-bold hover:bg-emerald-600 hover:text-white cursor-pointer rounded transition">${formatMoney(val, true)}</td>`;
                });
                html += `</tr>`;
            });
            document.getElementById('basicSalaryTableBody').innerHTML = html;
        }

        function renderTechTable() {
            let html = '';
            RANKS_DATA.forEach(rank => {
                html += `<tr><td class="py-3 px-3 text-right font-extrabold sticky-col bg-white dark:bg-slate-900">${rank.name}</td>`;
                rank.tech.forEach(tVal => { html += `<td class="py-3 px-2.5 font-mono font-bold text-emerald-700">${formatWithSAR(tVal, true)}</td>`; });
                html += `</tr>`;
            });
            document.getElementById('techAllowanceTableBody').innerHTML = html;
        }

        function inspectRankDegree(rIdx, degree) {
            inspectedRankIdx = rIdx; inspectedDegree = degree;
            const rank = RANKS_DATA[rIdx], sal = rank.salaries[degree - 1];
            document.getElementById('cellModalTitle').textContent = `${rank.name} — الدرجة (${toIndianDigits(degree)})`;
            document.getElementById('cellModalBody').innerHTML = `
                <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 border"><div class="text-slate-500">الراتب الأساسي</div><div class="font-black text-base text-emerald-700 font-mono">${formatWithSAR(sal)}</div></div>
                    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border"><div class="text-slate-500">العلاوة السنوية</div><div class="font-bold text-sm text-amber-600 font-mono">${formatWithSAR(rank.increment, true)}</div></div>
                </div>`;
            document.getElementById('cellModal').classList.remove('hidden');
        }

        function closeCellModal() { document.getElementById('cellModal').classList.add('hidden'); }
        function useRankDegreeInCalculator() {
            document.getElementById('pRank').value = String(inspectedRankIdx);
            document.getElementById('pDegree').value = String(inspectedDegree);
            closeCellModal(); switchTab('tab-payroll'); calculatePayroll();
        }

        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            const target = document.getElementById(tabId); if (target) target.classList.add('active');
            ['tab-payroll', 'tab-dates', 'tab-remote', 'tab-tables'].forEach(t => {
                const deskBtn = document.getElementById('desk-' + t), mobBtn = document.getElementById('mob-' + t);
                if (deskBtn) deskBtn.className = (t === tabId) ? "nav-btn-desk flex-1 py-2 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-amber-500 text-slate-950 shadow transition" : "nav-btn-desk flex-1 py-2 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-emerald-100 hover:bg-emerald-800/50 transition";
                if (mobBtn) mobBtn.className = (t === tabId) ? "nav-btn-mob flex flex-col items-center justify-center gap-1 text-emerald-700 dark:text-emerald-400 font-extrabold" : "nav-btn-mob flex flex-col items-center justify-center gap-1 text-slate-400 font-medium";
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function toggleDarkMode() {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            document.getElementById('themeIcon').className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }

        function openApkModal() { document.getElementById('apkModal').classList.remove('hidden'); }
        function closeApkModal() { document.getElementById('apkModal').classList.add('hidden'); }

        // Bind all functions to window
        window.switchTab = switchTab;
        window.setPayrollMode = setPayrollMode;
        window.setPromoInputMethod = setPromoInputMethod;
        window.onPromoRankChange = onPromoRankChange;
        window.onPromoDateInput = onPromoDateInput;
        window.syncDaysInput = syncDaysInput;
        window.setQuickDays = setQuickDays;
        window.calcOldMonthsTool = calcOldMonthsTool;
        window.applyOldMonthsDays = applyOldMonthsDays;
        window.resetPayrollInputs = resetPayrollInputs;
        window.openPayrollDatePicker = openPayrollDatePicker;
        window.closePayrollDatePicker = closePayrollDatePicker;
        window.setPayrollCalendarType = setPayrollCalendarType;
        window.shiftPayrollCalendarMonth = shiftPayrollCalendarMonth;
        window.selectPayrollCalendarDate = selectPayrollCalendarDate;
        window.calculatePayroll = calculatePayroll;
        window.togglePayrollItem = togglePayrollItem;
        window.toggleAllItems = toggleAllItems;
        window.toggleArt13Item = toggleArt13Item;
        window.toggleArt13Merge = toggleArt13Merge;
        window.copyPayrollReport = copyPayrollReport;
        window.onConvCalTypeChange = onConvCalTypeChange;
        window.runSingleDateConvert = runSingleDateConvert;
        window.syncFromDropdowns = syncFromDropdowns;
        window.setTodayInConverter = setTodayInConverter;
        window.calcDateDifferenceTab = calcDateDifferenceTab;
        window.transferDatesToPayroll = transferDatesToPayroll;
        window.setRemotePct = setRemotePct;
        window.calculateRemoteTab = calculateRemoteTab;
        window.setSalaryTableMode = setSalaryTableMode;
        window.inspectRankDegree = inspectRankDegree;
        window.closeCellModal = closeCellModal;
        window.useRankDegreeInCalculator = useRankDegreeInCalculator;
        window.toggleDarkMode = toggleDarkMode;
        window.openApkModal = openApkModal;
        window.closeApkModal = closeApkModal;

        window.addEventListener('DOMContentLoaded', () => {
            window.addEventListener('keydown', event => {
                if (event.key === 'Escape') closePayrollDatePicker();
            });

            const rankOptionsHtml = RANKS_DATA.map((r, i) => `<option value="${i}">${r.name}</option>`).join('');
            document.getElementById('pRank').innerHTML = rankOptionsHtml;
            document.getElementById('promoOldRank').innerHTML = rankOptionsHtml;
            document.getElementById('promoNewRank').innerHTML = rankOptionsHtml;

            let degHtml = '';
            for (let d = 1; d <= 15; d++) degHtml += `<option value="${d}">الدرجة ${toIndianDigits(d)}</option>`;
            document.getElementById('pDegree').innerHTML = degHtml;
            document.getElementById('promoOldDegree').innerHTML = degHtml;
            document.getElementById('promoNewDegree').innerHTML = degHtml;

            let dOpts = ''; for (let i = 1; i <= 31; i++) dOpts += `<option value="${i}">${toIndianDigits(i)}</option>`;
            document.getElementById('convDay').innerHTML = dOpts;
            const today = getTodayHijriDate();
            document.getElementById('pDateStart').value = today.formatted;
            document.getElementById('pDateEnd').value = today.formatted;
            document.getElementById('promoDateStart').value = today.formatted;
            document.getElementById('promoDateEnd').value = today.formatted;
            document.getElementById('diffDate1').value = today.formatted;
            document.getElementById('diffDate2').value = today.formatted;
            document.getElementById('convInput').value = today.formatted;
            document.getElementById('convCalType').selectedIndex = 0;
            populateConvMonthsDropdown('hijri', today.hm);
            document.getElementById('convDay').value = String(today.hd);
            document.getElementById('convYear').value = toIndianDigits(today.hy);

            // تعبئة قوائم الأشهر (الفترة من = أشهر أقل، الفترة إلى = أشهر أكثر)
            document.getElementById('oldMonthStart').innerHTML = MONTHS_LIST_FROM.map(item =>
                `<option value="${item.key}">${toIndianDigits(item.displayKey)} (${item.type})</option>`
            ).join('');

            document.getElementById('oldMonthEnd').innerHTML = MONTHS_LIST_TO.map(item =>
                `<option value="${item.key}">${toIndianDigits(item.displayKey)} (${item.type})</option>`
            ).join('');

            calculatePayroll();
            calcOldMonthsTool();
            runSingleDateConvert();
            calcDateDifferenceTab();
            calculateRemoteTab();
            renderSalaryTable();
            renderTechTable();

            // تحويل أي أرقام تُكتب في الحقول إلى الصيغة الهندية (٠-٩) فوراً
            document.querySelectorAll('input').forEach(inp => {
                inp.addEventListener('input', function () {
                    const ind = toIndianDigits(this.value);
                    if (this.value !== ind) this.value = ind;
                });
            });
        });
