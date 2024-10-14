import { onWorkEditDay } from '../utils'
import EditableWork from './EditableWork'
import ReadonlySubmission from './ViewOnlySubmission'
import { useState } from 'react'

export default function Content({ workData }) {
  const isEditable = onWorkEditDay(workData)

  return isEditable ? (
    <EditableWork workData={workData} />
  ) : (
    <ReadonlySubmission workData={workData} />
  )
}
