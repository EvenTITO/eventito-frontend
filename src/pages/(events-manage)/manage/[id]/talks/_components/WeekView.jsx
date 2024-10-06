export default function WeekView({
  selectedDate,
  filteredWorks,
  startHour,
  endHour,
  onWorkClick,
}) {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => i + startHour
  )
  const weekStart = new Date(selectedDate)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-8 gap-px bg-gray-200">
          <div className="bg-white p-2 font-semibold text-center">Hora</div>
          {days.map((day, index) => {
            const currentDate = new Date(weekStart)
            currentDate.setDate(currentDate.getDate() + index)
            return (
              <div key={day} className="bg-white p-2 font-semibold text-center">
                <div>{day}</div>
                <div className="text-sm text-gray-500">
                  {currentDate.getDate()}
                </div>
              </div>
            )
          })}
        </div>
        <div className="grid grid-cols-8 gap-px bg-gray-200">
          {hours.map((hour) => (
            <>
              <div
                key={hour}
                className="bg-white text-right pr-2 py-2 text-sm border-t border-gray-100"
              >
                {`${hour.toString().padStart(2, '0')}:00`}
              </div>
              {days.map((_, dayIndex) => {
                const currentDate = new Date(weekStart)
                currentDate.setDate(currentDate.getDate() + dayIndex)
                currentDate.setHours(hour, 0, 0, 0)
                const worksAtTime = filteredWorks.filter((work) => {
                  const workDate = new Date(work.talk.date)
                  return (
                    workDate.getDate() === currentDate.getDate() &&
                    workDate.getMonth() === currentDate.getMonth() &&
                    workDate.getFullYear() === currentDate.getFullYear() &&
                    workDate.getHours() === hour
                  )
                })
                return (
                  <div
                    key={`${hour}-${dayIndex}`}
                    className="bg-white p-1 min-h-[40px] border-t border-gray-100"
                  >
                    {worksAtTime.map((work) => (
                      <div
                        key={work.id}
                        className="text-xs p-1 bg-blue-100 rounded mb-1 cursor-pointer hover:bg-blue-200 transition-colors"
                        onClick={() => onWorkClick(work)}
                      >
                        {work.title.length > 20
                          ? work.title.substring(0, 20) + '...'
                          : work.title}
                      </div>
                    ))}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
