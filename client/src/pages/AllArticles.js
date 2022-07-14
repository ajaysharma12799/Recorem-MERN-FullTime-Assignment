/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux';
import { getAllArticle, likeArticle } from '../__redux__/actions/article.action';

const AllArticles = ({ getAllArticle, article, likeArticle }) => {
    const { articles } = article;

    React.useEffect(() => {
        getAllArticle();
    }, []);

    if(articles && articles.length === 0) {
        return <h1 className='text-xl text-center mt-10'>No Article Found</h1>
    }
  return (
    <div>
        {
            articles && articles.map((article, idx) => (
                <div key={idx} className="border-2 border-[#3944f7] rounded-0 p-5">
                    <h1 className="text-lg">Title: {article.title}</h1>
                    <p className="text-base">Description: {article.description}</p>
                    <p>Date: {article.createdAt}</p>
                    <div>
                        <button type="submit" 
                            onClick={() => {
                                likeArticle(article._id)
                            }}
                        className="border-2 border-[#000000] rounded-0 p-3 mt-5 cursor-pointer">Like Article</button>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

const mapStateToProps = (state) => ({
    article: state.article
});

export default connect(mapStateToProps, { getAllArticle, likeArticle })(AllArticles)