import fs from 'fs'
import path from 'path'
import { fetchPopulationList } from '@/server/queries/fetch-population-list'
import { PopulationTypedef } from '@/lib/typedef/population-typedef'

import { labels, priorities, statuses } from './data'

async function generateTasks() {
  try {
    console.log('Fetching population list...')
    const populationList = await fetchPopulationList()
    console.log(`Fetched ${populationList.length} population records`)

    if (populationList.length === 0) {
      throw new Error('Population list is empty')
    }

    console.log('Generating tasks...')
    const tasks = populationList.map((person: PopulationTypedef) => ({
      street: `TASK-${person.id.toString().padStart(4, '0')}`,
      name: `${person.occupation} task for ${person.name}`,
      status: statuses[person.id % statuses.length].value,
      label: labels[person.id % labels.length].value,
      priority: priorities[person.id % priorities.length].value,
    }))

    console.log(`Generated ${tasks.length} tasks`)

    const filePath = path.join(__dirname, 'tasks.json')
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))
    console.log(`Tasks data written to ${filePath}`)

    console.log('✅ Tasks data generated successfully.')
  } catch (error) {
    console.error('Error generating tasks:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
  }
}

generateTasks()
