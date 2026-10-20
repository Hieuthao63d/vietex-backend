"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./src/db");
const categoryTranslations = {
    "canned-fruits": {
        en: { name: "Canned Fruits" },
        vi: { name: "Trái Cây Đóng Hộp" },
        ko: { name: "과일 통조림" },
        th: { name: "ผลไม้กระป๋อง" },
        ms: { name: "Buah-buahan Dalam Tin" },
        id: { name: "Buah Kaleng" }
    },
    "canned-vegetables": {
        en: { name: "Canned Vegetables" },
        vi: { name: "Rau Củ Đóng Hộp" },
        ko: { name: "야채 통조림" },
        th: { name: "ผักกระป๋อง" },
        ms: { name: "Sayur-sayuran Dalam Tin" },
        id: { name: "Sayuran Kaleng" }
    },
    "dried-fruits": {
        en: { name: "Dried Fruits" },
        vi: { name: "Trái Cây Sấy" },
        ko: { name: "건조 과일" },
        th: { name: "ผลไม้อบแห้ง" },
        ms: { name: "Buah-buahan Kering" },
        id: { name: "Buah Kering" }
    },
    "frozen-fruits": {
        en: { name: "Frozen Fruits" },
        vi: { name: "Trái Cây Đông Lạnh (IQF)" },
        ko: { name: "냉동 과일 (IQF)" },
        th: { name: "ผลไม้แช่แข็ง (IQF)" },
        ms: { name: "Buah-buahan Beku (IQF)" },
        id: { name: "Buah Beku (IQF)" }
    },
    "fruit-juice-concentrates": {
        en: { name: "Fruit Juice / Concentrates" },
        vi: { name: "Nước Ép & Trái Cây Cô Đặc" },
        ko: { name: "과일 주스 및 농축액" },
        th: { name: "น้ำผลไม้และน้ำผลไม้เข้มข้น" },
        ms: { name: "Jus Buah / Pati Pekat" },
        id: { name: "Jus Buah / Konsentrat" }
    },
    "fresh-fruits": {
        en: { name: "Fresh Fruits" },
        vi: { name: "Trái Cây & Nông Sản Tươi" },
        ko: { name: "신선 과일 및 농산물" },
        th: { name: "ผลไม้สดและผลผลิตทางการเกษตร" },
        ms: { name: "Buah-buahan Segar" },
        id: { name: "Buah Segar" }
    },
    "canned-fish": {
        en: { name: "Canned Fish" },
        vi: { name: "Cá Đóng Hộp" },
        ko: { name: "수산물 통조림" },
        th: { name: "ปลากระป๋อง" },
        ms: { name: "Ikan Dalam Tin" },
        id: { name: "Ikan Kaleng" }
    }
};
const commonSpecs = {
    en: { origin: "Vietnam", quality: "Export Standard (ISO, HACCP, HALAL, BRC)", packaging: "As requested / OEM", shelfLife: "12 - 36 months" },
    vi: { origin: "Việt Nam", quality: "Tiêu chuẩn xuất khẩu (ISO, HACCP, HALAL, BRC)", packaging: "Theo yêu cầu / Gia công OEM", shelfLife: "12 - 36 tháng" },
    ko: { origin: "베트남", quality: "수출 표준 규격 (ISO, HACCP, HALAL, BRC)", packaging: "바이어 맞춤 포장 / OEM", shelfLife: "12 - 36개월" },
    th: { origin: "เวียดนาม", quality: "มาตรฐานส่งออก (ISO, HACCP, HALAL, BRC)", packaging: "ตามความต้องการของลูกค้า / OEM", shelfLife: "12 - 36 เดือน" },
    ms: { origin: "Vietnam", quality: "Piawaian Eksport (ISO, HACCP, HALAL, BRC)", packaging: "Mengikut permintaan / OEM", shelfLife: "12 - 36 bulan" },
    id: { origin: "Vietnam", quality: "Standar Ekspor (ISO, HACCP, HALAL, BRC)", packaging: "Sesuai pesanan / OEM", shelfLife: "12 - 36 bulan" }
};
function makeProductTrans(names, descs, contents) {
    const result = {};
    for (const lang of ["en", "vi", "ko", "th", "ms", "id"]) {
        result[lang] = {
            name: names[lang],
            shortDescription: descs[lang],
            content: contents?.[lang] || descs[lang],
            ...commonSpecs[lang]
        };
    }
    return result;
}
const productTranslationsMap = {
    "canned-pineapple": makeProductTrans({
        en: "Canned Pineapple in Syrup",
        vi: "Dứa Đóng Hộp Ngâm Nước Đường",
        ko: "시럽 통조림 파인애플",
        th: "สับปะรดกระป๋องในน้ำเชื่อม",
        ms: "Nanas Dalam Tin Dalam Sirap",
        id: "Nanas Kaleng Dalam Sirop"
    }, {
        en: "Premium sweet Vietnamese pineapple chunks and slices preserved in light syrup for global retail and foodservice.",
        vi: "Dứa Queen và Cayen ngọt thanh tự nhiên của Việt Nam cắt khoanh/miếng đóng hộp ngâm siro nhẹ đạt chuẩn xuất khẩu quốc tế.",
        ko: "베트남산 프리미엄 파인애플 조각을 달콤한 라이트 시럽에 담아 신선함과 과즙을 유지한 수출용 통조림 제품입니다.",
        th: "สับปะรดเวียดนามคุณภาพพรีเมียมหั่นชิ้นในน้ำเชื่อมรสกลมกล่อม เหมาะสำหรับอุตสาหกรรมอาหารและส่งออกทั่วโลก",
        ms: "Ketulan nanas Vietnam berkualiti tinggi yang diawet dalam sirap ringan, sesuai untuk pasaran eksport dan perkhidmatan makanan.",
        id: "Potongan nanas Vietnam premium diawetkan dalam sirup manis lembut, siap untuk pasar ritel dan industri kuliner global."
    }),
    "canned-mango": makeProductTrans({
        en: "Canned Mango in Syrup",
        vi: "Xoài Đóng Hộp Ngâm Nước Đường",
        ko: "시럽 통조림 망고",
        th: "มะม่วงกระป๋องในน้ำเชื่อม",
        ms: "Mangga Dalam Tin Dalam Sirap",
        id: "Mangga Kaleng Dalam Sirop"
    }, {
        en: "Succulent slices and dices of sun-ripened Vietnamese tropical mango preserved in delicate syrup.",
        vi: "Những miếng xoài chín mọng vàng ươm thơm lừng đặc trưng của miền Tây Việt Nam ngâm siro thanh mát.",
        ko: "베트남 열대 망고 슬라이스를 달콤하고 부드러운 시럽에 담근 고품질 수출용 망고 통조림입니다.",
        th: "เนื้อมะม่วงสุกสีทองหอมหวานของเวียดนามในน้ำเชื่อม บรรจุกระป๋องตามมาตรฐานสากล",
        ms: "Hirisan mangga tropika Vietnam yang manis dan berjus dalam sirap halus.",
        id: "Irisan mangga tropis matang pilihan dari Vietnam dalam sirup lembut."
    }),
    "canned-lychee": makeProductTrans({
        en: "Canned Lychee in Syrup",
        vi: "Vải Thiều Đóng Hộp Ngâm Nước Đường",
        ko: "시럽 통조림 리치",
        th: "ลิ้นจี่กระป๋องในน้ำเชื่อม",
        ms: "Laici Dalam Tin Dalam Sirap",
        id: "Leci Kaleng Dalam Sirop"
    }, {
        en: "Freshly harvested whole seedless Vietnamese lychees with signature floral aroma in light syrup.",
        vi: "Vải thiều tươi ngon mọng nước bóc vỏ bỏ hạt hái từ vùng trồng Bắc Giang, Hải Dương giữ trọn hương thơm thanh khiết.",
        ko: "신선한 베트남산 리치 원과를 엄선하여 은은한 꽃향기와 탱글탱글한 식감을 보존한 리치 통조림입니다.",
        th: "ลิ้นจี่เวียดนามเนื้อแน่นหอมหวานคว้านเมล็ดในน้ำเชื่อม บรรจุภายใต้มาตรฐานระดับโลก",
        ms: "Buah laici segar tanpa biji dalam sirap manis beraroma wangi semula jadi.",
        id: "Buah leci segar utuh tanpa biji dalam sirup manis dengan aroma harum alami khas Vietnam."
    }),
    "canned-longan": makeProductTrans({
        en: "Canned Longan in Syrup",
        vi: "Nhãn Đóng Hộp Ngâm Nước Đường",
        ko: "시럽 통조림 롱간 (용안)",
        th: "ลำไยกระป๋องในน้ำเชื่อม",
        ms: "Longan Dalam Tin Dalam Sirap",
        id: "Kelengkeng Kaleng Dalam Sirop"
    }, {
        en: "Juicy, crisp whole longans peeled and pitted in light sweet syrup.",
        vi: "Nhãn lồng tươi cùi dày giòn ngọt tự nhiên được bóc vỏ bỏ hạt ngâm siro đóng hộp.",
        ko: "씨를 제거한 아삭하고 달콤한 베트남산 롱간(용안) 시럽 통조림입니다.",
        th: "ลำไยเนื้อหนากรุบกรอบ คว้านเมล็ดในน้ำเชื่อม บรรจุกระป๋องเกรดส่งออก",
        ms: "Buah longan manis dan pejal yang telah dibuang biji dalam sirap ringan.",
        id: "Kelengkeng manis renyah tanpa biji dalam sirup lezat siap saji."
    }),
    "canned-mushroom": makeProductTrans({
        en: "Canned Mushroom",
        vi: "Nấm Đóng Hộp",
        ko: "양송이/버섯 통조림",
        th: "เห็ดกระป๋อง",
        ms: "Cendawan Dalam Tin",
        id: "Jamur Kaleng"
    }, {
        en: "Whole and sliced farm-fresh mushrooms packed in brine, retaining firm texture and natural umami flavor.",
        vi: "Nấm tươi nguyên cây và thái lát đóng hộp ngâm nước muối thanh khiết, giữ nguyên độ giòn ngọt tự nhiên.",
        ko: "갓 수확한 신선한 버섯의 쫄깃한 식감과 감칠맛을 그대로 보존한 수출용 버섯 통조림입니다.",
        th: "เห็ดสดคัดพิเศษทั้งดอกและหั่นชิ้นในน้ำเกลือ คงความหนึบและรสชาติอูมามิตามธรรมชาติ",
        ms: "Cendawan segar utuh dan dihiris dalam air garam yang mengekalkan tekstur pejal.",
        id: "Jamur segar utuh dan irisan dalam larutan garam yang menjaga tekstur kenyal dan rasa gurih alami."
    }),
    "canned-cucumber": makeProductTrans({
        en: "Canned Pickled Cucumber",
        vi: "Dưa Chuột Bao Tử Đóng Hộp",
        ko: "오이 피클 통조림",
        th: "แตงกวาดองกระป๋อง",
        ms: "Timun Jeruk Dalam Tin",
        id: "Acar Mentimun Kaleng"
    }, {
        en: "Crisp baby gherkins and pickled cucumbers marinated with natural herbs and spices.",
        vi: "Dưa chuột bao tử giòn rụm ngâm giấm và thảo mộc tự nhiên, hương vị chua ngọt hài hòa chuẩn Châu Âu.",
        ko: "신선한 미니 오이를 천연 허브와 향신료로 절여 아삭하고 상큼한 맛을 살린 오이 피클 통조림입니다.",
        th: "แตงกวาอ่อนดองกรอบอร่อย หมักด้วยสมุนไพรและเครื่องเทศธรรมชาติตามสูตรมาตรฐานสากล",
        ms: "Timun muda rangup yang dijeruk dengan herba dan rempah semula jadi.",
        id: "Mentimun muda renyah yang diasinkan dengan rempah dan herba alami berkualitas ekspor."
    }),
    "canned-sweet-corns": makeProductTrans({
        en: "Canned Sweet Corn",
        vi: "Ngô Ngọt (Bắp Ngọt) Đóng Hộp",
        ko: "스위트콘 (옥수수) 통조림",
        th: "ข้าวโพดหวานกระป๋อง",
        ms: "Jagung Manis Dalam Tin",
        id: "Jagung Manis Kaleng"
    }, {
        en: "Crisp and naturally sweet golden corn kernels packed at peak freshness within hours of harvest.",
        vi: "Hạt ngô ngọt vàng ươm giòn tan được thu hoạch và đóng hộp ngay trong ngày để giữ trọn độ ngọt tự nhiên.",
        ko: "가장 신선한 시기에 수확하여 톡톡 터지는 아삭함과 천연 단맛을 그대로 담은 골든 스위트콘입니다.",
        th: "เมล็ดข้าวโพดหวานสีทองสดกรอบธรรมชาติ บรรจุกระป๋องทันทีหลังเก็บเกี่ยวเพื่อคงความสดใหม่",
        ms: "Biji jagung manis keemasan yang rangup dan manis secara semula jadi.",
        id: "Butiran jagung manis emas yang renyah alami, dikemas segar langsung setelah panen."
    }),
    "dried-mango": makeProductTrans({
        en: "Soft Dried Mango (Keaw / Cat Chu)",
        vi: "Xoài Sấy Dẻo (Xoài Keo / Cát Chu)",
        ko: "소프트 건망고 (께오 / 깟쭈 품종)",
        th: "มะม่วงอบแห้งเนื้อนุ่ม (แก้ว / ก๊าตจู)",
        ms: "Mangga Kering Lembut (Keaw / Cat Chu)",
        id: "Mangga Kering Lembut (Keaw / Cat Chu)"
    }, {
        en: "Chewy, golden soft-dried mango slices made from premium Vietnamese Keaw and Cat Chu mangoes with low sugar.",
        vi: "Xoài sấy dẻo từng lát vàng ươm từ giống xoài Keo và Cát Chu tuyển chọn, dẻo mềm thơm ngọt tự nhiên ít đường.",
        ko: "베트남 특산 께오(Keaw) 및 깟쭈(Cat Chu) 망고를 저당 공법으로 반건조하여 쫀득하고 진한 풍미를 자랑합니다.",
        th: "มะม่วงอบแห้งเนื้อนุ่มสีทองจากสายพันธุ์คัดพิเศษของเวียดนาม รสชาติหวานอมเปรี้ยวธรรมชาติ น้ำตาลน้อย",
        ms: "Hirisan mangga kering lembut keemasan daripada varieti terpilih Vietnam dengan rasa manis semula jadi.",
        id: "Irisan mangga kering lembut berwarna keemasan dari varietas unggulan Vietnam dengan kadar gula rendah."
    }),
    "frozen-mango": makeProductTrans({
        en: "IQF Frozen Mango Chunks & Cheeks",
        vi: "Xoài Cấp Đông IQF (Cắt Hạt Lựu / Má Xoài)",
        ko: "IQF 냉동 망고 (다이스/슬라이스)",
        th: "มะม่วงแช่แข็ง IQF (หั่นเต๋า/ครึ่งลูก)",
        ms: "Mangga Beku IQF (Potongan Kiub/Hirisan)",
        id: "Mangga Beku IQF (Potongan Dadu/Irisan)"
    }, {
        en: "100% natural tree-ripened Vietnamese mango chunks and cheeks, individual quick frozen (IQF) to lock in flavor.",
        vi: "Xoài chín cây tự nhiên cắt hạt lựu hoặc má xoài được cấp đông siêu tốc IQF giữ nguyên màu sắc và hương vị tươi ngon.",
        ko: "나무에서 완숙된 베트남산 망고를 수확 즉시 급속 냉동(IQF)하여 생과일의 맛과 향을 그대로 살렸습니다.",
        th: "มะม่วงสุกธรรมชาติหั่นเต๋าและผ่าซีก แช่แข็งด่วนแบบ IQF เพื่อคงรสชาติและสีสันสดใหม่เหมือนผลไม้สด",
        ms: "Ketulan mangga masak semula jadi yang disejuk beku pantas (IQF) bagi mengekalkan rasa segar.",
        id: "Potongan mangga matang pohon alami yang dibekukan cepat (IQF) untuk mengunci kesegaran dan rasa."
    }),
    "frozen-pineapple": makeProductTrans({
        en: "IQF Frozen Pineapple Chunks & Tidbits",
        vi: "Dứa Cấp Đông IQF (Cắt Khúc / Hạt Lựu)",
        ko: "IQF 냉동 파인애플",
        th: "สับปะรดแช่แข็ง IQF",
        ms: "Nanas Beku IQF",
        id: "Nanas Beku IQF"
    }, {
        en: "Sweet, bright yellow Vietnamese pineapple chunks flash-frozen using advanced IQF technology.",
        vi: "Dứa chín vàng ươm ngọt đậm cắt miếng được cấp đông nhanh IQF phục vụ làm sinh tố, bánh kẹo và tráng miệng.",
        ko: "당도가 뛰어난 베트남산 파인애플을 한 조각씩 급속 냉동(IQF)하여 스무디, 베이커리 및 식품 가공에 최적화된 제품입니다.",
        th: "สับปะรดเวียดนามสีเหลืองทองรสหวานฉ่ำ หั่นชิ้นแช่แข็งแบบ IQF เหมาะสำหรับสมูทตี้และอุตสาหกรรมอาหาร",
        ms: "Potongan nanas manis berwarna kuning cerah yang disejuk beku menggunakan teknologi IQF.",
        id: "Potongan nanas manis kuning cerah yang dibekukan cepat dengan teknologi IQF modern."
    }),
    "frozen-lychee": makeProductTrans({
        en: "IQF Frozen Lychee (Whole / Peeled Seedless)",
        vi: "Vải Thiều Cấp Đông IQF (Nguyên Quả / Bóc Vỏ Bỏ Hạt)",
        ko: "IQF 냉동 리치 (원물/탈각 씨제거)",
        th: "ลิ้นจี่แช่แข็ง IQF (ทั้งลูก/แกะเปลือกคว้านเมล็ด)",
        ms: "Laici Beku IQF",
        id: "Leci Beku IQF"
    }, {
        en: "Aromatic Vietnamese lychees flash-frozen whole or peeled and pitted for year-round supply.",
        vi: "Vải thiều Việt Nam cấp đông nhanh IQF nguyên quả hoặc bóc vỏ bỏ hạt, giữ trọn vị ngọt thanh suốt bốn mùa.",
        ko: "향긋하고 달콤한 베트남산 리치를 통째로 또는 껍질과 씨를 제거하여 급속 냉동한 프리미엄 제품입니다.",
        th: "ลิ้นจี่เวียดนามหอมหวาน แช่แข็งด่วนแบบ IQF ทั้งแบบทั้งเปลือกและแบบแกะเปลือกคว้านเมล็ด",
        ms: "Buah laici Vietnam beraroma wangi yang disejuk beku pantas untuk bekalan sepanjang tahun.",
        id: "Buah leci Vietnam harum manis yang dibekukan cepat (IQF) untuk pasokan sepanjang tahun."
    }),
    "frozen-dragon-fruits": makeProductTrans({
        en: "IQF Frozen Red & White Dragon Fruit",
        vi: "Thanh Long Ruột Đỏ & Trắng Cấp Đông IQF",
        ko: "IQF 냉동 용과 (레드/화이트 드래곤프루트)",
        th: "แก้วมังกรเนื้อแดงและขาวแช่แข็ง IQF",
        ms: "Buah Naga Merah & Putih Beku IQF",
        id: "Buah Naga Merah & Putih Beku IQF"
    }, {
        en: "Vibrant red and white flesh dragon fruit dices and balls, IQF frozen and rich in antioxidants.",
        vi: "Thanh long ruột đỏ và ruột trắng cắt hạt lựu hoặc múc viên tròn cấp đông IQF, giàu chất chống oxy hóa.",
        ko: "항산화 성분이 풍부한 베트남산 적색 및 백색 용과(드래곤프루트)를 다이스 및 볼 형태로 급속 냉동했습니다.",
        th: "แก้วมังกรเนื้อสีแดงและสีขาวหั่นเต๋าและตักทรงกลม แช่แข็ง IQF อุดมด้วยสารต้านอนุมูลอิสระ",
        ms: "Potongan dadu dan bebola buah naga isi merah dan putih yang kaya dengan antioksidan.",
        id: "Potongan dadu dan bola buah naga merah serta putih beku IQF yang kaya antioksidan."
    }),
    "frozen-passion-fruits-half": makeProductTrans({
        en: "IQF Frozen Passion Fruit - Half Cut",
        vi: "Chanh Dây Cắt Đôi Cấp Đông IQF",
        ko: "IQF 냉동 패션프루트 (반절 컷팅)",
        th: "เสาวรสผ่าครึ่งแช่แข็ง IQF",
        ms: "Buah Markisa Potong Separuh Beku IQF",
        id: "Buah Markisa Potong Setengah Beku IQF"
    }, {
        en: "Fresh purple passion fruits cleanly halved and IQF frozen, preserving intense tropical aroma and pulp.",
        vi: "Chanh dây tím tươi mọng cắt đôi cấp đông nhanh IQF, giữ nguyên dịch quả thơm nồng nàn.",
        ko: "진한 열대 과일 향이 살아있는 신선한 베트남 패션프루트를 반으로 깔끔하게 컷팅하여 급속 냉동했습니다.",
        th: "เสาวรสสีม่วงสดผ่าครึ่งแช่แข็งด่วนแบบ IQF คงความหอมเข้มข้นและเนื้อสัมผัสธรรมชาติ",
        ms: "Buah markisa ungu segar yang dipotong dua dan disejuk beku pantas IQF.",
        id: "Buah markisa ungu segar dibelah dua dan dibekukan cepat (IQF) dengan aroma tropis yang kuat."
    }),
    "frozen-passion-fruits": makeProductTrans({
        en: "Frozen Passion Fruit Pulp (With Seed / Seedless)",
        vi: "Dịch Chanh Dây Đông Lạnh (Có Hạt / Tách Hạt)",
        ko: "냉동 패션프루트 펄프 (씨포함/씨제거)",
        th: "เนื้อเสาวรสแช่แข็ง (มีเมล็ด/แยกเมล็ด)",
        ms: "Isi Buah Markisa Beku (Berbiji / Tanpa Biji)",
        id: "Pulp Buah Markisa Beku (Dengan Biji / Tanpa Biji)"
    }, {
        en: "100% pure Vietnamese passion fruit pulp frozen in blocks or cubes for beverages, desserts, and sauces.",
        vi: "Dịch cốt chanh dây nguyên chất 100% có hạt hoặc tách hạt cấp đông dạng viên/khối dùng cho pha chế và làm bánh.",
        ko: "음료, 베이커리 및 소스 제조에 적합한 100% 순수 베트남산 냉동 패션프루트 원액 펄프입니다.",
        th: "เนื้อเสาวรสแท้ 100% แช่แข็งทั้งแบบมีเมล็ดและแยกเมล็ด สำหรับทำเครื่องดื่ม เบเกอรี่ และซอส",
        ms: "100% isi buah markisa tulen Vietnam yang dibekukan untuk industri minuman dan pencuci mulut.",
        id: "100% sari dan bulir markisa murni Vietnam beku untuk industri minuman, kue, dan saus."
    }),
    "mango-puree": makeProductTrans({
        en: "Aseptic / Frozen Mango Puree",
        vi: "Xoài Nghiền Nguyên Chất (Mango Puree)",
        ko: "망고 퓨레 (무균/냉동)",
        th: "มะม่วงเพียวเร่ (เนื้อเนียนบริสุทธิ์)",
        ms: "Puri Mangga Tulen",
        id: "Puree Mangga Murni"
    }, {
        en: "Smooth, 100% natural mango puree extracted from ripe Vietnamese mangoes with no added sugar or preservatives.",
        vi: "Thịt xoài chín xay nhuyễn nguyên chất 100% đóng túi tiệt trùng Aseptic hoặc cấp đông, không chất bảo quản.",
        ko: "설탕이나 보존제를 전혀 넣지 않고 완숙 망고 과육만을 갈아 만든 100% 천연 망고 퓨레입니다.",
        th: "เนื้อมะม่วงสุกบดละเอียดแท้ 100% ไม่เติมน้ำตาลและวัตถุกันเสีย สำหรับอุตสาหกรรมอาหารและเครื่องดื่ม",
        ms: "Puri mangga asli 100% yang halus daripada mangga masak Vietnam tanpa gula tambahan.",
        id: "Puree mangga alami 100% bertekstur lembut dari mangga matang pilihan tanpa tambahan gula."
    }),
    "pineapple-puree": makeProductTrans({
        en: "Natural Pineapple Puree",
        vi: "Dứa Nghiền Nguyên Chất (Pineapple Puree)",
        ko: "파인애플 퓨레",
        th: "สับปะรดเพียวเร่",
        ms: "Puri Nanas Asli",
        id: "Puree Nanas Alami"
    }, {
        en: "100% pure crushed and refined Vietnamese pineapple puree for industrial beverage and food applications.",
        vi: "Dứa chín xay nhuyễn nguyên chất 100% giữ trọn hương vị nhiệt đới phục vụ chế biến thực phẩm và đồ uống.",
        ko: "베트남산 파인애플을 곱게 갈아 만든 100% 천연 과일 퓨레로 음료 및 식품 제조용 원료입니다.",
        th: "เนื้อสับปะรดบดละเอียดแท้ 100% รสชาติหวานหอมธรรมชาติ สำหรับโรงงานผลิตเครื่องดื่มและอาหาร",
        ms: "Puri nanas tulen 100% untuk kegunaan industri minuman dan pemprosesan makanan.",
        id: "Puree nanas murni 100% dari nanas pilihan Vietnam untuk bahan baku industri minuman dan makanan."
    }),
    "passion-fruits-puree": makeProductTrans({
        en: "Seedless Passion Fruit Puree",
        vi: "Chanh Dây Nghiền Tách Hạt (Passion Fruit Puree)",
        ko: "패션프루트 퓨레 (씨제거)",
        th: "เสาวรสเพียวเร่ไร้เมล็ด",
        ms: "Puri Buah Markisa Tanpa Biji",
        id: "Puree Buah Markisa Tanpa Biji"
    }, {
        en: "Aromatic seedless passion fruit puree with high natural acidity and rich tropical flavor profile.",
        vi: "Cốt chanh dây nghiền mịn tách hạt nguyên chất 100%, hương thơm nồng nàn và vị chua thanh tự nhiên.",
        ko: "씨를 제거하여 부드럽고 진한 향과 상큼한 산미를 지닌 100% 천연 패션프루트 퓨레입니다.",
        th: "เสาวรสเพียวเร่สกัดเมล็ดออก กลิ่นหอมเข้มข้นและรสเปรี้ยวสดชื่นตามธรรมชาติ",
        ms: "Puri buah markisa tanpa biji yang beraroma kuat dan kaya dengan rasa tropika asli.",
        id: "Puree markisa tanpa biji dengan aroma tropis yang kuat dan kesegaran alami."
    }),
    "mango-juice": makeProductTrans({
        en: "NFC Mango Juice (100% Not From Concentrate)",
        vi: "Nước Ép Xoài Nguyên Chất (NFC)",
        ko: "NFC 망고 착즙 주스",
        th: "น้ำมะม่วงคั้นสดแท้ 100% (NFC)",
        ms: "Jus Mangga Tulen NFC",
        id: "Jus Mangga Murni NFC"
    }, {
        en: "Direct-pressed NFC mango juice capturing the authentic taste and vitamins of fresh Vietnamese mangoes.",
        vi: "Nước ép xoài nguyên chất không qua cô đặc (NFC), giữ trọn vitamin và hương vị xoài tươi tự nhiên.",
        ko: "물 한 방울 넣지 않고 신선한 베트남 망고를 그대로 착즙한 프리미엄 NFC 주스 원액입니다.",
        th: "น้ำมะม่วงคั้นสดไม่ผ่านการทำให้เข้มข้น (NFC) คงคุณค่าวิตามินและรสชาติมะม่วงแท้",
        ms: "Jus mangga perahan terus (NFC) yang mengekalkan rasa asli dan vitamin buah segar.",
        id: "Jus mangga peras murni (NFC) yang menjaga vitamin dan cita rasa asli mangga segar Vietnam."
    }),
    "pineapple-juice": makeProductTrans({
        en: "NFC Pineapple Juice",
        vi: "Nước Ép Dứa Nguyên Chất (NFC)",
        ko: "NFC 파인애플 착즙 주스",
        th: "น้ำสับปะรดคั้นสดแท้ 100% (NFC)",
        ms: "Jus Nanas Tulen NFC",
        id: "Jus Nanas Murni NFC"
    }, {
        en: "Refreshing 100% NFC pineapple juice pressed from sweet, sun-ripened pineapples in Vietnam.",
        vi: "Nước ép dứa tươi nguyên chất 100% (NFC) vị ngọt dịu thanh mát từ những trái dứa chín cây.",
        ko: "햇살을 머금고 자란 달콤한 베트남 파인애플을 그대로 착즙한 100% NFC 파인애플 주스입니다.",
        th: "น้ำสับปะรดคั้นสดแท้ 100% (NFC) หอมหวานสดชื่นจากสับปะรดสุกธรรมชาติในเวียดนาม",
        ms: "Jus nanas NFC 100% yang menyegarkan daripada buah nanas manis semula jadi.",
        id: "Jus nanas murni 100% (NFC) yang menyegarkan dari buah nanas matang pilihan Vietnam."
    }),
    "passion-fruits-juice": makeProductTrans({
        en: "NFC Passion Fruit Juice",
        vi: "Nước Ép Chanh Dây Nguyên Chất (NFC)",
        ko: "NFC 패션프루트 착즙 주스",
        th: "น้ำเสาวรสคั้นสดแท้ 100% (NFC)",
        ms: "Jus Buah Markisa Tulen NFC",
        id: "Jus Buah Markisa Murni NFC"
    }, {
        en: "100% single-strength NFC passion fruit juice with vibrant color and intense exotic aroma.",
        vi: "Nước ép chanh dây nguyên chất 100% (NFC) màu vàng cam rực rỡ và hương thơm nhiệt đới đặc trưng.",
        ko: "강렬한 열대 과일의 향과 선명한 빛깔을 자랑하는 100% 순수 NFC 패션프루트 착즙액입니다.",
        th: "น้ำเสาวรสคั้นสดแท้ 100% (NFC) สีเหลืองทองสดใสพร้อมกลิ่นหอมผลไม้เมืองร้อนอันเป็นเอกลักษณ์",
        ms: "Jus buah markisa NFC 100% dengan warna terang dan aroma eksotik yang memikat.",
        id: "Jus markisa murni 100% (NFC) dengan warna cerah dan aroma tropis yang khas."
    }),
    "mango-concentrates": makeProductTrans({
        en: "Mango Juice Concentrate",
        vi: "Nước Cốt Xoài Cô Đặc (Mango Concentrate)",
        ko: "망고 주스 농축액",
        th: "น้ำมะม่วงเข้มข้น (Mango Concentrate)",
        ms: "Pati Jus Mangga Pekat",
        id: "Konsentrat Jus Mangga"
    }, {
        en: "High-Brix mango juice concentrate processed under vacuum evaporation for global beverage manufacturers.",
        vi: "Nước cốt xoài cô đặc độ Brix cao chế biến bằng công nghệ bay hơi chân không hiện đại cho ngành đồ uống.",
        ko: "글로벌 음료 및 식품 제조사를 위해 저온 진공 농축 공법으로 생산한 고당도(High-Brix) 망고 농축액입니다.",
        th: "น้ำมะม่วงสกัดเข้มข้นค่า Brix สูง ผลิตด้วยเทคโนโลยีระเหยสุญญากาศสำหรับโรงงานเครื่องดื่มระดับโลก",
        ms: "Pati jus mangga berkepekatan tinggi (High-Brix) untuk pengilang minuman antarabangsa.",
        id: "Konsentrat jus mangga Brix tinggi yang diproses secara higienis untuk industri minuman global."
    }),
    "pineapple-concentrates": makeProductTrans({
        en: "Pineapple Juice Concentrate (60° - 65° Brix)",
        vi: "Nước Cốt Dứa Cô Đặc (60° - 65° Brix)",
        ko: "파인애플 주스 농축액 (60° - 65° Brix)",
        th: "น้ำสับปะรดเข้มข้น (60° - 65° Brix)",
        ms: "Pati Jus Nanas Pekat (60° - 65° Brix)",
        id: "Konsentrat Jus Nanas (60° - 65° Brix)"
    }, {
        en: "Premium 60-65 Brix aseptic and frozen pineapple juice concentrate packed in 200L steel drums.",
        vi: "Nước cốt dứa cô đặc độ ngọt 60-65 Brix đóng phuy sắt 200L tiệt trùng hoặc cấp đông xuất khẩu.",
        ko: "200L 스틸 드럼 무균/냉동 포장으로 공급되는 60~65 Brix 고품질 베트남산 파인애플 농축액입니다.",
        th: "น้ำสับปะรดเข้มข้น 60-65 Brix บรรจุถังเหล็กปลอดเชื้อ 200 ลิตร สำหรับส่งออกอุตสาหกรรมอาหาร",
        ms: "Pati jus nanas pekat 60-65 Brix berkualiti tinggi dibungkus dalam dram keluli 200L.",
        id: "Konsentrat jus nanas 60-65 Brix premium dalam kemasan drum baja 200L aseptik atau beku."
    }),
    "passion-fruits-concentrates": makeProductTrans({
        en: "Passion Fruit Juice Concentrate (50° Brix)",
        vi: "Nước Cốt Chanh Dây Cô Đặc (50° Brix)",
        ko: "패션프루트 농축액 (50° Brix)",
        th: "น้ำเสาวรสเข้มข้น (50° Brix)",
        ms: "Pati Jus Buah Markisa Pekat (50° Brix)",
        id: "Konsentrat Jus Markisa (50° Brix)"
    }, {
        en: "50° Brix passion fruit concentrate retaining rich natural aroma recovery for juices, jellies, and dairy.",
        vi: "Nước cốt chanh dây cô đặc 50° Brix giữ trọn hương thơm tự nhiên, chuyên dùng cho nước giải khát, sữa chua và thạch.",
        ko: "주스, 젤리 및 유제품 가공을 위해 천연 향 회수 공법을 적용한 50° Brix 패션프루트 농축액입니다.",
        th: "น้ำเสาวรสเข้มข้น 50° Brix คงกลิ่นหอมธรรมชาติ เหมาะสำหรับผลิตน้ำผลไม้ เยลลี่ และผลิตภัณฑ์นม",
        ms: "Pati buah markisa pekat 50° Brix dengan aroma semula jadi untuk minuman, jeli dan tenusu.",
        id: "Konsentrat jus markisa 50° Brix dengan aroma alami pekat untuk industri minuman, jeli, dan susu."
    }),
    "fresh-coconut": makeProductTrans({
        en: "Fresh Young Diamond Coconut",
        vi: "Dừa Xiêm Bến Tre Gọt Kim Cương Tươi",
        ko: "신선한 다이아몬드 컷 코코넛",
        th: "มะพร้าวอ่อนตัดแต่งทรงเพชรสด",
        ms: "Kelapa Muda Segar Potongan Berlian",
        id: "Kelapa Muda Segar Potong Berlian"
    }, {
        en: "Naturally sweet aromatic Ben Tre young coconuts, diamond-trimmed and ready to drink.",
        vi: "Dừa xiêm xanh Bến Tre nước ngọt thanh mát tự nhiên, gọt vỏ hình kim cương trắng đẹp xuất khẩu.",
        ko: "달콤하고 청량한 천연 과즙이 가득한 베트남 벤체(Ben Tre)산 다이아몬드 컷팅 신선 코코넛입니다.",
        th: "มะพร้าวอ่อนหวานหอมธรรมชาติจากเบ๊นแจ ตัดแต่งทรงเพชรสวยงามพร้อมดื่มเพื่อการส่งออก",
        ms: "Kelapa muda Ben Tre yang manis dan wangi semula jadi, dipotong bentuk berlian sedia diminum.",
        id: "Kelapa muda manis alami dari Ben Tre, dipotong bentuk berlian elegan siap saji untuk ekspor."
    }),
    "fresh-mango": makeProductTrans({
        en: "Fresh Vietnamese Mango (Cat Chu / Hoa Loc / Keaw)",
        vi: "Xoài Tươi Xuất Khẩu (Cát Chu / Hòa Lộc / Xoài Keo)",
        ko: "신선한 베트남 생망고 (깟쭈 / 호아록)",
        th: "มะม่วงสดเวียดนามเกรดส่งออก",
        ms: "Mangga Segar Vietnam (Cat Chu / Hoa Loc)",
        id: "Mangga Segar Vietnam (Cat Chu / Hoa Loc)"
    }, {
        en: "GlobalGAP certified fresh mangoes with smooth golden skin, fiberless flesh, and rich sweet aroma.",
        vi: "Xoài tươi đạt chuẩn GlobalGAP vỏ mịn vàng ươm, thịt dày ít xơ, vị ngọt đậm đà xuất khẩu đường không và đường biển.",
        ko: "GlobalGAP 인증 농장에서 재배되어 부드러운 과육과 진한 당도를 자랑하는 베트남산 프리미엄 생망고입니다.",
        th: "มะม่วงสดเวียดนามมาตรฐาน GlobalGAP ผิวสวย เนื้อเนียนไร้เสี้ยน รสชาติหวานหอมเข้มข้น",
        ms: "Mangga segar bersijil GlobalGAP dengan isi halus tanpa serat dan rasa manis beraroma.",
        id: "Mangga segar bersertifikat GlobalGAP dengan daging buah lembut tanpa serat dan rasa manis harum."
    }),
    "sweet-potatoes": makeProductTrans({
        en: "Fresh Japanese Purple & Honey Sweet Potatoes",
        vi: "Khoai Lang Nhật Tím & Khoai Lang Mật Tươi",
        ko: "신선한 베트남산 밤고구마 및 꿀고구마",
        th: "มันหวานญี่ปุ่นสีม่วงและมันหวานน้ำผึ้งสด",
        ms: "Keledek Manis Jepun & Madu Segar",
        id: "Ubi Jalar Jepang Ungu & Madu Segar"
    }, {
        en: "High-altitude Central Highlands sweet potatoes with creamy texture and natural honey sweetness.",
        vi: "Khoai lang Nhật và khoai lang mật trồng tại vùng cao nguyên đất đỏ Việt Nam, dẻo bùi và ngọt mật tự nhiên.",
        ko: "베트남 중부 고원지대의 비옥한 토양에서 재배되어 촉촉하고 달콤한 맛이 일품인 고품질 고구마입니다.",
        th: "มันหวานคุณภาพสูงจากที่ราบสูงตอนกลางของเวียดนาม เนื้อเนียนนุ่มและหวานฉ่ำตามธรรมชาติ",
        ms: "Keledek manis dari tanah tinggi Vietnam dengan tekstur lembut berkrim dan manis madu.",
        id: "Ubi jalar pilihan dari dataran tinggi Vietnam dengan tekstur lembut dan rasa manis madu alami."
    }),
    "fresh-lime-seedless": makeProductTrans({
        en: "Fresh Seedless Green Lime",
        vi: "Chanh Không Hạt Tươi Xuất Khẩu",
        ko: "신선한 씨없는 그린 라임",
        th: "มะนาวเขียวไร้เมล็ดสดเกรดส่งออก",
        ms: "Limau Nipis Hijau Tanpa Biji Segar",
        id: "Jeruk Nipis Hijau Tanpa Biji Segar"
    }, {
        en: "Thin-skinned, extra-juicy seedless green limes from the Mekong Delta, favored by Middle East and Asian markets.",
        vi: "Chanh không hạt vỏ mỏng mọng nước trồng tại Đồng bằng sông Cửu Long, thơm dịu và không đắng.",
        ko: "메콩 삼각주에서 수확한 껍질이 얇고 과즙이 풍부한 수출용 씨없는 신선 그린 라임입니다.",
        th: "มะนาวไร้เมล็ดเปลือกบางน้ำเยอะจากสามเหลี่ยมปากแม่น้ำโขง กลิ่นหอมสดชื่นเป็นที่นิยมในตลาดโลก",
        ms: "Limau nipis hijau tanpa biji berkulit nipis dan kaya jus dari Delta Mekong.",
        id: "Jeruk nipis hijau tanpa biji berkulit tipis dan kaya air perasan dari kawasan Delta Mekong."
    }),
    "fresh-pineapple-md2": makeProductTrans({
        en: "Fresh Golden MD2 Pineapple",
        vi: "Dứa Tươi MD2 Vàng Xuất Khẩu",
        ko: "신선한 골든 MD2 파인애플",
        th: "สับปะรดสดสายพันธุ์ MD2 สีทอง",
        ms: "Nanas Segar Emas MD2",
        id: "Nanas Segar Golden MD2"
    }, {
        en: "Internationally acclaimed MD2 variety pineapples with uniform cylindrical shape, golden flesh, and high Brix sweetness.",
        vi: "Giống dứa vàng MD2 chuẩn quốc tế trái đều đẹp, mắt nông, thịt vàng giòn ngọt thanh và thời gian bảo quản lâu.",
        ko: "균일한 모양과 황금빛 과육, 높은 당도와 긴 저장성을 갖춘 국제 표준 MD2 품종 생파인애플입니다.",
        th: "สับปะรดสดพันธุ์ MD2 รูปทรงสวยสม่ำเสมอ เนื้อสีทองกรอบหวานฉ่ำและเก็บรักษาได้นาน",
        ms: "Nanas segar varieti MD2 bertaraf antarabangsa dengan isi keemasan yang manis dan tahan lama.",
        id: "Nanas segar varietas MD2 kelas dunia dengan daging buah keemasan, manis tinggi, dan daya simpan lama."
    }),
    "pomelo": makeProductTrans({
        en: "Fresh Da Xanh Pink Pomelo",
        vi: "Bưởi Da Xanh Ruột Hồng Tươi",
        ko: "신선한 베트남 핑크 포멜로 (자몽)",
        th: "ส้มโอเนื้อชมพูเปลือกเขียวสด",
        ms: "Limau Bali Segar Isi Merah Jambu",
        id: "Jeruk Bali Segar Daging Merah Muda"
    }, {
        en: "Famous Vietnamese Da Xanh pomelo featuring emerald green skin and sweet, juicy ruby-pink segments.",
        vi: "Đặc sản bưởi Da Xanh Việt Nam vỏ xanh ruột hồng đỏ, tép bưởi giòn mọng nước, vị ngọt thanh không chua.",
        ko: "초록빛 껍질 속에 달콤하고 과즙이 풍부한 루비빛 핑크 과육이 가득 찬 베트남 명품 포멜로입니다.",
        th: "ส้มโอพันธุ์ดังของเวียดนาม เปลือกสีเขียวสด เนื้อสีชมพูทับทิมฉ่ำน้ำ รสหวานกลมกล่อม",
        ms: "Limau bali Da Xanh terkenal Vietnam dengan kulit hijau dan isi merah jambu yang manis berjus.",
        id: "Jeruk bali Da Xanh khas Vietnam dengan kulit hijau dan bulir merah muda manis berair."
    }),
    "muskmelon": makeProductTrans({
        en: "Fresh Netted Cantaloupe / Muskmelon",
        vi: "Dưa Lưới Tươi Công Nghệ Cao",
        ko: "신선한 프리미엄 머스크멜론",
        th: "เมล่อนญี่ปุ่นผิวตาข่ายสด",
        ms: "Tembikai Wangi (Muskmelon) Segar",
        id: "Melon Jaring (Muskmelon) Segar"
    }, {
        en: "Greenhouse-grown netted muskmelons with intricate web rind, fragrant orange/green flesh, and 14+ Brix sweetness.",
        vi: "Dưa lưới trồng trong nhà màng công nghệ cao, vân lưới đều đẹp, thịt quả giòn ngọt thơm lừng độ Brix trên 14%.",
        ko: "첨단 스마트팜 온실에서 재배되어 그물 무늬가 선명하고 14 Brix 이상의 높은 당도를 자랑하는 머스크멜론입니다.",
        th: "เมล่อนปลูกในโรงเรือนอัจฉริยะ ลายตาข่ายสวยงาม เนื้อหวานหอมฉ่ำความหวานมากกว่า 14 Brix",
        ms: "Tembikai wangi yang ditanam di rumah hijau berteknologi tinggi dengan kemanisan melebihi 14 Brix.",
        id: "Melon jaring budidaya greenhouse modern dengan daging buah harum manis di atas 14 Brix."
    }),
    "fresh-carrots": makeProductTrans({
        en: "Fresh Washed Export Carrots",
        vi: "Cà Rốt Tươi Rửa Sạch Xuất Khẩu",
        ko: "신선한 세척 당근 (수출용)",
        th: "แครอทสดล้างสะอาดเกรดส่งออก",
        ms: "Lobak Merah Segar Eksport",
        id: "Wortel Segar Cuci Mutu Ekspor"
    }, {
        en: "Bright orange, crunchy, and sweet washed carrots from Hai Duong and Da Lat, a top seller in Korea and Japan.",
        vi: "Cà rốt củ thẳng đều, màu cam đậm, giòn ngọt đã qua dây chuyền rửa sạch và phân cỡ, xuất khẩu mạnh sang Hàn Quốc và Nhật Bản.",
        ko: "한국 및 일본 시장에서 높은 인기를 얻고 있는 아삭하고 당도 높은 베트남 하이즈엉산 세척 당근입니다.",
        th: "แครอทสดสีส้มสดใส หัวสวย กรอบหวาน ผ่านการล้างและคัดเกรดมาตรฐานส่งออกเกาหลีและญี่ปุ่น",
        ms: "Lobak merah segar berwarna jingga terang yang rangup, manis dan telah dibersihkan untuk eksport.",
        id: "Wortel segar warna oranye cerah, renyah dan manis, telah dicuci bersih sesuai standar ekspor."
    }),
    "canned-tuna": makeProductTrans({
        en: "Canned Tuna in Oil / Brine",
        vi: "Cá Ngừ Đại Dương Đóng Hộp (Ngâm Dầu / Nước Muối)",
        ko: "참치 통조림 (식물성 오일 / 식염수)",
        th: "ปลาทูน่ากระป๋อง (ในน้ำมันพืช / น้ำเกลือ)",
        ms: "Tuna Dalam Tin (Minyak / Air Garam)",
        id: "Tuna Kaleng (Dalam Minyak / Air Garam)"
    }, {
        en: "Wild-caught skipjack and yellowfin tuna chunks & flakes packed in soybean/sunflower oil or brine.",
        vi: "Cá ngừ vằn và cá ngừ vây vàng đánh bắt tự nhiên, đóng hộp ngâm dầu thực vật hoặc ngâm nước muối giàu đạm.",
        ko: "청정 해역에서 어획한 가다랑어 및 황다랑어 살코기를 식물성 오일 또는 정제수에 담은 고품질 참치 통조림입니다.",
        th: "เนื้อปลาทูน่าคัดพิเศษบรรจุในน้ำมันถั่วเหลือง น้ำมันทานตะวัน หรือน้ำเกลือ มาตรฐานส่งออกทั่วโลก",
        ms: "Ketulan isi ikan tuna laut dalam yang ditinkan bersama minyak sayuran atau air garam berkualiti.",
        id: "Potongan daging ikan tuna tangkapan laut lepas dalam minyak nabati atau air garam berkualitas tinggi."
    }),
    "canned-sardine-tomato": makeProductTrans({
        en: "Canned Sardines in Tomato Sauce",
        vi: "Cá Mòi Đóng Hộp Sốt Cà Chua",
        ko: "토마토소스 정어리 통조림",
        th: "ปลาซาร์ดีนกระป๋องในซอสมะเขือเทศ",
        ms: "Sardin Dalam Tin Sos Tomato",
        id: "Sarden Kaleng Saus Tomat"
    }, {
        en: "Whole tender sardines cooked in rich, tangy natural tomato sauce, high in Omega-3 and calcium.",
        vi: "Cá mòi nguyên con thịt mềm béo ngậy hòa quyện trong nước sốt cà chua tự nhiên đậm đà giàu Omega-3.",
        ko: "오메가-3와 칼슘이 풍부한 신선한 정어리를 진하고 깊은 맛의 천연 토마토소스에 조리한 통조림입니다.",
        th: "ปลาซาร์ดีนเนื้อนุ่มในซอสมะเขือเทศเข้มข้น อุดมด้วยโอเมก้า 3 และแคลเซียม รสชาติกลมกล่อม",
        ms: "Ikan sardin segar lembut dimasak dalam sos tomato pekat semula jadi yang kaya dengan Omega-3.",
        id: "Ikan sarden pilihan dalam saus tomat kental alami yang lezat serta kaya akan Omega-3 dan kalsium."
    }),
    "canned-sardine-black-bean": makeProductTrans({
        en: "Canned Sardines in Spiced Black Bean Sauce",
        vi: "Cá Mòi Đóng Hộp Sốt Đậu Đen",
        ko: "블랙빈(검은콩) 소스 정어리 통조림",
        th: "ปลาซาร์ดีนกระป๋องในซอสเต้าซี่ (ถั่วดำ)",
        ms: "Sardin Dalam Tin Sos Kacang Hitam",
        id: "Sarden Kaleng Saus Kacang Hitam"
    }, {
        en: "Savory fried sardines braised in traditional fermented black bean sauce with aromatic spices.",
        vi: "Cá mòi chiên vàng om cùng sốt đậu đen lên men truyền thống, dậy mùi thơm đặc trưng và vị ngon đậm đà.",
        ko: "고소하게 튀겨낸 정어리를 전통 발효 검은콩(블랙빈) 소스와 향신료로 조려낸 별미 통조림입니다.",
        th: "ปลาซาร์ดีนทอดเคี่ยวในซอสเต้าซี่ถั่วดำหมักสูตรดั้งเดิม หอมกรุ่นเครื่องเทศและรสชาติเข้มข้น",
        ms: "Ikan sardin goreng yang dimasak bersama sos kacang hitam perap tradisional yang menyelerakan.",
        id: "Ikan sarden gurih yang dimasak dengan saus kacang hitam fermentasi tradisional kaya rempah."
    })
};
async function main() {
    console.log("Updating all categories and 34 products with complete 6-language translations...");
    const categories = await db_1.prisma.category.findMany();
    for (const cat of categories) {
        const trans = categoryTranslations[cat.slug];
        if (trans) {
            await db_1.prisma.category.update({
                where: { id: cat.id },
                data: { translations: trans }
            });
            console.log(`✔ Category updated: ${cat.slug}`);
        }
    }
    const products = await db_1.prisma.product.findMany();
    for (const prod of products) {
        const translations = productTranslationsMap[prod.slug];
        if (translations) {
            await db_1.prisma.product.update({
                where: { id: prod.id },
                data: { translations }
            });
            console.log(`✔ Product updated: ${prod.slug}`);
        }
        else {
            console.log(`⚠ No specific translation map for slug: ${prod.slug}`);
        }
    }
    console.log("Done!");
}
main()
    .catch(e => console.error(e))
    .finally(async () => await db_1.prisma.$disconnect());
//# sourceMappingURL=seed-translations.js.map