import React from 'react'

const SliderContext = React.createContext()

function SliderProvider({ children }) {
  // state for current slider item from the home image slider
  const [currentSliderItem, setCurrentSliderItem] = React.useState({})
  const [apertureDate, setApertureDate] = React.useState(new Date())
  const [closeDate, setCloseDate] = React.useState(new Date())
  const [notificationAdvice, setNotificationAdvice] = React.useState(false)

  return (
    <SliderContext.Provider
      value={{
        currentSliderItem,
        setCurrentSliderItem,
        apertureDate,
        setApertureDate,
        closeDate,
        setCloseDate,
        notificationAdvice,
        setNotificationAdvice,
      }}
    >
      {children}
    </SliderContext.Provider>
  )
}

export { SliderContext, SliderProvider }
