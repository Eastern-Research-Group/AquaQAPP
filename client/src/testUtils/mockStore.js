export const mockStore = {
  modules: {
    qapps: {
      state: {
        data: [
          {
            id: 1,
            title: 'Test QAPP 1',
            projectId: 1,
            userId: 1,
            description: 'Test QAPP 1 description',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
          },
          {
            id: 2,
            title: 'Test QAPP 2',
            projectId: 1,
            userId: 1,
            description: 'Test QAPP 2 description',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
          },
        ],
        isFetching: false,
      },
      mutations: {
        SET_DATA: jest.fn(),
        SET_IS_FETCHING: jest.fn(),
      },
      actions: {
        getQapps: jest.fn(),
      },
      namespaced: true,
    },
    qapp: {
      state: {
        title: '',
        description: '',
        currentQapp: null,
      },
      mutations: {
        SET_TITLE: jest.fn(),
        SET_DESCRIPTION: jest.fn(),
        SET_CURRENT_QAPP: jest.fn(),
      },
      actions: {
        add: jest.fn(),
        delete: jest.fn(),
      },
      namespaced: true,
    },
    structure: {
      state: {
        sections: [],
        questions: [],
        isFetching: false,
      },
      mutations: {
        SET_SECTIONS: jest.fn(),
        SET_QUESTIONS: jest.fn(),
        SET_IS_FETCHING: jest.fn(),
      },
      actions: {
        getSections: jest.fn(),
        getQuestions: jest.fn(),
      },
      namespaced: true,
    },
  },
};
