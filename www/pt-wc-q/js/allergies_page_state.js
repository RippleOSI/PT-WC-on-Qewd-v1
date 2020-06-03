let allergiesPageState = {
    assemblyName: 'allergies',
    name: 'allergies',
    title: 'Allergies',
    summary: {
      title: 'Current Allergies',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Allergy',
      headers: ['Name', 'Cause'],
      data_properties: ['name', 'cause'],
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
        save: 'updateAllergy'
      }
    }
  };

  export {allergiesPageState};