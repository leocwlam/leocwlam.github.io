import { useState, useEffect } from 'react'

export const STAUTS = {
  idle: 0,
  loading: 1,
  ready: 2,
  error: 3
}

const createNewScript = (sourceUrl, async, defer) => {
  const script = document.createElement('script')
  script.src = sourceUrl
  script.async = async
  script.defer = defer
  script.setAttribute("data-status", STAUTS.loading);
  script.setAttribute("type", "text/javascript");

  document.body.appendChild(script)
  return script
}



const useScript = ({sourceUrl, async  = true, defer = false}) => {
  const [status, setStatus] = useState(sourceUrl ? STAUTS.loading : STAUTS.idle)

  const attachAttributeEventListener = (script) => {
    const setAttributeFromEvent = (event) => {
      script.setAttribute(
        "data-status",
        event.type === "load" ? STAUTS.ready : STAUTS.error
      );
    };
  
    script.addEventListener("load", setAttributeFromEvent)
    script.addEventListener("error", setAttributeFromEvent)
  }
  
  const setStateFromEvent = (event) => {
    setStatus(event.type === "load" ? STAUTS.ready : STAUTS.error)
  }

  const attachStateEventListener = (script) => {
    script.addEventListener("load", setStateFromEvent)
    script.addEventListener("error", setStateFromEvent)
  }

  useEffect(()=>{
    if (!sourceUrl) {
      setStatus(STAUTS.idle)
      return
    }

    let script = document.querySelector(`script[src="${sourceUrl}"]`)

    if (script) {
      setStatus(script.getAttribute("data-status"));
    } else {
      script = createNewScript(sourceUrl, async, defer)
      attachAttributeEventListener(script)
    }

    attachStateEventListener(script)
    
    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromEvent)
        script.removeEventListener("error", setStateFromEvent)
        document.body.removeChild(script)
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceUrl, async, defer])
  return status
}

export default useScript;