import { useState, useEffect } from 'react'
import { colors, radius, font, shadows } from '../theme.js'
import { scoreHistory, criteria } from '../data/wasteData.js'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'


function fmt(n) { return Number(n).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth })
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return size
}

// ===== ข้อมูลขยะปี 2569 จาก XLS (สูตร: recycle+wet+ewaste+A4 / total) =====
const wasteData69 = [
  { month: 'ม.ค. 69', general: 1202.54, hazardous: 0, infectious: 0, recycle: 391.60, wet: 108.60, ewaste: 2.00, a4: 22.30, total: 1727.05 },
  { month: 'ก.พ. 69', general: 1205.09, hazardous: 0, infectious: 0, recycle: 392.06, wet: 153.20, ewaste: 3.00, a4: 22.10, total: 1775.45 },
  { month: 'มี.ค. 69', general: 1313.06, hazardous: 0, infectious: 0, recycle: 419.55, wet: 120.00, ewaste: 3.00, a4: 20.70, total: 1876.31 },
  { month: 'เม.ย. 69', general: 1205.75, hazardous: 0, infectious: 0, recycle: 373.50, wet: 147.80, ewaste: 2.00, a4: 17.00, total: 1746.05 },
]

// % นำขยะกลับมาใช้ใหม่ สะสม (สูตรจริง: recycle+wet+ewaste+A4 / total)
const recycleAccum = (() => {
  let sumReuse = 0, sumTotal = 0
  return wasteData69.map(d => {
    sumReuse  += d.recycle + d.wet + d.ewaste + d.a4
    sumTotal  += d.total
    return {
      month: d.month,
      rate: +((sumReuse / sumTotal) * 100).toFixed(2),
    }
  })
})()

// ===== ข้อมูลน้ำเสีย Lab Report 4 เดือน =====
const waterData = [
  { month: 'ม.ค. 69', pH: 7.7, BOD: 46,  TSS: 22, TDS: 424, OilGrease: 4,   TKN: 44,  Sulfide: 0.10 },
  { month: 'ก.พ. 69', pH: 6.2, BOD: 91,  TSS: 40, TDS: 492, OilGrease: 4,   TKN: 111, Sulfide: 0.10 },
  { month: 'มี.ค. 69', pH: 8.1, BOD: 74,  TSS: 18, TDS: 500, OilGrease: 2,   TKN: 102, Sulfide: 0.10 },
  { month: 'เม.ย. 69', pH: 8.0, BOD: 66,  TSS: 18, TDS: 464, OilGrease: 2,   TKN: 41,  Sulfide: 0.10 },
]

const waterStandards = {
  pH:        { label: 'pH',                   unit: '',      min: 5.5,  max: 9.0,   higherIsBad: false, isRange: true },
  BOD:       { label: 'BOD',                  unit: 'mg/L',  max: 30,   higherIsBad: true  },
  TSS:       { label: 'TSS (ของแข็งแขวนลอย)', unit: 'mg/L',  max: 40,   higherIsBad: true  },
  TDS:       { label: 'TDS (ของแข็งละลาย)',   unit: 'mg/L',  max: 1000, higherIsBad: true  },
  OilGrease: { label: 'น้ำมันและไขมัน',       unit: 'mg/L',  max: 20,   higherIsBad: true  },
  TKN:       { label: 'TKN (ไนโตรเจน)',       unit: 'mg/L',  max: 35,   higherIsBad: true  },
  Sulfide:   { label: 'ซัลไฟด์',              unit: 'mg/L',  max: 1.0,  higherIsBad: true  },
}

function isPass(key, val) {
  const s = waterStandards[key]
  if (!s) return true
  if (s.isRange) return val >= s.min && val <= s.max
  return val <= s.max
}

const WASTE_COLORS = {
  general: '#1565C0', recycle: '#F9A825', wet: '#388E3C',
  hazardous: '#C62828', infectious: '#FF6F00', ewaste: '#6A1B9A',
}
const WASTE_LABELS = {
  general: 'ทั่วไป', recycle: 'รีไซเคิล', wet: 'เปียก',
  hazardous: 'อันตราย', infectious: 'ติดเชื้อ', ewaste: 'E-Waste',
}

