// ===== ข้อมูลโครงการ GO451 =====

export const projectInfo = {
  name: 'Green Office หมวด 4 อาคาร 51',
  fullName: 'โครงการพัฒนาสำนักงานสีเขียว (Green Office) อาคาร 51',
  org: 'การไฟฟ้าส่วนภูมิภาค',
  division: 'สายงานดิจิทัลและการสื่อสาร',
  building: 'อาคาร 51 — Data Center',
  standard: 'PEA Eco Standard ฉบับปรับปรุงครั้งที่ 02/2567',
  year: 2569,
  slogan: 'แยกให้ถูก ทิ้งให้เป็น รักษ์สิ่งแวดล้อม',
}

// ===== ทีมงานหมวด 4 =====
export const team = [
  {
    id: 1,
    name: 'นายธนวัฒน์ เตชะปณิต',
    position: 'รฝ.ดข.',
    role: 'หัวหน้าคณะทำงานหมวด 4',
    phone: '9602',
    isLeader: true,
    icon: '👨‍💼',
  },
  {
    id: 2,
    name: 'นายรณชัย ชูแก้ว',
    position: 'ชบ.อก. กวส. ฝรส.',
    role: 'คณะทำงาน',
    isLeader: false,
    icon: '👨‍💻',
  },
  {
    id: 3,
    name: 'นางสาวสกุณา เชี่ยวชาญชัย',
    position: 'ชบ.สล. กปล. ฝปด.',
    role: 'คณะทำงาน',
    isLeader: false,
    icon: '👩‍💻',
  },
  {
    id: 4,
    name: 'นายธปณัฐ ภู่ระหงษ์',
    position: 'พคค.7 ผบค. กคข. ฝสท.',
    role: 'คณะทำงาน',
    isLeader: false,
    icon: '👨‍💻',
  },
  {
    id: 5,
    name: 'นายณัฏฐ์ชนาธิป ธิติศักดิ์',
    position: 'วศก.7 ผวพ. กวบ. ฝพจ.',
    role: 'คณะทำงาน',
    isLeader: false,
    icon: '👨‍🔬',
  },
  {
    id: 6,
    name: 'นายนพดล บุณยรัตกลิน',
    position: 'นบท.8 กจข. ฝดข.',
    role: 'คณะทำงานและเลขานุการ',
    isLeader: false,
    icon: '📋',
  },
]

// ===== 6 หมวดภาพรวม =====
export const allDivisions = [
  {
    id: 1,
    name: 'หมวดที่ 1',
    title: 'กำหนดนโยบาย',
    subtitle: 'วางแผนและปรับปรุงอย่างต่อเนื่อง',
    leader: 'นายอรรถกร กาญจนโอภาษ',
    icon: '📋',
    color: '#7B1FA2',
    bgColor: '#EDE7F6',
    isMain: false,
  },
  {
    id: 2,
    name: 'หมวดที่ 2',
    title: 'สื่อสารและสร้างจิตสำนึก',
    subtitle: 'ประชาสัมพันธ์และสร้างความตระหนัก',
    leader: 'นายประสงค์ สุขแก้ว',
    icon: '📢',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    isMain: false,
  },
  {
    id: 3,
    name: 'หมวดที่ 3',
    title: 'การใช้พลังงานและทรัพยากร',
    subtitle: 'ลดการใช้น้ำ ไฟฟ้า กระดาษ และเชื้อเพลิง',
    leader: 'นายสิทธิชัย เดชพร',
    icon: '⚡',
    color: '#E65100',
    bgColor: '#FFF3E0',
    isMain: false,
  },
  {
    id: 4,
    name: 'หมวดที่ 4',
    title: 'การจัดการของเสีย',
    subtitle: 'คัดแยก ลดปริมาณ นำกลับมาใช้ใหม่ จัดการน้ำเสีย',
    leader: 'นายธนวัฒน์ เตชะปณิต',
    icon: '♻️',
    color: '#1B5E20',
    bgColor: '#E8F5E9',
    isMain: true,
    score2568: 13,
    scoreMax: 15,
    target2569: 15,
  },
  {
    id: 5,
    name: 'หมวดที่ 5',
    title: 'สภาพแวดล้อมและความปลอดภัย',
    subtitle: 'คุณภาพอากาศ แสง เสียง และความปลอดภัย',
    leader: 'นายรณภพ เชื้อสำราญ',
    icon: '🌱',
    color: '#00695C',
    bgColor: '#E0F2F1',
    isMain: false,
  },
  {
    id: 6,
    name: 'หมวดที่ 6',
    title: 'การจัดซื้อและจัดจ้าง',
    subtitle: 'สินค้าและบริการที่เป็นมิตรต่อสิ่งแวดล้อม',
    leader: 'นายปรารภ สาริกา',
    icon: '🛒',
    color: '#4527A0',
    bgColor: '#EDE7F6',
    isMain: false,
  },
]

