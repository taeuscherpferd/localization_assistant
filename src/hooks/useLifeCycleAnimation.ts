import { useEffect, useState } from 'react'

export const useLifeCycleAnimation = (mountCondition: boolean): [boolean, (e: React.AnimationEvent)=>void] => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    mountCondition && setShouldRender(true)
  }, [mountCondition])

  const onAnimationEnd = (e: React.AnimationEvent) => {
    if (!mountCondition) setShouldRender(false)
  }

  return [shouldRender, onAnimationEnd]
}