function StatCard({ icon, value, label, sublabel, accent }) {
  return (
    <div style={{
      background: colors.surface, border: `1px solid ${accent}33`,
      borderRadius: radius.lg, padding: '20px 22px',
      boxShadow: shadows.card, borderTop: `3px solid ${accent}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: font.xs, fontWeight: 700, color: accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
          <div style={{ fontSize: font['3xl'], fontWeight: 800, color: accent, lineHeight: 1 }}>{value}</div>
          {sublabel && <div style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: 6 }}>{sublabel}</div>}
        </div>
        <div style={{ fontSize: 32 }}>{icon}</div>
      </div>
    </div>
  )
}

const tooltipStyle = {
  background: colors.surface, border: `1px solid ${colors.border}`,
  borderRadius: radius.md, padding: '10px 14px',
  fontSize: font.sm, fontFamily: 'Sarabun, sans-serif',
  boxShadow: shadows.card,
}

// ===== TAB WASTE =====
function TabWaste({ isMobile }) {
  const latestRate = recycleAccum[recycleAccum.length - 1]?.rate || 0
  const totalWeight = wasteData69.reduce((s, d) => s + d.total, 0)

  return (
    <div>
      {/* Stat Cards — Row 1 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: 16, marginBottom: 16,
      }}>
        <StatCard icon="⚖️" value={`${fmt(totalWeight)} กก.`} label="น้ำหนักขยะสะสม" sublabel="4 เดือน (ม.ค.–เม.ย. 69)" accent={colors.primary} />
        <StatCard icon="♻️" value={`${latestRate.toFixed(2)}%`} label="อัตรา % นำขยะกลับมาใช้ใหม่ สะสม" sublabel={`เป้าหมาย ≥ 45% ${latestRate >= 45 ? '✅' : '⚠️'}`} accent={latestRate >= 45 ? colors.primaryMid : colors.gold} />
      </div>

      {/* Stat Cards — Row 2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(7,1fr)',
        gap: 12, marginBottom: 32,
      }}>
        {[
          { icon: '🗑️', label: 'ขยะทั่วไป',   val: wasteData69.reduce((s,d)=>s+d.general,0),    accent: '#1565C0' },
          { icon: '♻️', label: 'รีไซเคิล',     val: wasteData69.reduce((s,d)=>s+d.recycle,0),    accent: '#F9A825' },
          { icon: '🥗', label: 'ขยะเปียก',      val: wasteData69.reduce((s,d)=>s+d.wet,0),        accent: '#388E3C' },
          { icon: '⚠️', label: 'ขยะอันตราย',   val: wasteData69.reduce((s,d)=>s+d.hazardous,0),  accent: '#C62828' },
          { icon: '🧪', label: 'ขยะติดเชื้อ',  val: wasteData69.reduce((s,d)=>s+d.infectious,0), accent: '#FF6F00' },
          { icon: '💻', label: 'E-Waste',        val: wasteData69.reduce((s,d)=>s+d.ewaste,0),    accent: '#6A1B9A' },
          { icon: '📄', label: 'A4 ใช้ 2 หน้า', val: wasteData69.reduce((s,d)=>s+d.a4,0),        accent: '#00695C' },
        ].map(({ icon, label, val, accent }) => (
          <div key={label} style={{
            background: colors.surface, border: `1px solid ${accent}33`,
            borderRadius: radius.lg, padding: '14px 16px',
            boxShadow: shadows.card, borderTop: `3px solid ${accent}`,
          }}>
            <div style={{ fontSize: font.xs, fontWeight: 700, color: accent, marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{icon} {label}</div>
            <div style={{ fontSize: font.xl, fontWeight: 800, color: accent, lineHeight: 1 }}>{fmt(val)}</div>
            <div style={{ fontSize: 11, color: colors.textSecondary, marginTop: 4 }}>กก. สะสม</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{
        background: colors.surface, border: `1px solid ${colors.border}`,
        borderRadius: radius.lg, padding: 24, boxShadow: shadows.card, marginBottom: 24,
      }}>
        <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 4 }}>น้ำหนักขยะรายเดือน แยกประเภท</h3>
        <p style={{ fontSize: font.sm, color: colors.textSecondary, marginBottom: 20 }}>หน่วย: กิโลกรัม</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={wasteData69} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Sarabun' }} />
            <YAxis tick={{ fontSize: 12, fontFamily: 'Sarabun' }} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v} กก.`, WASTE_LABELS[n] || n]} />
            <Legend formatter={v => WASTE_LABELS[v] || v} wrapperStyle={{ fontSize: 12, fontFamily: 'Sarabun' }} />
            <Bar dataKey="general"    stackId="a" fill={WASTE_COLORS.general} />
            <Bar dataKey="recycle"    stackId="a" fill={WASTE_COLORS.recycle} />
            <Bar dataKey="wet"        stackId="a" fill={WASTE_COLORS.wet} />
            <Bar dataKey="hazardous"  stackId="a" fill={WASTE_COLORS.hazardous} />
            <Bar dataKey="infectious" stackId="a" fill={WASTE_COLORS.infectious} />
            <Bar dataKey="ewaste"     stackId="a" fill={WASTE_COLORS.ewaste} radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recycle rate line */}
      <div style={{
        background: colors.surface, border: `1px solid ${colors.border}`,
        borderRadius: radius.lg, padding: 24, boxShadow: shadows.card, marginBottom: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 4 }}>อัตรา Recycle สะสม (%)</h3>
            <p style={{ fontSize: font.sm, color: colors.textSecondary }}>สูตร: (รีไซเคิล + เปียก) ÷ ขยะทั้งหมด × 100</p>
          </div>
          <div style={{
            background: latestRate >= 45 ? colors.primaryPale : '#FFF8E1',
            border: `1px solid ${latestRate >= 45 ? colors.primaryMid : colors.gold}55`,
            borderRadius: radius.md, padding: '8px 16px',
            fontSize: font.sm, fontWeight: 600,
            color: latestRate >= 45 ? colors.primary : '#795548',
          }}>
            {latestRate >= 45 ? '✅' : '⚠️'} ล่าสุด: {latestRate}% {latestRate >= 45 ? '(ผ่านเกณฑ์)' : '(เป้า ≥ 45%)'}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={recycleAccum} margin={{ top: 0, right: 16, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Sarabun' }} />
            <YAxis domain={[0, 55]} tick={{ fontSize: 12, fontFamily: 'Sarabun' }} unit="%" />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'อัตรา Recycle']} />
            <Line type="monotone" dataKey={() => 45} stroke={colors.gold} strokeWidth={2} strokeDasharray="6 4" dot={false} name="เป้าหมาย 45%" />
            <Line type="monotone" dataKey="rate" stroke={colors.primaryMid} strokeWidth={3} dot={{ fill: colors.primary, r: 5 }} name="Recycle สะสม" />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Sarabun' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>


    </div>
  )
}