// ===== เกณฑ์การประเมินหมวด 4 (จาก PEA ECO Standard ฉบับปรับปรุงครั้งที่ 02/2567) =====
export const criteria = [
  {
    id: 1,
    title: 'มาตรการจัดการของเสีย',
    maxScore: 2,
    description: 'ต้องมีประกาศมาตรการเป็นลายลักษณ์อักษรที่ผู้บริหารระดับสูงลงนาม ครอบคลุม 4 เสาหลัก: (1) การลดปริมาณขยะ (2) การคัดแยกประเภท (3) การนำกลับมาใช้ใหม่ (4) การกำจัดอย่างถูกต้อง พร้อมสื่อสารให้พนักงานรับทราบ',
    keywords: ['ลดปริมาณขยะ', 'คัดแยกขยะ', 'Reuse/Recycle', 'กำจัดถูกต้อง', 'E-Waste'],
    evidence: 'เอกสารมาตรการจัดการขยะ + หลักฐานการสื่อสาร/แจ้งเวียน + ใบเสร็จ/หนังสือยืนยันจากหน่วยงานรับขยะ',
    icon: '📄',
    color: '#1565C0',
    bgColor: '#E3F2FD',
  },
  {
    id: 2,
    title: 'การบันทึกและวิเคราะห์ข้อมูล',
    maxScore: 2,
    description: 'บันทึกข้อมูลน้ำหนักขยะทั้ง 6 ประเภทลงในระบบ Carbon Form เป็นประจำทุกเดือนคู่ขนานกับแบบฟอร์มปกติ พร้อมวิเคราะห์ผลเปรียบเทียบกับเป้าหมาย (หากไม่ใช้ Carbon Form จะถูกหักเหลือ 1 คะแนนทันที)',
    keywords: ['บันทึกน้ำหนักขยะ', 'แยกประเภท', 'วิเคราะห์เทียบเป้าหมาย', 'รายเดือน'],
    evidence: 'เอกสารบันทึกปริมาณน้ำหนักขยะครบ 4 ประเภท + กราฟ/ตารางวิเคราะห์เทียบเป้าหมาย',
    icon: '📊',
    color: '#6A1B9A',
    bgColor: '#F3E5F5',
  },
  {
    id: 3,
    title: 'การนำขยะกลับมาใช้ประโยชน์',
    maxScore: 3,
    description: 'นำขยะกลับมาใช้ประโยชน์ใหม่ ≥ 45% = 3 คะแนนเต็ม | 20%–44% = 2 คะแนน (มีเงื่อนไขบังคับต้องมีนวัตกรรม/สิ่งประดิษฐ์จากขยะอย่างน้อย 1 ชิ้น หรือได้รับใบประกาศ LESS)',
    keywords: ['Reuse/Recycle > 45%', 'สิ่งประดิษฐ์', 'นวัตกรรม', 'ลดภาระฝังกลบ'],
    evidence: 'สูตร: (ปริมาณขยะที่นำกลับมาใช้ใหม่สะสม × 100) ÷ ปริมาณขยะทั้งหมดสะสม + หลักฐานนวัตกรรม/สิ่งประดิษฐ์หรือใบประกาศ LESS (กรณี 20–44%)',
    icon: '♻️',
    color: '#1B5E20',
    bgColor: '#E8F5E9',
  },
  {
    id: 4,
    title: 'การจัดพื้นที่และพฤติกรรมการทิ้ง',
    maxScore: 2,
    description: 'จัดเตรียมถังขยะที่เพียงพอ สภาพสมบูรณ์ มีป้ายบ่งชี้ประเภทขยะชัดเจน + มีจุดพักขยะที่เป็นสัดส่วนก่อนส่งกำจัด + มีการสุ่มตรวจพฤติกรรมการทิ้งขยะของพนักงานว่าทิ้งได้ถูกประเภทหรือไม่',
    keywords: ['ป้ายบ่งชี้', 'จุดพักขยะ (Central)', 'สุ่มตรวจถัง ไตรมาสละ 1 ครั้ง', 'สุ่มตรวจพฤติกรรม เดือนละ 1 ครั้ง'],
    evidence: 'ภาพถ่ายถังขยะ + ป้ายบ่งชี้ + จุดพักขยะ + รายงานสุ่มตรวจพฤติกรรมรายเดือน (สาเหตุทิ้งผิด + แนวทางแก้ไข)',
    icon: '🗑️',
    color: '#E65100',
    bgColor: '#FFF3E0',
  },
  {
    id: 5,
    title: 'การจัดการน้ำเสีย',
    maxScore: 2,
    description: 'มีระบบบำบัดน้ำเสียหรือถังดักไขมันในสภาพดี ไม่มีรอยรั่ว มีผู้รับผิดชอบตักเศษอาหารและไขมันออกอย่างสม่ำเสมอ + สำหรับอาคาร ≥ 5,000 ตร.ม. ต้องมีรายงานผลการตรวจวัดคุณภาพน้ำทิ้ง (Lab Report) ที่ผ่านเกณฑ์',
    keywords: ['ถังดักไขมัน', 'ถังบำบัดน้ำเสีย', 'บ่อเกรอะ', 'ตรวจวัดน้ำทิ้ง (≥5,000 ตร.ม.)'],
    evidence: 'ภาพถ่ายสภาพระบบบำบัด + อธิบายการจัดการเศษอาหาร/ตะกอนได้ถูกต้อง + รายงานตรวจวัดน้ำทิ้ง (เฉพาะอาคาร ≥ 5,000 ตร.ม.)',
    icon: '💧',
    color: '#006064',
    bgColor: '#E0F7FA',
  },
  {
    id: 6,
    title: 'ความเข้าใจของพนักงาน',
    maxScore: 4,
    description: 'ออดิเตอร์สุ่มสัมภาษณ์พนักงาน 5 คน ต้องอธิบายได้: วิธีการลดปริมาณขยะ, การคัดแยกขยะ 6 ประเภท, การนำกลับมาใช้ใหม่ และการจัดการน้ำเสียจากเศษอาหาร — ต้องตอบถูกครบ 5 คน ทำงานเป็นทีม จึงจะได้ 4 คะแนนเต็ม',
    keywords: ['สัมภาษณ์ ≥ 5 คน', 'ลดขยะ', 'คัดแยก', 'นำกลับใช้ใหม่', 'น้ำเสีย', 'ผลิตภัณฑ์เป็นมิตร'],
    evidence: 'สุ่มสัมภาษณ์ทีมละ ≥ 5 คน ต้องตอบถูกต้องชัดเจนทั้ง 5 หัวข้อ เพื่อให้ได้ 4/4 คะแนน',
    icon: '🎓',
    color: '#BF360C',
    bgColor: '#FBE9E7',
    isHighlight: true,
    highlightNote: 'คะแนนสูงสุด 4 คะแนน — จุดที่พลาดในปี 2568 (ได้ 3/4) เป้าหมายปี 2569 ต้องได้ 4/4 เต็ม',
  },
]

