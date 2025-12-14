import React from 'react'

const BgGradiant = ({ children, classname }: { children?: React.ReactNode, classname?: string }) => {
    return (
        <div className={`relative isolate ${classname}`}>
            <div aria-hidden='true' className='pointer-events-none absolute inset-x-4 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30'>
                <div style={{
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 71% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}
                className='relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-6xl '
                >
                </div>
                {children}
            </div>
        </div>
  )
}

export default BgGradiant