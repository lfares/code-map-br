export const FILTERS = [
  {
    key: 'region',
    label: 'Region',
    options: ['North', 'Northeast', 'Central-West', 'Southeast', 'South'],
  },
  {
    key: 'networkSize',
    label: 'Network Size',
    options: ['Small (up to 500 schools)', 'Medium (500 to 1500 schools)', 'Large (+1500 schools)'],
  },
  {
    key: 'deliveryModel',
    label: 'Delivery Model',
    options: ['Mandatory for all students', "Itinerary (depends on student's specialty choice)", 'Transversal'],
    multi: true,
  },
  {
    key: 'adminScope',
    label: 'Scope',
    options: ['Elementary School (K-5)', 'Middle School (6-9)', 'High School'],
    multi: true,
  },
  {
    key: 'materialTransparency',
    label: 'Transparency',
    options: ['Open', 'Restricted (Login)', 'N/A (Not found)'],
  },
  {
    key: 'materialSource',
    label: 'Material Source',
    options: ['In-house (State-authored)', 'Private/Paid Platform', 'Open Source Platform'],
  },
  {
    key: 'infrastructure',
    label: 'Infrastructure',
    options: ["Total Unplugged", "Low-tech (Teacher's computer or projector only)", 'Laboratory', '1:1 Devices/Chromebooks'],
  },
  {
    key: 'teacherProfile',
    label: 'Teacher',
    options: ['Specialist / Specific', 'Multidisciplinary', 'External Tutor'],
  },
  {
    key: 'assessmentType',
    label: 'Assessment',
    options: ['Project-Based (Artifacts)', 'Exams', 'No Assessment'],
  },
  {
    key: 'maturityRange',
    label: 'Curriculum Maturity',
    options: ['Early Adopter (2020–2021)', 'Mid Adoption (2022–2023)', 'Recent (2024+)'],
  },
  {
    key: 'learningComponents',
    label: 'Learning Components',
    options: ['Computational Thinking', 'Digital Culture & Literacy', 'Programming & Software', 'Robotics & Hardware', 'Data Science & AI'],
    multi: true,
  },
]

export function emptyFilters() {
  return Object.fromEntries(FILTERS.map(f => [f.key, new Set()]))
}

export function matches(stateMeta, activeFilters) {
  for (const [key, selected] of Object.entries(activeFilters)) {
    if (selected.size === 0) continue
    const value = stateMeta[key]
    if (Array.isArray(value)) {
      if (![...selected].some(s => value.includes(s))) return false
    } else {
      if (!selected.has(value)) return false
    }
  }
  return true
}