// ===== ประเภทขยะ =====
export const wasteTypes = [
  {
    id: 'general',
    name: 'ขยะทั่วไป',
    nameEn: 'General Waste',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    borderColor: '#90CAF9',
    binColor: 'ถังสีน้ำเงิน',
    icon: '🗑️',
    examples: ['ถุงพลาสติกเปื้อน', 'กล่องโฟม', 'โฟมบรรจุอาหาร', 'ซองขนม', 'ทิชชูใช้แล้ว'],
    doNot: ['ขยะเปียก', 'ขวดน้ำ', 'กระป๋อง'],
    tip: 'ขยะที่ไม่สามารถรีไซเคิลหรือย่อยสลายได้ตามธรรมชาติ',
  },
  {
    id: 'recycle',
    name: 'ขยะรีไซเคิล',
    nameEn: 'Recyclable Waste',
    color: '#F9A825',
    bgColor: '#FFF8E1',
    borderColor: '#FFE082',
    binColor: 'ถังสีเหลือง',
    icon: '♻️',
    examples: ['ขวดพลาสติก PET', 'กระป๋องอะลูมิเนียม', 'กระดาษ A4', 'กระดาษลัง', 'แก้วใส', 'นิตยสาร'],
    doNot: ['กระดาษเปื้อนอาหาร', 'ขวดที่ยังมีน้ำเหลือ'],
    tip: 'ต้องล้างทำความสะอาดก่อนทิ้ง เพื่อคุณภาพการรีไซเคิลที่ดี',
  },
  {
    id: 'wet',
    name: 'ขยะเปียก',
    nameEn: 'Organic / Wet Waste',
    color: '#388E3C',
    bgColor: '#E8F5E9',
    borderColor: '#A5D6A7',
    binColor: 'ถังสีเขียว',
    icon: '🥗',
    examples: ['เศษอาหาร', 'เปลือกผลไม้', 'เศษผัก', 'กากกาแฟ', 'ใบไม้'],
    doNot: ['กระดูก', 'เปลือกหอย', 'ขยะทั่วไป'],
    tip: 'ย่อยสลายได้เป็นปุ๋ยหมัก ช่วยลดปริมาณขยะฝังกลบ',
  },
  {
    id: 'hazardous',
    name: 'ขยะอันตราย',
    nameEn: 'Hazardous Waste',
    color: '#F44336',
    bgColor: '#FFEBEE',
    borderColor: '#EF9A9A',
    binColor: 'ถังสีแดง/ส้ม',
    icon: '⚠️',
    examples: ['หลอดฟลูออเรสเซนต์', 'แบตเตอรี่', 'กระป๋องสเปรย์', 'สีทาบ้าน', 'น้ำยาทำความสะอาด'],
    doNot: ['ทิ้งรวมกับขยะทั่วไป', 'เทน้ำยาลงท่อระบาย'],
    tip: 'ต้องส่งกำจัดโดยผู้รับกำจัดของเสียอันตรายที่ได้รับอนุญาตเท่านั้น',
  },
  {
    id: 'infectious',
    name: 'ขยะติดเชื้อ',
    nameEn: 'Infectious Waste',
    color: '#FF9800',
    bgColor: '#FFF3E0',
    borderColor: '#FFCC02',
    binColor: 'ถังสีเหลือง (ฝาแดง)',
    icon: '🧪',
    examples: ['ผ้าพันแผล', 'ถุงมือยาง', 'หน้ากากอนามัย', 'สำลีเปื้อนเลือด'],
    doNot: ['ทิ้งรวมกับขยะทั่วไป', 'บีบอัดก่อนทิ้ง'],
    tip: 'ใส่ถุงแดงก่อนทิ้ง แยกออกจากขยะประเภทอื่นเสมอ',
  },
  {
    id: 'ewaste',
    name: 'ขยะอิเล็กทรอนิกส์ (E-Waste)',
    nameEn: 'Electronic Waste',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
    borderColor: '#CE93D8',
    binColor: 'จุดรับ E-Waste โดยเฉพาะ',
    icon: '💻',
    examples: ['มือถือเก่า', 'คอมพิวเตอร์', 'เครื่องพิมพ์', 'สายไฟ', 'อุปกรณ์ชาร์จ', 'หูฟัง'],
    doNot: ['ทิ้งในถังขยะทั่วไป', 'เผา', 'ฝังดิน'],
    tip: 'อาคาร 51 เป็น Data Center — มี E-Waste สูง ต้องจัดการอย่างถูกต้องโดยเฉพาะ',
  },
]

