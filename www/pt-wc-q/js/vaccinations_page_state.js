let vaccinationsPageState = {
    assemblyName: 'vaccinations',
    name: 'vaccinations',
    title: 'Vaccinations',
    summary: {
      title: 'Current Vaccinations',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Vaccine',
      headers: ['Name', 'Dose'],
      data_properties: ['name', 'dose'],
      qewd: {
        getSummary: 'getVaccines',
        getDetail: 'getVaccineInfo',
        delete: 'deleteVaccine'
      },
      rowBtnIcon: 'user-edit',
      rowBtnColour: 'info',
      enableDelete: true,
      deleteConfirmDisplayColumn: 0
    },
    detail: {
      cardWidth: '500px',
      newRecordTitle: 'Enter New Vaccine',
      titleColour: 'info',
      btnIcon: 'user-cog',
      btnColour: 'success',
      btnTooltip: 'Edit Vaccine Details',
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
            name: 'dose',
            data_property: 'dose',
            label: 'Dose',
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
        save: 'updateVaccine'
      }
    }
  };

  export {vaccinationsPageState};