import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, radius, font, shadows } from '../theme.js'
import { quizQuestions, wasteTypes } from '../data/wasteData.js'

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth })
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return size
}

export default function QuizPage() {
  const { w } = useWindowSize()
  const isMobile = w < 640
  const navigate = useNavigate()

  const [phase, setPhase] = useState('intro')   // intro | quiz | result
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])

  const q = quizQuestions[current]
  const wt = wasteTypes.find(w => w.id === q?.wasteType)

  function handleSelect(idx) {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === q.answer) setScore(s => s + 1)
    setResults(r => [...r, { qId: q.id, selected: idx, correct: idx === q.answer }])
  }

  function handleNext() {
    if (current < quizQuestions.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setPhase('result')
    }
  }

  function restart() {
    setPhase('intro')
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setResults([])
  }

  const pct = Math.round((score / quizQuestions.length) * 100)
  const grade = pct >= 90 ? { label: 'ยอดเยี่ยม!', emoji: '🏆', color: colors.gold }
    : pct >= 70 ? { label: 'ดีมาก', emoji: '🎉', color: colors.primaryMid }
    : pct >= 50 ? { label: 'พอใช้', emoji: '👍', color: '#F9A825' }
    : { label: 'ต้องปรับปรุง', emoji: '📚', color: '#E53935' }

  // ===== INTRO =====
  if (phase === 'intro') return (
    <div>
      <section style={{
        background: `linear-gradient(135deg, ${colors.heroDark} 0%, #0F2A1C 60%, ${colors.primary} 100%)`,
        padding: isMobile ? '48px 20px' : '64px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(78,24,135,0.4)', border: `1px solid ${colors.accent}55`,
            color: '#CE93D8', padding: '5px 14px', borderRadius: radius.pill,
            fontSize: font.sm, fontWeight: 600, marginBottom: 16,
          }}>✏️ แบบทดสอบ · Quiz</div>
          <h1 style={{
            color: '#fff', fontWeight: 800, fontSize: isMobile ? 28 : 42, lineHeight: 1.3, marginBottom: 12,
          }}>
            ทดสอบความเข้าใจ<br />
            <span style={{ color: '#81C784' }}>การจัดการขยะ</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: font.md, maxWidth: 500, lineHeight: 1.6 }}>
            แบบทดสอบ {quizQuestions.length} ข้อ ครอบคลุมการคัดแยกขยะ น้ำเสีย และหลักการ 4R
            เพื่อเตรียมพร้อมสำหรับการประเมิน Green Office
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '40px 20px' : '60px 32px', background: colors.bg }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {/* Info cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32,
          }}>
            {[
              { icon: '❓', value: '10', label: 'ข้อ' },
              { icon: '📋', value: '4', label: 'หัวข้อหลัก' },
              { icon: '🎯', value: '90%', label: 'เป้าผ่าน' },
            ].map(s => (
              <div key={s.label} style={{
                background: colors.surface, border: `1px solid ${colors.border}`,
                borderRadius: radius.lg, padding: '20px', textAlign: 'center',
                boxShadow: shadows.card,
              }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: font['2xl'], fontWeight: 800, color: colors.primary }}>{s.value}</div>
                <div style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Topics */}
          <div style={{
            background: colors.surface, border: `1px solid ${colors.border}`,
            borderRadius: radius.lg, padding: '24px', marginBottom: 32,
            boxShadow: shadows.card,
          }}>
            <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 16 }}>
              📌 หัวข้อที่จะทดสอบ
            </h3>
            {[
              { icon: '♻️', label: 'การคัดแยกขยะ 6 ประเภท', color: colors.primaryMid },
              { icon: '💧', label: 'การจัดการน้ำเสีย (ถังแซท / ถังดักไขมัน)', color: '#006064' },
              { icon: '📊', label: 'เกณฑ์และคะแนน PEA Eco Standard', color: colors.accent },
              { icon: '🔄', label: 'หลักการ 4R และพฤติกรรมในสำนักงาน', color: colors.gold },
            ].map(t => (
              <div key={t.label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: `1px solid ${colors.border}`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: radius.sm,
                  background: `${t.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>{t.icon}</div>
                <span style={{ fontSize: font.base, color: colors.textPrimary }}>{t.label}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setPhase('quiz')} style={{
            width: '100%', background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryMid})`,
            color: '#fff', border: 'none', padding: '16px',
            borderRadius: radius.md, fontSize: font.md, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
            boxShadow: shadows.btn,
          }}>
            เริ่มทำแบบทดสอบ →
          </button>
        </div>
      </section>
    </div>
  )

  // ===== QUIZ =====
  if (phase === 'quiz') return (
    <div style={{ minHeight: '80vh', background: colors.bg, padding: isMobile ? '32px 20px' : '48px 32px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Progress */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
          }}>
            <span style={{ fontSize: font.sm, fontWeight: 600, color: colors.textSecondary }}>
              ข้อที่ {current + 1} จาก {quizQuestions.length}
            </span>
            <span style={{
              fontSize: font.sm, fontWeight: 700,
              color: colors.primary,
              background: colors.primaryPale,
              padding: '4px 12px', borderRadius: radius.pill,
            }}>คะแนน: {score}</span>
          </div>
          <div style={{ background: colors.border, borderRadius: radius.pill, height: 8, overflow: 'hidden' }}>
            <div style={{
              width: `${((current) / quizQuestions.length) * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
              borderRadius: radius.pill,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* Question card */}
        <div style={{
          background: colors.surface, border: `1px solid ${colors.border}`,
          borderRadius: radius.xl, overflow: 'hidden',
          boxShadow: shadows.cardHover,
          marginBottom: 20,
        }}>
          {/* Q header */}
          <div style={{
            background: colors.primaryPale,
            borderBottom: `1px solid ${colors.border}`,
            padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            {wt && (
              <div style={{
                width: 40, height: 40, borderRadius: radius.md,
                background: wt.bgColor, border: `1px solid ${wt.borderColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>{wt.icon}</div>
            )}
            <div>
              <div style={{ fontSize: font.xs, fontWeight: 700, color: colors.primary, letterSpacing: 1 }}>
                คำถามข้อที่ {current + 1}
              </div>
              <div style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: 2 }}>
                {wt ? wt.name : 'ความรู้ทั่วไป'}
              </div>
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            <p style={{
              fontSize: isMobile ? font.base : font.lg,
              fontWeight: 600, color: colors.textPrimary,
              lineHeight: 1.6, marginBottom: 24,
            }}>{q.question}</p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map((opt, i) => {
                const isSelected = selected === i
                const isCorrect = i === q.answer
                let bg = colors.surface
                let border = `1px solid ${colors.border}`
                let textColor = colors.textPrimary

                if (answered) {
                  if (isCorrect) {
                    bg = '#E8F5E9'; border = `2px solid ${colors.primaryMid}`; textColor = colors.primary
                  } else if (isSelected && !isCorrect) {
                    bg = '#FFEBEE'; border = '2px solid #E53935'; textColor = '#C62828'
                  }
                } else if (isSelected) {
                  bg = colors.primaryPale; border = `2px solid ${colors.primary}`; textColor = colors.primary
                }

                return (
                  <div key={i}
                    onClick={() => handleSelect(i)}
                    style={{
                      padding: '14px 18px',
                      background: bg, border,
                      borderRadius: radius.md,
                      cursor: answered ? 'default' : 'pointer',
                      fontSize: font.base, color: textColor,
                      fontWeight: isSelected || (answered && isCorrect) ? 600 : 400,
                      display: 'flex', alignItems: 'center', gap: 12,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: answered && isCorrect ? colors.primaryMid
                        : answered && isSelected && !isCorrect ? '#E53935'
                        : '#F5F5F5',
                      color: answered && (isCorrect || (isSelected && !isCorrect)) ? '#fff' : colors.textSecondary,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700,
                    }}>
                      {answered && isCorrect ? '✓' : answered && isSelected && !isCorrect ? '✗' : String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </div>
                )
              })}
            </div>

            {/* Explanation */}
            {answered && (
              <div style={{
                marginTop: 20, padding: '16px',
                background: selected === q.answer ? '#E8F5E9' : '#FFF8E1',
                border: `1px solid ${selected === q.answer ? colors.primaryMid : colors.gold}44`,
                borderRadius: radius.md,
              }}>
                <div style={{
                  fontWeight: 700, fontSize: font.sm, marginBottom: 6,
                  color: selected === q.answer ? colors.primary : '#795548',
                }}>
                  {selected === q.answer ? '✅ ถูกต้อง!' : '💡 คำอธิบาย:'}
                </div>
                <p style={{ fontSize: font.sm, color: colors.textSecondary, lineHeight: 1.65 }}>
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        </div>

        {answered && (
          <button onClick={handleNext} style={{
            width: '100%',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryMid})`,
            color: '#fff', border: 'none', padding: '14px',
            borderRadius: radius.md, fontSize: font.md, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
            boxShadow: shadows.btn,
          }}>
            {current < quizQuestions.length - 1 ? 'ข้อถัดไป →' : 'ดูผลลัพธ์ →'}
          </button>
        )}
      </div>
    </div>
  )

  // ===== RESULT =====
  return (
    <div style={{ background: colors.bg, padding: isMobile ? '40px 20px' : '60px 32px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Score card */}
        <div style={{
          background: colors.surface,
          border: `2px solid ${grade.color}44`,
          borderRadius: radius.xl,
          padding: isMobile ? '32px 24px' : '40px',
          textAlign: 'center',
          boxShadow: `0 8px 32px ${grade.color}20`,
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{grade.emoji}</div>
          <div style={{ fontSize: font['3xl'], fontWeight: 800, color: grade.color, marginBottom: 4 }}>
            {score} / {quizQuestions.length}
          </div>
          <div style={{ fontSize: font['2xl'], fontWeight: 800, color: colors.textPrimary, marginBottom: 8 }}>
            {grade.label}
          </div>
          <div style={{ fontSize: font.md, color: colors.textSecondary, marginBottom: 24 }}>
            คะแนนของคุณ: {pct}%
            {pct >= 90
              ? ' — พร้อมสำหรับการประเมิน Green Office แล้ว!'
              : ' — ลองศึกษาเพิ่มเติมแล้วทำใหม่อีกครั้ง'}
          </div>

          {/* Score bar */}
          <div style={{ background: '#F5F5F5', borderRadius: radius.pill, height: 14, overflow: 'hidden', marginBottom: 24 }}>
            <div style={{
              width: `${pct}%`, height: '100%',
              background: `linear-gradient(90deg, ${grade.color}, ${grade.color}bb)`,
              borderRadius: radius.pill,
              transition: 'width 1s ease',
            }} />
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={restart} style={{
              background: colors.primaryPale, color: colors.primary,
              border: `1px solid ${colors.border}`,
              padding: '12px 24px', borderRadius: radius.md,
              fontSize: font.base, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
            }}>
              🔄 ทำใหม่
            </button>
            <button onClick={() => navigate('/knowledge')} style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryMid})`,
              color: '#fff', border: 'none',
              padding: '12px 24px', borderRadius: radius.md,
              fontSize: font.base, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
              boxShadow: shadows.btn,
            }}>
              📚 ทบทวนความรู้
            </button>
          </div>
        </div>

        {/* Result detail */}
        <div style={{
          background: colors.surface, border: `1px solid ${colors.border}`,
          borderRadius: radius.lg, overflow: 'hidden',
          boxShadow: shadows.card,
        }}>
          <div style={{
            padding: '16px 24px', background: colors.primaryPale,
            borderBottom: `1px solid ${colors.border}`,
            fontWeight: 700, fontSize: font.md, color: colors.primary,
          }}>
            สรุปผลแต่ละข้อ
          </div>
          {results.map((r, i) => {
            const qData = quizQuestions[i]
            return (
              <div key={i} style={{
                padding: '14px 24px',
                borderBottom: i < results.length - 1 ? `1px solid ${colors.border}` : 'none',
                display: 'flex', alignItems: 'flex-start', gap: 14,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: r.correct ? '#E8F5E9' : '#FFEBEE',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14,
                }}>
                  {r.correct ? '✅' : '❌'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: font.sm, fontWeight: 600, color: colors.textPrimary, marginBottom: 4 }}>
                    ข้อ {i + 1}: {qData.question}
                  </div>
                  {!r.correct && (
                    <div style={{ fontSize: font.xs, color: colors.textMuted }}>
                      เฉลย: {qData.options[qData.answer]}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
