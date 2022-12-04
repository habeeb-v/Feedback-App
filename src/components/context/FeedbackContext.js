import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsloading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setfeedbackEdit] = useState({
        item: {},
        edit: false
    })
    
    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        //  "proxy": "https://localhost:5000",
        const response = await fetch (`https://localhost:5000/feedback?_sort=id&_order=desc`)

        const data = await response.json()

        setFeedback(data)
        setIsloading(false)
    }


    const addFeedback = async (newFeedback) => {
        const response = await fetch('https://localhost:5000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        // newFeedback.id = uuidv4()
        const data = await response.json()

        setFeedback([data, ...feedback])
       }    

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            await fetch (`https://localhost:5000/feedback/${id}`, { method: 'DELETE' })
            
          setFeedback( feedback.filter((item) => item.id!== id))
        }
      }   
     

      const updateFeedback = async (id, updItem) => {
        const response = await fetch(`https://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
        })
        const data = await response.json()

        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...data } : item))
            )
      }
      //Update Item
    const editFeedback = (item) => {
        setfeedbackEdit({
            item,
            edit: true
        })
    }

    return (
     <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
    )
}

export default FeedbackContext