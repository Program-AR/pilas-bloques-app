import React, { useRef } from 'react'
import { createPortal } from 'react-dom'

type IFrameProps = React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> & { head?: React.ReactNode }

export const IFrame = ({ children, head, ...props } : IFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const bodyNode = iframeRef.current?.contentDocument?.body
  const headNode = iframeRef.current?.contentDocument?.head

  return (
    <iframe 
        title={props.title} 
        {...props} 
        ref={iframeRef}
    >
      {headNode && createPortal(head, headNode)}
      {bodyNode && createPortal(children, bodyNode)}
    </iframe>
  )
}