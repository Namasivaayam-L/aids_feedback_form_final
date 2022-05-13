import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'

export const SubmitReview = (props) => {
    const [error, setError] = useState('')
    async function handleSubmit(){
        try {
            const val = {
                username: window.sessionStorage.getItem('username'),
                review:props.ratings        
            }
            // console.log(val);
            const data = []
            const { data: res } = await axios.post('feedback/review', val)
            console.log(1,res);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message)
                }
           }
        }
        return (
            <div>
                <Button
                type="submit"
                className='btn btn-primary'
                onClick={()=>{handleSubmit()}}
                style={{
                    position: "relative",
                }}>Submit</Button>     
                <p>{error}</p>
            </div>
  )
}