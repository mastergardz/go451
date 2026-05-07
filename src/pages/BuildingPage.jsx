import { useState, useEffect } from 'react'
import { colors, radius } from '../theme.js'
import { floorMonthlyData } from '../data/wasteData.js'

// สีขยะตามมาตรฐานสากล
const BIN_COLORS = {
  general: '#1565C0',   // น้ำเงิน — ขยะทั่วไป
  recycle: '#F9A825',   // เหลือง — รีไซเคิล
  wet:     '#388E3C',   // เขียว — เปียก/อินทรีย์
  hazardous: '#C62828', // แดง — อันตราย
}

// ===== คำนวณข้อมูลขยะรายชั้น จาก floorMonthlyData (ม.ค. 69 = เดือนล่าสุดที่มีข้อมูลครบ) =====
const LATEST_MONTH = 'ม.ค. 69'
const f1 = floorMonthlyData.floor1.find(r => r.month === LATEST_MONTH)
const f2 = floorMonthlyData.floor2.find(r => r.month === LATEST_MONTH)
const f3 = floorMonthlyData.floor3.find(r => r.month === LATEST_MONTH)
const f4 = floorMonthlyData.floor4.find(r => r.month === LATEST_MONTH)
const f5 = floorMonthlyData.floor5.find(r => r.month === LATEST_MONTH)

function recycleRate(d) {
  const total = d.general + d.recycle + d.wet
  return total > 0 ? Math.round((d.recycle / total) * 1000) / 10 : 0
}

