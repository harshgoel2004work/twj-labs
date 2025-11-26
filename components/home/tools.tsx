import React from 'react'
import { IconType } from 'react-icons'
import { DiPhotoshop } from 'react-icons/di'
import { FaFigma, FaShopify } from 'react-icons/fa'
import { FaWebflow, FaWordpressSimple } from 'react-icons/fa6'
import { FiFramer } from 'react-icons/fi'
import { RiNextjsFill } from 'react-icons/ri'
import { SiTypescript } from 'react-icons/si'

type Tool = {
  id: number
  name: string
  logo: IconType
}

const tools: Tool[] = [
  { id: 1, name: 'Webflow', logo: FaWebflow },
  { id: 2, name: 'Figma', logo: FaFigma },
  { id: 3, name: 'Wordpress', logo: FaWordpressSimple },
  {id:4, name: 'Framer', logo: FiFramer},
  {id:5, name:"Shopify", logo: FaShopify},
  {id:6, name: "Next.js", logo: RiNextjsFill},
  {id:7, name: "Typescript", logo: SiTypescript},
//   {id:8, name: "Photoshop", logo: DiPhotoshop}
]

const ToolsWeUseSection = () => {
  return (
    <div className='w-full items-center flex flex-col gap-7'>
      <p className='text-xs font-medium text-white/50 uppercase'>Tools that we use for growth</p>

      <div className='w-full flex items-center justify-center gap-7'>
        {tools.map((tool) => {
          const Logo = tool.logo
          return (
            <div
              key={tool.id}
              className='p-3 rounded-full bg-white/5 border border-white/10 flex justify-center items-center text-white/70'
            >
              <Logo size={18} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ToolsWeUseSection
