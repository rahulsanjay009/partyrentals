import { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import APIService from '../../services/APIService';

const RecentEventsConsole = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ event_name: '', event_description: '', image: null });
  const [message, setMessage] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    APIService().fetchRecentEvents().then(res => {
      if (res.success) {
        setEvents(res.events);
      }
    });
  };

  const handleAddEvent = () => {
    const data = new FormData();
    data.append('event_name', formData.event_name);
    data.append('event_description', formData.event_description);
    if (formData.image) data.append('image', formData.image);

    setLoader(true);
    APIService().createRecentEvent(data).then(res => {
      if (res.success) {
        setEvents(prev => [...prev, res.event]);
        setFormData({ event_name: '', event_description: '', image: null });
        setShowForm(false);
        setMessage('Event added successfully');
      } else {
        setMessage(res.error || 'Error adding event');
      }
    }).finally(() => setLoader(false));
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleUpdateEvent = () => {
    const data = new FormData();
    data.append('id', editingEvent.id);
    data.append('event_name', editingEvent.event_name);
    data.append('event_description', editingEvent.event_description);
    if (editingEvent.imageFile) {
      data.append('image', editingEvent.imageFile);
    }

    setLoader(true);
    APIService().updateRecentEvent(data,editingEvent.id).then(res => {
      if (res.success) {
        const updated = events.map(e => e.id === editingEvent.id ? res.event : e);
        setEvents(updated);
        setEditingEvent(null);
        setMessage('Event updated');
      } else {
        setMessage(res.error);
      }
    }).finally(() => setLoader(false));
  };

  const handleDeleteEvent = (id) => {
    setLoader(true);
    APIService().deleteRecentEvent(id).then(res => {
      if (res.success) {
        setEvents(events.filter(e => e.id !== id));
        setMessage('Event deleted');
      } else {
        setMessage(res.error);
      }
    }).finally(() => setLoader(false));
  };

  return (
    <Box p={2}>
      <Button variant="contained" onClick={() => setShowForm(!showForm)} startIcon={<AddIcon />}>
        {showForm ? 'Cancel' : 'Add Event'}
      </Button>

      {showForm && (
        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="Event Name"
            value={formData.event_name}
            onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
          />
          <TextField
            label="Description"
            value={formData.event_description}
            onChange={(e) => setFormData({ ...formData, event_description: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
          <Button variant="contained" onClick={handleAddEvent}>Submit</Button>
        </Box>
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, idx) => (
              <TableRow key={event?.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  {editingEvent?.id === event?.id ? (
                    <TextField
                      value={editingEvent?.event_name}
                      onChange={(e) => setEditingEvent({ ...editingEvent, event_name: e.target.value })}
                    />
                  ) : event.event_name}
                </TableCell>
                <TableCell>
                  {editingEvent?.id === event?.id ? (
                    <TextField
                      value={editingEvent?.event_description}
                      onChange={(e) => setEditingEvent({ ...editingEvent, event_description: e.target.value })}
                    />
                  ) : event?.event_description}
                </TableCell>
                <TableCell>
                  {editingEvent?.id === event?.id ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => setEditingEvent({ ...editingEvent, imageFile: e.target.files[0] })}
                        style={{marginBottom:'10px'}}
                      /> <br/>
                      <img src={event?.image_url} height='50'/>
                    </>
                  ) : (
                    event?.image_url && <img src={event?.image_url} alt="Event" width={75} />
                  )}
                </TableCell>
                <TableCell>
                  {editingEvent?.id === event?.id ? (
                    <>
                      <Button onClick={handleUpdateEvent}>Save</Button>
                      <Button onClick={() => setEditingEvent(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEditEvent(event)}>Edit</Button>
                      <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        onClose={() => setMessage('')}
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      {loader && <div className="loader-overlay"><div className="loader" /></div>}
    </Box>
  );
};

export default RecentEventsConsole;