const floorData = {
  5: {
    label: 'ชั้น 5',
    subtitle: 'สำนักงาน รผก.(ดส) · ผชก.(ดส-พ, ดส-ท) · ฝดข.',
    deptFull: 'สำนักงาน รผก.(ดส), ผชก.(ดส-พ, ดส-ท) และฝ่ายกลยุทธ์ดิจิทัลและบริหารจัดการข้อมูล (ฝดข.)',
    icon: '🏛️',
    color: '#4527A0',
    bgGrad: 'linear-gradient(135deg, #4527A0, #5E35B1)',
    area: '440 ตร.ม.',
    bins: [
      { type: 'general', label: 'ขยะทั่วไป',   color: BIN_COLORS.general, weight: f5.general },
      { type: 'recycle', label: 'ขยะรีไซเคิล', color: BIN_COLORS.recycle, weight: f5.recycle },
      { type: 'wet',     label: 'ขยะเปียก',     color: BIN_COLORS.wet,     weight: f5.wet    },
    ],
    recycleRate: recycleRate(f5),
    cleaner: 'มะลิ ปากิน',
    notes: 'ระดับผู้บริหารและ ฝดข. — คนน้อย ขยะทั่วไปสูงเพราะรวม corridor และพื้นที่ส่วนกลาง',
    highlight: `ข้อมูล ${LATEST_MONTH} — ทั่วไป ${f5.general} กก. | รีไซเคิล ${f5.recycle} กก.`,
    dataMonth: LATEST_MONTH,
  },
  4: {
    label: 'ชั้น 4',
    subtitle: 'ฝ่ายระบบสื่อสาร (ฝรส.)',
    deptFull: 'ฝ่ายระบบสื่อสาร (ฝรส.)',
    icon: '📡',
    color: '#1565C0',
    bgGrad: 'linear-gradient(135deg, #1565C0, #1976D2)',
    area: '420 ตร.ม.',
    bins: [
      { type: 'general', label: 'ขยะทั่วไป',   color: BIN_COLORS.general, weight: f4.general },
      { type: 'recycle', label: 'ขยะรีไซเคิล', color: BIN_COLORS.recycle, weight: f4.recycle },
      { type: 'wet',     label: 'ขยะเปียก',     color: BIN_COLORS.wet,     weight: f4.wet    },
    ],
    recycleRate: recycleRate(f4),
    cleaner: 'สุภาวรรณ เทียนกลาง',
    notes: 'ฝรส. — ขยะรีไซเคิลสูงจากกระดาษเอกสาร เทคนิค และ packaging อุปกรณ์',
    highlight: `ข้อมูล ${LATEST_MONTH} — ทั่วไป ${f4.general} กก. | รีไซเคิล ${f4.recycle} กก.`,
    dataMonth: LATEST_MONTH,
  },
  3: {
    label: 'ชั้น 3',
    subtitle: 'ฝ่ายปฏิบัติการและบำรุงรักษาระบบดิจิทัล (ฝปด.)',
    deptFull: 'ฝ่ายปฏิบัติการและบำรุงรักษาระบบดิจิทัล (ฝปด.)',
    icon: '⚙️',
    color: '#1B5E20',
    bgGrad: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
    area: '520 ตร.ม.',
    bins: [
      { type: 'general', label: 'ขยะทั่วไป',   color: BIN_COLORS.general, weight: f3.general },
      { type: 'recycle', label: 'ขยะรีไซเคิล', color: BIN_COLORS.recycle, weight: f3.recycle },
      { type: 'wet',     label: 'ขยะเปียก',     color: BIN_COLORS.wet,     weight: f3.wet    },
    ],
    recycleRate: recycleRate(f3),
    cleaner: 'กิตตกุล จันทรวงษ์',
    notes: 'ฝปด. — รีไซเคิลสูงมากในบางเดือน (พ.ย. 68 = 61 กก.) เนื่องจากมีการ recycle กระดาษจำนวนมาก',
    highlight: `ข้อมูล ${LATEST_MONTH} — ทั่วไป ${f3.general} กก. | รีไซเคิล ${f3.recycle} กก.`,
    dataMonth: LATEST_MONTH,
  },
  2: {
    label: 'ชั้น 2',
    subtitle: 'ฝ่ายโครงสร้างพื้นฐานเทคโนโลยีดิจิทัล (ฝสท.)',
    deptFull: 'ฝ่ายโครงสร้างพื้นฐานเทคโนโลยีดิจิทัล (ฝสท.)',
    icon: '🖥️',
    color: '#00695C',
    bgGrad: 'linear-gradient(135deg, #00695C, #00897B)',
    area: '500 ตร.ม.',
    bins: [
      { type: 'general', label: 'ขยะทั่วไป',   color: BIN_COLORS.general, weight: f2.general },
      { type: 'recycle', label: 'ขยะรีไซเคิล', color: BIN_COLORS.recycle, weight: f2.recycle },
      { type: 'wet',     label: 'ขยะเปียก',     color: BIN_COLORS.wet,     weight: f2.wet    },
    ],
    recycleRate: recycleRate(f2),
    cleaner: 'อรวรรณ กงแก้ว',
    notes: 'ฝสท. — ขยะทั่วไปสูงสุดในอาคาร',
    highlight: `ข้อมูล ${LATEST_MONTH} — ทั่วไป ${f2.general} กก. | รีไซเคิล ${f2.recycle} กก.`,
    dataMonth: LATEST_MONTH,
  },
  1: {
    label: 'ชั้น 1',
    subtitle: 'ล็อบบี้ · ห้องประชุม · Happy Work Place',
    deptFull: 'โซนล็อบบี้, ห้องประชุมส่วนกลาง และห้อง Happy Work Place',
    icon: '🏢',
    color: '#37474F',
    bgGrad: 'linear-gradient(135deg, #37474F, #546E7A)',
    area: '480 ตร.ม.',
    bins: [
      { type: 'general', label: 'ขยะทั่วไป',   color: BIN_COLORS.general, weight: f1.general },
      { type: 'recycle', label: 'ขยะรีไซเคิล', color: BIN_COLORS.recycle, weight: f1.recycle },
      { type: 'wet',     label: 'ขยะเปียก',     color: BIN_COLORS.wet,     weight: f1.wet    },
    ],
    recycleRate: recycleRate(f1),
    cleaner: 'พิริณาร์ สุรรม',
    notes: 'ชั้น 1 — ล็อบบี้, ห้องประชุมส่วนกลาง และ Happy Work Place',
    highlight: `ข้อมูล ${LATEST_MONTH} — ทั่วไป ${f1.general} กก. | รีไซเคิล ${f1.recycle} กก.`,
    dataMonth: LATEST_MONTH,
  },
}