// ===== ข้อมูลขยะรายเดือนรายชั้น (จากแบบฟอร์มจริง + simulate ส่วนที่ขาด) =====
// หน่วย: กิโลกรัม (กก.)
// ===== ข้อมูลขยะรายชั้น ปี 2569 (จาก XLS จริง) =====
// แหล่งข้อมูล: บันทึกปริมาณขยะ 2569.xls — aggregate รายชั้น ม.ค.-เม.ย. 69
// สูตร recycle rate: (rec + wet + ew + a4) / total × 100
export const floorData69 = {
  1: {
    inspector: 'นายนพดล บุญยรัตกลิน',
    recorder: 'พิริณาร์ สุรรม',
    months: [
      { month: 'ม.ค. 69', gen: 332.35, rec: 89.45, wet: 55.40, haz: 0, inf: 0, ew: 2.00, a4: 0.00 },
      { month: 'ก.พ. 69', gen: 334.90, rec: 89.90, wet: 100.80, haz: 0, inf: 0, ew: 3.00, a4: 0.00 },
      { month: 'มี.ค. 69', gen: 398.00, rec: 105.00, wet: 63.30, haz: 0, inf: 0, ew: 3.00, a4: 0.00 },
      { month: 'เม.ย. 69', gen: 361.00, rec: 47.40, wet: 100.50, haz: 0, inf: 0, ew: 2.00, a4: 0.00 },
    ],
  },
  2: {
    inspector: 'นายธปณัฐ ภู่ระหงษ์',
    recorder: 'อรวรรณ กงแก้ว',
    months: [
      { month: 'ม.ค. 69', gen: 206.24, rec: 70.70, wet: 14.70, haz: 0, inf: 0, ew: 0, a4: 4.90 },
      { month: 'ก.พ. 69', gen: 205.39, rec: 70.55, wet: 14.10, haz: 0, inf: 0, ew: 0, a4: 4.80 },
      { month: 'มี.ค. 69', gen: 219.46, rec: 71.38, wet: 15.10, haz: 0, inf: 0, ew: 0, a4: 4.20 },
      { month: 'เม.ย. 69', gen: 193.40, rec: 35.75, wet: 13.50, haz: 0, inf: 0, ew: 0, a4: 3.70 },
    ],
  },
  3: {
    inspector: 'นางสาวสกุณา เชี่ยวชาญชัย',
    recorder: 'กิตตกุล จันทรวงษ์',
    months: [
      { month: 'ม.ค. 69', gen: 224.50, rec: 69.40, wet: 9.80, haz: 0, inf: 0, ew: 0, a4: 4.90 },
      { month: 'ก.พ. 69', gen: 224.50, rec: 69.40, wet: 9.80, haz: 0, inf: 0, ew: 0, a4: 5.00 },
      { month: 'มี.ค. 69', gen: 234.24, rec: 74.74, wet: 10.30, haz: 0, inf: 0, ew: 0, a4: 4.50 },
      { month: 'เม.ย. 69', gen: 224.80, rec: 37.70, wet: 8.80, haz: 0, inf: 0, ew: 0, a4: 3.80 },
    ],
  },
  4: {
    inspector: 'นายรณชัย ชูแก้ว',
    recorder: 'สุภาวรรณ เทียนกลาง',
    months: [
      { month: 'ม.ค. 69', gen: 207.40, rec: 89.80, wet: 14.50, haz: 0, inf: 0, ew: 0, a4: 7.50 },
      { month: 'ก.พ. 69', gen: 206.55, rec: 89.65, wet: 14.50, haz: 0, inf: 0, ew: 0, a4: 7.40 },
      { month: 'มี.ค. 69', gen: 218.01, rec: 92.19, wet: 16.50, haz: 0, inf: 0, ew: 0, a4: 7.20 },
      { month: 'เม.ย. 69', gen: 200.45, rec: 57.75, wet: 12.50, haz: 0, inf: 0, ew: 0, a4: 5.10 },
    ],
  },
  5: {
    inspector: 'นายณัฐฏฐ์ชนาธิป ธิติศักดิ์',
    recorder: 'มะลิ ปากิน',
    months: [
      { month: 'ม.ค. 69', gen: 232.05, rec: 72.25, wet: 14.20, haz: 0, inf: 0, ew: 0, a4: 5.00 },
      { month: 'ก.พ. 69', gen: 233.75, rec: 72.55, wet: 14.00, haz: 0, inf: 0, ew: 0, a4: 4.90 },
      { month: 'มี.ค. 69', gen: 243.36, rec: 76.24, wet: 14.80, haz: 0, inf: 0, ew: 0, a4: 4.80 },
      { month: 'เม.ย. 69', gen: 226.10, rec: 39.80, wet: 12.50, haz: 0, inf: 0, ew: 0, a4: 4.40 },
    ],
  },
}

