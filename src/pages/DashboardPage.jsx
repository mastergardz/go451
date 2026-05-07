import { useState, useEffect } from 'react'
import { colors, radius, font, shadows } from '../theme.js'
import { monthlyWasteData, scoreHistory, criteria } from '../data/wasteData.js'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth })
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return size
}

// คำนวณ % Reuse/Recycle สะสม
function calcRecycleRate(data) {
  let totalAll = 0, totalRecycle = 0
  return data.map(d => {
    totalAll += d.general + d.recycle + d.wet + d.hazardous + d.infectious + d.ewaste
    totalRecycle += d.recycle
    return {
      month: d.month,
      rate: totalAll > 0 ? +((totalRecycle / totalAll) * 100).toFixed(1) : 0,
    }
  })
}

const WASTE_COLORS = {
  general:    '#1565C0',  // น้ำเงิน — ขยะทั่วไป (สากล)
  recycle:    '#F9A825',  // เหลือง — รีไซเคิล (สากล)
  wet:        '#388E3C',  // เขียว — เปียก/อินทรีย์ (สากล)
  hazardous:  '#C62828',  // แดง — อันตราย (สากล)
  infectious: '#FF6F00',  // ส้มเข้ม — ติดเชื้อ
  ewaste:     '#6A1B9A',  // ม่วง — E-Waste
}

const WASTE_LABELS = {
  general: 'ทั่วไป', recycle: 'รีไซเคิล', wet: 'เปียก',
  hazardous: 'อันตราย', infectious: 'ติดเชื้อ', ewaste: 'E-Waste',
}

