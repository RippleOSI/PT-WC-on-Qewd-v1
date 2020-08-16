let allergiesPageState = {
    assemblyName: 'allergies',
    name: 'allergies',
    title: 'Allergies',
    icon: 'hands',

    summary: {
      title: 'Current Allergies',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Allergy',
      headers: ['Cause', 'Date'],
      data_properties: ['cause', 'date'],
      qewd: {
        getSummary: 'getAllergies',
        getDetail: 'getAllergyInfo',
        delete: 'deleteAllergy'
      },
      rowBtnIcon: 'user-edit',
      rowBtnColour: 'info',
      enableDelete: true,
      deleteConfirmDisplayColumn: 0
    },
    detail: {
      cardWidth: '500px',
      newRecordTitle: 'Enter New Allergy',
      titleColour: 'info',
      btnIcon: 'user-cog',
      btnColour: 'success',
      btnTooltip: 'Edit Allergy Details',
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
            name: 'cause',
            data_property: 'cause',
            label: 'Cause',
            type: 'text',
            labelWidth: 4
        },
        {
          name: 'reaction',
          data_property: 'reaction',
          label: 'Reaction',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'date',
          data_property: 'date',
          label: 'Date of Event',
          type: 'date',
          labelWidth: 4
        },
        {
          name: 'description',
          data_property: 'description',
          label: 'Description',
          type: 'textarea',
          labelWidth: 4,
          height: 6
        },
        {
          name: 'terminology',
          data_property: 'terminology',
          label: 'Terminology',
          type: 'text',
          labelWidth: 4

        },
        {
          name: 'code',
          data_property: 'code',
          label: 'Code',
          type: 'text',
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

        }

      ]
    },
    update: {
      btnText: 'Save',
      btnColour: 'warning',
      qewd: {
        save: 'updateAllergy'
      }
    }
  };

  export {allergiesPageState};