// ===== TAB WATER =====
function TabWater({ isMobile }) {
  const latest = waterData[waterData.length - 1]
  const latestMonth = latest.month

  const paramKeys = ['pH', 'BOD', 'TSS', 'TDS', 'OilGrease', 'TKN', 'Sulfide']
  const passCount = paramKeys.filter(k => isPass(k, latest[k])).length
  const allPass = passCount === paramKeys.length

  return (
    <div>
      {/* Summary cards — 2 rows x 4 */}
      {(() => {
        const cards = [
          { icon: allPass ? '✅' : '⚠️', value: `${passCount}/${paramKeys.length}`, label: 'ผ่านเกณฑ์ล่าสุด', sublabel: latestMonth, accent: allPass ? colors.primary : '#C62828' },
          { icon: isPass('pH', latest.pH) ? '✅' : '❌', value: `${latest.pH}`, label: 'pH', sublabel: 'เกณฑ์ 5.5–9.0', accent: isPass('pH', latest.pH) ? colors.primary : '#C62828' },
          { icon: isPass('BOD', latest.BOD) ? '✅' : '❌', value: `${latest.BOD}`, label: 'BOD (mg/L)', sublabel: 'เกณฑ์ ≤ 30', accent: isPass('BOD', latest.BOD) ? colors.primary : '#C62828' },
          { icon: isPass('TSS', latest.TSS) ? '✅' : '❌', value: `${latest.TSS}`, label: 'TSS (mg/L)', sublabel: 'เกณฑ์ ≤ 40', accent: isPass('TSS', latest.TSS) ? colors.primary : '#C62828' },
          { icon: isPass('TDS', latest.TDS) ? '✅' : '❌', value: `${latest.TDS}`, label: 'TDS (mg/L)', sublabel: 'เกณฑ์ ≤ 1,000', accent: isPass('TDS', latest.TDS) ? colors.primary : '#C62828' },
          { icon: isPass('OilGrease', latest.OilGrease) ? '✅' : '❌', value: `${latest.OilGrease < 2 ? '<2' : latest.OilGrease}`, label: 'น้ำมัน & ไขมัน (mg/L)', sublabel: 'เกณฑ์ ≤ 20', accent: isPass('OilGrease', latest.OilGrease) ? colors.primary : '#C62828' },
          { icon: isPass('TKN', latest.TKN) ? '✅' : '❌', value: `${latest.TKN}`, label: 'TKN (mg/L)', sublabel: 'เกณฑ์ ≤ 35', accent: isPass('TKN', latest.TKN) ? colors.primary : '#C62828' },
          { icon: isPass('Sulfide', latest.Sulfide) ? '✅' : '❌', value: latest.Sulfide < 0.11 ? '<0.10' : `${latest.Sulfide}`, label: 'ซัลไฟด์ (mg/L)', sublabel: 'เกณฑ์ ≤ 1.0', accent: isPass('Sulfide', latest.Sulfide) ? colors.primary : '#C62828' },
        ]
        return (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
            {cards.map(c => (
              <div key={c.label} style={{
                background: colors.surface, border: `1px solid ${c.accent}33`,
                borderRadius: radius.lg, padding: '18px 20px',
                boxShadow: shadows.card, borderTop: `3px solid ${c.accent}`,
              }}>
                <div style={{ fontSize: font.xs, fontWeight: 700, color: c.accent, marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: font['2xl'], fontWeight: 800, color: c.accent, lineHeight: 1 }}>{c.value}</div>
                <div style={{ fontSize: font.xs, color: colors.textSecondary, marginTop: 6 }}>{c.sublabel}</div>
              </div>
            ))}
          </div>
        )
      })()}

      {/* ตารางสถานะรายเดือน */}
      <div style={{
        background: colors.surface, border: `1px solid ${colors.border}`,
        borderRadius: radius.lg, padding: 24, boxShadow: shadows.card, marginBottom: 24,
        overflowX: 'auto',
      }}>
        <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 4 }}>ผลการตรวจวัดคุณภาพน้ำเสีย — รายเดือน</h3>
        <p style={{ fontSize: font.sm, color: colors.textSecondary, marginBottom: 20 }}>เปรียบเทียบกับมาตรฐานน้ำทิ้ง (WC 0035)</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: font.sm, minWidth: 600 }}>
          <thead>
            <tr style={{ background: '#F5F5F5' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: colors.textPrimary, borderBottom: `2px solid ${colors.border}` }}>พารามิเตอร์</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: colors.textSecondary, borderBottom: `2px solid ${colors.border}` }}>เกณฑ์</th>
              {waterData.map(d => (
                <th key={d.month} style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: colors.textPrimary, borderBottom: `2px solid ${colors.border}` }}>{d.month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paramKeys.map((key, i) => {
              const s = waterStandards[key]
              const stdLabel = s.isRange ? `${s.min}–${s.max}` : `≤ ${s.max}`
              return (
                <tr key={key} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>
                    {s.label} {s.unit ? <span style={{ color: colors.textSecondary, fontWeight: 400 }}>({s.unit})</span> : ''}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>{stdLabel}</td>
                  {waterData.map(d => {
                    const val = d[key]
                    const pass = isPass(key, val)
                    return (
                      <td key={d.month} style={{ padding: '10px 12px', textAlign: 'center', borderBottom: `1px solid ${colors.border}` }}>
                        <span style={{
                          display: 'inline-block', padding: '3px 10px', borderRadius: radius.pill,
                          fontWeight: 700, fontSize: font.sm,
                          background: pass ? '#E8F5E9' : '#FFEBEE',
                          color: pass ? '#2E7D32' : '#C62828',
                        }}>
                          {val < 0.11 && key === 'Sulfide' ? '<0.10' : val}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* BOD + TKN chart */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: 24, marginBottom: 24,
      }}>
        {[
          { key: 'BOD', label: 'BOD', max: 30, color: '#1565C0' },
          { key: 'TKN', label: 'TKN (ไนโตรเจน)', max: 35, color: '#6A1B9A' },
        ].map(({ key, label, max, color }) => (
          <div key={key} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: 24, boxShadow: shadows.card }}>
            <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 4 }}>{label} (mg/L)</h3>
            <p style={{ fontSize: font.sm, color: colors.textSecondary, marginBottom: 16 }}>เกณฑ์มาตรฐาน ≤ {max} mg/L</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={waterData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Sarabun' }} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'Sarabun' }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} mg/L`, label]} />
                <Bar dataKey={key} fill={color} radius={[4,4,0,0]}>
                </Bar>
                <Line type="monotone" dataKey={() => max} stroke={colors.gold} strokeWidth={2} strokeDasharray="6 3" dot={false} name={`เกณฑ์ ${max}`} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 8, fontSize: font.xs, color: '#C62828', fontWeight: 600 }}>
              ⚠️ เกินเกณฑ์ทุกเดือน — ต้องปรับปรุงระบบบำบัดน้ำเสีย
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div style={{
        padding: '14px 18px', background: '#FFEBEE', border: '1px solid #EF9A9A',
        borderRadius: radius.md, fontSize: font.sm, color: '#B71C1C',
      }}>
        <strong>⚠️ สรุปผลการตรวจ:</strong> BOD และ TKN เกินเกณฑ์มาตรฐานทุกเดือน (ม.ค.–เม.ย. 2569)
        — แนะนำเร่งตรวจสอบและปรับปรุงระบบบำบัดน้ำเสียก่อนการประเมิน
      </div>
    </div>
  )
}

// ===== MAIN DASHBOARD =====
export default function DashboardPage() {
  const { w } = useWindowSize()
  const isMobile = w < 640
  const [activeTab, setActiveTab] = useState('waste')

  const tabs = [
    { id: 'waste', label: '♻️ ปริมาณขยะ' },
    { id: 'water', label: '💧 คุณภาพน้ำเสีย' },
  ]

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.heroDark} 0%, #0F2A1C 60%, ${colors.primary} 100%)`,
        padding: isMobile ? '48px 20px' : '64px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at 75% 50%, ${colors.accent}33 0%, transparent 55%)` }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(78,24,135,0.4)', border: `1px solid ${colors.accent}55`,
            color: '#CE93D8', padding: '5px 14px', borderRadius: radius.pill,
            fontSize: font.sm, fontWeight: 600, marginBottom: 16,
          }}>📊 Dashboard · ข้อมูลการจัดการขยะและน้ำเสีย</div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? 28 : 42, lineHeight: 1.3, marginBottom: 12 }}>
            ข้อมูลหมวดที่ 4<br />
            <span style={{ color: '#81C784' }}>อาคาร 51 ปี 2569</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: font.md, maxWidth: 500, lineHeight: 1.6 }}>
            ติดตามผลปริมาณขยะและคุณภาพน้ำเสีย เพื่อการประเมิน PEA Eco Standard
          </p>
        </div>
      </section>

      {/* TABS */}
      <div style={{ background: colors.surface, borderBottom: `1px solid ${colors.border}`, position: 'sticky', top: 64, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', gap: 0 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 28px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? `3px solid ${colors.primary}` : '3px solid transparent',
                color: activeTab === tab.id ? colors.primary : colors.textSecondary,
                fontFamily: 'Sarabun, sans-serif',
                fontSize: font.md, fontWeight: activeTab === tab.id ? 700 : 400,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '32px 20px' : '48px 32px' }}>
        {activeTab === 'waste' ? <TabWaste isMobile={isMobile} /> : <TabWater isMobile={isMobile} />}
      </div>
    </div>
  )
}