function StatCard({ icon, value, label, sublabel, accent, bg }) {
  return (
    <div style={{
      background: bg || colors.surface,
      border: `1px solid ${accent}33`,
      borderRadius: radius.lg, padding: '20px 22px',
      boxShadow: shadows.card,
      borderTop: `3px solid ${accent}`,
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

const customTooltipStyle = {
  background: colors.surface, border: `1px solid ${colors.border}`,
  borderRadius: radius.md, padding: '10px 14px',
  fontSize: font.sm, fontFamily: 'Sarabun, sans-serif',
  boxShadow: shadows.card,
}

export default function DashboardPage() {
  const { w } = useWindowSize()
  const isMobile = w < 640
  const isTablet = w >= 640 && w < 1024

  const recycleRates = calcRecycleRate(monthlyWasteData)
  const latestRate = recycleRates[recycleRates.length - 1]?.rate || 0

  // รวมน้ำหนักทั้งหมดแต่ละประเภท
  const totalByType = ['general', 'recycle', 'wet', 'hazardous', 'infectious', 'ewaste'].map(key => ({
    name: WASTE_LABELS[key],
    value: +monthlyWasteData.reduce((s, d) => s + d[key], 0).toFixed(1),
    color: WASTE_COLORS[key],
  }))

  const totalWeight = totalByType.reduce((s, d) => s + d.value, 0).toFixed(1)

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.heroDark} 0%, #0F2A1C 60%, ${colors.primary} 100%)`,
        padding: isMobile ? '48px 20px' : '64px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 75% 50%, ${colors.accent}33 0%, transparent 55%)`,
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(78,24,135,0.4)', border: `1px solid ${colors.accent}55`,
            color: '#CE93D8', padding: '5px 14px', borderRadius: radius.pill,
            fontSize: font.sm, fontWeight: 600, marginBottom: 16,
          }}>📊 Dashboard · ข้อมูลการจัดการขยะ</div>
          <h1 style={{
            color: '#fff', fontWeight: 800, fontSize: isMobile ? 28 : 42, lineHeight: 1.3, marginBottom: 12,
          }}>
            ข้อมูลขยะ<br />
            <span style={{ color: '#81C784' }}>หมวดที่ 4 อาคาร 51</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: font.md, maxWidth: 500, lineHeight: 1.6 }}>
            รายงานผลการจัดการขยะประจำปี 2568 และผลการประเมิน PEA Eco Standard
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '32px 20px' : '48px 32px' }}>

        {/* ===== STAT CARDS ===== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: 16, marginBottom: 36,
        }}>
          <StatCard icon="⚖️" value={`${totalWeight} กก.`} label="น้ำหนักขยะสะสม" sublabel="6 เดือน (ต.ค. 67 – มี.ค. 68)" accent={colors.primary} />
          <StatCard icon="♻️" value={`${latestRate}%`} label="อัตรา Recycle สะสม" sublabel={`เป้าหมาย > 45%`} accent={latestRate >= 45 ? colors.primaryMid : colors.gold} />
          <StatCard icon="🏆" value="13/14" label="คะแนนประเมินปี 2568" sublabel="92.9% — ดีมาก" accent={colors.gold} />
          <StatCard icon="🎯" value="15/15" label="เป้าหมายปี 2569" sublabel="100% — คะแนนเต็ม" accent={colors.accent} />
        </div>

        {/* ===== ROW 1: Bar chart + Pie chart ===== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '2fr 1fr',
          gap: 24, marginBottom: 24,
        }}>
          {/* Bar chart */}
          <div style={{
            background: colors.surface, border: `1px solid ${colors.border}`,
            borderRadius: radius.lg, padding: '24px', boxShadow: shadows.card,
          }}>
            <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 4 }}>
              น้ำหนักขยะรายเดือน แยกประเภท
            </h3>
            <p style={{ fontSize: font.sm, color: colors.textSecondary, marginBottom: 20 }}>หน่วย: กิโลกรัม</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyWasteData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Sarabun' }} />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Sarabun' }} />
                <Tooltip contentStyle={customTooltipStyle} formatter={(v, n) => [`${v} กก.`, WASTE_LABELS[n] || n]} />
                <Legend formatter={v => WASTE_LABELS[v] || v} wrapperStyle={{ fontSize: 12, fontFamily: 'Sarabun' }} />
                <Bar dataKey="general" stackId="a" fill={WASTE_COLORS.general} />
                <Bar dataKey="recycle" stackId="a" fill={WASTE_COLORS.recycle} />
                <Bar dataKey="wet" stackId="a" fill={WASTE_COLORS.wet} />
                <Bar dataKey="hazardous" stackId="a" fill={WASTE_COLORS.hazardous} />
                <Bar dataKey="infectious" stackId="a" fill={WASTE_COLORS.infectious} />
                <Bar dataKey="ewaste" stackId="a" fill={WASTE_COLORS.ewaste} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div style={{
            background: colors.surface, border: `1px solid ${colors.border}`,
            borderRadius: radius.lg, padding: '24px', boxShadow: shadows.card,
          }}>
            <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 4 }}>
              สัดส่วนขยะแต่ละประเภท
            </h3>
            <p style={{ fontSize: font.sm, color: colors.textSecondary, marginBottom: 12 }}>รวมสะสม 6 เดือน</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={totalByType} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                  dataKey="value" nameKey="name" paddingAngle={3}>
                  {totalByType.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} formatter={(v) => [`${v} กก.`]} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {totalByType.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color }} />
                    <span style={{ fontSize: font.sm, color: colors.textSecondary }}>{t.name}</span>
                  </div>
                  <span style={{ fontSize: font.sm, fontWeight: 600, color: colors.textPrimary }}>{t.value} กก.</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== ROW 2: Recycle rate line chart ===== */}
        <div style={{
          background: colors.surface, border: `1px solid ${colors.border}`,
          borderRadius: radius.lg, padding: '24px', boxShadow: shadows.card,
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 4 }}>
                อัตรา Recycle สะสม (%)
              </h3>
              <p style={{ fontSize: font.sm, color: colors.textSecondary }}>
                สูตร: (ขยะรีไซเคิลสะสม ÷ ขยะทั้งหมดสะสม) × 100
              </p>
            </div>
            <div style={{
              background: latestRate >= 45 ? colors.primaryPale : '#FFF8E1',
              border: `1px solid ${latestRate >= 45 ? colors.primaryMid : colors.gold}55`,
              borderRadius: radius.md, padding: '8px 16px',
              fontSize: font.sm, fontWeight: 600,
              color: latestRate >= 45 ? colors.primary : '#795548',
            }}>
              {latestRate >= 45 ? '✅' : '⚠️'} ล่าสุด: {latestRate}% {latestRate >= 45 ? '(ผ่านเกณฑ์ 45%)' : '(เป้า > 45%)'}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={recycleRates} margin={{ top: 0, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Sarabun' }} />
              <YAxis domain={[0, 55]} tick={{ fontSize: 12, fontFamily: 'Sarabun' }} unit="%" />
              <Tooltip contentStyle={customTooltipStyle} formatter={(v) => [`${v}%`, 'อัตรา Recycle']} />
              {/* เส้นเป้าหมาย 45% */}
              <Line type="monotone" dataKey={() => 45} stroke={colors.gold} strokeWidth={2} strokeDasharray="6 4" dot={false} name="เป้าหมาย 45%" />
              <Line type="monotone" dataKey="rate" stroke={colors.primaryMid} strokeWidth={3} dot={{ fill: colors.primary, r: 5 }} name="อัตรา Recycle สะสม" />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Sarabun' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ===== ROW 3: คะแนนประเมิน ===== */}
        <div style={{
          background: colors.surface, border: `1px solid ${colors.border}`,
          borderRadius: radius.lg, padding: '24px', boxShadow: shadows.card,
        }}>
          <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 4 }}>
            ผลการประเมินหมวดที่ 4 ปี 2568 — รายข้อ
          </h3>
          <p style={{ fontSize: font.sm, color: colors.textSecondary, marginBottom: 24 }}>
            คะแนนรวม: 13/15 (86.7%) · เป้าหมายปี 2569: 15/15 (100%)
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {scoreHistory.breakdown.map(item => {
              const pct = (item.score / item.max) * 100
              const c = criteria.find(c => c.id === item.id)
              return (
                <div key={item.id}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 6, flexWrap: 'wrap', gap: 4,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{c?.icon}</span>
                      <span style={{ fontSize: font.sm, fontWeight: 600, color: colors.textPrimary }}>
                        ข้อ {item.id}: {item.title}
                      </span>
                      {item.gap && (
                        <span style={{
                          background: '#FFF3E0', color: '#E65100',
                          border: '1px solid #FFB74D',
                          fontSize: 10, fontWeight: 700,
                          padding: '2px 8px', borderRadius: radius.pill,
                        }}>ต้องปรับปรุง</span>
                      )}
                    </div>
                    <span style={{
                      fontSize: font.sm, fontWeight: 700,
                      color: item.gap ? colors.gold : colors.primary,
                    }}>
                      {item.score}/{item.max}
                    </span>
                  </div>
                  <div style={{ background: '#F5F5F5', borderRadius: radius.pill, height: 10, overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`, height: '100%',
                      background: item.gap
                        ? `linear-gradient(90deg, ${colors.gold}, #FFB300)`
                        : `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
                      borderRadius: radius.pill,
                    }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Gap note */}
          <div style={{
            marginTop: 24, padding: '14px 18px',
            background: '#FFF8E1', border: `1px solid ${colors.gold}55`,
            borderRadius: radius.md,
            fontSize: font.sm, color: '#795548',
          }}>
            <strong>⚠️ ช่องว่างปี 2568:</strong> {scoreHistory.gapNote}
            <br />
            <strong style={{ color: colors.primary }}>🎯 แผนปี 2569:</strong> ประสานหมวดที่ 2 เพิ่มช่องทางและความถี่การประชาสัมพันธ์
            ใช้เว็บไซต์นี้เป็นเครื่องมือสร้างความเข้าใจให้พนักงาน
          </div>
        </div>
      </div>
    </div>
  )
}