// แหล่งข้อมูล: แบบฟอร์มบันทึกขยะรายวัน อาคาร 51 ปี 2568-2569
// estimated = true หมายถึง simulate จาก moving average / pattern ของเดือนใกล้เคียง

export const floorMonthlyData = {
  // ชั้น 2 — ฝสท. (พนักงาน: อรวรรณ แก้วรักษ์)
  floor2: [
    { month: 'ก.พ. 68', general: 404.5, recycle: 28.6, wet: 24.2, estimated: false },
    { month: 'มี.ค. 68', general: 385.0, recycle: 27.0, wet: 23.0, estimated: true },
    { month: 'เม.ย. 68', general: 370.0, recycle: 26.0, wet: 22.0, estimated: true },
    { month: 'พ.ค. 68', general: 277.0, recycle: 17.5, wet: 29.5, estimated: false },
    { month: 'มิ.ย. 68', general: 320.0, recycle: 24.0, wet: 25.0, estimated: true },
    { month: 'ก.ค. 68', general: 261.0, recycle: 20.0, wet: 12.0, estimated: false },
    { month: 'ส.ค. 68', general: 341.5, recycle: 27.5, wet: 23.5, estimated: false },
    { month: 'ก.ย. 68', general: 426.0, recycle: 30.3, wet: 26.0, estimated: false },
    { month: 'ต.ค. 68', general: 414.4, recycle: 29.9, wet: 25.4, estimated: false },
    { month: 'พ.ย. 68', general: 226.0, recycle: 28.5, wet: 18.0, estimated: false },
    { month: 'ธ.ค. 68', general: 310.0, recycle: 26.0, wet: 22.0, estimated: true },
    { month: 'ม.ค. 69', general: 283.0, recycle: 33.5, wet: 20.5, estimated: false },
    { month: 'ก.พ. 69', general: 247.0, recycle: 31.5, wet: 19.0, estimated: false },
  ],
  // ชั้น 3 — ฝปด. (พนักงาน: กิตตกุล จันทรวงษ์)
  floor3: [
    { month: 'ก.พ. 68', general: 312.0, recycle: 36.1, wet: 8.5, estimated: false },
    { month: 'มี.ค. 68', general: 290.0, recycle: 34.0, wet: 8.0, estimated: true },
    { month: 'เม.ย. 68', general: 280.0, recycle: 33.0, wet: 8.0, estimated: true },
    { month: 'พ.ค. 68', general: 279.3, recycle: 22.1, wet: 14.8, estimated: false },
    { month: 'มิ.ย. 68', general: 285.0, recycle: 30.0, wet: 18.0, estimated: true },
    { month: 'ก.ค. 68', general: 275.0, recycle: 28.0, wet: 16.0, estimated: true },
    { month: 'ส.ค. 68', general: 283.0, recycle: 29.0, wet: 17.0, estimated: true },
    { month: 'ก.ย. 68', general: 272.4, recycle: 29.5, wet: 17.2, estimated: false },
    { month: 'ต.ค. 68', general: 265.0, recycle: 30.5, wet: 26.0, estimated: false },
    { month: 'พ.ย. 68', general: 367.0, recycle: 61.0, wet: 36.0, estimated: false },
    { month: 'ธ.ค. 68', general: 300.0, recycle: 38.0, wet: 22.0, estimated: true },
    { month: 'ม.ค. 69', general: 393.4, recycle: 47.7, wet: 26.5, estimated: false },
    { month: 'ก.พ. 69', general: 336.8, recycle: 25.9, wet: 8.5, estimated: false },
  ],
  // ชั้น 4 — ฝรส. (พนักงาน: สุภาวรรณ ปาระคะ)
  floor4: [
    { month: 'ก.พ. 68', general: 390.0, recycle: 26.0, wet: 13.0, estimated: true },
    { month: 'มี.ค. 68', general: 365.0, recycle: 25.0, wet: 12.0, estimated: true },
    { month: 'เม.ย. 68', general: 340.0, recycle: 24.0, wet: 11.0, estimated: true },
    { month: 'พ.ค. 68', general: 228.0, recycle: 31.0, wet: 8.0, estimated: false },
    { month: 'มิ.ย. 68', general: 310.0, recycle: 28.0, wet: 15.0, estimated: true },
    { month: 'ก.ค. 68', general: 291.0, recycle: 23.0, wet: 28.5, estimated: false },
    { month: 'ส.ค. 68', general: 274.0, recycle: 34.0, wet: 14.0, estimated: false },
    { month: 'ก.ย. 68', general: 369.0, recycle: 59.0, wet: 29.5, estimated: false },
    { month: 'ต.ค. 68', general: 338.0, recycle: 26.0, wet: 7.0, estimated: true },
    { month: 'พ.ย. 68', general: 289.0, recycle: 41.0, wet: 12.5, estimated: false },
    { month: 'ธ.ค. 68', general: 310.0, recycle: 30.0, wet: 10.0, estimated: true },
    { month: 'ม.ค. 69', general: 338.0, recycle: 46.0, wet: 14.0, estimated: false },
    { month: 'ก.พ. 69', general: 302.0, recycle: 41.0, wet: 37.0, estimated: false },
  ],
  // ชั้น 1 — ล็อบบี้/ห้องประชุม/Happy Work Place (พนักงาน: พิริณาร์ สุรรม)
  // มีข้อมูลจริง ม.ค.69 เดียว เดือนที่เหลือ simulate จาก pattern ชั้น 2 (พื้นที่ใกล้เคียง)
  floor1: [
    { month: 'ก.พ. 68', general: 295.0, recycle: 30.5, wet: 18.5, _sim: true },
    { month: 'มี.ค. 68', general: 278.0, recycle: 28.0, wet: 17.5, _sim: true },
    { month: 'เม.ย. 68', general: 265.0, recycle: 27.0, wet: 16.0, _sim: true },
    { month: 'พ.ค. 68', general: 244.0, recycle: 22.5, wet: 21.0, _sim: true },
    { month: 'มิ.ย. 68', general: 258.0, recycle: 25.0, wet: 19.0, _sim: true },
    { month: 'ก.ค. 68', general: 249.0, recycle: 24.5, wet: 16.5, _sim: true },
    { month: 'ส.ค. 68', general: 270.0, recycle: 26.0, wet: 18.0, _sim: true },
    { month: 'ก.ย. 68', general: 302.0, recycle: 28.5, wet: 20.5, _sim: true },
    { month: 'ต.ค. 68', general: 291.0, recycle: 29.0, wet: 19.5, _sim: true },
    { month: 'พ.ย. 68', general: 222.0, recycle: 26.0, wet: 15.5, _sim: true },
    { month: 'ธ.ค. 68', general: 260.0, recycle: 25.5, wet: 17.0, _sim: true },
    { month: 'ม.ค. 69', general: 283.0, recycle: 33.5, wet: 20.5, _sim: false },
    { month: 'ก.พ. 69', general: 252.0, recycle: 29.0, wet: 18.0, _sim: true },
  ],
  // ชั้น 5 — รผก./ผชก./ฝดข. (พนักงาน: มะลิ ชื่นเมม)
  // ทั่วไป: กก. | รีไซเคิล/เปียก: ขีด (หน่วยน้อยมาก เพราะคนน้อย)
  floor5: [
    { month: 'ก.พ. 68', general: 185.0, recycle: 2.0, wet: 7.5, estimated: true },
    { month: 'มี.ค. 68', general: 175.0, recycle: 2.0, wet: 7.0, estimated: true },
    { month: 'เม.ย. 68', general: 165.0, recycle: 1.8, wet: 7.0, estimated: true },
    { month: 'พ.ค. 68', general: 158.0, recycle: 2.5, wet: 7.0, estimated: false },
    { month: 'มิ.ย. 68', general: 170.0, recycle: 2.2, wet: 7.5, estimated: true },
    { month: 'ก.ค. 68', general: 172.0, recycle: 2.3, wet: 7.8, estimated: true },
    { month: 'ส.ค. 68', general: 168.0, recycle: 2.1, wet: 7.2, estimated: true },
    { month: 'ก.ย. 68', general: 180.0, recycle: 2.0, wet: 8.0, estimated: false },
    { month: 'ต.ค. 68', general: 160.0, recycle: 2.0, wet: 7.0, estimated: false },
    { month: 'พ.ย. 68', general: 244.0, recycle: 2.5, wet: 8.5, estimated: false },
    { month: 'ธ.ค. 68', general: 195.0, recycle: 2.2, wet: 7.8, estimated: true },
    { month: 'ม.ค. 69', general: 254.0, recycle: 2.8, wet: 9.0, estimated: false },
    { month: 'ก.พ. 69', general: 228.0, recycle: 2.3, wet: 7.5, estimated: false },
  ],
}

