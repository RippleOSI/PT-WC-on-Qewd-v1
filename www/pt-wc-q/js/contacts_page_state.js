let contactsPageState = {
    assemblyName: 'contacts',
    name: 'contacts',
    title: 'Contacts',
    icon: 'phone',
    summary: {
      title: 'Contacts:',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Contact',
      headers: ['Name', 'Relationship', 'NextOfKin'],
      data_properties: ['name', 'relationship', 'nextOfKin'],
      qewd: {
        getSummary: 'getContacts',
        getDetail: 'getContactInfo',
        delete: 'deleteContact'
      },
      rowBtnIcon: 'user-edit',
      rowBtnColour: 'info',
      enableDelete: true,
      deleteConfirmDisplayColumn: 0
    },
    detail: {
      cardWidth: '500px',
      newRecordTitle: 'Enter New Contact',
      titleColour: 'info',
      btnIcon: 'user-cog',
      btnColour: 'success',
      btnTooltip: 'Edit Contact Details',
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
          name: 'email',
          data_property: 'email',
          label: 'Email',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'phone',
          data_property: 'phone',
          label: 'Telephone',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'relationship',
          data_property: 'relationship',
          label: 'Relationship',
          type: 'select',
          labelWidth: 4,
          options: [
            {text: 'Brother', value: 'Brother'},
            {text: 'Sister', value: 'Sister'},
            {text: 'Not Specified', value: 'N/A'}
          ]
        },
        {
          name: 'relationship_type',
          data_property: 'relationship_type',
          label: 'Relationship Type',
          type: 'select',
          labelWidth: 4,
          options: [
            {text: 'Family', value: 'f'},
            {text: 'Professional', value: 'p'},
            {text: 'Not Specified', value: 'x'}
          ]
        },
        {
          name: 'nextOfKin',
          data_property: 'nextOfKin',
          label: 'Next Of Kin',
          type: 'radios',
          radios: [
            {text: 'Yes', value: true},
            {text: 'No', value: false}
          ]
        } ,
        {
          name: 'contact_info',
          data_property: 'contact_info',
          label: 'Contact Info',
          type: 'textarea',
          labelWidth: 4,
          height: 2
        },

        {
          name: 'note',
          data_property: 'note',
          label: 'Note',
          type: 'textarea',
          labelWidth: 4,
          height: 2
        },
        {
          name: 'author',
          data_property: 'author',
          label: 'Author',
          type: 'text',
          labelWidth: 4
        },
      ]
    },
    update: {
      btnText: 'Save',
      btnColour: 'warning',
      qewd: {
        save: 'updateContact'
      }
    }
  };

  export {contactsPageState};
