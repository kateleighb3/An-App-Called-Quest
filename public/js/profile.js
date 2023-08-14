const newFormHandler = async (event) => {
    event.preventDefault();
  //get all values from the form
    const trip_name_form_value = document.querySelector('#trip-name').value.trim();
    const starting_date_form_value = document.querySelector('#start-date').value.trim();
    const ending_date_form_value = document.querySelector('#end-date').value.trim();
    const gear_form_value = document.querySelector('#gear').value.trim();
  //send all values to the server
    if (trip_name_form_value && starting_date_form_value && ending_date_form_value) {
      const response = await fetch(`/api/trip`, {
        method: 'POST',
        body: JSON.stringify({ trip_name_form_value, starting_date_form_value, ending_date_form_value, gear_form_value}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create trip');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/trip/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete trip');
      }
    }
  };
  
  document
    .querySelector('.new-trip-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.trip-list')
    .addEventListener('click', delButtonHandler);
  