"use client"

import React from "react"

interface TopProps {
  name: string
}

const Top: React.FC<TopProps> = ({ name }) => {
  return (
    <h1 className="text-4xl font-light mb-8">
      Hello,
      <br />
      <span className="font-medium">{name}</span>
    </h1>
  )
}

export default Top
