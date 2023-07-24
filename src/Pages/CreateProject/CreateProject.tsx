import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
type Props = {}

export default function CreateProject({ }: Props) {

  const handleEditorChange = (e:any):any => {
    console.log('Content was updated:', e.target.getContent());
  }
  return (
    <div className='container mt-5'>
      <h3>CreateProject</h3>
      <form className='container'>
        <div className='form-group'>
          <p>Name</p>
          <input className='form-control' name='projectName' id='projectName' />
        </div>
        <div className='form-group'>
          <p>Description</p>
          <Editor
            tagName='description'
            id="description" 
            initialValue=""
            init={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={handleEditorChange}
          />
        </div>
        <div className='form-group'>
          <select className='form-control' name='categoryId'>
            <option>Software</option>
            <option>Web</option>
            <option>App</option>
          </select>
        </div>
        <button className='btn btn-outline-primary' type='submit'>Create Project</button>
      </form>
    </div>
  )
}