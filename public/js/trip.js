const newExcursionFormHandler = async (event) => {
    event.preventDefault();
  //get all values from the form
    const exc_name_form_value = document.querySelector('#excursion-name').value.trim();
    const date_form_value = document.querySelector('#excursion-date').value.trim();
    const time_form_value = document.querySelector('#excursion-time').value.trim();
    const description_form_value = document.querySelector('#excursion-description').value.trim();
  //send all values to the server
    if (exc_name_form_value && date_form_value) {
      const response = await fetch(`/api/excursion`, {
        method: 'POST',
        body: JSON.stringify({ exc_name_form_value, date_form_value, time_form_value, description_form_value}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/trip'); ///?
      } else {
        alert('Failed to create excursion');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/excursion/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/trip');
      } else {
        alert('Failed to delete excursion');
      }
    }
  };
  
  document
    .querySelector('.new-excursion-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.excursion-list')
    .addEventListener('click', delButtonHandler);
  