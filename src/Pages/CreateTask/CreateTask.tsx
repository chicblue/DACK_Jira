import React from 'react'

type Props = {}

export default function 
({}: Props) {
  return (
    <div className='container'>
        <div className="form-group">
            <p>Project</p>
            <select className='form-control' name='projectId'>
                <option value="54"></option>
                <option value="55"></option>
            </select>
        </div>
    </div>
  )
}