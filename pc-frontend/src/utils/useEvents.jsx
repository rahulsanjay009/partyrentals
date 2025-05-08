import { useEffect, useState } from 'react';
import APIService from '../services/APIService';

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {

    setEventsLoading(true)
    APIService()
      .fetchEvents()
      .then(res => {
        if(res.success){
            setEvents(res?.events);            
            setStatusMessage("Fetched Succesfully");
        }
        else{
            setStatusMessage(res?.error)
        }
        setEventsLoading(false);
      })
      .catch(err => {
        console.error(err);        
      }).finally(() => {
        setEventsLoading(false)
        setTimeout(()=>{
            setStatusMessage('')
        },5000)
      });
  }, []);

  return { events, eventsLoading, statusMessage };
};

export default useEvents;