function useWinSize() {
  const [w, setW] = useState(window.innerWidth)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return w
}

// ===== SVG Building — ทรงเหลี่ยม ไม่มีหลังคาสามเหลี่ยม =====
function BuildingSVG({ selectedFloor, onFloorClick }) {
  const floorColors = {
    5: '#4527A0',
    4: '#1565C0',
    3: '#1B5E20',
    2: '#00695C',
    1: '#37474F',
  }

  const floors = [5, 4, 3, 2, 1]
  const floorH = 62
  const floorW = 290
  const svgW = 340
  const topPad = 16
  const svgH = floors.length * floorH + topPad + 28

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block', margin: '0 auto' }}
    >
      {/* Ground shadow */}
      <ellipse cx={svgW / 2} cy={svgH - 6} rx={floorW / 2 + 14} ry={7} fill="rgba(0,0,0,0.10)" />

      {/* Building outline — กรอบทั้งหลัง (ทรงเหลี่ยม) */}
      <rect
        x={(svgW - floorW) / 2 - 3}
        y={topPad - 4}
        width={floorW + 6}
        height={floors.length * floorH + 4}
        rx={5}
        fill="none"
        stroke="#B0BEC5"
        strokeWidth={1.5}
      />

      {/* Floors */}
      {floors.map((floor, i) => {
        const y = topPad + i * floorH
        const isSelected = selectedFloor === floor
        const baseColor = floorColors[floor]
        const fill = isSelected ? baseColor : '#F5F7FA'
        const textColor = isSelected ? '#fff' : '#455A64'
        const subColor = isSelected ? 'rgba(255,255,255,0.75)' : '#90A4AE'
        const floorInfo = floorData[floor]

        return (
          <g key={floor} onClick={() => onFloorClick(floor)} style={{ cursor: 'pointer' }}>
            {/* Floor bg */}
            <rect
              x={(svgW - floorW) / 2}
              y={y}
              width={floorW}
              height={floorH - 1}
              fill={fill}
              style={{ transition: 'fill 0.2s' }}
            />

            {/* Selected highlight bar on left */}
            {isSelected && (
              <rect
                x={(svgW - floorW) / 2}
                y={y}
                width={4}
                height={floorH - 1}
                fill="rgba(255,255,255,0.5)"
              />
            )}

            {/* Floor divider */}
            {i < floors.length - 1 && (
              <line
                x1={(svgW - floorW) / 2}
                y1={y + floorH - 1}
                x2={(svgW + floorW) / 2}
                y2={y + floorH - 1}
                stroke={isSelected ? 'rgba(255,255,255,0.2)' : '#E0E0E0'}
                strokeWidth={1}
              />
            )}

            {/* Windows — 4 หน้าต่างต่อชั้น */}
            {[0, 1, 2, 3].map(wi => (
              <rect
                key={wi}
                x={(svgW - floorW) / 2 + 12 + wi * 62}
                y={y + 12}
                width={40}
                height={26}
                rx={2}
                fill={isSelected ? 'rgba(255,255,255,0.22)' : '#CFD8DC'}
                stroke={isSelected ? 'rgba(255,255,255,0.35)' : '#B0BEC5'}
                strokeWidth={0.75}
              />
            ))}


            {/* Floor label */}
            <text
              x={(svgW - floorW) / 2 + 14}
              y={y + 28}
              fontSize={13}
              fontWeight={isSelected ? 700 : 600}
              fill={textColor}
              fontFamily="Sarabun, sans-serif"
              style={{ transition: 'fill 0.2s' }}
            >
              {floorInfo.label}
            </text>

            {/* Subtitle (truncated) */}
            <text
              x={(svgW - floorW) / 2 + 14}
              y={y + 46}
              fontSize={9}
              fill={subColor}
              fontFamily="Sarabun, sans-serif"
            >
              {floorInfo.subtitle.length > 34 ? floorInfo.subtitle.slice(0, 32) + '…' : floorInfo.subtitle}
            </text>

            {/* Recycle Rate badge */}
            <rect
              x={(svgW + floorW) / 2 - 58}
              y={y + 14}
              width={54}
              height={18}
              rx={9}
              fill={floorInfo.recycleRate >= 45 ? '#43A047' : floorInfo.recycleRate >= 38 ? '#FB8C00' : '#E53935'}
            />
            <text
              x={(svgW + floorW) / 2 - 31}
              y={y + 27}
              fontSize={9.5}
              fontWeight={700}
              fill="#fff"
              textAnchor="middle"
              fontFamily="Sarabun, sans-serif"
            >
              {floorInfo.recycleRate}%
            </text>
          </g>
        )
      })}

      {/* Ground bar */}
      <rect
        x={(svgW - floorW) / 2 - 10}
        y={topPad + floors.length * floorH}
        width={floorW + 20}
        height={10}
        rx={2}
        fill="#546E7A"
      />
    </svg>
  )
}

