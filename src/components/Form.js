
import {useState, useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import AuthContext from '../store/authContext'

const Form = () => {
    const {token, userId} = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState(true)

    const handleSubmit = e => {
        e.preventDefault()

        axios.post('http://localhost:5312/posts', {title, content, privateStatus: status, userId}, {
            headers: {
                authorization: token
            }
        })
            .then(() => {
                navigate('/profile')
            })
            .catch(err => console.log(err))
    }
console.log(status)
    return (
        <main>
            <form className='form add-post-form' onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className='form-input add-post-input'
                />
                <textarea 
                    type='text'
                    placeholder='content'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className='form-input add-post-input textarea'
                />
                <div className='flex-row status-container'>
                    <div className='radio-btn'>
                        <label htmlFor='private-status'>
                            private:
                        </label>
                        <input 
                            type='radio'
                            name='status'
                            id='private-status'
                            value={"true"}
                            onChange={e => setStatus(true)}
                        />
                    </div>
                    <div className='radio-btn'>
                        <label htmlFor='public-status'>
                            public:
                        </label>
                        <input 
                            type='radio'
                            name='status'
                            id='public-status'
                            value={"false"}
                            onChange={e => setStatus(false)}
                        />
                    </div>
                </div>
                <button className='form-btn'>submit</button>
            </form>
        </main>
    )
}

export default Form