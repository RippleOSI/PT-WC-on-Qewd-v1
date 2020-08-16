let vaccinationsPageState = {
    assemblyName: 'vaccinations',
    name: 'vaccinations',
    title: 'Vaccinations',
    icon: 'syringe',

    summary: {
      title: 'Current Vaccinations',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Vaccine',
      headers: ['Name', 'Date'],
      data_properties: ['name', 'date'],
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
          label: 'Vaccine Name',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'date',
          data_property: 'date',
          label: 'Vaccine Date',
          type: 'date',
          labelWidth: 4
      },
      {
        name: 'series',
        data_property: 'series',
        label: 'Series',
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
        },

        {
          name: 'author',
          data_property: 'author',
          label: 'Author',
          type: 'text',
          labelWidth: 4,
          height: 6
        },
        {
          name: 'date_of_entry',
          data_property: 'date_of_entry',
          label: 'Date of Entry',
          type: 'date',
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