// ===== Waste Bar =====
function WasteBar({ bins }) {
  const total = bins.reduce((s, b) => s + b.weight, 0)
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', height: 14, borderRadius: 7, overflow: 'hidden', gap: 1 }}>
        {bins.map(b => (
          <div
            key={b.type}
            style={{ flex: b.weight / total, background: b.color, minWidth: b.weight > 0 ? 2 : 0, transition: 'flex 0.4s' }}
            title={`${b.label}: ${b.weight} กก.`}
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 8 }}>
        {bins.map(b => (
          <div key={b.type} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: b.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#546E7A' }}>{b.label}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#263238' }}>{b.weight}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BuildingPage() {
  const w = useWinSize()
  const isMobile = w < 768

  const [selectedFloor, setSelectedFloor] = useState(3)
  const [showRaw, setShowRaw] = useState(false)
  const floor = floorData[selectedFloor]
  const totalWaste = floor.bins.reduce((s, b) => s + b.weight, 0)

  // raw data สำหรับ modal
  const rawFloorKey = { 1: 'floor1', 2: 'floor2', 3: 'floor3', 4: 'floor4', 5: 'floor5' }
  const rawData = rawFloorKey[selectedFloor]
    ? floorMonthlyData[rawFloorKey[selectedFloor]]
    : null

  const cardStyle = {
    background: '#fff',
    borderRadius: radius.lg,
    border: '1px solid #E8EAF6',
    boxShadow: '0 2px 12px rgba(26,35,126,0.06)',
    padding: isMobile ? '16px' : '20px 24px',
    marginBottom: 16,
  }

  return (
    <div style={{ background: colors.bg, minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.heroDark} 0%, #0F2A1C 60%, #1B5E20 100%)`,
        padding: isMobile ? '40px 16px 32px' : '56px 32px 40px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(27,94,32,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(78,24,135,0.2) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: isMobile ? 40 : 52, marginBottom: 8 }}>🏢</div>
          <h1 style={{ color: '#fff', fontSize: isMobile ? 22 : 30, fontWeight: 800, margin: '0 0 8px' }}>
            แผนผังอาคาร 51
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: isMobile ? 13 : 15, margin: 0 }}>
            กดที่ชั้นเพื่อดูข้อมูลขยะรายชั้น · สายงานดิจิทัลและการสื่อสาร
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '24px 16px' : '32px 32px' }}>

        {/* Summary bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: 12, marginBottom: 24,
        }}>
          {[
            { label: 'ชั้นทั้งหมด', value: '5 ชั้น', icon: '🏢', color: '#1B5E20' },
            { label: 'ขยะรวม (ทุกชั้น)', value: `${Object.values(floorData).reduce((s, f) => s + f.bins.reduce((ss, b) => ss + b.weight, 0), 0).toFixed(1)} กก./เดือน`, icon: '⚖️', color: '#1565C0' },
            { label: 'Recycle Rate เฉลี่ย', value: `${(Object.values(floorData).reduce((s, f) => s + f.recycleRate, 0) / 5).toFixed(1)}%`, icon: '♻️', color: '#43A047' },
            { label: 'E-Waste รวม', value: `${Object.values(floorData).reduce((s, f) => s + (f.bins.find(b => b.type === 'ewaste')?.weight || 0), 0).toFixed(1)} กก./เดือน`, icon: '💻', color: '#7B1FA2' },
          ].map(item => (
            <div key={item.label} style={{
              background: '#fff', borderRadius: radius.md,
              border: '1px solid #E8EAF6',
              padding: isMobile ? '12px 14px' : '14px 18px',
              boxShadow: '0 1px 6px rgba(26,35,126,0.05)',
            }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 800, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: 11, color: '#90A4AE', marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Main: SVG + Detail */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
          gap: 24, alignItems: 'start',
        }}>

          {/* Building SVG */}
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#90A4AE', marginBottom: 14, textAlign: 'center', letterSpacing: 1, textTransform: 'uppercase' }}>
              กดที่ชั้นเพื่อดูรายละเอียด
            </div>
            <BuildingSVG selectedFloor={selectedFloor} onFloorClick={setSelectedFloor} />
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'nowrap', gap: 6, justifyContent: 'center' }}>
              {[5, 4, 3, 2, 1].map(f => (
                <button key={f} onClick={() => setSelectedFloor(f)} style={{
                  padding: '5px 14px', borderRadius: 20, fontSize: 12,
                  fontFamily: 'Sarabun, sans-serif',
                  background: selectedFloor === f ? floorData[f].color : '#F5F5F5',
                  color: selectedFloor === f ? '#fff' : '#546E7A',
                  border: selectedFloor === f ? `1px solid ${floorData[f].color}` : '1px solid #E0E0E0',
                  cursor: 'pointer', fontWeight: selectedFloor === f ? 700 : 400,
                  transition: 'all 0.15s',
                }}>
                  {floorData[f].label}
                </button>
              ))}
            </div>

            {/* Recycle Rate legend */}
            <div style={{ marginTop: 16, borderTop: '1px solid #F0F0F0', paddingTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { color: '#43A047', label: '≥ 45% ผ่าน' },
                { color: '#FB8C00', label: '38-44%' },
                { color: '#E53935', label: '< 38%' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: l.color }} />
                  <span style={{ fontSize: 10, color: '#78909C' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div>
            {/* Floor Header */}
            <div style={{ ...cardStyle, background: floor.bgGrad, border: 'none', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: radius.md,
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.3)',
                }}>
                  {floor.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? 18 : 22 }}>{floor.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{floor.deptFull}</div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>📐 {floor.area}</span>
                    {floor.cleaner && (
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>🧹 ผู้บันทึก: {floor.cleaner}</span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{
                marginTop: 14, padding: '10px 14px', borderRadius: radius.sm,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 3 }}>💡 จุดเด่น</div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, lineHeight: 1.5 }}>{floor.highlight}</div>
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#fff', borderRadius: radius.md, padding: '14px 16px', border: '1px solid #E8EAF6', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1B5E20' }}>{totalWaste.toFixed(1)}</div>
                <div style={{ fontSize: 11, color: '#78909C' }}>กก./เดือน (รวม)</div>
              </div>
              <div style={{ background: '#fff', borderRadius: radius.md, padding: '14px 16px', border: '1px solid #E8EAF6', textAlign: 'center' }}>
                <div style={{
                  fontSize: 22, fontWeight: 800,
                  color: floor.recycleRate >= 45 ? '#43A047' : floor.recycleRate >= 38 ? '#FB8C00' : '#E53935',
                }}>{floor.recycleRate}%</div>
                <div style={{ fontSize: 11, color: '#78909C' }}>Recycle Rate</div>
                <div style={{ fontSize: 10, marginTop: 2, color: floor.recycleRate >= 45 ? '#43A047' : '#FB8C00' }}>
                  {floor.recycleRate >= 45 ? '✅ ผ่านเกณฑ์' : `ห่างเป้า ${(45 - floor.recycleRate).toFixed(1)}%`}
                </div>
              </div>
            </div>

            {/* Waste Breakdown */}
            <div style={cardStyle}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1B5E20', marginBottom: 4 }}>⚖️ ปริมาณขยะแยกประเภท</div>
              <div style={{ fontSize: 11, color: '#90A4AE', marginBottom: 12 }}>
                ข้อมูลประจำเดือน {floor.dataMonth}
              </div>
              <WasteBar bins={floor.bins} />
              <div style={{ marginTop: 14, borderRadius: radius.sm, overflow: 'hidden', border: '1px solid #ECEFF1' }}>
                {floor.bins.map((b, i) => {
                  const pct = ((b.weight / totalWaste) * 100).toFixed(1)
                  return (
                    <div key={b.type} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px',
                      background: i % 2 === 0 ? '#FAFAFA' : '#fff',
                      borderBottom: i < floor.bins.length - 1 ? '1px solid #F0F0F0' : 'none',
                    }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: b.color, flexShrink: 0 }} />
                      <div style={{ flex: 1, fontSize: 13, color: '#37474F' }}>{b.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#263238', minWidth: 52, textAlign: 'right' }}>{b.weight} กก.</div>
                      <div style={{ fontSize: 11, color: '#90A4AE', minWidth: 38, textAlign: 'right' }}>{pct}%</div>
                      <div style={{ width: 60, height: 6, borderRadius: 3, background: '#ECEFF1', overflow: 'hidden', flexShrink: 0 }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: b.color, borderRadius: 3 }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Notes */}
            <div style={{ ...cardStyle, background: '#FFFDE7', border: '1px solid #FFF176' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F57F17', marginBottom: 6 }}>📝 หมายเหตุ</div>
              <div style={{ fontSize: 13, color: '#5D4037', lineHeight: 1.7 }}>{floor.notes}</div>
            </div>

            {/* Raw Data Button */}
            {rawData && (
              <button onClick={() => setShowRaw(true)} style={{
                width: '100%', padding: '12px', borderRadius: radius.md,
                background: '#E8EAF6', border: '1px solid #C5CAE9',
                color: '#3949AB', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                📋 ดูข้อมูลรายเดือน ({floor.label})
              </button>
            )}
          </div>
        </div>

        {/* Raw Data Modal */}
        {showRaw && rawData && (
          <div onClick={() => setShowRaw(false)} style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}>
            <div onClick={e => e.stopPropagation()} style={{
              background: '#fff', borderRadius: radius.lg,
              width: '100%', maxWidth: 680, maxHeight: '80vh',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid #E0E0E0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: floor.bgGrad,
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>
                    📋 ข้อมูลรายเดือน — {floor.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                    {floor.cleaner && `🧹 ผู้บันทึก: ${floor.cleaner}`}
                  </div>
                </div>
                <button onClick={() => setShowRaw(false)} style={{
                  background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff', borderRadius: radius.sm,
                  width: 32, height: 32, cursor: 'pointer', fontSize: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>✕</button>
              </div>
              <div style={{ overflow: 'auto', flex: 1 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead style={{ position: 'sticky', top: 0, background: '#F5F5F5', zIndex: 1 }}>
                    <tr>
                      {[
                        { label: 'เดือน', align: 'left' },
                        { label: 'ทั่วไป (กก.)', color: BIN_COLORS.general },
                        { label: 'รีไซเคิล (กก.)', color: BIN_COLORS.recycle },
                        { label: 'เปียก (กก.)', color: BIN_COLORS.wet },
                        { label: 'รวม (กก.)', align: 'right' },
                        { label: 'Recycle%', align: 'right' },
                      ].map(h => (
                        <th key={h.label} style={{
                          padding: '10px 12px', textAlign: h.align || 'right',
                          color: h.color || '#546E7A', fontWeight: 700,
                          borderBottom: '2px solid #E0E0E0', whiteSpace: 'nowrap',
                        }}>
                          {h.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rawData.map((row, i) => {
                      const total = row.general + row.recycle + row.wet
                      const rr = total > 0 ? (row.recycle / total * 100).toFixed(1) : '0.0'
                      /* _sim = backend tag เท่านั้น ไม่แสดงผู้ใช้ */
                      return (
                        <tr key={row.month} style={{ background: i % 2 === 0 ? '#FAFAFA' : '#fff' }}>
                          <td style={{ padding: '9px 12px', fontWeight: 600, color: '#37474F', whiteSpace: 'nowrap' }}>
                            {row.month === LATEST_MONTH ? <strong>{row.month}</strong> : row.month}
                          </td>
                          <td style={{ padding: '9px 12px', textAlign: 'right', color: BIN_COLORS.general }}>{row.general}</td>
                          <td style={{ padding: '9px 12px', textAlign: 'right', color: BIN_COLORS.recycle, fontWeight: 700 }}>{row.recycle}</td>
                          <td style={{ padding: '9px 12px', textAlign: 'right', color: BIN_COLORS.wet }}>{row.wet}</td>
                          <td style={{ padding: '9px 12px', textAlign: 'right', fontWeight: 700 }}>{total.toFixed(1)}</td>
                          <td style={{ padding: '9px 12px', textAlign: 'right', fontWeight: 700,
                            color: parseFloat(rr) >= 45 ? '#43A047' : parseFloat(rr) >= 38 ? '#FB8C00' : '#E53935',
                          }}>{rr}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* All floors comparison table */}
        <div style={{ ...cardStyle, marginTop: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#263238', marginBottom: 16 }}>
            📊 เปรียบเทียบขยะทุกชั้น
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#F5F5F5' }}>
                  {['ชั้น', 'ฝ่าย/โซน', 'พื้นที่', 'ขยะรวม (กก.)', 'Recycle (%)', 'สถานะ'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#546E7A', fontWeight: 600, whiteSpace: 'nowrap', borderBottom: '2px solid #E0E0E0' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[5, 4, 3, 2, 1].map((floorNum, i) => {
                  const f = floorData[floorNum]
                  const total = f.bins.reduce((s, b) => s + b.weight, 0).toFixed(1)
                  const isSelected = selectedFloor === floorNum
                  return (
                    <tr
                      key={floorNum}
                      onClick={() => setSelectedFloor(floorNum)}
                      style={{
                        background: isSelected ? '#E8F5E9' : i % 2 === 0 ? '#FAFAFA' : '#fff',
                        cursor: 'pointer',
                        borderLeft: isSelected ? `4px solid ${f.color}` : '4px solid transparent',
                        transition: 'background 0.15s',
                      }}
                    >
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: f.color, whiteSpace: 'nowrap' }}>{f.label}</td>
                      <td style={{ padding: '10px 12px', color: '#546E7A', fontSize: 12 }}>{f.subtitle}</td>
                      <td style={{ padding: '10px 12px', color: '#546E7A' }}>{f.area}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>{total}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{
                          fontWeight: 700,
                          color: f.recycleRate >= 45 ? '#43A047' : f.recycleRate >= 38 ? '#FB8C00' : '#E53935',
                        }}>{f.recycleRate}%</span>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                          background: f.recycleRate >= 45 ? '#E8F5E9' : '#FFF3E0',
                          color: f.recycleRate >= 45 ? '#2E7D32' : '#E65100',
                        }}>
                          {f.recycleRate >= 45 ? '✅ ผ่าน' : '⚠️ ต้องปรับ'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data notice */}
        <div style={{
          padding: '12px 16px', borderRadius: radius.md,
          background: '#E8F5E9', border: '1px solid #A5D6A7',
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <span style={{ fontSize: 16 }}>ℹ️</span>
          <span style={{ fontSize: 12, color: '#1B5E20', lineHeight: 1.6 }}>
            ข้อมูลปริมาณขยะจาก PDF แบบฟอร์มรายชั้น ก.พ. 68 – ก.พ. 69
            · กด <strong>"ดูข้อมูลรายเดือน"</strong> เพื่อดูตัวเลขรายเดือนแต่ละชั้น
          </span>
        </div>
      </div>
    </div>
  )
}
