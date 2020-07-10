let medicationsPageState = {
    assemblyName: 'medications',
    name: 'medications',
    title: 'Medications',
    summary: {
      title: 'Current Meds',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Med',
      headers: ['Name', 'Dose'],
      data_properties: ['name', 'dose'],
      qewd: {
        getSummary: 'getMedications',
        getDetail: 'getMedicationInfo',
        delete: 'deleteMedication'
      },
      rowBtnIcon: 'user-edit',
      rowBtnColour: 'info',
      enableDelete: true,
      deleteConfirmDisplayColumn: 0
    },
    detail: {
      cardWidth: '500px',
      newRecordTitle: 'Enter New User',
      titleColour: 'info',
      btnIcon: 'user-cog',
      btnColour: 'success',
      btnTooltip: 'Edit User Details',
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
          name: 'route',
          data_property: 'route',
          label: 'Route',
          type: 'text',
          labelWidth: 4
        },
        {
            name: 'dose',
            data_property: 'dose',
            label: 'Dose',
            type: 'text',
            labelWidth: 4
        },
        {
          name: 'timing',
          data_property: 'timing',
          label: 'Timing',
          type: 'text',
          labelWidth: 4
      },
      
        {
          name: 'description',
          data_property: 'description',
          label: 'Description',
          type: 'textarea',
          labelWidth: 4,
          height: 2
        },
        {
          name: 'date_start',
          data_property: 'date_start',
          label: 'Start Date',
          type: 'date',
          labelWidth: 4
      },
      {
        name: 'author',
        data_property: 'author',
        label: 'Author',
        type: 'text',
        labelWidth: 4
    },
    {
      name: 'date_of_entry',
      data_property: 'date_of_entry',
      label: 'Date of Entry',
      type: 'date',
      labelWidth: 4
  },
    
      ]
    },
    update: {
      btnText: 'Save',
      btnColour: 'warning',
      qewd: {
        save: 'updateMedication'
      }
    }
  };

  export {medicationsPageState};