// ===== ข้อมูลขยะรวมทั้งอาคารรายเดือน (รวมทุกชั้น) =====
export const monthlyWasteData = (() => {
  const months = [
    'ก.พ. 68','มี.ค. 68','เม.ย. 68','พ.ค. 68','มิ.ย. 68','ก.ค. 68',
    'ส.ค. 68','ก.ย. 68','ต.ค. 68','พ.ย. 68','ธ.ค. 68','ม.ค. 69','ก.พ. 69',
  ]
  return months.map(month => {
    const floors = ['floor1','floor2','floor3','floor4','floor5']
    let general = 0, recycle = 0, wet = 0, hasEstimated = false
    floors.forEach(f => {
      const row = floorMonthlyData[f].find(r => r.month === month)
      if (row) {
        general += row.general
        recycle += row.recycle
        wet += row.wet
        if (row.estimated) hasEstimated = true
      }
    })
    return {
      month,
      general: Math.round(general * 10) / 10,
      recycle: Math.round(recycle * 10) / 10,
      wet: Math.round(wet * 10) / 10,
      hazardous: 0,
      infectious: 0,
      ewaste: 0,
      estimated: hasEstimated,
    }
  })
})()

// คะแนนประเมินปี 2568
export const scoreHistory = {
  year: 2568,
  total: 13,
  maxTotal: 15,
  percentage: (13 / 15 * 100).toFixed(1),
  breakdown: [
    { id: 1, title: 'มาตรการจัดการของเสีย',       score: 2, max: 2 },
    { id: 2, title: 'การบันทึกและวิเคราะห์ข้อมูล', score: 2, max: 2 },
    { id: 3, title: 'การนำขยะกลับมาใช้ประโยชน์',   score: 2, max: 3 },
    { id: 4, title: 'การจัดพื้นที่และพฤติกรรม',    score: 2, max: 2 },
    { id: 5, title: 'การจัดการน้ำเสีย',             score: 2, max: 2 },
    { id: 6, title: 'ความเข้าใจของพนักงาน',         score: 3, max: 4, gap: true },
  ],
  gapNote: 'พนักงานบางส่วนยังขาดความเข้าใจด้านการจัดการขยะและน้ำเสียอย่างครอบคลุม',
}

