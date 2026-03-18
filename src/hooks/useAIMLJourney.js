import { useState, useCallback } from 'react'
import { initialJourneyData } from '../data/aimlJourney'

const STORAGE_KEY = 'aiml_journey_v1'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : initialJourneyData
  } catch {
    return initialJourneyData
  }
}

function persist(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

let idCounter = Date.now()
function genId(prefix) {
  return `${prefix}_${++idCounter}`
}

export default function useAIMLJourney() {
  const [data, setData] = useState(loadData)

  const mutate = useCallback((updater) => {
    setData((prev) => {
      const next = updater(prev)
      persist(next)
      return next
    })
  }, [])

  // ── Generic CRUD ────────────────────────────────────────────────────────────

  const addItem = useCallback(
    (section, item) => {
      mutate((prev) => ({
        ...prev,
        [section]: [...prev[section], { ...item, id: genId(section) }],
      }))
    },
    [mutate]
  )

  const editItem = useCallback(
    (section, id, changes) => {
      mutate((prev) => ({
        ...prev,
        [section]: prev[section].map((item) =>
          item.id === id ? { ...item, ...changes } : item
        ),
      }))
    },
    [mutate]
  )

  const deleteItem = useCallback(
    (section, id) => {
      mutate((prev) => ({
        ...prev,
        [section]: prev[section].filter((item) => item.id !== id),
      }))
    },
    [mutate]
  )

  const updateMeta = useCallback(
    (changes) => {
      mutate((prev) => ({ ...prev, meta: { ...prev.meta, ...changes } }))
    },
    [mutate]
  )

  const resetToDefault = useCallback(() => {
    persist(initialJourneyData)
    setData(initialJourneyData)
  }, [])

  return { data, addItem, editItem, deleteItem, updateMeta, resetToDefault }
}
