let eventsPageState = {
    assemblyName: 'events',
    name: 'events',
    title: 'Events',
    summary: {
      title: 'Current Events',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Event',
      headers: ['Name', 'Date'],
      data_properties: ['name', 'date'],
      qewd: {
        getSummary: 'getEvents',
        getDetail: 'getEventInfo',
        delete: 'deleteEvent'
      },
      rowBtnIcon: 'user-edit',
      rowBtnColour: 'info',
      enableDelete: true,
      deleteConfirmDisplayColumn: 0
    },
    detail: {
      cardWidth: '500px',
      newRecordTitle: 'Enter New Event',
      titleColour: 'info',
      btnIcon: 'user-cog',
      btnColour: 'success',
      btnTooltip: 'Edit Event Details',
      title_data_property: 'name',
      fields: [
        {
          name: 'name',
          data_property: 'name',
          label: 'Name',
          type: 'text',
          labelWidth: 4
        },
        {
            name: 'date',
            data_property: 'date',
            label: 'Date',
            type: 'text',
            labelWidth: 4
        },
        {
          name: 'service',
          data_property: 'service',
          label: 'Service',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'comments',
          data_property: 'comments',
          label: 'Comments',
          type: 'textarea',
          labelWidth: 4,
          height: 6
        }
      ]
    },
    update: {
      btnText: 'Save',
      btnColour: 'warning',
      qewd: {
        save: 'updateEvent'
      }
    }
  };

  export {eventsPageState};