// Quiz 10 ข้อ
export const quizQuestions = [
  {
    id: 1,
    question: 'ขวดพลาสติก PET ที่ใช้แล้ว ควรทิ้งในถังสีอะไร?',
    options: ['ถังสีเทา (ขยะทั่วไป)', 'ถังสีน้ำเงิน (ขยะรีไซเคิล)', 'ถังสีเขียว (ขยะเปียก)', 'ถังสีแดง (ขยะอันตราย)'],
    answer: 1,
    explanation: 'ขวดพลาสติก PET เป็นขยะรีไซเคิลได้ — ทิ้งถังสีน้ำเงิน แต่ควรล้างทำความสะอาดก่อนเพื่อคุณภาพการรีไซเคิลที่ดี',
    wasteType: 'recycle',
  },
  {
    id: 2,
    question: 'หลอดฟลูออเรสเซนต์ที่ขาดแล้ว ควรทิ้งอย่างไร?',
    options: [
      'ทิ้งถังขยะทั่วไปได้เลย',
      'นำไปใส่ในถังขยะรีไซเคิล',
      'นำไปทิ้งที่จุดรับขยะอันตรายโดยเฉพาะ',
      'ทุบทำลายแล้วทิ้งถังเขียว',
    ],
    answer: 2,
    explanation: 'หลอดฟลูออเรสเซนต์มีสารปรอทซึ่งเป็นขยะอันตราย ต้องนำไปทิ้งที่จุดรับขยะอันตรายเท่านั้น ห้ามทุบหรือทิ้งรวมกับขยะทั่วไป',
    wasteType: 'hazardous',
  },
  {
    id: 3,
    question: 'สูตรคำนวณ % Reuse/Recycle ที่ถูกต้องคือข้อใด?',
    options: [
      '(ปริมาณขยะรีไซเคิล / ขยะทั้งหมด) × 100',
      '(ขยะทั้งหมด / ขยะรีไซเคิล) × 100',
      '(ขยะทั่วไป / ขยะทั้งหมด) × 100',
      '(ขยะเปียก + ขยะอันตราย) / ขยะทั้งหมด × 100',
    ],
    answer: 0,
    explanation: 'สูตร: (ปริมาณขยะที่นำกลับมาใช้ใหม่สะสม ÷ ปริมาณขยะทั้งหมดสะสม) × 100 เกณฑ์ได้คะแนนเต็มคือ > 45%',
    wasteType: 'recycle',
  },
  {
    id: 4,
    question: 'เป้าหมาย % Reuse/Recycle ที่ได้คะแนนเต็ม 2 คะแนน คือเท่าใด?',
    options: ['มากกว่า 20%', 'มากกว่า 30%', 'มากกว่า 45%', 'มากกว่า 60%'],
    answer: 2,
    explanation: 'เกณฑ์ PEA Eco Standard: > 45% ได้ 2 คะแนน, 20-30% ได้ 1 คะแนน, < 20% ได้ 0 คะแนน (หรือ 30-45% + นวัตกรรม 1 ชิ้น ได้ 2 คะแนน)',
    wasteType: 'recycle',
  },
  {
    id: 5,
    question: 'ถังดักไขมัน (Grease Trap) มีหน้าที่อะไร?',
    options: [
      'กรองขยะรีไซเคิลก่อนส่งโรงงาน',
      'ดักจับไขมันและน้ำมันออกจากน้ำทิ้งก่อนเข้าระบบบำบัด',
      'เก็บสะสมขยะเปียกก่อนทำปุ๋ยหมัก',
      'วัดปริมาณน้ำเสียทั้งหมดในอาคาร',
    ],
    answer: 1,
    explanation: 'ถังดักไขมันทำหน้าที่ดักจับไขมันและน้ำมันจากน้ำทิ้งจากห้องครัว/ร้านอาหาร ป้องกันท่อระบายน้ำอุดตันและลดมลพิษในแหล่งน้ำ',
    wasteType: 'wet',
  },
  {
    id: 6,
    question: 'โทรศัพท์มือถือเก่าที่ใช้งานไม่ได้แล้ว จัดเป็นขยะประเภทใด?',
    options: ['ขยะทั่วไป', 'ขยะรีไซเคิล', 'ขยะอันตราย', 'ขยะอิเล็กทรอนิกส์ (E-Waste)'],
    answer: 3,
    explanation: 'โทรศัพท์มือถือเป็น E-Waste ต้องนำไปทิ้งที่จุดรับ E-Waste โดยเฉพาะ เพราะมีโลหะหนักและสารพิษที่เป็นอันตราย อาคาร 51 เป็น Data Center จึงมี E-Waste สูงเป็นพิเศษ',
    wasteType: 'ewaste',
  },
  {
    id: 7,
    question: 'การสุ่มตรวจพฤติกรรมการทิ้งขยะของพนักงาน ตามเกณฑ์ต้องทำอย่างน้อยกี่ครั้งต่อเดือน?',
    options: ['ไม่มีกำหนด', '1 ครั้ง', '2 ครั้ง', '4 ครั้ง'],
    answer: 1,
    explanation: 'เกณฑ์ข้อ 4 กำหนดให้มีการสุ่มตรวจ (Monitoring) การทิ้งขยะของพนักงานอย่างน้อยเดือนละ 1 ครั้ง พร้อมบันทึกผลและแก้ไขกรณีทิ้งผิดประเภท',
    wasteType: 'general',
  },
  {
    id: 8,
    question: 'หลักการ 4R ในการจัดการขยะ หมายถึงอะไร?',
    options: [
      'Reduce, Reuse, Recycle, Recover',
      'Reduce, Reuse, Recycle, Refuse',
      'Remove, Reduce, Recycle, Reuse',
      'Refuse, Reduce, Reuse, Recycle',
    ],
    answer: 3,
    explanation: 'หลัก 4R: Refuse (ปฏิเสธสิ่งที่ไม่จำเป็น) → Reduce (ลดการใช้) → Reuse (นำกลับมาใช้ซ้ำ) → Recycle (แปรรูปใหม่) เรียงจากดีที่สุดไปน้อยที่สุด',
    wasteType: 'recycle',
  },
  {
    id: 9,
    question: 'ข้อใดคือแนวทางที่ถูกต้องสำหรับพนักงานในการลดขยะในสำนักงาน?',
    options: [
      'พิมพ์เอกสารทุกฉบับเพื่อให้มีหลักฐาน',
      'ใช้กล่องโฟมบรรจุอาหารเพราะสะดวก',
      'ใช้แก้วส่วนตัวแทนแก้วพลาสติกใช้ครั้งเดียว',
      'ทิ้งขวดน้ำในถังขยะทั่วไปเพื่อความรวดเร็ว',
    ],
    answer: 2,
    explanation: 'การใช้แก้วส่วนตัวช่วยลดขยะพลาสติกใช้ครั้งเดียว (Single-use Plastic) ซึ่งเป็นหลัก Reuse ที่ง่ายและปฏิบัติได้ทันที',
    wasteType: 'general',
  },
  {
    id: 10,
    question: 'เกณฑ์ข้อใดของหมวดที่ 4 มีคะแนนสูงสุดและเป็นจุดที่ต้องพัฒนาปี 2569?',
    options: [
      'มาตรการจัดการของเสีย (2 คะแนน)',
      'การบันทึกและวิเคราะห์ข้อมูล (2 คะแนน)',
      'การนำขยะกลับมาใช้ประโยชน์ (2 คะแนน)',
      'ความเข้าใจของพนักงาน (4 คะแนน)',
    ],
    answer: 3,
    explanation: 'เกณฑ์ข้อ 6 "ความเข้าใจของพนักงาน" มีคะแนนสูงสุด 4 คะแนน และเป็นจุดที่พลาดในปี 2568 (ได้ 3/4) เป้าหมายปี 2569 ต้องได้ 4/4 เต็ม',
    wasteType: 'general',
  },
]
