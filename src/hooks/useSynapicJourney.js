import { useState, useEffect } from 'react'
import { initialSynapicData } from '../data/synapicJourney'

const STORAGE_KEY = 'synapic_journey_v1'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return initialSynapicData
}

function persist(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useSynapicJourney() {
  const [data, setData] = useState(loadData)

  useEffect(() => {
    persist(data)
  }, [data])

  function addItem(section, item) {
    setData(d => ({ ...d, [section]: [...d[section], item] }))
  }

  function editItem(section, id, changes) {
    setData(d => ({
      ...d,
      [section]: d[section].map(x => (x.id === id ? { ...x, ...changes } : x)),
    }))
  }

  function deleteItem(section, id) {
    setData(d => ({ ...d, [section]: d[section].filter(x => x.id !== id) }))
  }

  function updateMeta(changes) {
    setData(d => ({ ...d, meta: { ...d.meta, ...changes } }))
  }

  function updateMetrics(newMetrics) {
    setData(d => ({ ...d, metrics: newMetrics }))
  }

  function resetToDefault() {
    setData(initialSynapicData)
  }

  return { data, addItem, editItem, deleteItem, updateMeta, updateMetrics, resetToDefault }
}
