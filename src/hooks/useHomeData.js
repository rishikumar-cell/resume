import { useState, useEffect } from 'react'
import { initialHomeData } from '../data/homeData'

const STORAGE_KEY = 'home_data_v1'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return initialHomeData
}

function persist(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useHomeData() {
  const [data, setData] = useState(loadData)
  useEffect(() => { persist(data) }, [data])

  function updateSection(section, changes) {
    setData(d => ({ ...d, [section]: { ...d[section], ...changes } }))
  }
  function updateArray(section, arr) {
    setData(d => ({ ...d, [section]: arr }))
  }
  function resetToDefault() {
    setData(initialHomeData)
  }
  return { data, updateSection, updateArray, resetToDefault }
}
