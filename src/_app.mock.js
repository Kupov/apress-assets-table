const app = {
  config: {
    imageUploadUrl: '/upload-images',
    imageModelName: 'imageModelName',
    productsEditorUrl: 'predl/groups',
    rubricatorUrl: '/tree',
    rubricatorUpdate: '/tree/update',
    dataUrl: '/table/data',
    urlSaveTiger: '/table/save',
    urlJob: '/table/save',
    productGroupSpecificationsUrl: 'get-group-children',
    deleteEmptyProductGroupsUrl: '/api/v1/companies/32/empty_product_groups',

    help: {
      url: '/help',
      data: {}
    },

    scenarios: {
      current: {
        slug: ''
      }
    },
    ckeditor: {
      toolbarTiger: []
    }
  }
};

window.app = app;
