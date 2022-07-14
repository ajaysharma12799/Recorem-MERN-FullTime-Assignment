/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createArticle } from '../__redux__/actions/article.action';

const CreateArticle = ({ createArticle }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleChange = (e) => {
        e.preventDefault();
        const article = {title: formData.title, description: formData.description};
        createArticle(article);
    }

  return (
    <div>
        <h1 className="text-5xl text-center mb-5">Create New Article</h1>
        <form>
        <div className="mt-3 mb-3">
            <input type="text" name="title" onChange={onChange} value={formData.title} className="rounded-0 w-full border-2 border-[#3944f8] p-5 outline-none" placeholder='Enter Title' />
        </div>
        <div className="mt-3 mb-3">
            <textarea name="description" onChange={onChange} value={formData.description} className="rounded-0 w-full border-2 border-[#3944f8] p-5 resize-none outline-none" placeholder='Enter Description'></textarea>
        </div>
        <div className="mt-3 mb-3">
            <button type="submit" onClick={handleChange} className="rounded-0 w-full bg-[#3944f8] text-[#ffffff] p-5 outline-none">Create New Article</button>
        </div>
        </form>
    </div>
  )
}

export default connect(null, { createArticle })(CreateArticle);